import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { toast } from 'react-toastify';

import { IAuth } from './types';

const initialState: IAuth = {
    userToken: '',
};

export const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        login: (state, action: PayloadAction<IAuth>) => {
            state.userToken = action.payload.userToken;
            toast.success('Logged in successfully!');
        },
        logout: (state) => {
            state.userToken = '';
            toast.warn('Token expired!');
        },
    },
});

export const { login, logout } = authSlice.actions;

export const accessToken = (state: RootState) => state.auth.userToken;

export default authSlice.reducer;
