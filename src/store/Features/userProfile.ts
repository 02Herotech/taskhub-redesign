"use client";

import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  profile: UserProfileTypes | null;
  refresh: boolean;
  auth: { role: ["CUSTOMER" | "SERVICE_PROVIDER"]; token: string | null };
  authLoading: boolean;
}

const initialState: InitialStateType = {
  profile: null,
  refresh: false,
  auth: { role: ["CUSTOMER"], token: null },
  authLoading: false,
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
    setAuth: (state, action) => {
      return { ...state, setAuth: action.payload };
    },
    setAuthLoading: (state, action) => {
      return { ...state, authLoading: action.payload };
    },
  },
});

export const {
  updateUserProfile,
  refreshUserProfile,
  setAuth,
  setAuthLoading,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
