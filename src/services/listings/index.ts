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
    url: !params ? url : url + `?${queryString({ ...cleanedParams })}`,
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

type FilterServiceParams = {
  pageNumber?: number;
  size?: number;
  category?: string;
  location?: string;
  typeOfService?: string;
  minPrice?: string;
  maxPrice?: string;
};

type AllServiceParams = Pick<FilterServiceParams, "pageNumber" | "size">;

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
    }),
    getAllServices: builder.query<ServicesResult, AllServiceParams>({
      query: (params) => getRequest("/listing/all-active-listings", params),
    }),
    getServicesByFilters: builder.query<ServicesResult, FilterServiceParams>({
      query: (params) => {
        return getRequest(`/listing/filter-listings`, params);
      },
    }),
    getCategories: builder.query<CategoryType[], void>({
      query: () => getRequest("/util/all-categories"),
    }),
    getListingsBySearch: builder.query<ServicesResult, string>({
      query: (text) => getRequest(`/listing/text/0?text=${text}`),
    }),
  }),
});

export const {
  useGetServiceByIdQuery,
  useGetCategoriesQuery,
  useGetAllServicesQuery,
  useGetServicesByFiltersQuery,
  useGetListingsBySearchQuery
} = listing;
