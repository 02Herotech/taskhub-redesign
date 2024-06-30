"use client";

import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  contacts: ChatContactTypes[];
  totalUnreadMessages: number;
  newMessage: any;
  stompClient: any;
}

const initialState: InitialStateType = {
  contacts: [],
  totalUnreadMessages: 0,
  newMessage: null,
  stompClient: null,
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
    setNewMessage: (state, action) => {
      return { ...state, newMessage: action.payload };
    },
    updateStompClient: (state, action) => {
      return { ...state, stompClient: action.payload };
    },
  },
});

export const {
  setContacts,
  setTotalUnreadMessages,
  setNewMessage,
  updateStompClient,
} = chatSlice.actions;

export default chatSlice.reducer;
