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
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContacts, setTotalUnreadMessages } from "@/store/Features/chat";
import ScrollToBottom from "react-scroll-to-bottom";
import { connectSocket, getSocket } from "@/lib/socket";
import { GiCheckMark } from "react-icons/gi";
import { formatTime, formatTimestamp } from "@/utils";
import { FaCheckDouble } from "react-icons/fa6";

type ChatMessagesGroupedType = {
  [date: string]: ChatMessageDisplayedType[];
};

const ServiceProviderChat = () => {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState<ChatContactTypes | null>();
  const router = useRouter()

  const [groupedChatMessages, setGroupedChatMessages] = useState<ChatMessagesGroupedType | null>(null);

  const session = useSession();
  const dispatch = useDispatch();
  const { chatPartnerId } = useParams();

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

  // const handleFocus = () => {
  //   document.body.style.overflow = "auto";
  //   setTimeout(() => {
  //     inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }, 300); // Delay to account for keyboard animation
  // };

  // const handleBlur = () => {
  //   document.body.style.overflow = "hidden";
  // };

  const groupMessagesByDate = (
    messages: ChatMessageDisplayedType[],
  ): ChatMessagesGroupedType => {
    return messages.reduce((acc: ChatMessagesGroupedType, message) => {
      const [year, month, day] = message.time as number[];
      const date = new Date(year, month - 1, day).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(message);
      return acc;
    }, {});
  };

  // finds current messages
  useEffect(() => {
    if (token && user) {
      connectSocket(user.id);

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
              time: msg.timestamp as number[],
            }),
          );
          const groupedMessages = groupMessagesByDate(displayMessages);
          setGroupedChatMessages(groupedMessages);

          console.log("ss", displayMessages)
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
          const newMessage: ChatMessageDisplayedType = {
            content: message.content,
            senderId: message.senderId,
            time: message.timestamp,
          };
          const newGroupedMessages = addMessageToGroupedState(
            newMessage,
            groupedChatMessages as ChatMessagesGroupedType,
          );
          setGroupedChatMessages(newGroupedMessages);
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

  const addMessageToGroupedState = (
    message: ChatMessageDisplayedType,
    groupedMessages: ChatMessagesGroupedType,
  ): ChatMessagesGroupedType => {
    let date;
    if (typeof message.time === "string") {
      date = message.time;
      date = new Date(date).toLocaleDateString();
    } else {
      const [year, month, day] = message.time as number[];
      date = new Date(year, month - 1, day).toLocaleDateString();
    }
    return {
      ...groupedMessages,
      [date]: groupedMessages[date]
        ? [...groupedMessages[date], message]
        : [message],
    };
  };

  const sendMessage = (msg: string) => {
    const socket = getSocket();
    if (msg.trim() !== "" && user && contact) {
      const message = {
        senderId: user.id,
        recipientId: Number(chatPartnerId),
        senderName: `${user.firstName} ${user.lastName}`,
        recipientName: contact.name,
        content: msg,
      };
      try {
        if (!socket.connected) {
          localStorage.setItem("chatMessages", JSON.stringify(message));
        }
        socket.emit("chat", message, () => {});
        const newMessage: ChatMessageDisplayedType = {
          content: msg,
          senderId: user.id,
          time: new Date().toISOString(),
        };
        const newGroupedMessages = addMessageToGroupedState(
          newMessage,
          groupedChatMessages as ChatMessagesGroupedType,
        );
        setGroupedChatMessages(newGroupedMessages);
      } catch (error: any) {
        console.log(error.response.data || error.message || error);
      }
    }
  };

  useEffect(() => {
    if (!user) return;
    const socket = connectSocket(user.id);
    const handleConnect = () => {
      console.log("reconnected");
      const storedMessage = localStorage.getItem("chatMessages");
      if (storedMessage) {
        const message = JSON.parse(storedMessage);
        socket.emit("chat", message, () => {
          localStorage.removeItem("chatMessages");
        });
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [user]);

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

  const formatDateIntoReadableFormat = (input: string | number[]): string => {
    let date: Date;

    if (Array.isArray(input)) {
      // Handle array input [year, month, day, hour, minute, second, millisecond]
      const [year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0] = input;
      date = new Date(year, month - 1, day, hour, minute, second, millisecond);
    } else if (typeof input === 'string') {
      date = new Date(input);
    } else {
      throw new Error('Invalid input type. Expected string or number array.');
    }

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Determine the ordinal suffix
    const ordinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  };

  return (
    <main className="h-[calc(100cqh-5rem)] space-y-5 overflow-hidden p-4 lg:p-8 ">
      <section className="grid gap-10 divide-slate-400 lg:grid-cols-12 lg:divide-x ">
        <section className="col-span-5 h-full max-md:hidden ">
          <ChatNavigation />
        </section>

        {/* Organize this */}
        <section className="flex h-[calc(100cqh-6rem)] w-full flex-col justify-between space-y-4  lg:col-span-7  lg:h-[calc(100cqh-9rem)] lg:px-4">
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
              <div className="flex w-full flex-col justify-end gap-4">
                {groupedChatMessages &&
                  Object.entries(groupedChatMessages).map(
                    ([date, messages]) => (
                      <div key={date}>
                        <div className="text-center font-satoshiBold font-bold text-violet-normal">
                          {formatDateIntoReadableFormat(date)}
                        </div>
                        {messages.map((item, index) => (
                          <div
                            key={index}
                            className={`my-2 flex w-full ${
                              item.senderId === user.id
                                ? "flex-wrap justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`flex w-fit max-w-xs flex-col gap-1 rounded-md p-2 text-sm ${
                                item.senderId === user.id
                                  ? "bg-violet-normal text-white"
                                  : "bg-orange-light text-left text-violet-dark"
                              }`}
                            >
                              <p>{item.content}</p>
                              <div className="flex items-center justify-end gap-2 text-[0.7rem]">
                                <span className="">
                                  {formatTimestamp(item.time as number[])}
                                </span>
                                {item.senderId === user.id && (
                                  <span className="block">
                                    <FaCheckDouble className="text-green-500" />
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ),
                  )}
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
                // onFocus={handleFocus}
                // onBlur={handleBlur}
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
