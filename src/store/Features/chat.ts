"use client";

import { createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  activeChatPatnerId: number;
  contacts: any[];
  messages: any[];
}

const initialState: InitialStateType = {
  activeChatPatnerId: 0,
  contacts: [],
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      return { ...state, contacts: action.payload };
    },
    setActiveChatPatnerId: (state, action) => {
      return { ...state, activeChatPatnerId: action.payload };
    },
    setMessages: (state, action) => {
      return { ...state, messages: action.payload };
    },
  },
});

export const { setContacts, setActiveChatPatnerId, setMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
