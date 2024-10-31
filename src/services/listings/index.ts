import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const listing = createApi({
  reducerPath: "listing",
  tagTypes: ["Listing"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getServiceById: builder.query<ListingDataType, number>({
      query: (serviceId) => getRequest(`/listing/${serviceId}`),
      providesTags: ["Listing"],
    })
  }),
});

export const {
  useGetServiceByIdQuery
} = listing;
