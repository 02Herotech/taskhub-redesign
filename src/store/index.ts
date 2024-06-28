import { configureStore } from "@reduxjs/toolkit";
import { auth } from "../services/auth";
import { task } from "@/services/tasks";
import marketReducer from "./Features/marketplace";
import userProfileReducer from "./Features/userProfile";
import chatReducer from "./Features/chat";
import { booking } from "@/services/bookings";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [task.reducerPath]: task.reducer,
    [booking.reducerPath]: booking.reducer,
    market: marketReducer,
    userProfile: userProfileReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      task.middleware,
      booking.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
