"use client";

import { RootState } from "@/store";
import {
  setContacts,
  setNewMessage,
  setTotalUnreadMessages,
} from "@/store/Features/chat";
import { countNewMessages, getUsers } from "@/utils/message";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stompClient } from "@/lib/stompClient";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

// @ts-ignore
import io from "socket.io-client";

// import useSocket from "@/hooks/useSocket";

interface Message {
  body: string;
}

interface Contact {
  id: number;
  newMessages?: number;
}

const ChatSocket: React.FC = () => {
  const dispatch: Dispatch<AnyAction> = useDispatch();
  const { profile: user, userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const socket = io("https://smp.jacinthsolutions.com.au");

  const onMessageReceived = (message: any) => {
    console.log("Message from server:", message);
  };

  const onConnected = useCallback(() => {
    if (user) {
      socket.emit("join", user.id);
      socket.on("message", onMessageReceived);
    }
  }, [user, socket]);

  useEffect(() => {
    if (!socket) return;
    if (!user) return;

    socket.on("connect", () => {
      onConnected();
    });

    socket.on("connected", (message: any) => {
      console.log("New message:", message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("error");
        socket.off("message");
      }
    };
    // eslint-disable-next-line
  }, [socket, user]);

  // const connect = useCallback(() => {
  //   if (user) {
  //     stompClient.connect({}, onConnected, onError);
  //   }
  //   // eslint-disable-next-line
  // }, [user]);

  // const onConnected = useCallback(() => {
  //   if (user) {
  //     stompClient.subscribe(
  //       `/user/${user.id}/queue/messages`,
  //       onMessageReceived,
  //     );
  //   }
  //   // eslint-disable-next-line
  // }, [user]);

  // const onMessageReceived = useCallback(
  //   (msg: Message) => {
  //     const parsedMessage = JSON.parse(msg.body);
  //     console.log("received message: ", parsedMessage);
  //     dispatch(setNewMessage(parsedMessage));
  //     loadContacts();
  //   },
  //   // eslint-disable-next-line
  //   [dispatch],
  // );

  // const onError = useCallback((err: any) => {
  //   console.error("WebSocket connection error:", err);
  // }, []);

  // const loadContacts = useCallback(async () => {
  //   if (!auth.token || !user) return;
  //   try {
  //     const users = await getUsers({ token: auth.token as string });
  //     const contacts = await Promise.all(
  //       users.map(async (contact: Contact) => {
  //         const count = await countNewMessages({
  //           recipientId: user.id,
  //           senderId: contact.id,
  //           token: auth.token as string,
  //         });
  //         return { ...contact, newMessages: count };
  //       }),
  //     );
  //     const allUnreadMessages = contacts.reduce(
  //       (accumulator, contact) => accumulator + (contact.newMessages || 0),
  //       0,
  //     );
  //     dispatch(setTotalUnreadMessages(allUnreadMessages));
  //     dispatch(setContacts(contacts));
  //   } catch (error: any) {
  //     console.error(error.response?.data || error.message || error);
  //   }
  // }, [auth.token, user, dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     connect();
  //     loadContacts();
  //   }
  // }, [user, connect, loadContacts]);

  return <div className="hidden" />;
};

export default ChatSocket;
