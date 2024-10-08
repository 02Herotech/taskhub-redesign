"use client";

import React, { useState } from "react";
import "../../../styles/glowingBorder.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsExclamationTriangle } from "react-icons/bs";

const GlowingBox = () => {
  const session = useSession();
  const isAuthenticated = session?.data?.user.accessToken;
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";

  const [error, setError] = useState("");

  const router = useRouter();
  const handleNavigateUser = () => {
    if (!isAuthenticated) {
      setError("You must be logged in to access this feature.");
      return;
    } else if (isServiceProvider) {
      router.push("/provide-service");
    } else {
      setError("You cannot access this feature as a customer");
    }
  };

  return (
    <div
      className={`absolute right-4 top-[calc(100%+5rem)] text-violet-normal max-lg:hidden lg:right-20 {${!isServiceProvider && "hidden"}} `}
    >
      {error && (
        <section className="fixed inset-0 z-[10000] flex h-screen w-screen items-center justify-center bg-black bg-opacity-70">
          <div
            className="absolute inset-0 h-screen w-screen"
            onClick={() => setError("")}
          />
          <div className="relative z-10 flex w-[90vw] max-w-xl flex-col items-center justify-center gap-3 rounded-xl bg-white p-3 px-4 lg:space-y-4 lg:p-10">
            <div className=" flex flex-col items-center justify-center gap-4">
              <div className="flex size-20 items-center justify-center rounded-full bg-red-100 bg-opacity-60">
                <div className=" flex size-14 items-center justify-center rounded-full bg-red-300 p-4">
                  <BsExclamationTriangle className="size-10 text-red-500" />
                </div>
              </div>
              <p className="text-center font-satoshiBold text-2xl font-extrabold text-red-500">
                Sorry
              </p>
              <p className="text-center font-semibold text-violet-darker">
                {error}
              </p>
            </div>
          </div>
        </section>
      )}
      <div className=" glowing relative w-screen max-w-md space-y-2 rounded-2xl bg-violet-light p-4 ">
        <div className="flex items-center gap-6  ">
          <Image
            src={"/assets/images/marketplace/glowing/openaiOrange.png"}
            alt="openai"
            width={30}
            height={30}
          />
          <div className="space-y-1">
            <p className="font-bold text-violet-darker">
              Instant Content Generation with AI
            </p>
            <p className="text-sm font-semibold">
              Let our AI-powered service take the hard work out of generating a
              service description for you.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-white p-2 text-center text-sm font-bold ">
            <Image
              src={"/assets/images/marketplace/glowing/vectorsss.png"}
              alt="openai"
              width={30}
              height={30}
              className="size-5"
            />
            <span>Click on generate with Ai</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-white p-2 text-center text-sm font-bold ">
            <Image
              src={"/assets/images/marketplace/glowing/penwithline.png"}
              alt="openai"
              width={30}
              height={30}
              className="size-5"
            />
            <span>Describe your service briefly</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-white p-2 text-center text-sm font-bold ">
            <Image
              src={"/assets/images/marketplace/glowing/openaivioler]t.png"}
              alt="openai"
              width={30}
              height={30}
              className="size-5"
            />
            <span>Get AI generated content</span>
          </div>
        </div>
        <div className="flex items-center justify-center ">
          <button
            onClick={handleNavigateUser}
            className="rounded-full bg-violet-normal px-4 py-2 text-sm font-bold text-white"
          >
            Try it out
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlowingBox;
