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
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import socket from "@/lib/socket";

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

  useEffect(() => {
    if (!socket) return;
    if (!user) return;

    socket.on("connect", () => {
      console.log("connected to socket");
    });

    socket.on("connected", (message: any) => {
      console.log("New message:", message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    console.log(socket);

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

  const handleSendMessage = async () => {
    console.log("sending");
    if (user) {
      const message = {
        senderId: 11,
        recipientId: 24,
        senderName: `Anthony`,
        recipientName: "Tony",
        content: "Hello",
        timestamp: new Date().toISOString(),
      };
      try {
        socket.emit("chat", message, (message: any) => console.log(message));
        console.log("message sent");
        //  router.push("/message/" + recipientId);
        // await stompClient.send("/app/chat", {}, JSON.stringify(message)),
        //   router.push("/message/" + recipientId);
      } catch (error: any) {
        console.log(error.response.data || error.message || error);
      }
    }
  };

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

  useEffect(() => {
    if (user) {
      loadContacts();
    }
    // eslint-disable-next-line
  }, [user]);

  return <div className="hidden" />;
};

export default ChatSocket;
