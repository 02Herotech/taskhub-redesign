import {
  GetCustomerTasksResponse,
  GetCustomerOngoingTasksResponse,
  GetFilterTasksRequest,
  GetSingleTasksResponse,
  GetTaskByTextRequest,
  GetTasksRequest,
  GetTasksResponse,
  GetCustomerCompletedTasksResponse,
  GetAllCustomerTasksResponse,
  ServiceProviderReciepts,
  AcceptOfferData,
} from "@/types/services/tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Middleware } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { LIMIT_NINE } from "@/utils/constant";
import { GetAllTasksByServicesProviderResponse } from "@/types/services/serviceprovider";
import { Offer } from "@/types/chat";

const getRequest = <T>(url: string, params?: T) => {
  const paramsReducer = (acc: any, [key, value]: any) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  };
  const cleanedParams = Object.entries(params || {}).reduce(paramsReducer, {});

  const queryString = (_params: any) => {
    return Object.keys(_params)
      .map((key) => key + "=" + _params[key])
      .join("&");
  };

  return {
    url: !params
      ? url
      : url +
        `?${queryString({
          ...cleanedParams,
        })}`,
    method: "GET",
  };
};

const deleteRequest = (url: string) => ({
  url,
  method: "DELETE",
});

const patchRequest = (url: string, details: unknown) => ({
  url,
  method: "PATCH",
  body: details,
  formData: true, // Add this line
});

const postRequest = (url: string, details: unknown) => ({
  url,
  method: "POST",
  body: details,
});

const putRequest = (url: string, details: unknown) => ({
  url,
  method: "PUT",
  body: details,
});

