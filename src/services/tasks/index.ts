import { GetTasksRequest, GetTasksResponse } from "@/types/services/tasks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const getRequest = <T,>(url: string, params?: T) => {
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

const putRequest = (url: string, details: unknown) => ({
    url,
    method: "PUT",
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
            // const token = session?.accessToken;

            // if (token) {
            headers.set("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJjbGFpbSI6eyJhdXRob3JpdHkiOiJTRVJWSUNFX1BST1ZJREVSIn0sInN1YiI6IjMwQG1haWxkcm9wLmNjIiwiaWF0IjoxNzE1NzU0MDMyLCJleHAiOjE3MTU3NjQ4MzJ9.Xy9uq6lGcquIg9u6S8kJELyhT7_QoKHOT4qqzQB1lJ0`);
            // }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getActiveTasks: builder.query<GetTasksResponse, GetTasksRequest>({
            query: (credentials) => getRequest(`/all-active-tasks/${credentials}`),
            providesTags: ["Task"],
        }),
    }),
});

export const { useGetActiveTasksQuery } = task;
