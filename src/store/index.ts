import { configureStore } from '@reduxjs/toolkit';
import { auth } from '@/services/auth';
import type { Action, ThunkAction } from "@reduxjs/toolkit";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [auth.reducerPath]: auth.reducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                auth.middleware,
            ),
    });
};

export type RootState = ReturnType<typeof makeStore>;
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;