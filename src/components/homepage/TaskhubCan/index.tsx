"use client"

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
    console.log(session?.user?.user)

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

            <h1 className="lg:hidden text-[20px] text-center py-10 px-12 font-[900] text-[#381F8C] block font-clashMedium">
                With TaskHub you can:
            </h1>

            <div
                className={`mx-auto flex max-w-7xl flex-wrap-reverse items-start justify-between  px-12 pb-20 lg:pt-[60px] lg:flex-nowrap xl:px-8 font-SatoshiBold `}
            >
                <div className="flex w-[400px] flex-col gap-5 space-y-8 xl:w-1/2">
                    <h1 className="hidden xl:text-[64px] lg:text-[55px]  text-[#381F8C] lg:block font-clashSemiBold ">
                        With <span className="text-[#FE9B07]">TaskHub,</span><br /> you can:
                    </h1>
                    <div className="flex flex-col gap-5 lg:space-y-6">
                        <div className="flex items-center space-x-3">
                            <span className="text-[20px] text-[#FE9B07]">
                                <BsFillPatchCheckFill />
                            </span>
                            <p className="font-semibold lg:text-[24px] text-[16px] font-satoshi text-[#140B31]">Find the right professional in one place.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-[20px] text-[#FE9B07]">
                                <BsFillPatchCheckFill />
                            </span>
                            <p className="font-semibold  lg:text-[24px] text-[16px] font-satoshi text-[#140B31]">Choose from a range of services and experts.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-[20px] text-[#FE9B07]">
                                <BsFillPatchCheckFill />
                            </span>
                            <p className="font-semibold lg:text-[24px] text-[16px] font-satoshi text-[#140B31]">Leverage AI to create a listing for you in seconds.</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="text-[20px] text-[#FE9B07]">
                                <BsFillPatchCheckFill />
                            </span>
                            <p className="font-semibold lg:text-[24px] text-[16px] font-satoshi text-[#140B31]">Save time and money with multiple bids.</p>
                        </div>
                    </div>
                    <div className="">
                        <button
                            className="text-bold rounded-[50px] bg-primary lg:text-[20px] text-[16px]
           px-7 py-2 text-[#EBE9F4] hover:bg-[#25135f] "
                        >

                            {session?.user?.user?.roles[0] === "SERVICE_PROVIDER" ? (
                                <p onClick={handlePostTask}>Post at no cost today</p>
                            ) : (
                                <Link href="/customer/add-task">
                                    Post at no cost today
                                </Link>
                            )}
                        </button>
                    </div>
                </div>

                {/* Large screen Images  part*/}
                <div className=" xl:w-1/2 w-[500px] hidden lg:block    ">

                    <div className="relative">
                        <div className="flex justify-end mt-20  ">
                            <div className="flex shadow-md bg-white rounded-[30px] ">
                                <Image src={image2} width={250} alt="devon lane " className="z-0"></Image>
                                <div className="flex flex-col text-[16px] bg-white rounded-r-xl xl:px-10 px-4 items-start justify-center space-y-6">
                                    <div className="flex text-[#F2994A] text-[25px] ">
                                        <MdOutlineStarPurple500 />
                                        <MdOutlineStarPurple500 />
                                        <MdOutlineStarPurple500 />
                                        <MdOutlineStarPurple500 />
                                        <MdOutlineStarPurple500 />
                                    </div>
                                    <p className="font-bold text-[#090914] ">5 Star Rating !!!</p>
                                    <div className="flex text-[10px] space-x-2">
                                        <p className="font-[900] text-[16px] text-[#2A1769]">Devon Lane</p>
                                        <p className="text-[16px] text-[#716F78] font-[900]">DLDesign.co</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="flex space-x-2 shadow-md items-center text-[12px] bg-[#EEE5FC] rounded-[24px] px-3 py-3 xl:w-[320px] w-[300px] absolute xl:top-[160px] lg:top-[180px] -ml-20 ">
                            <Image src={icon1} width={25} alt="hand & dollar"></Image>
                            <p className=" font-[700] text-[14px] text-primary">Payment has been made</p>
                            <p className="text-[#969696] text-[14px]">2mins ago</p>
                        </div>
                    </div>


                    <div className="mt-10 relative">
                        <div className="  ">
                            <TaskhubCanGlowingBox />
                        </div>
                        <div className="flex space-x-2 shadow-md items-center text-[12px] bg-[#EEE5FC] rounded-[24px] px-4 py-2 absolute xl:top-[200px] xl:right-[20px] lg:top-[200px] lg:right-[-5px] xl:py-3 xl:px-6">
                            <Image src={icon2} width={25} alt="hand shake"></Image>
                            <p className=" font-[700] text-[14px] text-primary">Task completed</p>
                            <p className="text-[#969696] text-[14px]">Just now</p>
                        </div>
                    </div>


                </div>

                {/* Mobile Images  part*/}

                <div className="lg:hidden  w-full   ">
                    <div className=" w-full  ">
                        <div className="relative">
                            <div className="flex justify-end sm:justify-center sm:items-center   ">
                                <div className="flex shadow-md bg-white rounded-[30px] ">
                                    <Image src={image2} width={150} alt="devon lane " className="z-0"></Image>

                                    <div className="flex flex-col text-[12px] bg-white rounded-r-xl px-4 items-start justify-center space-y-6">
                                        <div className="flex text-[#F2994A] text-[16px] ">
                                            <MdOutlineStarPurple500 />
                                            <MdOutlineStarPurple500 />
                                            <MdOutlineStarPurple500 />
                                            <MdOutlineStarPurple500 />
                                            <MdOutlineStarPurple500 />
                                        </div>
                                        <p className="font-bold text-[10px]">5 Star Rating !!!</p>
                                        <div className="flex text-[8px] space-x-2">
                                            <p className="font-[900] text-[#2A1769]">Devon Lane</p>
                                            <p className="text-[#716F78]">DLDesign.co</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="flex space-x-2 shadow-md items-center text-[8px] bg-[#EEE5FC] rounded-xl px-3 py-2 absolute -top-[25px] -ml-5 ">
                                <Image src={icon1} width={25} alt="hand & dollar"></Image>
                                <p className=" font-[700] text-[12px] text-primary">Payment has been made</p>
                                <p className="text-[#969696] text-[12px]">2mins ago</p>
                            </div>
                        </div>


                        <div className="my-5 relative">
                            <div className=" sm:flex items-center justify-center  ">
                                <TaskhubCanGlowingBox />
                            </div>

                            <div className="flex space-x-2 shadow-md items-center text-[8px] bg-[#EEE5FC] rounded-[24px] px-4 py-2 absolute -right-[30px] sm:right-[25px] sm:top-[200px]  ">
                                <Image src={icon2} width={25} alt="hand shake"></Image>
                                <p className=" font-[700] text-[12px] text-primary">Task completed</p>
                                <p className="text-[#969696] text-[12px]">Just now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Taskhub;
