import { createApi } from '@reduxjs/toolkit/query/react';
import { ICategory } from './types';
import { toast } from 'react-toastify';
import { baseQuery } from '../baseQuery';

export interface Response<T> {
    msg: string;
    body: { data: T[]; key?: string };
}

export const categoryAPI = createApi({
    reducerPath: 'categories',
    baseQuery: baseQuery,
    tagTypes: ['category'],
    endpoints: (builder) => {
        return {
            getCategories: builder.query<Response<ICategory>, void>({
                providesTags: ['category'],
                query: () => ({ method: 'GET', url: 'categories' }),
            }),
            createCategory: builder.mutation<Response<ICategory>, ICategory>({
                invalidatesTags: ['category'],
                query: (category) => ({
                    method: 'POST',
                    url: 'categories',
                    body: category,
                }),
                async onQueryStarted(_, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Category created successfully...');
                    } catch (error) {
                        console.log(error);
                        toast.error("Couldn't create the category...");
                    }
                },
            }),
            deleteCategory: builder.mutation<Response<ICategory>, ICategory>({
                invalidatesTags: ['category'],
                query: (category) => ({
                    method: 'DELETE',
                    url: `categories/${category.id}`,
                    body: category,
                }),
                async onQueryStarted(_, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Category deleted successfully...');
                    } catch (error) {
                        console.log(error);
                        toast.error("Couldn't delete the category...");
                    }
                },
            }),
            updateCategory: builder.mutation<Response<ICategory>, ICategory>({
                invalidatesTags: ['category'],
                query: (category) => ({
                    method: 'PUT',
                    url: `categories`,
                    body: category,
                }),
                async onQueryStarted(_, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('Category updated successfully...');
                    } catch (error) {
                        console.log(error);
                        toast.error("Couldn't update the category...");
                    }
                },
            }),
        };
    },
});

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} = categoryAPI;
