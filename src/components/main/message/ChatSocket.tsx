"use client";

import { RootState } from "@/store";
import { setNewMessage, updateStompClient } from "@/store/Features/chat";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatSocket = () => {
  // const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
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
    // setIsWebSocketConnected(true);
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
      console.log("Initializing WebSocket connection");
      connectSocket();
    } else {
      connect();
    }
  }, [stompClient]);

  return <div className="hidden" />;
};

export default ChatSocket;
