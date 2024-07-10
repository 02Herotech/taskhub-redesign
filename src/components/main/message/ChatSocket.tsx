"use client";

import { RootState } from "@/store";
import {
  setContacts,
  setNewMessage,
  setTotalUnreadMessages,
} from "@/store/Features/chat";
import { countNewMessages, getUsers } from "@/utils/message";
import React, { useEffect, useState, useRef, useCallback } from "react";
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

  const connect = useCallback(() => {
    if(!user) return
    stompClient.connect({}, onConnected, onError);
  }, [user]);

  const onConnected = useCallback(() => {
    if (user) {
      stompClient.subscribe(
        `/user/${user.id}/queue/messages`,
        onMessageReceived,
      );
      setReconnectAttempts(0);
    }
  }, [user]);

  const onMessageReceived = useCallback(
    (msg: Message) => {
      const parsedMessage = JSON.parse(msg.body);
      dispatch(setNewMessage(parsedMessage));
      loadContacts();
    },
    [dispatch],
  );

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
    [connect, reconnectAttempts],
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

  useEffect(() => {
    if (user) {
      connect();
      loadContacts();
    }
  }, [user, connect, loadContacts]);

  useEffect(() => {
    return () => {
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  return <div className="hidden" />;
};

export default ChatSocket;
