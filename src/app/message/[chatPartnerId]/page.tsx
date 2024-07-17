"use client";

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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setContacts,
  setSubscription,
  setTotalUnreadMessages,
} from "@/store/Features/chat";
import { stompClient } from "@/lib/stompClient";
import ScrollToBottom from "react-scroll-to-bottom";
import socketService from "@/lib/socketService";
import { getSocket } from "@/lib/socket";

const ServiceProviderChat = () => {
  const [chatMessages, setChatMessages] = useState<
    ChatMessageDisplayedType[] | null
  >([]);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState<ChatContactTypes | null>();

  const session = useSession();
  const dispatch = useDispatch();
  const { chatPartnerId } = useParams();

  const { profile: user, userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { contacts, newMessage, socket } = useSelector(
    (state: RootState) => state.chat,
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const token = session?.data?.user?.accessToken;
  const isServiceProvider = auth?.role?.[0] === "SERVICE_PROVIDER";

  useEffect(() => {
    loadContacts();
    // eslint-disable-next-line
  }, []);

  const handleFocus = () => {
    document.body.style.overflow = "auto";
    setTimeout(() => {
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300); // Delay to account for keyboard animation
  };

  const handleBlur = () => {
    document.body.style.overflow = "hidden"; // Revert to non-scrollable
  };

  // finds current chat patner messages
  useEffect(() => {
    if (token && user) {
      findChatMessages({
        recipientId: Number(chatPartnerId),
        senderId: user.id,
        token,
      })
        .then((msgs) => {
          const displayMessages: ChatMessageDisplayedType[] = msgs.map(
            (msg: ChatMessageRecievedType) => ({
              content: msg.content,
              senderId: msg.senderId,
              time: msg.timestamp,
            }),
          );
          setChatMessages(displayMessages);
        })
        .catch((error: any) => {
          console.log(error.response.data || error.message || error);
        });
    }
  }, [token, user, chatPartnerId]);

  // finds current chat partner contact details
  useEffect(() => {
    if (contacts) {
      const foundContact = contacts.find(
        (item) => Number(chatPartnerId) === item.id,
      );
      setContact(foundContact);
    }
    // eslint-disable-next-line
  }, [contacts]);

  const onMessageReceived = async () => {
    console.log("new messages received");
    if (newMessage && chatPartnerId === newMessage.senderId.toString()) {
      findChatMessage({
        id: newMessage.id,
        token: token as string,
      })
        .then((message) => {
          console.log(message);
          const displayMessage: ChatMessageDisplayedType = {
            content: message.content,
            senderId: message.senderId,
            time: message.timestamp,
          };
          const newMessages: ChatMessageDisplayedType[] = [
            ...(chatMessages || []),
            displayMessage,
          ];
          setChatMessages(newMessages);
        })
        .catch((error) => console.error(error));
      loadContacts().then(() => {
        localStorage.removeItem("tempUserChat");
      });
    }
  };

  // update as new messages are received
  useEffect(() => {
    onMessageReceived();
    // eslint-disable-next-line
  }, [newMessage]);

  const sendMessage = (msg: string) => {
    const socket = getSocket();
    console.log(socket);
    if (msg.trim() !== "" && user && contact) {
      const message = {
        senderId: user.id,
        recipientId: Number(chatPartnerId),
        senderName: `${user.firstName} ${user.lastName}`,
        recipientName: contact.name,
        content: msg,
        timestamp: new Date().toISOString(),
      };
      try {
        // socketService.socket.emit("send-message", message, (message: any) =>
        //   console.log(message),
        // );
        socket.emit("chat", message, (message: any) => console.log(message));
        const newMessages: ChatMessageDisplayedType[] = [
          ...(chatMessages || []),
          {
            content: msg,
            senderId: user.id,
            time: new Date().toISOString(),
          },
        ];
        setChatMessages(newMessages);
        loadContacts();
      } catch (error: any) {
        console.log(error.response.data || error.message || error);
      }
    }
  };

  // handle load contacts from the database
  const loadContacts = async () => {
    if (!token || !user) return;
    try {
      const users = await getUsers({ token: token });
      const contacts = await Promise.all(
        users.map(async (contact: any) => {
          const count = await countNewMessages({
            recipientId: user.id,
            senderId: contact.id,
            token: token as string,
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

  return (
    <main className="h-[calc(100vh-5rem)] space-y-5 overflow-hidden   p-4 lg:p-8 ">
      <section className="grid gap-10 divide-slate-400 lg:grid-cols-12 lg:divide-x ">
        <section className="col-span-5 h-full max-md:hidden ">
          <ChatNavigation />
        </section>

        {/* Organize this */}
        <section className="flex h-[calc(100vh-7rem)] w-full flex-col justify-between space-y-4  lg:col-span-7  lg:h-[calc(100vh-8rem)] lg:px-4 ">
          <article className="space-y-4">
            <div className="flex cursor-pointer gap-3 ">
              <Image
                src={
                  contact?.profilePicture ??
                  "/assets/images/serviceProvider/user.jpg"
                }
                alt="user"
                width={60}
                height={60}
                className="size-16 rounded-full object-cover max-sm:size-12"
              />
              <div className="w-full space-y-4">
                <div className="flex w-full cursor-pointer items-center justify-between">
                  {/* <p className="cursor-pointer font-medium text-violet-normal">
                    Drain Blockage fix Service Request
                  </p> */}
                  {/* <p className="cursor-pointer text-sm text-slate-500 ">$480</p> */}
                </div>
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <p className="cursor-pointer font-satoshiBold font-bold text-violet-dark ">
                    {contact?.name}
                  </p>
                  {/* <p className="cursor-pointer rounded-md bg-violet-light p-1 text-xs">
                    In Progress
                  </p> */}
                </div>
              </div>
            </div>
            {/* ==== */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={
                  isServiceProvider
                    ? "/service-provider/services"
                    : "/customer/tasks"
                }
                className={`rounded-full border border-violet-normal bg-violet-light px-4 py-2 text-sm font-medium text-violet-normal transition-all duration-300 hover:bg-violet-200 hover:opacity-90 `}
              >
                {isServiceProvider ? "View Service" : "View Task"}
              </Link>
            </div>
          </article>

          {/* -------chat */}
          {user && (
            <ScrollToBottom className="no-scrollbar max-h-full min-h-[60%] overflow-y-scroll">
              <div className=" flex w-full flex-col justify-end gap-4">
                {chatMessages &&
                  chatMessages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={` flex w-full ${item.senderId === user.id ? "justify-end" : "justify-start"}`}
                      >
                        <p
                          key={index}
                          className={` flex w-fit max-w-xs rounded-md p-2 text-sm ${item.senderId === user.id ? " bg-violet-normal text-right text-white" : " bg-orange-light text-left text-violet-dark "}`}
                        >
                          <span>{item.content}</span>
                        </p>
                      </div>
                    );
                  })}
              </div>
            </ScrollToBottom>
          )}

          <div className="flex gap-2 ">
            <Image
              src={
                user?.profileImage ?? "/assets/images/serviceProvider/user.jpg"
              }
              width={50}
              height={50}
              alt="user"
              className="size-8 rounded-full"
            />
            <div className="relative w-full">
              <textarea
                className="small-scrollbar max-h-20 w-full resize-none rounded-md bg-violet-light p-3 pr-16 outline-none"
                value={message}
                ref={inputRef}
                onChange={(event) => setMessage(event.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
