import Image from "next/image";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import Link from "next/link";
import TaskhubCanGlowingBox from "@/components/homepage/TaskhubCan/TaskhubCanGlowBox";

const Feature = () => {
  return (
    <div className={` w-full `}>
      <h1 className="block px-12 py-10 text-center font-clashMedium text-[20px] font-[900] uppercase text-[#381F8C] lg:hidden">
        With OLÓJÀ you can:
      </h1>

      <div
        className={`font-SatoshiBold mx-auto flex max-w-7xl flex-wrap-reverse items-start justify-between  gap-10 px-12 pb-20 lg:flex-nowrap lg:pt-[60px] xl:px-8 `}
      >
        <div className="flex w-[400px] flex-col gap-5 space-y-8 xl:w-1/2">
          <h1 className="hidden font-clashSemiBold uppercase text-[#381F8C]  lg:block lg:text-[55px] xl:text-[64px] ">
            With OLÓ<span className="text-[#FE9B07]">JÀ,</span>
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
              className="text-bold rounded-full bg-violet-light px-7 py-2
           font-satoshiBold text-[16px] font-semibold text-violet-active  lg:text-[20px] "
              disabled={true}
            >
              Start Posting task for free
            </button>
          </div>
        </div>

        {/* Large screen Images  part*/}
        <div className=" hidden w-[500px] px-4 lg:block xl:w-1/2    ">
          <div className="relative">
            <div className="mt-20 flex justify-end  ">
              <div className="flex rounded-[30px] bg-white shadow-md ">
                <Image
                  src={
                    "/assets/images/homepage/securityFeatures/getStartedImg2.png"
                  }
                  width={250}
                  height={250}
                  quality={100}
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
              <Image
                src={
                  "/assets/images/homepage/securityFeatures/getStartedIcon1.png"
                }
                width={25}
                height={25}
                quality={100}
                alt="hand & dollar"
              ></Image>
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
              <Image
                src={
                  "/assets/images/homepage/securityFeatures/getStartedIcon2.png"
                }
                width={25}
                height={25}
                quality={100}
                alt="hand shake"
              ></Image>
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
                    src={
                      "/assets/images/homepage/securityFeatures/getStartedImg2.png"
                    }
                    width={150}
                    height={150}
                    quality={100}
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
                <Image
                  src={
                    "/assets/images/homepage/securityFeatures/getStartedIcon1.png"
                  }
                  width={25}
                  height={25}
                  quality={100}
                  alt="hand & dollar"
                ></Image>
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
                <Image
                  src={
                    "/assets/images/homepage/securityFeatures/getStartedIcon2.png"
                  }
                  width={25}
                  height={25}
                  quality={100}
                  alt="hand shake"
                ></Image>
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

export default Feature;
