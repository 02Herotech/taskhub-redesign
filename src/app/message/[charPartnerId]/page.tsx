"use client";

// import { chatData } from "@/app/data/service-provider/user";
import ChatNavigation from "@/components/main/message/ChatNavigation";
import { RootState } from "@/store";
import {
  countNewMessages,
  findChatMessage,
  findChatMessages,
  getUsers,
} from "@/utils/message";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActiveChatPatnerId, setMessages } from "@/store/Features/chat";

const dummyChat = [
  {
    message: "My budget is $480. Can it be done for that?",
    sender: "customer",
  },
  {
    message: "That’s fine, i would send the invoice over shortly.",
    sender: "user",
  },
  {
    message: "My budget is $480. Can it be done for that?",
    sender: "customer",
  },
  {
    message: "That’s fine, i would send the invoice over shortly.",
    sender: "user",
  },
  {
    message:
      "Hello, My name is Kelly and i want to have a blocked drain in my office.",
    sender: "customer",
  },
  {
    message:
      "Hello i am John, i can fix it for $500. Where is your office located?",
    sender: "user",
  },
  {
    message: "My budget is $480. Can it be done for that?",
    sender: "customer",
  },
  {
    message: "That’s fine, i would send the invoice over shortly.",
    sender: "user",
  },
  {
    message: "My budget is $480. Can it be done for that?",
    sender: "customer",
  },
  {
    message: "That’s fine, i would send the invoice over shortly.",
    sender: "user",
  },
];

interface MessageTypes {
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
}

const chatData = [{}];

