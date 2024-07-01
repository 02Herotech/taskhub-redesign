"use client";

import { countNewMessages, getUsers } from "@/utils/message";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

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

interface LoadContactsArgs {
  token: string;
  userId: number;
}
// Define the async thunk with parameters
// export const loadContacts = createAsyncThunk<
//   ChatContactTypes[], // Return type
//   LoadContactsArgs, // Argument type
//   { state: RootState } // ThunkAPI type
// >("chat/loadContacts", async ({ token, userId }, { dispatch }) => {
//   if (!token || !userId) return [];

//   try {
//     const users = await getUsers({ token: token });
//     const contacts = await Promise.all(
//       users.map(async (contact: any) => {
//         const count = await countNewMessages({
//           recipientId: contact.id,
//           senderId: userId,
//           token: token,
//         });
//         return { ...contact, newMessages: count };
//       }),
//     );
//     const allUnreadMessages = contacts.reduce(
//       (accumulator, contact) => accumulator + contact.newMessages,
//       0,
//     );
//     dispatch(setTotalUnreadMessages(allUnreadMessages));
//     return contacts;
//   } catch (error: any) {
//     console.error(error.response.data || error.message || error);
//     throw error;
//   }
// });

export default chatSlice.reducer;
