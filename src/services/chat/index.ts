import {
  BookingRequest,
  GetServiceProvidersOfferResponse,
  Offer,
} from "@/types/chat";
import { ReviewRequest, ReviewResponse } from "@/types/user";
import { LIMIT_NINE } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const postRequest = (url: string, details: ReviewRequest) => ({
  url,
  method: "POST",
  body: details,
});

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

export const chat = createApi({
  reducerPath: "chat",
  tagTypes: ["Chat"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/chat",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      //@ts-ignore
      const token = session?.user?.accessToken;
      console.log(session, "token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json");
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getServiceProvidersOffer: builder.query<
      GetServiceProvidersOfferResponse,
      { page: number; providerId: number }
    >({
      query: ({ page, providerId }) =>
        getRequest(
          `/all-my-chat-tasks/${providerId}?size=${LIMIT_NINE}&page=${page}`,
        ),
      providesTags: ["Chat"],
    }),
    getServiceProviderOfferChats: builder.query<
      Offer[],
      { taskId: string; serviceProviderId: number }
    >({
      query: ({ taskId, serviceProviderId }) =>
        getRequest(`/specific-tasks-chat/${taskId}/${serviceProviderId}`),
      providesTags: ["Chat"],
    }),
    getServiceProviderBookingsChats: builder.query<
      BookingRequest[],
      { listingId: string; customerId: number }
    >({
      query: ({ listingId, customerId }) =>
        getRequest(`/specific-booking-chat/${listingId}/${customerId}`),
      providesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetServiceProvidersOfferQuery,
  useGetServiceProviderOfferChatsQuery,
  useGetServiceProviderBookingsChatsQuery,
} = chat;