let stompClient: any = null;
const ServiceProviderChat = () => {
  const [activeContact, setActiveContact] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [contacts, setContacts] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState<MessageTypes[]>([]);

  const session = useSession();
  const dispatch = useDispatch();
  const { chatPartnerId } = useParams<{ chatPartnerId: string }>();

  const token = session?.data?.user?.accessToken;

  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  // const { activeChatPatnerId, messages: storedMessages } = useSelector(
  //   (state: RootState) => state.chat,
  // );

  useEffect(() => {
    if (chatPartnerId) {
      dispatch(setActiveChatPatnerId(chatPartnerId));
    }
  }, [chatPartnerId, dispatch]);

  useEffect(() => {
    // if (chatPartnerId && user && token) {
    connect();
    loadContacts();
    // }
  }, [user, token]);

  useEffect(() => {
    if (token && user && chatPartnerId) {
      findChatMessages({
        recipientId: Number(chatPartnerId),
        senderId: user.id,
        token,
      }).then((msgs) => {
        setChatMessages(msgs);
        dispatch(setMessages(msgs));
      });
    }
  }, [token, user, chatPartnerId, dispatch]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    // const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
    const URL = `https://smp.jacinthsolutions.com.au/ws`;
    SockJS = new SockJS(URL);
    stompClient = Stomp.over(SockJS);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("Connected to websocket");
    if (user?.id) {
      console.log(` Subscribing to /user/${user?.id}/queue/messages`);
      stompClient.subscribe(
        `/user/${user?.id}/queue/messages`,
        onMessageReceived,
      );
      console.log("subscribed");
    }
  };

  const onError = (err: any) => {
    console.error(err);
  };

  const onMessageReceived = (msg: any) => {
    // const notification = JSON.parse(msg.body);
    // if (activeContact.id === notification.senderId) {
    //   findChatMessage(notification.id).then((message) => {
    //     const newMessages = [...storedMessages, message];
    //     dispatch(setMessages(newMessages));
    //     setChatMessages(newMessages);
    //   });
    // }
    loadContacts();
  };

  const sendMessage = (msg: string) => {
    if (msg.trim() !== "" && user) {
      const message = {
        senderId: user.id,
        recipientId: 24,
        senderName: `${user.firstName} ${user.lastName}`,
        recipientName: "Anthony",
        content: msg,
        timestamp: new Date(),
      };
      try {
        if (stompClient.connected) {
          console.error("STOMP client is very much connected");
          stompClient.send("/app/chat", {}, JSON.stringify(message));
        } else {
          console.error("STOMP client is not connected");
          return;
        }
      } catch (error: any) {
        console.log(error.response.data || error.message || error);
      }

      const newMessages = [...chatMessages, message];
      dispatch(setMessages(newMessages));
      setChatMessages(newMessages);
    }
  };

  // useEffect(() => {
  //   const message = {
  //     senderId: user?.id,
  //     recipientId: 2,
  //     senderName: "Test User",
  //     recipientName: "activeContact.name",
  //     content: "This is a test message",
  //     timestamp: new Date(),
  //   };
  //   stompClient.send("/app/chat", {}, JSON.stringify(message));
  // }, [message]);

  const loadContacts = async () => {
    if (!token || !user) return;
    const users = await getUsers({ token });
    console.log("chatted withs", users);
    const contacts = await Promise.all(
      users.map(async (contact: any) => {
        const count = await countNewMessages({
          recipientId: contact.id,
          senderId: user.id,
          token,
        });
        return { ...contact, newMessages: count };
      }),
    );
    setContacts(contacts);
    // if (!activeContact && contacts.length > 0) {
    setActiveContact({
      id: 24,
      name: "John Doe",
    });
    // }
  };

  const handleReschedule = () => {};

  return (
    <main className="min-h-[calc(100vh-4rem)] space-y-5  p-4 lg:p-8 ">
      <section className="grid gap-10 divide-slate-400 lg:grid-cols-12 lg:divide-x ">
        <section className="col-span-5 h-full max-md:hidden ">
          <ChatNavigation />
        </section>

        {/* Organize this */}
        <section className="flex h-[calc(100vh-7rem)] w-full flex-col justify-between space-y-4 lg:col-span-7  lg:h-[calc(100vh-8rem)] lg:px-4 ">
          <article className="space-y-4">
            <div className="flex cursor-pointer gap-3 ">
              <Image
                src="/assets/images/serviceProvider/jobs/kelly.png"
                alt="user"
                width={60}
                height={60}
                className="size-16 rounded-full"
              />
              <div className="w-full space-y-4">
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <p className="cursor-pointer font-medium text-violet-normal">
                    Drain Blockage fix Service Request
                  </p>
                  <p className="cursor-pointer text-sm text-slate-500 ">$480</p>
                </div>
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <p className="cursor-pointer text-sm font-medium text-violet-dark ">
                    Kelly M
                  </p>
                  <p className="cursor-pointer rounded-md bg-violet-light p-1 text-xs">
                    In Progress
                  </p>
                </div>
              </div>
            </div>
            {/* ==== */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/service-proider/dashboard/services"
                className={`rounded-full border border-violet-normal bg-violet-light px-4 py-2 text-sm font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:opacity-90 `}
              >
                View Task
              </Link>
              <button
                className={`rounded-full border border-violet-normal bg-violet-light px-4 py-2 text-sm font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:opacity-90 `}
                // onClick={() => handleReschedule()}
              >
                Reschedule
              </button>
            </div>
          </article>

          {/* -------chat */}
          <div className="no-scrollbar flex max-h-full min-h-[60%] w-full flex-col justify-end gap-4 overflow-y-auto">
            {/* {dummyChat.map((item, index) => (
              <div
                key={index}
                className={` flex w-full ${item.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  key={index}
                  className={` flex w-fit max-w-xs rounded-md p-2 text-sm ${item.sender === "user" ? " bg-violet-normal text-right text-white" : " bg-orange-light text-left text-violet-dark "}`}
                >
                  <span>{item.message}</span>
                </p>
              </div>
            ))} */}
          </div>

          <div className="flex gap-2 ">
            <Image
              src="/assets/images/serviceProvider/jobs/kelly.png"
              width={50}
              height={50}
              alt="user"
              className="size-8 rounded-full"
            />
            <div className="relative w-full">
              <textarea
                className="small-scrollbar max-h-20 w-full resize-none rounded-md bg-violet-light p-3 pr-16 outline-none"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage(message);
                    setMessage("");
                  }
                }}
                placeholder="Send a message ..."
              />
              <button
                type="button"
                onClick={() => {
                  sendMessage(message);
                  setMessage("");
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-violet-normal"
              >
                Send
              </button>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default ServiceProviderChat;
