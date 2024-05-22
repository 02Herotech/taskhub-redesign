import { configureStore } from "@reduxjs/toolkit";
import { auth } from "../services/auth";
import { task } from "@/services/tasks";
import marketReducer from "./Features/marketplace";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [task.reducerPath]: task.reducer,
    market: marketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware, task.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
