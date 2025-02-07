import { createSlice } from "@reduxjs/toolkit";

// Add this state to user profile state
export const authStatusSlice = createSlice({
  name: "timeoutPopup",
  initialState: false,
  reducers: {
    setAuthStatus: (state, action) => action.payload,
  },
});

export const { setAuthStatus } = authStatusSlice.actions;

export default authStatusSlice.reducer;
