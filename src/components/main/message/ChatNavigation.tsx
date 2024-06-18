"use client";

// import { chatData } from "@/app/data/service-provider/user";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface ChatDataType {
  id: string;
  name: string;
  image: string;
  chatNo: string;
  lastMessage: string;
  date: string;
}

const chatData: ChatDataType[] = [
  {
    id: "1",
    name: "Anthony dev",
    image: "/assets/images/serviceProvider/user.jpg",
    chatNo: "1",
    lastMessage: "I need a dancer",
    date: "Today",
  },
];

const ChatNavigation = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const param = useSearchParams();
  const id = param.get("id");
  const handleChangeCategory = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <section className="col-span-5 space-y-9">
      <div className="flex flex-wrap items-center gap-4">
        <button
          className={`rounded-md px-4  py-2 font-medium transition-all duration-300 hover:opacity-90 ${currentCategory === "All" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200"} `}
          onClick={() => handleChangeCategory("All")}
        >
          All Messages
        </button>
        <button
          className={`rounded-md px-4  py-2 font-medium transition-all duration-300 hover:opacity-90 ${currentCategory === "Unread" ? "bg-violet-normal text-white" : "bg-violet-light text-violet-normal hover:bg-violet-200"} `}
          onClick={() => handleChangeCategory("Unread")}
        >
          Unread Messages
        </button>
      </div>
      <form className="flex items-center gap-3">
        <input
          type="text"
          className="w-full rounded-lg border border-slate-100 bg-violet-50 p-3 shadow hover:shadow-md"
        />
        <button className="rounded-lg bg-violet-normal p-3 text-white transition-opacity duration-300 hover:opacity-90 ">
          <BiSearch className="size-6" />
        </button>
      </form>

      <article className="flex max-h-[55vh] flex-col gap-4 overflow-y-auto">
        {chatData.length > 0 ? (
          chatData.map((item, index) => (
            <Link
              href={{
                pathname: "/message/" + item.id,
                query: "id=" + item.id,
              }}
              key={index}
              className={`flex cursor-pointer gap-3 rounded-lg border border-slate-100 p-3 transition-all  duration-300 ${id === item.id ? "bg-violet-100 hover:bg-opacity-90" : "hover:bg-violet-50"}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                quality={100}
                className="size-16 rounded-full object-cover"
              />
              <div className="w-full space-y-4">
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <p className="cursor-pointer font-medium text-violet-normal">
                    {item.name}
                  </p>
                  <p className="cursor-pointer text-sm text-slate-500 ">
                    {item.date}
                  </p>
                </div>
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <p className="cursor-pointer text-sm font-medium text-violet-dark ">
                    {item.lastMessage}
                  </p>
                  <p className="cursor-pointer rounded-md bg-violet-light p-1 text-xs">
                    {item.chatNo}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex h-full min-h-20 items-center justify-center">
            <p className="text-lg font-medium text-violet-normal">
              No Chat available
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default ChatNavigation;
