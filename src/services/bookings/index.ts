import {
  CustomerReciepts,
  GetInvoiceByCustomerIdResponse,
  GetReceiptByCustomerIdResponse,
} from "@/types/services/invoice";
import {
  Booking,
  GetServiceProviderOngoingJobsResponse,
  GetServiceProviderPendingJobsResponse,
} from "@/types/services/jobs";
import { GetServiceProviderCompletedJobsResponse } from "@/types/services/serviceprovider";
import {
  AcceptInvoiceResponse,
  BookingRequestResponse,
  GetJobsByIdResponse,
  PaymentIntentResponse,
  RejectInvoiceResponse,
} from "@/types/services/tasks";
import { LIMIT_NINE } from "@/utils/constant";

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
    getServiceProviderJobs: builder.query<
      GetServiceProviderOngoingJobsResponse,
      { serviceProviderId: number; page: number }
    >({
      query: ({ serviceProviderId, page }) =>
        getRequest(
          `/job/service-provider/${serviceProviderId}?pageSize=${LIMIT_NINE}&page=${page}`,
        ),
      providesTags: ["Booking"],
    }),
    getAllServiceProviderAcceptedJobs: builder.query<
      GetServiceProviderPendingJobsResponse,
      void
    >({
      query: () => getRequest(`/service-provider`),
      providesTags: ["Booking"],
    }),
    getServiceProviderOngoingJobs: builder.query<
      GetServiceProviderOngoingJobsResponse,
      { page: number; providerId: number }
    >({
      query: ({ page, providerId }) =>
        getRequest(
          `/service-provider-ongoing-service/${providerId}?size=${LIMIT_NINE}&page=${page}`,
        ),
      providesTags: ["Booking"],
    }),
    getServiceProviderCompletedJobs: builder.query<
      GetServiceProviderCompletedJobsResponse,
      { page: number; providerId: number }
    >({
      query: ({ page, providerId }) =>
        getRequest(
          `/service-provider-completed-service/${providerId}?size=${LIMIT_NINE}&page=${page}`,
        ),
      providesTags: ["Booking"],
    }),
    getBookingDetails: builder.query<Booking, { booking_id: string }>({
      query: ({ booking_id }) => getRequest(`/${booking_id}`),
      providesTags: ["Booking"],
    }),
    getReceiptsByCustomerId: builder.query<
      GetReceiptByCustomerIdResponse,
      number
    >({
      query: (customerId) => getRequest(`/all-receipts/${customerId}`),
      providesTags: ["Booking"],
    }),
    getCustomerReceipts: builder.query<
      CustomerReciepts,
      { customerId: number; size: number }
    >({
      query: ({ customerId, size }) =>
        getRequest(`/all-receipts/${customerId}?size=${size}`),
      providesTags: ["Booking"],
    }),
    getJobById: builder.query<GetJobsByIdResponse, string>({
      query: (jobId) => getRequest(`/job/${jobId}`),
      providesTags: ["Booking"],
    }),
    getServiceProviderAssignedJobs: builder.query<
      GetServiceProviderOngoingJobsResponse,
      { serviceProviderId: number; page: number }
    >({
      query: ({ serviceProviderId, page }) =>
        getRequest(
          `/service-provider/assigned-to/${serviceProviderId}?page=${page}&size=${LIMIT_NINE}`,
        ),
      providesTags: ["Booking"],
    }),
    acceptService: builder.mutation<void, { jobId: number }>({
      query: ({ jobId }) => postRequest(`/accept-service?jobId=${jobId}`, {}),
      invalidatesTags: ["Booking"],
    }),
    startTask: builder.mutation<void, { jobId: string }>({
      query: ({ jobId }) => postRequest(`/start-task?jobId=${jobId}`, {}),
      invalidatesTags: ["Booking"],
    }),
    completeTask: builder.mutation<void, { jobId: string }>({
      query: ({ jobId }) => postRequest(`/complete-task?jobId=${jobId}`, {}),
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
    getBookingRequest: builder.query<
      BookingRequestResponse,
      { page: number; customerId: number }
    >({
      query: ({ page, customerId }) =>
        getRequest(`/customer/${customerId}?page=${page}&size=${LIMIT_NINE}`),
      providesTags: ["Booking"],
    }),
    getServiceProviderBookingRequest: builder.query<
      BookingRequestResponse,
      { page: number; providerId: number }
    >({
      query: ({ page, providerId }) =>
        getRequest(
          `/service-provider/booked-listing/${providerId}?page=${page}&size=${LIMIT_NINE}`,
        ),
      providesTags: ["Booking"],
    }),
    getServiceProviderBookingRequestDetails: builder.query<
      Booking,
      { bookingId: string }
    >({
      query: ({ bookingId }) => getRequest(`/${bookingId}`),
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetCustomerReceiptsQuery,
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
  useGetBookingRequestQuery,
  useGetServiceProviderJobsQuery,
  useGetAllServiceProviderAcceptedJobsQuery,
  useGetBookingDetailsQuery,
  useStartTaskMutation,
  useCompleteTaskMutation,
  useGetServiceProviderCompletedJobsQuery,
  useGetServiceProviderOngoingJobsQuery,
  useGetServiceProviderBookingRequestQuery,
  useGetServiceProviderBookingRequestDetailsQuery,
  useGetServiceProviderAssignedJobsQuery,
} = booking;
