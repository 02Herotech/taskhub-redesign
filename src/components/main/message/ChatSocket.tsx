"use client";

import { RootState } from "@/store";
import {
  setContacts,
  setNewMessage,
  setTotalUnreadMessages,
  updateStompClient,
} from "@/store/Features/chat";
import { countNewMessages, getUsers } from "@/utils/message";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatSocket = () => {
  const dispatch = useDispatch();
  const { profile: user, userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { stompClient } = useSelector((state: RootState) => state.chat);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 5000; // 5 seconds
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    const URL = `https://smp.jacinthsolutions.com.au/ws`;
    SockJS = new SockJS(URL);
    dispatch(updateStompClient(Stomp.over(SockJS)));
  };

  const connectSocket = () => {
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    if (user) {
      stompClient.subscribe(
        `/user/${user.id}/queue/messages`,
        onMessageReceived,
      );
      setReconnectAttempts(0); // Reset the reconnect attempts on successful connection
    }
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

  const onMessageReceived = (msg: any) => {
    try {
      const parsedMessage = JSON.parse(msg.body);
      console.log("Message received", parsedMessage);
      dispatch(setNewMessage(parsedMessage));
    } catch (error) {
      console.error("Error parsing message body:", error);
    }
  };

  useEffect(() => {
    if (stompClient) {
      connectSocket();
    } else {
      connect();
    }
  }, [stompClient]);

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
    loadContacts();
  }, [auth]);

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
