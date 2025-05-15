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

export const profile = createApi({
  reducerPath: "profile",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      //@ts-ignore
      const token = session?.user?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCustomerProfile: builder.query<any, void>({
      query: () => getRequest(`/customer/profile`),
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetCustomerProfileQuery } = profile;
