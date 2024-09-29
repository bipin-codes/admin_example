import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from 'app/store';

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_PATH_DEV,
    prepareHeaders(headers, { getState }) {
        headers.set(
            'Authorization',
            `Bearer ${(getState() as RootState).auth.userToken}`
        );
        return headers;
    },
});
