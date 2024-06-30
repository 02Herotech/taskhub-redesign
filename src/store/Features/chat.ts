"use client";

import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  contacts: ChatContactTypes[];
  totalUnreadMessages: number;
}

const initialState: InitialStateType = {
  contacts: [],
  totalUnreadMessages: 0,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      return { ...state, contacts: action.payload };
    },
    setTotalUnreadMessages: (state, action) => {
      return { ...state, totalUnreadMessages: action.payload };
    },
  },
});

export const { setContacts, setTotalUnreadMessages } = chatSlice.actions;

export default chatSlice.reducer;
