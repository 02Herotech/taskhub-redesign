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

type WalletResponse = {
  data: {
    balance: string;
    customerId: number;
    signUpBonus: string;
    signUpBonusExpiryDate: string;
    rewardPoints: string;
  };
  message: string;
  successful: boolean;
};

type Funding = {
  customerId: number;
  transactionId: string;
  externalPaymentId: string;
  paymentProvider: "STRIPE";
  createdAt: number[];
  updatedAt: number[];
  amount: number;
  fee: number;
  total: number;
  description: string;
  status: "SUCCESSFUL" | "PENDING";
  transactionType: "FUNDING";
};

type FundingResponse = {
  data: {
    transactions: Funding[];
    totalOutgoingAmount: number;
    totalPages: number;
    totalElements: number;
    hasPrevious: boolean;
    hasNext: boolean;
    hasContent: boolean;
    numberOfElement: number;
    size: number;
    pageIndex: number;
    last: boolean;
    first: boolean;
  };
  message: string;
  successful: boolean;
};

type Params = {
  size: number;
  pageIndex: number;
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
    getWalletBalance: builder.query<WalletResponse, void>({
      query: () => getRequest(`balance`),
      providesTags: ["Wallet"],
    }),
    getFundHistory: builder.query<FundingResponse, Params>({
      query: (params) => getRequest(`fund-history`, params),
      providesTags: ["Wallet", "History"],
    }),
    getPaymentHistory: builder.query<{}, Params>({
      query: () => getRequest(`pay-history`),
      providesTags: ["Wallet", "History"],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useGetFundHistoryQuery,
  useGetPaymentHistoryQuery,
} = wallet;
