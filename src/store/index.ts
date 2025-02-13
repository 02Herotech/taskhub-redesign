import { configureStore } from "@reduxjs/toolkit";
import { auth } from "../services/auth";
import { task } from "@/services/tasks";
import { booking } from "@/services/bookings";
import { blog } from "@/services/blog";
import marketReducer from "./Features/marketplace";
import userProfileReducer from "./Features/userProfile";
import chatReducer from "./Features/chat";
import exploreReducer from "./Features/explore";
import authStatusReducer from "./Features/authStatus";
import { stripe } from "@/services/stripe";
import profileProgressReducer from "@/services/profile";
import { listing } from "@/services/listings";
import apiErrorMiddleware from "./apiMiddleware";

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [task.reducerPath]: task.reducer,
    [booking.reducerPath]: booking.reducer,
    [blog.reducerPath]: blog.reducer,
    [listing.reducerPath]: listing.reducer,
    [stripe.reducerPath]: stripe.reducer,
    market: marketReducer,
    userProfile: userProfileReducer,
    chat: chatReducer,
    explore: exploreReducer,
    profileProgress: profileProgressReducer,
    timeoutPopup: authStatusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      auth.middleware,
      task.middleware,
      booking.middleware,
      blog.middleware,
      stripe.middleware,
      listing.middleware,
      apiErrorMiddleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
