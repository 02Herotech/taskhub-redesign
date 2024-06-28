"use client";

import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  profile: UserProfileTypes | null;
  refresh: boolean;
  userProfileAuth: {
    role: ["CUSTOMER" | "SERVICE_PROVIDER"] | null;
    token: string | null;
  };
  authLoading: boolean;
}

const initialState: InitialStateType = {
  profile: null,
  refresh: false,
  userProfileAuth: { role: ["CUSTOMER"], token: null },
  authLoading: true,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      const profile = action.payload;
      return { ...state, profile };
    },
    refreshUserProfile: (state) => {
      return { ...state, refresh: !state.refresh };
    },
    setUserProfileAuth: (state, action) => {
      return { ...state, userProfileAuth: action.payload };
    },
    setAuthLoading: (state, action) => {
      return { ...state, authLoading: action.payload };
    },
    removeUserProfile: (state) => {
      localStorage.removeItem("auth");
      return { ...initialState };
    },
  },
});

export const {
  updateUserProfile,
  refreshUserProfile,
  setUserProfileAuth,
  setAuthLoading,
  removeUserProfile,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
