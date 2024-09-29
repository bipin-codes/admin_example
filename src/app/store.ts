import { combineReducers, configureStore } from '@reduxjs/toolkit';

import commentReducer from './slices/comments';
import authReducer from './slices/auth';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage as the storage engine
import { authAPI } from './slices/auth/api';
import { categoryAPI } from './slices/categories/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { blogsAPI } from './slices/blogs/api';

const rootReducer = combineReducers({
    comments: commentReducer,
    auth: authReducer,
    [blogsAPI.reducerPath]: blogsAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
});

// Persist configuration
const persistConfig = {
    key: 'root', // the key to use for the storage
    storage,
    blacklist: [authAPI.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: !import.meta.env.PROD,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            authAPI.middleware,
            categoryAPI.middleware,
            blogsAPI.middleware
        ),
});

setupListeners(store.dispatch);

const persistor = persistStore(store);

// Create a persisted reducer

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
