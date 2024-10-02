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

export const stripe = createApi({
    reducerPath: "stripe",
    tagTypes: ["Stripe"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL + "/stripe",
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
        getServiceProviderPaymentHistory: builder.query<GetServiceProviderPaymentHistoryResponse, {}>({
            query: () => getRequest(`/payment-history`),
            providesTags: ["Stripe"],
        }),
    }),
});

export const {
    useGetServiceProviderPaymentHistoryQuery,
} = stripe;
