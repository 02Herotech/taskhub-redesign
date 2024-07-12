"use client";

import { RootState } from "@/store";
import {
  setContacts,
  setNewMessage,
  setTotalUnreadMessages,
} from "@/store/Features/chat";
import { countNewMessages, getUsers } from "@/utils/message";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stompClient } from "@/lib/stompClient";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

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

  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 5000; // 5 seconds
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

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
    (msg: Message) => {
      const parsedMessage = JSON.parse(msg.body);
      console.log("received message: ", parsedMessage);
      dispatch(setNewMessage(parsedMessage));
      loadContacts();
    },
    [dispatch, loadContacts],
  );

  const onConnected = useCallback(() => {
    if (user) {
      stompClient.subscribe(
        `/user/${user.id}/queue/messages`,
        onMessageReceived,
      );
      setReconnectAttempts(0);
    }
  }, [user, onMessageReceived]);

  const onError = useCallback(
    (err: any) => {
      console.error("WebSocket connection error:", err);
      if (reconnectAttempts < maxReconnectAttempts) {
        if (reconnectTimeout.current) {
          clearTimeout(reconnectTimeout.current);
        }
        reconnectTimeout.current = setTimeout(() => {
          setReconnectAttempts((prev) => prev + 1);
          connect();
        }, reconnectInterval);
      } else {
        console.error("Max reconnect attempts reached");
      }
    },
    [reconnectAttempts],
  );

  const connect = useCallback(() => {
    if (user) {
      stompClient.connect({}, onConnected, onError);
    }
    return () => {
      if (stompClient.connected) {
        stompClient.disconnect();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, [user, onConnected, onError]);

  useEffect(() => {
    if (user) {
      connect();
      loadContacts();
    }
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
      if (stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, [user, connect, loadContacts]);

  return <div className="hidden" />;
};

export default ChatSocket;