export const task = createApi({
  reducerPath: "task",
  tagTypes: ["Task"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const session = await getSession();
      //@ts-ignore
      const token = session?.user?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);

        // Set Content-Type based on the request method
        if (endpoint.includes("updateTask")) {
          // Don't set Content-Type for multipart/form-data
          // The browser will set it automatically with the correct boundary
        } else {
          headers.set("Content-Type", "application/json-patch+json");
        }
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getActiveTasks: builder.query<GetTasksResponse, GetTasksRequest>({
      query: (credentials) =>
        getRequest(`/task/all-active-tasks/${credentials}`),
      providesTags: ["Task"],
    }),
    getTaskById: builder.query<GetSingleTasksResponse, number>({
      query: (id) => getRequest(`/task/get-task/${id}`),
      providesTags: ["Task"],
    }),
    filterTaskByEarliestDate: builder.query<GetTasksResponse, number>({
      query: (pageNumber) =>
        getRequest(`/task/task-date-earliest/${pageNumber}`),
      providesTags: ["Task"],
    }),
    filterTaskByLatestDate: builder.query<GetTasksResponse, number>({
      query: (pageNumber) => getRequest(`/task/task-date-latest/${pageNumber}`),
      providesTags: ["Task"],
    }),
    filterTaskByPriceAsc: builder.query<GetTasksResponse, number>({
      query: (pageNumber) => getRequest(`/task/task-price-asc/${pageNumber}`),
      providesTags: ["Task"],
    }),
    filterTaskByPriceDesc: builder.query<GetTasksResponse, number>({
      query: (pageNumber) => getRequest(`/task/task-price-desc/${pageNumber}`),
      providesTags: ["Task"],
    }),
    getAllTaskByCustomerId: builder.query<
      GetAllCustomerTasksResponse,
      { customerId: number; page: number }
    >({
      query: ({ customerId, page }) =>
        getRequest(
          `/task/all-tasks-by-customerId/${customerId}?page=${page}&size=${LIMIT_NINE}`,
        ),
      providesTags: ["Task"],
    }),
    getAllTaskByServiceProvider: builder.query<
      GetAllTasksByServicesProviderResponse,
      { serviceProviderId: number; page: number }
    >({
      query: ({ serviceProviderId, page }) =>
        getRequest(
          `/task/all-task-by-service-provider/${serviceProviderId}?page=${page}&size=${LIMIT_NINE}`,
        ),
      providesTags: ["Task"],
    }),

    getTaskByCustomerId: builder.query<
      GetCustomerTasksResponse,
      { customerId: number; page: number }
    >({
      query: ({ customerId, page }) =>
        getRequest(
          `/task/tasks-by-customerId/${customerId}?page=${page}&size=${LIMIT_NINE}`,
        ),
      providesTags: ["Task"],
    }),
    getCustomerOngoingTasks: builder.query<
      GetCustomerOngoingTasksResponse,
      { customerId: number; page: number }
    >({
      query: ({ customerId, page }) =>
        getRequest(
          `/task/customer-ongoing-tasks/${customerId}?page=${page}&size=${LIMIT_NINE}`,
        ),
      providesTags: ["Task"],
    }),
    getCustomerCompletedTasks: builder.query<
      GetCustomerCompletedTasksResponse,
      { customerId: number; page: number }
    >({
      query: ({ customerId, page }) =>
        getRequest(
          `/task/customer-completed-tasks/${customerId}?page=${page}&size=${LIMIT_NINE}`,
        ),
      providesTags: ["Task"],
    }),
    deleteJob: builder.mutation<void, number>({
      query: (id) => postRequest(`/booking/deleteCompletedJob/${id}`, {}),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => postRequest(`/task/${id}`, {}),
      invalidatesTags: ["Task"],
    }),
    searchTaskByText: builder.query<GetTasksResponse, GetTaskByTextRequest>({
      query: (credentials) =>
        getRequest(
          `/task/text/${credentials.pageNumber}?text=${credentials.text}`,
        ),
      providesTags: ["Task"],
    }),
    updateTask: builder.mutation<void, { id: number; details: FormData }>({
      query: (credentials) =>
        patchRequest(
          `/task/update-task/${credentials.id}`,
          credentials.details,
        ),
      invalidatesTags: ["Task"],
    }),
    filterTasks: builder.query<GetTasksResponse, GetFilterTasksRequest>({
      query: (credentials) =>
        getRequest(
          `/task/filter-tasks/${credentials.pageNumber}?category=${credentials.category}?typeOfService=${credentials.typeOfService}?location=${credentials.location}?minPrice=${credentials.minPrice}?maxPrice=${credentials.maxPrice}`,
        ),
      providesTags: ["Task"],
    }),
    getTasksOffers: builder.query<Offer[], number>({
      query: (id) => getRequest(`/chat/offer/${id}`),
      providesTags: ["Task"],
    }),
    assignTask: builder.mutation<
      void,
      { taskId: number; serviceProviderId: number }
    >({
      query: (credentials) =>
        putRequest(
          `/task/assign-task/${credentials.taskId}/${credentials.serviceProviderId}`,
          {},
        ),
      invalidatesTags: ["Task"],
    }),
    acceptOffer: builder.mutation<
      AcceptOfferData,
      { taskId: number; serviceProviderId: number }
    >({
      query: (credentials) =>
        putRequest(
          `/task/accept-offer/${credentials.taskId}/${credentials.serviceProviderId}`,
          {},
        ),
      invalidatesTags: ["Task"],
    }),
    getServiceProviderPaymentHistory: builder.query<
      ServiceProviderReciepts,
      { serviceProviderId: number }
    >({
      query: ({ serviceProviderId }) =>
        getRequest(
          `task/service-provider-payment-history/${serviceProviderId}?size=10`,
        ),
    }),
  }),
});

export const {
  useGetActiveTasksQuery,
  useGetTaskByIdQuery,
  useFilterTaskByEarliestDateQuery,
  useFilterTaskByLatestDateQuery,
  useFilterTaskByPriceAscQuery,
  useFilterTaskByPriceDescQuery,
  useGetTaskByCustomerIdQuery,
  useGetAllTaskByCustomerIdQuery,
  useGetCustomerOngoingTasksQuery,
  useGetCustomerCompletedTasksQuery,
  useDeleteTaskMutation,
  useDeleteJobMutation,
  useSearchTaskByTextQuery,
  useFilterTasksQuery,
  useUpdateTaskMutation,
  useGetTasksOffersQuery,
  useAssignTaskMutation,
  useGetAllTaskByServiceProviderQuery,
  useGetServiceProviderPaymentHistoryQuery,
  useAcceptOfferMutation,
} = task;
