import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/services/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const postRequest = (url: string, details: unknown) => ({
  url,
  method: "POST",
  body: details,
});

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      //@ts-ignore
      const token = session?.user?.jwtToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Content-Type", "application/json-patch+json");
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    signin: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => postRequest("/auth/login", credentials),
    }),
    customerSignup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) => postRequest("customer/sign-up", credentials),
    }),
    serviceProviderSignup: builder.mutation<SignUpResponse, SignUpRequest>({
      query: (credentials) =>
        postRequest("service_provider/sign-up", credentials),
    }),
  }),
});

export const {
  useSigninMutation,
  useCustomerSignupMutation,
  useServiceProviderSignupMutation,
} = auth;
