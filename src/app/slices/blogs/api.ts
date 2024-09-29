import { createApi } from '@reduxjs/toolkit/query/react';
import { Response } from '../categories/api';
import { IBlog } from './types';
import { toast } from 'react-toastify';
import { baseQuery } from '../baseQuery';

export const blogsAPI = createApi({
    reducerPath: 'blogsAPI',
    baseQuery: baseQuery,
    tagTypes: ['blogs'],
    endpoints: (builder) => ({
        getBlogs: builder.query<
            Response<IBlog>,
            { id?: string; limit?: number }
        >({
            providesTags: ['blogs'],
            // id is last returned result id, useful for pagination
            query: ({ id, limit }) => {
                let url = `blogs?`;
                if (id) url += `id=${encodeURIComponent(JSON.stringify(id))}&`;
                if (limit) url += `limit=${limit}&`;
                return {
                    method: 'GET',
                    url,
                };
            },
        }),

        createBlog: builder.mutation<Response<IBlog>, Partial<IBlog>>({
            invalidatesTags: ['blogs'],
            query: (blog) => ({
                method: 'POST',
                url: `blogs`,
                body: blog,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Blog created successfully...');
                } catch (error) {
                    toast.error("Couldn't create the blog...");
                }
            },
        }),
        deleteBlog: builder.mutation<Response<IBlog>, IBlog>({
            invalidatesTags: ['blogs'],
            query: (blog) => ({
                method: 'DELETE',
                url: `blogs/${blog.id}`,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Blog deleted successfully...');
                } catch (error) {
                    toast.error("Couldn't delete blog...");
                }
            },
        }),

        updateBlog: builder.mutation<Response<IBlog>, IBlog>({
            invalidatesTags: ['blogs'],
            query: (blog) => ({
                method: 'PUT',
                url: `blogs`,
                body: blog,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Blog updated successfully...');
                } catch (error) {
                    toast.error("Couldn't update the blog...");
                }
            },
        }),

        createPresignUrls: builder.mutation<
            {
                presignedURLs: Array<string>;
                urls: Array<string>;
            },
            { images: Array<{ index: string; type: string }> }
        >({
            query: ({ images }) => ({
                method: 'POST',
                url: 'blogs/signed_urls',
                body: { images },
            }),
        }),
    }),
});

export const { select } = blogsAPI.endpoints.getBlogs;

export const {
    useGetBlogsQuery,
    useCreateBlogMutation,
    useDeleteBlogMutation,
    useUpdateBlogMutation,
    useCreatePresignUrlsMutation,
} = blogsAPI;
