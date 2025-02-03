"use client";
import { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import GlowingBox from "../GlowingBox";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const MarketPlaceHeader = () => {
  // Setting the add description state
  const [addDescription, setAddDescription] = useState("");
  const { authLoading, userProfileAuth } = useSelector(
    (state: RootState) => state.userProfile,
  );

  const session = useSession();
  const router = useRouter();

  const token = session?.data?.user?.accessToken;

  const isServiceProvider =
    userProfileAuth.role && userProfileAuth.role[0] === "SERVICE_PROVIDER";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) {
      router.push("/auth/login");
    } else if (isServiceProvider) {
      router.push(`/provide-service?marketplaceDescription=${addDescription}`);
    } else {
      router.push(
        `/customer/add-task?marketplaceDescription=${addDescription}`,
      );
    }
  };

  return (
    <div
      className={`${styles.headerCover} min-h-96 w-full max-w-screen-2xl py-20 md:mt-16 lg:mt-20 `}
    >
      {!authLoading && (
        <div className="relative mx-auto flex flex-col items-center justify-center space-y-8 px-5 text-white md:max-w-full md:px-0  ">
          <GlowingBox />
          <div className="flex w-full flex-col justify-center space-y-2 sm:items-start md:items-center ">
            <div className=" mt-10 flex w-full flex-col flex-wrap items-start justify-center gap-3 md:mt-0 md:flex-row md:items-center md:justify-center ">
              <h1 className="text-[27px] font-bold md:text-[39px]">
                {isServiceProvider
                  ? "Can provide a Service? Get Connected."
                  : "Post it. We Fix it"}
              </h1>
            </div>
            <p className="font-medium sm:text-start sm:text-base  md:text-lg ">
              {isServiceProvider
                ? "Let users know you can get it done!"
                : "Publish a task. Complete it."}
            </p>
          </div>

          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex w-full flex-col gap-2 md:flex-row md:justify-center "
          >
            <input
              type="text"
              id="description"
              placeholder={
                isServiceProvider
                  ? " In few words, what can you provide"
                  : " In few words, what do you need?"
              }
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
              name="description"
              className="w-full max-w-lg rounded-xl bg-white px-4 py-3 text-slate-600 focus:outline-none "
            />
            <button
              type="submit"
              className=" max-w-fit rounded-3xl bg-primary px-6 py-3 font-bold transition-all duration-300 hover:opacity-90  "
            >
              {isServiceProvider ? "Provide a service" : "Post a task"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MarketPlaceHeader;
