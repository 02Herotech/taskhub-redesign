"use client";

import { RootState } from "@/store";
import { formatTimestamp } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";

const ChatNavigation = () => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [searchData, setSearchData] = useState("");
  const [filteredContact, setFilteredContact] = useState<{
    contact: ChatContactTypes[];
    loading: boolean;
    isFiltering: boolean;
  }>({ contact: [], loading: false, isFiltering: false });
  const [displayContacts, setDisplayContacts] = useState<ChatContactTypes[]>(
    [],
  );
  const [allContacts, setAllContacts] = useState<ChatContactTypes[]>([]);
  const { contacts } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    const tempUser = localStorage.getItem("tempUserChat");
    if (tempUser) {
      const user: ChatContactTypes = JSON.parse(tempUser);
      setAllContacts((prev) => {
        const exists = prev.some((contact) => contact.id === user.id);
        if (!exists) {
          const newContacts = [user, ...prev, ...contacts];
          return newContacts;
        }
        return prev;
      });
    } else {
      setAllContacts(contacts);
    }
  }, [contacts]);

  useEffect(() => {
    setDisplayContacts(allContacts);
  }, [allContacts]);

  const { chatPartnerId } = useParams();
  const handleChangeCategory = (category: string) => {
    setCurrentCategory(category);
    if (category === "Unread") {
      setFilteredContact((prev) => ({
        ...prev,
        isFiltering: true,
      }));
      const unreadContacts = contacts.filter(
        (item) => item.newMessages && item.newMessages > 0,
      );
      setFilteredContact((prev) => ({ ...prev, contact: unreadContacts }));
      return;
    }
    setFilteredContact((prev) => ({
      ...prev,
      isFiltering: false,
    }));
  };

  const handleFilterContactBySearch = () => {
    setFilteredContact((prev) => ({
      ...prev,
      isFiltering: searchData.length > 0,
    }));
    const filteredContact = contacts.filter((contact) =>
      contact.name.includes(searchData),
    );
    setFilteredContact((prev) => ({ ...prev, contact: filteredContact }));
  };

  useEffect(() => {
    handleFilterContactBySearch();
    // eslint-disable-next-line
  }, [searchData]);

  useEffect(() => {
    const newContacts = filteredContact.isFiltering
      ? filteredContact.contact
      : allContacts;

    setDisplayContacts(newContacts);
    // eslint-disable-next-line
  }, [filteredContact, contacts]);

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
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={searchData}
          onChange={(event) => setSearchData(event.target.value)}
          className="w-full rounded-lg border border-slate-100 bg-violet-50 p-3 shadow hover:shadow-md"
        />
        <button
          onClick={handleFilterContactBySearch}
          className="rounded-lg bg-violet-normal p-3 text-white transition-opacity duration-300 hover:opacity-90 "
        >
          <BiSearch className="size-6" />
        </button>
      </div>

      <article className="no-scrollbar flex max-h-[55vh] flex-col gap-4 overflow-y-auto">
        {displayContacts.length > 0 ? (
          displayContacts.map((item, index) => (
            <Link
              href={{
                pathname: "/message/" + item.id,
              }}
              key={index}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border border-slate-100 p-3 transition-all  duration-300 ${Number(chatPartnerId) === item.id ? "bg-violet-100 hover:bg-opacity-90" : "hover:bg-violet-50"}`}
            >
              <div className="size-16 overflow-hidden rounded-full max-sm:size-12">
                <Image
                  src={
                    item.profilePicture ??
                    "/assets/images/serviceProvider/user.jpg"
                  }
                  alt={item.name}
                  width={60}
                  height={60}
                  quality={100}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className=" flex-grow space-y-4">
                <div className="flex w-full cursor-pointer justify-between gap-6 lg:gap-8">
                  <div className="flex flex-col gap-1">
                    <p className="cursor-pointer font-satoshiMedium font-semibold  text-violet-normal lg:text-lg">
                      {item.name}
                    </p>
                    <p className="line-clamp-1">
                      {item.lastMessage && item.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 ">
                    <p className="text-sm lg:whitespace-nowrap">
                      {item.lastChatTimestamp &&
                        formatTimestamp(item.lastChatTimestamp)}
                    </p>
                    {(item.newMessages as number) > 0 && (
                      <p className="w-fit cursor-pointer rounded-md bg-violet-light p-1 px-2  text-xs text-violet-normal  ">
                        {item.newMessages}
                      </p>
                    )}
                  </div>
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
