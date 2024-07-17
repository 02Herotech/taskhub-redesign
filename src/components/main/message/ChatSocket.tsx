// ChatSocket.tsx
"use client";

import { RootState } from "@/store";
import {
  setContacts,
  setNewMessage,
  setTotalUnreadMessages,
} from "@/store/Features/chat";
import { countNewMessages, getUsers } from "@/utils/message";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { connectSocket, disconnectSocket } from "@/lib/socket";

interface Contact {
  id: number;
  newMessages?: number;
}

const ChatSocket: React.FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { profile: user, userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const loadContacts = useCallback(async () => {
    if (!auth.token || !user) return;
    try {
      const users = await getUsers({ token: auth.token as string });
      const contacts = await Promise.all(
        users.map(async (contact: Contact) => {
          const count = await countNewMessages({
            recipientId: user.id,
            senderId: contact.id,
            token: auth.token as string,
          });
          return { ...contact, newMessages: count };
        }),
      );
      const allUnreadMessages = contacts.reduce(
        (accumulator, contact) => accumulator + (contact.newMessages || 0),
        0,
      );
      dispatch(setTotalUnreadMessages(allUnreadMessages));
      dispatch(setContacts(contacts));
    } catch (error: any) {
      console.error(error.response?.data || error.message || error);
    }
  }, [auth.token, user, dispatch]);

  const onMessageReceived = useCallback(
    (msg: any) => {
      console.log("messageReceived");
      const parsedMessage = JSON.parse(msg.body);
      console.log("received message: ", parsedMessage);
      dispatch(setNewMessage(parsedMessage));
      loadContacts();
    },
    [dispatch, loadContacts],
  );

  useEffect(() => {
    if (!user) return;
    loadContacts();
    const socket = connectSocket(user.id);
    socket.on("connect", () => console.log("Connected"));
    socket.on("connected", (message: any) => {
      console.log("connected to socket", message);
      socket.on("queue/messages", onMessageReceived);
    });

    return () => {
      socket.off("connect");
      socket.off("queue/messages", onMessageReceived);
      disconnectSocket();
    };
    // eslint-disable-next-line
  }, [user, onMessageReceived]);

  return <div className="hidden" />;
};

export default ChatSocket;
