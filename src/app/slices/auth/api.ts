import {
    BaseQueryExtraOptions,
    BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    BaseQueryApi,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { RootState } from 'app/store';
import { logout } from '.';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_PATH_DEV,
    prepareHeaders(headers, { getState }) {
        headers.set(
            'Authorization',
            `Bearer ${(getState() as RootState).auth.userToken}`
        );
        return headers;
    },
});

const baseQueryWithReAuth = async (
    args: FetchArgs,
    api: BaseQueryApi,
    extraOptions: BaseQueryExtraOptions<BaseQueryFn>
) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) api.dispatch(logout());
    return result;
};

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['auth'],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => {
        return {
            validateToken: builder.query<undefined, void>({
                query: () => {
                    return { method: 'POST', url: '' };
                },
            }),
        };
    },
});

export const { useValidateTokenQuery } = authAPI;
export default authAPI;
