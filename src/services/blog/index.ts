import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Author, BlogPost, BlogPostsResponse, CategoriesResponse } from "@/types/blog/post";

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
        getPostById: builder.query<BlogPost, string>({
            query: (id) => `/api/posts/${id}`,
            providesTags: ["Blog"],
        }),
        getUserById: builder.query<Author, string>({
            query: (id) => `/api/users/${id}`,
            providesTags: ["Blog"],
        }),
        getPostCategories: builder.query<CategoriesResponse, void>({
            query: () => "/api/postCategory",
        }),
    }),
});

export const {
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useGetUserByIdQuery,
    useGetPostCategoriesQuery,
} = blog;