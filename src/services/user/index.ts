import { ReviewRequest, ReviewResponse } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const postRequest = (url: string, details: ReviewRequest) => ({
  url,
  method: "POST",
  body: details,
});

export const user = createApi({
  reducerPath: "user",
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
    postReview: builder.mutation<ReviewResponse, ReviewRequest>({
      query: (credentials) => postRequest("/user/reviews", credentials),
    }),
  }),
});

export const { usePostReviewMutation } = user;
