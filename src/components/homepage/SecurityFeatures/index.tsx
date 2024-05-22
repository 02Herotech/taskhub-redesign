"use client"

import Image from "next/image";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { BsShieldFillCheck } from "react-icons/bs";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import axios from "axios";

import image1 from "../../../../public/assets/images/homepage/securityFeatures/lady.jpg";

import { useRouter } from "next/navigation";
import Link from "next/link";

const SecurityFeatures = () => {
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
                router.push("/auth");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={` w-full  bg-gradient-to-b from-[#FAF2FD] via-[#FDF7FE] to-[#F6E1FD] `}>
            <div
                className={`lg:block hidden xl:ml-[80px] lg:ml-[48px] xl:pl-12 pb-20 lg:pt-[60px]   font-SatoshiBold `}
            >
                <div className="flex justify-between items-center">
                    <div className="flex w-[400px] flex-col gap-5 space-y-8 xl:w-1/2">
                        <h1 className="hidden xl:text-[50px] text-[40px] font-[900] text-[#381F8C] lg:block font-SatoshiBlack ">
                            Security features ensuring your trust and safety
                        </h1>
                        <div className="flex flex-col gap-5 lg:space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className="text-[20px] text-[#FE9B07]">
                                    <BiSolidBadgeDollar />
                                </span>
                                <p className="font-semibold lg:text-[24px] text-[16px]">Payments with Enhanced Security</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-[20px] text-[#FE9B07]">
                                    <BsFillPatchCheckFill />
                                </span>
                                <p className="font-semibold  lg:text-[24px] text-[16px]">Reliable ratings and reviews</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-[20px] text-[#FE9B07]">
                                    <BsShieldFillCheck />
                                </span>
                                <p className="font-semibold lg:text-[24px] text-[16px]">Coverage for peace of mind</p>
                            </div>
                        </div>

                    </div>

                    <div className="xl:h-[650px] xl:w-[650px] lg:h-[500px] lg:w-[500px]  relative rounded-l-[150px]">
                        <Image src={image1} fill alt="" className="absolute rounded-l-[150px]" />
                    </div>
                </div>


            </div>

            <div className="lg:hidden px-12">
                <h1 className=" text-[20px] text-center pt-10  font-[900] text-[#381F8C] block font-SatoshiBold">
                    Security features ensuring your trust and safety
                </h1>

                <div className="h-[250px] w-[250px] my-5 relative rounded-[150px]">
                    <Image src={image1} fill alt="" className="absolute rounded-[150px]" />
                </div>

                <div className="flex flex-col gap-5 pb-10 ">
                    <div className="flex items-center space-x-3">
                        <span className="text-[20px] text-[#FE9B07]">
                            <BiSolidBadgeDollar />
                        </span>
                        <p className="font-semibold  text-[16px]">Payments with Enhanced Security</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-[20px] text-[#FE9B07]">
                            <BsFillPatchCheckFill />
                        </span>
                        <p className="font-semibold   text-[16px]">Reliable ratings and reviews</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-[20px] text-[#FE9B07]">
                            <BsShieldFillCheck />
                        </span>
                        <p className="font-semibold text-[16px]">Coverage for peace of mind</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityFeatures;
