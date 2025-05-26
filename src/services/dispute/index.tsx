import { ReviewRequest, ReviewResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const postRequest = (url: string, details: any) => ({
  url,
  method: "POST",
  body: details,
});

export const dispute = createApi({
  reducerPath: "dispute",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL + "/dispute",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      //@ts-ignore
      const token = session?.user?.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        // headers.set("Content-Type", "text/plain");
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    createDispute: builder.mutation<ReviewResponse, FormData>({
      query: (credentials) => postRequest("", credentials),
    }),
  }),
});

export const { useCreateDisputeMutation } = dispute;
