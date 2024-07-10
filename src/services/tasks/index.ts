import {
  GetCustomerTasksResponse,
  GetFilterTaskByCategoryRequest,
  GetFilterTaskByPriceRequest,
  GetFilterTaskByTypeRequest,
  GetSingleTasksResponse,
  GetTaskByTextRequest,
  GetTasksRequest,
  GetTasksResponse,
} from "@/types/services/tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
});

const postRequest = (url: string, details: unknown) => ({
  url,
  method: "POST",
  body: details,
});

export const task = createApi({
  reducerPath: "task",
  tagTypes: ["Task"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/task",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      //@ts-ignore
      const token = session?.user?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json-patch+json");
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getActiveTasks: builder.query<GetTasksResponse, GetTasksRequest>({
      query: (credentials) => getRequest(`/all-active-tasks/${credentials}`),
      providesTags: ["Task"],
    }),
    getTaskById: builder.query<GetSingleTasksResponse, number>({
      query: (id) => getRequest(`/get-task/${id}`),
      providesTags: ["Task"],
    }),
    filterTaskByPrice: builder.query<
      GetTasksResponse,
      GetFilterTaskByPriceRequest
    >({
      query: (credentials) =>
        getRequest(
          `/filter-by-price/${credentials.page}?minPrice=${credentials.minPrice}&maxPrice=${credentials.maxPrice}`,
        ),
      providesTags: ["Task"],
    }),
    filterTaskByType: builder.query<
      GetTasksResponse,
      GetFilterTaskByTypeRequest
    >({
      query: (credentials) =>
        getRequest(
          `/search-by-type/${credentials.page}?type=${credentials.type}`,
        ),
      providesTags: ["Task"],
    }),
    filterTaskByEarliestDate: builder.query<GetTasksResponse, number>({
      query: (pageNumber) => getRequest(`/task-date-earliest/${pageNumber}`),
      providesTags: ["Task"],
    }),
    filterTaskByLatestDate: builder.query<GetTasksResponse, number>({
      query: (pageNumber) => getRequest(`/task-date-latest/${pageNumber}`),
      providesTags: ["Task"],
    }),
    filterTaskByPriceAsc: builder.query<GetTasksResponse, number>({
      query: (pageNumber) => getRequest(`/task-price-asc/${pageNumber}`),
      providesTags: ["Task"],
    }),
    filterTaskByPriceDesc: builder.query<GetTasksResponse, number>({
      query: (pageNumber) => getRequest(`/task-price-desc/${pageNumber}`),
      providesTags: ["Task"],
    }),
    filterTaskByCategoryId: builder.query<GetTasksResponse, GetFilterTaskByCategoryRequest>({
      query: (credentials) => getRequest(`/filter-by-category/${credentials.categoryId}?pageNumber=${credentials.categoryId}`),
    }),
    getTaskByCustomerId: builder.query<GetCustomerTasksResponse, number>({
      query: (customerId) => getRequest(`/tasks-by-customerId/${customerId}`),
      providesTags: ["Task"],
    }),
    getCustomerOngoingTasks: builder.query<GetCustomerTasksResponse, number>({
      query: (customerId) => getRequest(`/customer-ongoing-tasks/${customerId}`),
      providesTags: ["Task"],
    }),
    getCustomerCompletedTasks: builder.query<GetCustomerTasksResponse, number>({
      query: (customerId) => getRequest(`/customer-completed-tasks/${customerId}`),
      providesTags: ["Task"],
    }),
    deleteTask: builder.mutation<void, number>({
      query: (id) => postRequest(`/delete-task/${id}`,{}),
      invalidatesTags: ["Task"],
    }),
    searchTaskByText: builder.query<GetTasksResponse, GetTaskByTextRequest>({
      query: (credentials) => getRequest(`/text/${credentials.pageNumber}?text=${credentials.text}`),
      providesTags: ["Task"],
    }),
    updateTask: builder.mutation<void, { id: number; details: unknown }>({
      query: (credentials) => patchRequest(`/update-task/${credentials.id}`, credentials.details),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetActiveTasksQuery,
  useGetTaskByIdQuery,
  useFilterTaskByPriceQuery,
  useFilterTaskByTypeQuery,
  useFilterTaskByEarliestDateQuery,
  useFilterTaskByLatestDateQuery,
  useFilterTaskByPriceAscQuery,
  useFilterTaskByPriceDescQuery,
  useGetTaskByCustomerIdQuery,
  useGetCustomerOngoingTasksQuery,
  useGetCustomerCompletedTasksQuery,
  useDeleteTaskMutation,
  useSearchTaskByTextQuery,
  useFilterTaskByCategoryIdQuery
} = task;
