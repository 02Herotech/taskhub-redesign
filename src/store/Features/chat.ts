"use client";

import { countNewMessages, getUsers } from "@/utils/message";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

interface LoadContactsArgs {
  token: string;
  userId: number;
}

// Define the async thunk for loadContacts
export const loadContacts = createAsyncThunk<
  ChatContactTypes[], // Return type
  LoadContactsArgs, // Argument type
  { state: RootState } // ThunkAPI type
>("chat/loadContacts", async ({ token, userId }, { dispatch }) => {
  if (!token || !userId) return [];

  try {
    const users = await getUsers({ token: token });
    const contacts = await Promise.all(
      users.map(async (contact: any) => {
        const count = await countNewMessages({
          recipientId: contact.id,
          senderId: userId,
          token: token,
        });
        return { ...contact, newMessages: count };
      }),
    );
    const allUnreadMessages = contacts.reduce(
      (accumulator, contact) => accumulator + contact.newMessages,
      0,
    );
    dispatch(setTotalUnreadMessages(allUnreadMessages));
    return contacts;
  } catch (error: any) {
    console.error(error.response.data || error.message || error);
    throw error;
  }
});

// Define the async thunk for sendMessage
interface SendMessageArgs {
  msg: string;
  chatPartnerId: number;
  user: UserProfileTypes;
}

export const sendMessage = createAsyncThunk<
  void, // Return type
  SendMessageArgs, // Argument type
  { state: RootState } // ThunkAPI type
>("chat/sendMessage", async ({ msg, chatPartnerId, user }, { getState }) => {
  const state = getState() as RootState;
  const { stompClient } = state.chat;

  if (msg.trim() !== "" && user) {
    const message = {
      senderId: user.id,
      recipientId: chatPartnerId,
      senderName: `${user.firstName} ${user.lastName}`,
      recipientName: "Anthony", // This can be dynamic based on your logic
      content: msg,
      timestamp: new Date().toISOString(),
    };
    try {
      stompClient.send("/app/chat", {}, JSON.stringify(message));
    } catch (error: any) {
      console.log(error.response.data || error.message || error);
      throw error;
    }
  }
});

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
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(
    //       loadContacts.fulfilled,
    //       (state, action: PayloadAction<ChatContactTypes[]>) => {
    //         state.contacts = action.payload;
    //       },
    //     )
    //     .addCase(loadContacts.rejected, (state, action) => {
    //       // Handle any errors here if needed
    //     })
    //     .addCase(sendMessage.rejected, (state, action) => {
    //       // Handle any errors here if needed
    //     });
    // },
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

export default chatSlice.reducer;
