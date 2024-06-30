"use client";

import { RootState } from "@/store";
import {
  setContacts,
  setNewMessage,
  setTotalUnreadMessages,
  updateStompClient,
} from "@/store/Features/chat";
import { countNewMessages, getUsers } from "@/utils/message";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatSocket = () => {
  const dispatch = useDispatch();

  const { profile: user, userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { stompClient } = useSelector((state: RootState) => state.chat);

  // connects to web socket
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
    }
  };
  const onError = (err: any) => {
    console.error(err);
  };

  const onMessageReceived = (msg: any) => {
    dispatch(setNewMessage(msg));
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
            recipientId: contact.id,
            senderId: user.id,
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

  return <div className="hidden" />;
};

export default ChatSocket;
