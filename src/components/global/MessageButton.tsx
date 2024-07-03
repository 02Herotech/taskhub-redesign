"use client";

import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import "../../styles/serviceProviderStyles.css";
import { stompClient } from "@/lib/stompClient";

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
  // const { stompClient } = useSelector((state: RootState) => state.chat);

  const handleSendMessage = async () => {
    setMessageLoading(true);
    console.log("sending");
    if (user) {
      const message = {
        senderId: user.id,
        recipientId,
        senderName: `${user.firstName} ${user.lastName}`,
        recipientName,
        content: "Hello " + recipientName,
        timestamp: new Date().toISOString(),
      };
      try {
        await stompClient.send("/app/chat", {}, JSON.stringify(message)),
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
        "rounded-full bg-violet-normal px-6 py-3 text-white disabled:cursor-not-allowed",
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
