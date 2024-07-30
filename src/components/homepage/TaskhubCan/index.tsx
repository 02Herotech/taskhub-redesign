"use client";

import Image from "next/image";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import axios from "axios";

import image1 from "../../../../public/assets/images/homepage/securityFeatures/getStartedImg.png";
import image2 from "../../../../public/assets/images/homepage/securityFeatures/getStartedImg2.png";
import aiImage from "../../../../public/assets/images/homepage/securityFeatures/aiImage.png";

import icon1 from "../../../../public/assets/images/homepage/securityFeatures/getStartedIcon1.png";
import icon2 from "../../../../public/assets/images/homepage/securityFeatures/getStartedIcon2.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TaskhubCanGlowingBox from "./TaskhubCanGlowBox";

const Taskhub = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session?.user?.user);

  const handlePostTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      );
      console.log("Sign Out: ", response);

      if (response.status === 200) {
        await signOut({
          redirect: false,
        });
        router.push("/customer/add-task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={` w-full bg-[#CEFDF930] `}>
      <h1 className="block px-12 py-10 text-center font-clashMedium text-[20px] font-[900] text-[#381F8C] lg:hidden">
        {/* With Oloja you can: */}
      </h1>

      <div
        className={`font-SatoshiBold mx-auto flex max-w-7xl flex-wrap-reverse items-start  justify-between px-12 pb-20 lg:flex-nowrap lg:pt-[60px] xl:px-8 `}
      >
        <div className="flex w-[400px] flex-col gap-5 space-y-8 xl:w-1/2">
          <h1 className="hidden font-clashSemiBold text-[#381F8C]  lg:block lg:text-[55px] xl:text-[64px] ">
            With <span className="text-[#FE9B07]">TaskHub,</span>
            <br /> you can:
          </h1>
          <div className="flex flex-col gap-5 lg:space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-[20px] text-[#FE9B07]">
                <BsFillPatchCheckFill />
              </span>
              <p className="font-satoshi text-[16px] font-semibold text-[#140B31] lg:text-[24px]">
                Find the right professional in one place.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[20px] text-[#FE9B07]">
                <BsFillPatchCheckFill />
              </span>
              <p className="font-satoshi  text-[16px] font-semibold text-[#140B31] lg:text-[24px]">
                Choose from a range of services and experts.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[20px] text-[#FE9B07]">
                <BsFillPatchCheckFill />
              </span>
              <p className="font-satoshi text-[16px] font-semibold text-[#140B31] lg:text-[24px]">
                Leverage AI to create a listing for you in seconds.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[20px] text-[#FE9B07]">
                <BsFillPatchCheckFill />
              </span>
              <p className="font-satoshi text-[16px] font-semibold text-[#140B31] lg:text-[24px]">
                Save time and money with multiple bids.
              </p>
            </div>
          </div>
          <div className="">
            <button
              className="text-bold rounded-[50px] bg-primary px-7 py-2
           text-[16px] text-[#EBE9F4] hover:bg-[#25135f] lg:text-[20px] "
            >
              {session?.user?.user?.roles[0] === "SERVICE_PROVIDER" ? (
                <p onClick={handlePostTask}>Post at no cost today</p>
              ) : (
                <Link href="/customer/add-task">Post at no cost today</Link>
              )}
            </button>
          </div>
        </div>

        {/* Large screen Images  part*/}
        <div className=" hidden w-[500px] lg:block xl:w-1/2    ">
          <div className="relative">
            <div className="mt-20 flex justify-end  ">
              <div className="flex rounded-[30px] bg-white shadow-md ">
                <Image
                  src={image2}
                  width={250}
                  alt="devon lane "
                  className="z-0"
                ></Image>
                <div className="flex flex-col items-start justify-center space-y-6 rounded-r-xl bg-white px-4 text-[16px] xl:px-10">
                  <div className="flex text-[25px] text-[#F2994A] ">
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                    <MdOutlineStarPurple500 />
                  </div>
                  <p className="font-bold text-[#090914] ">5 Star Rating !!!</p>
                  <div className="flex space-x-2 text-[10px]">
                    <p className="text-[16px] font-[900] text-[#2A1769]">
                      Devon Lane
                    </p>
                    <p className="text-[16px] font-[900] text-[#716F78]">
                      DLDesign.co
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -ml-20 flex w-[300px] items-center space-x-2 rounded-[24px] bg-[#EEE5FC] px-3 py-3 text-[12px] shadow-md lg:top-[180px] xl:top-[160px] xl:w-[320px] ">
              <Image src={icon1} width={25} alt="hand & dollar"></Image>
              <p className=" text-[14px] font-[700] text-primary">
                Payment has been made
              </p>
              <p className="text-[14px] text-[#969696]">2mins ago</p>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="  ">
              <TaskhubCanGlowingBox />
            </div>
            <div className="absolute flex items-center space-x-2 rounded-[24px] bg-[#EEE5FC] px-4 py-2 text-[12px] shadow-md lg:right-[-5px] lg:top-[200px] xl:right-[20px] xl:top-[200px] xl:px-6 xl:py-3">
              <Image src={icon2} width={25} alt="hand shake"></Image>
              <p className=" text-[14px] font-[700] text-primary">
                Task completed
              </p>
              <p className="text-[14px] text-[#969696]">Just now</p>
            </div>
          </div>
        </div>

        {/* Mobile Images  part*/}

        <div className="w-full  lg:hidden   ">
          <div className=" w-full  ">
            <div className="relative">
              <div className="flex justify-end sm:items-center sm:justify-center   ">
                <div className="flex rounded-[30px] bg-white shadow-md ">
                  <Image
                    src={image2}
                    width={150}
                    alt="devon lane "
                    className="z-0"
                  ></Image>

                  <div className="flex flex-col items-start justify-center space-y-6 rounded-r-xl bg-white px-4 text-[12px]">
                    <div className="flex text-[16px] text-[#F2994A] ">
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                      <MdOutlineStarPurple500 />
                    </div>
                    <p className="text-[10px] font-bold">5 Star Rating !!!</p>
                    <div className="flex space-x-2 text-[8px]">
                      <p className="font-[900] text-[#2A1769]">Devon Lane</p>
                      <p className="text-[#716F78]">DLDesign.co</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-[25px] -ml-5 flex items-center space-x-2 rounded-xl bg-[#EEE5FC] px-3 py-2 text-[8px] shadow-md ">
                <Image src={icon1} width={25} alt="hand & dollar"></Image>
                <p className=" text-[12px] font-[700] text-primary">
                  Payment has been made
                </p>
                <p className="text-[12px] text-[#969696]">2mins ago</p>
              </div>
            </div>

            <div className="relative my-5">
              <div className=" items-center justify-center sm:flex  ">
                <TaskhubCanGlowingBox />
              </div>

              <div className="absolute -right-[30px] flex items-center space-x-2 rounded-[24px] bg-[#EEE5FC] px-4 py-2 text-[8px] shadow-md sm:right-[25px] sm:top-[200px]  ">
                <Image src={icon2} width={25} alt="hand shake"></Image>
                <p className=" text-[12px] font-[700] text-primary">
                  Task completed
                </p>
                <p className="text-[12px] text-[#969696]">Just now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskhub;
