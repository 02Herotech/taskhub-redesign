"use client";

import React from "react";
import "../../../styles/glowingBorder.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const TaskhubCanGlowingBox = () => {


  return (
    <div
      className={` text-violet-normal    `}
    >
      <div className=" glowing relative xl:w-[400px] md:w-[380px]  md:h-[230px]  space-y-5 rounded-2xl bg-violet-light p-4 pt-5 ">
        <div className="flex items-center gap-6  ">
          <Image
            src={"/assets/images/marketplace/glowing/openaiOrange.png"}
            alt="openai"
            width={40}
            height={40}
            className="-mt-10"
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
          <div className="flex flex-col items-center justify-center gap-1 rounded-[16px] shadow-lg bg-white p-2 text-center text-sm font-bold ">
            <Image
              src={"/assets/images/marketplace/glowing/vectorsss.png"}
              alt="openai"
              width={30}
              height={30}
              className="size-5"
            />
            <span>Click on generate with Ai</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-[16px] shadow-lg bg-white p-2 text-center text-sm font-bold ">
            <Image
              src={"/assets/images/marketplace/glowing/penwithline.png"}
              alt="openai"
              width={30}
              height={30}
              className="size-5"
            />
            <span>Describe your service briefly</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-[16px] shadow-lg bg-white p-2 text-center text-sm font-bold ">
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
      
      </div>
    </div>
  );
};

export default TaskhubCanGlowingBox;
