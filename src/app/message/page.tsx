"use client";

import ChatNavigation from "@/components/main/message/ChatNavigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const chatData = [];

const ServiceProviderMessage = () => {
  return (
    <main className="space-y-5 p-4 lg:p-8">
      <section className="grid min-h-[calc(100vh-10rem)] gap-10 divide-x divide-slate-400 lg:grid-cols-12 ">
        <ChatNavigation />

        {/* Organize this */}
        <section className="col-span-7 flex items-center justify-center max-md:hidden">
          {chatData.length > 0 ? (
            <h1 className="text-3xl  font-medium text-violet-normal ">
              Select A Chat
            </h1>
          ) : (
            <div className="flex h-full min-h-64 items-center justify-center">
              <Image
                src="/message.svg"
                width={200}
                height={200}
                alt="message"
                // className="animate-pulse"
              />
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default ServiceProviderMessage;
