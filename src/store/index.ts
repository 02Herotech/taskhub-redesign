import { configureStore } from "@reduxjs/toolkit";
import { auth } from "../services/auth";
import { task } from "@/services/tasks";
import marketReducer from "./Features/marketplace";
import { invoice } from "@/services/invoices";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [task.reducerPath]: task.reducer,
    [invoice.reducerPath]: invoice.reducer,
    market: marketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware, task.middleware, invoice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
