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
  walletBalance: number | string | null;
  walletRefresh: boolean;
  walletLoading: boolean; // Set to true when the wallet balance is being fetched from the API
}

const initialState: InitialStateType = {
  profile: null,
  refresh: false,
  userProfileAuth: { role: ["CUSTOMER"], token: null },
  authLoading: true,
  walletBalance: null, // Fetch this from the API on login
  walletRefresh: false, // Set to true when the wallet balance is fetched from the API
  walletLoading: false,
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
    setWalletBalance: (state, action) => {
      return { ...state, walletBalance: action.payload };
    },
    setWalletLoading: (state, action) => {
      return { ...state, walletLoading: action.payload };
    },
    refreshWallet: (state) => {
      return { ...state, walletRefresh: !state.walletRefresh };
    },
  },
});

export const {
  updateUserProfile,
  refreshUserProfile,
  setUserProfileAuth,
  setAuthLoading,
  removeUserProfile,
  setWalletBalance,
  setWalletLoading,
  refreshWallet,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;
