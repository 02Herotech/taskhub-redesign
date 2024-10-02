"use client";

import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import "../../styles/serviceProviderStyles.css";
import axios from "axios";

interface MessageButtonProps {
  recipientId: string;
  recipientName: string;
  className?: string;
  message?: string;
}

const MessageButton = ({
  recipientId,
  recipientName,
  className,
  message,
}: MessageButtonProps) => {
  const [messageLoading, setMessageLoading] = useState(false);
  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { contacts } = useSelector((state: RootState) => state.chat);

  const handleSendMessage = async () => {
    setMessageLoading(true);
    if (user) {
      let foundContact: ChatContactTypes | undefined;
      if (contacts) {
        foundContact = contacts.find((item) => Number(recipientId) === item.id);
      }
      if (foundContact) {
        router.push("/message/" + recipientId);
        return;
      }
      try {
        const url =
          "https://api.oloja.com.au/api/v1/user/user-profile/" +
          recipientId;
        const { data } = await axios.get(url);
        const newData: UserProfileTypes = data;
        const tempUserChat: ChatContactTypes = {
          id: newData.id,
          newMessages: null,
          profilePicture: newData.profileImage,
          name: `${newData.firstName} ${newData.lastName}`,
          lastMessage: null,
          lastChatTimestamp: null,
        };
        localStorage.setItem("tempUserChat", JSON.stringify(tempUserChat));
        router.push("/message/" + recipientId);
      } catch (error: any) {
        console.log(error.response.data || error.message || error);
      } finally {
        setMessageLoading(false);
      }
    }
  };

  const router = useRouter();
  return (
    <button
      className={cn(
        "rounded-full bg-violet-normal px-6 py-2 lg:py-3 text-white duration-300 hover:opacity-90 disabled:cursor-not-allowed",
        className,
      )}
      disabled={messageLoading}
      onClick={handleSendMessage}
    >
      {messageLoading ? (
        <BeatLoader loading={messageLoading} color="white" />
      ) : message ? (
        message
      ) : (
        "Message"
      )}
    </button>
  );
};

export default MessageButton;
