import { GetInvoiceByCustomerIdResponse, GetReceiptByCustomerIdResponse } from "@/types/services/invoice";
import {
  AcceptInvoiceResponse,
  PaymentIntentResponse,
  RejectInvoiceResponse,
  TaskDetails,
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

export const booking = createApi({
  reducerPath: "booking",
  tagTypes: ["Booking"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/booking",
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
    getInvoiceByCustomerId: builder.query<
      GetInvoiceByCustomerIdResponse,
      number
    >({
      query: (customerId) => getRequest(`/invoice/customer/${customerId}`),
      providesTags: ["Booking"],
    }),
    getReceiptsByCustomerId: builder.query<
      GetReceiptByCustomerIdResponse,
      number
    >({
      query: (customerId) => getRequest(`/all-receipts/${customerId}`),
      providesTags: ["Booking"],
    }),
    getJobById: builder.query<TaskDetails, number>({
      query: (jobId) => getRequest(`/job/${jobId}`),
      providesTags: ["Booking"],
    }),
    acceptService: builder.mutation<void, { jobId: number }>({
      query: ({ jobId }) => postRequest(`/accept-service?jobId=${jobId}`, {}),
      invalidatesTags: ["Booking"],
    }),
    inspectTask: builder.mutation<void, { jobId: number }>({
      query: ({ jobId }) => postRequest(`/inspect-task?jobId=${jobId}`, {}),
      invalidatesTags: ["Booking"],
    }),
    requestRevision: builder.mutation<
      void,
      { jobId: number; rejectionReason: string }
    >({
      query: ({ jobId, rejectionReason }) =>
        postRequest(`/revision-service`, { rejectionReason, jobId }),
      invalidatesTags: ["Booking"],
    }),
    generatePaymentIntent: builder.mutation<
      PaymentIntentResponse,
      { invoiceId: number }
    >({
      query: ({ invoiceId }) =>
        postRequest(`/payment-intent-stripe/${invoiceId}`, {}),
      invalidatesTags: ["Booking"],
    }),
    acceptInvoice: builder.mutation<
      AcceptInvoiceResponse,
      { invoiceId: number }
    >({
      query: ({ invoiceId }) =>
        postRequest(`/accept-invoice?invoiceId=${invoiceId}`, {}),
      invalidatesTags: ["Booking"],
    }),
    rejectInvoice: builder.mutation<
      RejectInvoiceResponse,
      { invoiceId: number }
    >({
      query: ({ invoiceId }) =>
        postRequest(`/reject-invoice?invoiceId=${invoiceId}`, {}),
      invalidatesTags: ["Booking"],
    }),
    rebookJob: builder.mutation<
      void,
      {
        jobId: number;
        date: string;
        time: string;
        description: string;
        amount: number;
      }
    >({
      query: ({ jobId, date, time, description, amount }) =>
        postRequest(`/re-booking/${jobId}`, {
          date,
          time,
          description,
          amount,
        }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
    useGetInvoiceByCustomerIdQuery,
    useGetReceiptsByCustomerIdQuery,
    useGetJobByIdQuery,
    useAcceptServiceMutation,
    useInspectTaskMutation,
    useRequestRevisionMutation,
    useGeneratePaymentIntentMutation,
    useAcceptInvoiceMutation,
    useRejectInvoiceMutation,
    useRebookJobMutation,
} = booking;
