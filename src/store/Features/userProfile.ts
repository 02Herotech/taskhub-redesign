"use client";

import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  profile: UserProfileTypes | null;
  refresh: boolean;
}

const initialState: InitialStateType = {
  profile: null,
  refresh: false,
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
  },
});

export const { updateUserProfile, refreshUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
