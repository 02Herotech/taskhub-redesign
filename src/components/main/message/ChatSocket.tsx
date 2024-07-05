"use client";

import { RootState } from "@/store";
import {
  setContacts,
  setNewMessage,
  setSubscription,
  setTotalUnreadMessages,
} from "@/store/Features/chat";
import { countNewMessages, getUsers } from "@/utils/message";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stompClient } from "@/lib/stompClient";

const ChatSocket = () => {
  const dispatch = useDispatch();
  const { profile: user, userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const { subscription } = useSelector((state: RootState) => state.chat);

  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 5000; // 5 seconds
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    const newSubscription = stompClient.subscribe(
      `/user/${user?.id}/queue/messages`,
      onMessageReceived,
    );
    dispatch(setSubscription(newSubscription));
    setReconnectAttempts(0);
  };

  const onMessageReceived = (msg: any) => {
    const parsedMessage = JSON.parse(msg.body);
    dispatch(setNewMessage(parsedMessage));
    loadContacts();
  };

  const onError = (err: any) => {
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
  };

  const loadContacts = async () => {
    if (!auth.token || !user) return;
    try {
      const users = await getUsers({ token: auth.token });
      const contacts = await Promise.all(
        users.map(async (contact: any) => {
          const count = await countNewMessages({
            recipientId: user.id,
            senderId: contact.id,
            token: auth.token as string,
          });
          return { ...contact, newMessages: count };
        }),
      );
      const allUnreadMessages = contacts.reduce(
        (accumulator, contact) => accumulator + contact.newMessages,
        0,
      );
      dispatch(setTotalUnreadMessages(allUnreadMessages));
      dispatch(setContacts(contacts));
    } catch (error: any) {
      console.error(error.response.data || error.message || error);
    }
  };

  useEffect(() => {
    if (user) {
      connect();
      loadContacts();
    }
  }, [user]);

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
