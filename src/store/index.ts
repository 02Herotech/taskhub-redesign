import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST } from "redux-persist";
import { PURGE, REGISTER } from "redux-persist";
//@ts-ignore
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
import { auth } from "../services/auth";
import { task } from "@/services/tasks";
import { booking } from "@/services/bookings";
import { blog } from "@/services/blog";
import marketReducer from "./Features/marketplace";
import userProfileReducer from "./Features/userProfile";
import chatReducer from "./Features/chat";
import exploreReducer from "./Features/explore";
import authStatusReducer from "./Features/authStatus";
import taskReducer from "./Features/taskDetails";
import crumbReducer from "./Features/breadcrumbs";
import { stripe } from "@/services/stripe";
import profileProgressReducer from "@/services/profile";
import { listing } from "@/services/listings";
import apiErrorMiddleware from "./apiMiddleware";
import { profile } from "@/services/user-profile";
import { user } from "@/services/user";
import { chat } from "@/services/chat";

const persistConfig = {
  key: "taskDetails",
  storage: createIndexedDBStorage("taskDetails"),
};

const persistedTaskReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    [user.reducerPath]: user.reducer,
    [chat.reducerPath]: chat.reducer,
    [task.reducerPath]: task.reducer,
    [booking.reducerPath]: booking.reducer,
    [blog.reducerPath]: blog.reducer,
    [listing.reducerPath]: listing.reducer,
    [stripe.reducerPath]: stripe.reducer,
    [profile.reducerPath]: profile.reducer,
    market: marketReducer,
    userProfile: userProfileReducer,
    explore: exploreReducer,
    profileProgress: profileProgressReducer,
    timeoutPopup: authStatusReducer,
    taskDetails: persistedTaskReducer,
    breadcrumbs: crumbReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      auth.middleware,
      user.middleware,
      chat.middleware,
      task.middleware,
      booking.middleware,
      blog.middleware,
      stripe.middleware,
      listing.middleware,
      profile.middleware,
      apiErrorMiddleware,
    ),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
