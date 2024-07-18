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
import { setContacts, setTotalUnreadMessages } from "@/store/Features/chat";
import ScrollToBottom from "react-scroll-to-bottom";
import { connectSocket, getSocket } from "@/lib/socket";
import { GiCheckMark } from "react-icons/gi";

const ServiceProviderChat = () => {
  const [chatMessages, setChatMessages] = useState<
    ChatMessageDisplayedType[] | null
  >([]);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState<ChatContactTypes | null>();

  const session = useSession();
  const dispatch = useDispatch();
  const { chatPartnerId } = useParams();

  const [unsentMessage, setUnsentMessage] = useState<any>(null);

  const { profile: user, userProfileAuth: auth } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { contacts, newMessage } = useSelector(
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
    const tempUser = localStorage.getItem("tempUserChat");
    if (tempUser) {
      const user: ChatContactTypes = JSON.parse(tempUser);
      setContact(user);
    } else if (contacts) {
      const foundContact = contacts.find(
        (item) => Number(chatPartnerId) === item.id,
      );
      setContact(foundContact);
    }
    // eslint-disable-next-line
  }, [contacts]);

  const onMessageReceived = async () => {
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
    console.log(socket.connected);
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
        if (!socket.connected) {
          localStorage.setItem("chatMessages", JSON.stringify(message));
          setUnsentMessage(message);
        }
        socket.emit("chat", message, () => {});
        const newMessages: ChatMessageDisplayedType[] = [
          ...(chatMessages || []),
          {
            content: msg,
            senderId: user.id,
            time: new Date().toISOString(),
          },
        ];
        setChatMessages(newMessages);
      } catch (error: any) {
        console.log(error.response.data || error.message || error);
      }
    }
  };

  useEffect(() => {
    const socket = getSocket();

    const handleConnect = () => {
      console.log("reconnected");
      const storedMessage = localStorage.getItem("chatMessages");
      if (storedMessage) {
        const message = JSON.parse(storedMessage);
        socket.emit("chat", message, () => {
          localStorage.removeItem("chatMessages");
          setUnsentMessage(null);
        });
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, []);

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
        <section className="flex h-[calc(100vh-7rem)] w-full flex-col justify-between space-y-4  lg:col-span-7  lg:h-[calc(100vh-9rem)] lg:px-4 ">
          <article className="flex-shrink-0 space-y-4 ">
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
                <div className="flex w-full cursor-pointer items-center justify-between"></div>
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <p className="cursor-pointer font-satoshiBold font-bold text-violet-dark ">
                    {contact?.name}
                  </p>
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
            <ScrollToBottom className="no-scrollbar max-h-full flex-grow overflow-y-scroll">
              <div className=" flex w-full flex-col justify-end gap-4">
                {chatMessages &&
                  chatMessages.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={` flex w-full ${item.senderId === user.id ? "flex-wrap justify-end " : "justify-start"}`}
                      >
                        <p
                          key={index}
                          className={` flex w-fit max-w-xs flex-col gap-1 `}
                        >
                          <span
                            className={` rounded-md p-2 text-sm ${item.senderId === user.id ? " bg-violet-normal text-white" : " bg-orange-light text-left text-violet-dark "}`}
                          >
                            {item.content}
                          </span>
                          {/* <div className="absolute bottom-0 right-0 rounded-full bg-violet-dark p-1 font-medium text-white">
                            {item.time.substring(11, 16)}
                          </div> */}
                          {item.senderId === user.id && (
                            <span className="block">
                              <GiCheckMark className="text-green-500 " />
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </ScrollToBottom>
          )}

          <div className="flex flex-shrink-0 gap-2 ">
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
