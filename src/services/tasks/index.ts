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
} from "@/types/services/tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Middleware } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";

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
    getAllTaskByCustomerId: builder.query<GetAllCustomerTasksResponse, number>({
      query: (customerId) =>
        getRequest(`/task/all-tasks-by-customerId/${customerId}`),
      providesTags: ["Task"],
    }),
    getTaskByCustomerId: builder.query<GetCustomerTasksResponse, number>({
      query: (customerId) =>
        getRequest(`/task/tasks-by-customerId/${customerId}`),
      providesTags: ["Task"],
    }),
    getCustomerOngoingTasks: builder.query<
      GetCustomerOngoingTasksResponse,
      number
    >({
      query: (customerId) =>
        getRequest(`/task/customer-ongoing-tasks/${customerId}`),
      providesTags: ["Task"],
    }),
    getCustomerCompletedTasks: builder.query<
      GetCustomerCompletedTasksResponse,
      number
    >({
      query: (customerId) =>
        getRequest(`/task/customer-completed-tasks/${customerId}`),
      providesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => postRequest(`/booking/deleteCompletedJob/${id}`, {}),
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
  useSearchTaskByTextQuery,
  useFilterTasksQuery,
  useUpdateTaskMutation,
  useGetTasksOffersQuery,
  useAssignTaskMutation,
} = task;
