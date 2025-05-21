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

type Wallet = {
  data: {
    balance: string;
    customerId: number;
  };
  message: string;
  successful: boolean;
};

export const wallet = createApi({
  reducerPath: "wallet",
  tagTypes: ["Wallet", "History"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/wallet/",
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
    getWalletBalance: builder.query<Wallet, void>({
      query: () => getRequest(`balance`),
      providesTags: ["Wallet"],
    }),
    getFundHistory: builder.query<DefaultUserDetailsType, void>({
      query: () => getRequest(`fund-history`),
      providesTags: ["Wallet", "History"],
    }),
    getPaymentHistory: builder.query<DefaultUserDetailsType, void>({
      query: () => getRequest(`pay-history`),
      providesTags: ["Wallet", "History"],
    }),
  }),
});

export const { useGetWalletBalanceQuery } = wallet;
