"use client";

import Loading from "@/components/global/loading/page";
import { RootState } from "@/store";
import { setContacts } from "@/store/Features/chat";
import { countNewMessages, findChatMessages, getUsers } from "@/utils/message";
import { useSession } from "next-auth/react";
// import { chatData } from "@/app/data/service-provider/user";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

const ChatNavigation = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const { userProfileAuth: auth, profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const { contacts } = useSelector((state: RootState) => state.chat);
  const dispatch = useDispatch();

  const param = useSearchParams();
  const id = param.get("id");

  const handleChangeCategory = (category: string) => {
    setCurrentCategory(category);
  };

  const loadContacts = async () => {
    if (!auth.token || !user) return;
    try {
      setLoading(true);
      const users = await getUsers({ token: auth.token });
      const contacts = await Promise.all(
        users.map(async (contact: any) => {
          const count = await countNewMessages({
            recipientId: contact.id,
            senderId: user.id,
            token: auth.token as string,
          });
          return { ...contact, newMessages: count };
        }),
      );
      dispatch(setContacts(contacts));
    } catch (error: any) {
      console.error(error.response.data || error.message || error);
    } finally {
      setLoading(false);
    }
  };

  let reload = 3;

  useEffect(() => {
    loadContacts();
  }, [auth, reload]);

  return (
    <section className=" col-span-5 mx-auto  space-y-9">
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
        {loading ? (
          <div className="flex min-h-96 items-center justify-center">
            <Loading />
          </div>
        ) : contacts.length > 0 ? (
          contacts.map((item, index) => (
            <Link
              href={{
                pathname: "/message/" + item.id,
              }}
              key={index}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all  duration-300 ${Number(id) === item.id ? "bg-violet-100 hover:bg-opacity-90" : "hover:bg-violet-50"}`}
            >
              <Image
                src={
                  item.profilePicture ??
                  "/assets/images/serviceProvider/user.jpg"
                }
                alt={item.name}
                width={60}
                height={60}
                quality={100}
                className="size-16 rounded-full object-cover"
              />
              <div className="w-full space-y-4">
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <p className="cursor-pointer font-satoshiMedium text-lg  font-semibold text-violet-normal">
                    {item.name}
                  </p>
                  <p className="cursor-pointer rounded-md bg-orange-normal  p-1 px-2  text-white">
                    {item.newMessages}
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
