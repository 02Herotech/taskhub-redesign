"use client";

import ChatNavigation from "@/components/serviceProviderDashboard/message/ChatNavigation";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const ServiceProviderMessage = () => {
  return (
    <main className="space-y-5 p-4 lg:p-8">
      <section className="grid gap-10 divide-x divide-slate-400 lg:grid-cols-12 ">
        <ChatNavigation />

        {/* Organize this */}
        <section className="col-span-7 flex items-center justify-center max-md:hidden">
          <h1 className="text-3xl  font-medium text-violet-normal ">
            Select A Chat
          </h1>
        </section>
      </section>
    </main>
  );
};

export default ServiceProviderMessage;