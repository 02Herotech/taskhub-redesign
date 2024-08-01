import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BlogPostsResponse } from "@/types/blog/post";

export const blog = createApi({
    reducerPath: "blog",
    tagTypes: ["Blog"],
    baseQuery: fetchBaseQuery({
        baseUrl: "https://cms.jacinthsolutions.com.au",
        credentials: "include", // This is important for cookies/authentication
        prepareHeaders: (headers) => {
            // You might need to add authentication headers here
            // headers.set('Authorization', `Bearer ${YOUR_TOKEN}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllPosts: builder.query<BlogPostsResponse, void>({
            query: () => "/api/posts",
            providesTags: ["Blog"],
        }),
    }),
});

export const { useGetAllPostsQuery } = blog;