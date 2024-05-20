"use client"

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";

import image1 from "../../../../public/assets/images/homepage/serviceProvider/spImage1.png";
import image2 from "../../../../public/assets/images/homepage/serviceProvider/spImage2.png";
import icon1 from "../../../../public/assets/images/homepage/serviceProvider/spIcon1.png";
import icon2 from "../../../../public/assets/images/homepage/serviceProvider/spIcon2.png";
import icon3 from "../../../../public/assets/images/homepage/serviceProvider/spIcon3.png";
import icon4 from "../../../../public/assets/images/homepage/serviceProvider/spIcon4.png";

const SPHomepage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleBecomeSP = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
            );

            await signOut({
                redirect: false,
            });

            console.log("Sign Out: ", response);

            if (response.status === 200) {
                router.push("/auth");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className={`w-full bg-gradient-to-b from-[#FAF2FD] via-[#FDF7FE] to-[#F6E1FD] `}
        >
            <div
                className={`mx-auto lg:flex max-w-7xl  items-start justify-between p-5 px-12 pb-20 lg:py-[80px] xl:pb-[170px] pt-[50px] xl:px-8 `}
            >
                <div className="lg:inline-block hidden  relative xl:w-[45%]">
                    <Image src={image1} width={450} height={600} alt="Service Provider1"></Image>
                    <div className=" absolute mt-[-100px] xl:left-[50px] lg:right-12">
                        <Image src={image2} width={320} height={500} alt="Service Provider2"></Image>
                    </div>

                </div>

                <div className="lg:hidden ">
                    <div className="  space-y-3 text-center mb-5">
                        <h1 className="text-[24px] font-extrabold">SERVICE PROVIDERS</h1>
                        <h4 className="text-[16px] leading-tight font-bold">
                            Our service provider gives you Quality <br />
                            you Expect, the service you Deserve!
                        </h4>
                    </div>
                    <div className="  flex flex-col items-center justify-center ">
                        <Image src={image1} width={280} alt="Service Provider1"></Image>

                        <div className="mt-[-100px]    ">
                            <Image src={image2} width={230} alt="Service Provider2"></Image>
                        </div>
                    </div>

                </div>

                <div className="hidden lg:flex flex-col space-y-7 lg:w-[600px]">
                    <div className="ml-16 flex flex-col space-y-7">
                        <div className="hidden lg:flex flex-col space-y-3">
                            <h1 className="text-[40px] font-extrabold">SERVICE PROVIDERS</h1>
                            <h4 className="text-[25px] leading-tight font-bold">
                                Our service provider gives you Quality <br />
                                you Expect, the service you Deserve!
                            </h4>
                        </div>

                        <div className="flex w-full">
                            <div className="flex items-center space-x-2 rounded-3xl bg-[#FE9B07] px-3 py-2 ">
                                <Image src={icon1} width={20} alt="24/7"></Image>
                                <p className="text-[12px] font-bold">24/7 Availability</p>
                            </div>
                        </div>
                    </div>

                    <div className=" flex flex-col space-y-5">
                        <div className="flex items-center justify-between lg:px-7 ">
                            <Image src={icon2} width={60} alt=""></Image>
                            <p className="text-left lg:w-[450px]">
                                At TaskHub, we understand the importance of being there for our{" "}
                                customers whenever they need us. That&apos;s why we are proud to
                                offer round-the-clock availability, ensuring that assistance and
                                support are always just a click or a call away.
                            </p>
                        </div>
                        <span className="hidden lg:block h-[2px] w-full bg-black"></span>
                    </div>

                    <div className="ml-16 flex w-full">
                        <div className="flex items-center space-x-2 rounded-3xl bg-[#FE9B07] px-3 py-2 ">
                            <Image src={icon3} width={20} alt="24/7"></Image>
                            <p className="text-[12px] font-bold">
                                Professional Service Providers
                            </p>
                        </div>
                    </div>

                    <div className=" flex flex-col space-y-5">
                        <div className="flex items-center justify-between lg:px-7">
                            <Image src={icon4} width={60} alt=""></Image>
                            <p className="text-left lg:w-[450px]" >
                                Our Specialists offer specialized services with a high level of
                                expertise, integrity, and reliability. They offer tailored
                                solutions to meet your unique needs, maintaining professionalism
                                and adhering to industry standards.
                            </p>
                        </div>
                        <span className="hidden lg:block h-[2px] w-full bg-black"></span>
                    </div>

                    <div className="mt-10">
                        <button
                            className="text-bold rounded-[50px] w-[250px] bg-[#FE9B07] text-[#FFF5E6] lg:text-[16px]
                          px-3 py-2   ml-16 mt-10 hover:bg-[#f0b357]  "
                        >
                            {session?.user?.user?.roles[0] === "CUSTOMER" ? (
                                <div
                                    onClick={handleBecomeSP}
                                    className="flex items-center justify-center"
                                >
                                    <p className="">Become a Service Provider</p>
                                    <span className="-rotate-45">
                                        <IoArrowForward />
                                    </span>
                                </div>
                            ) : (
                                <Link
                                    href="/service-provider/dashboard"
                                    className="flex items-center justify-center"
                                >
                                    <p className="">Become a Service Provider</p>
                                    <span className="-rotate-45">
                                        <IoArrowForward />
                                    </span>
                                </Link>
                            )}
                        </button>
                    </div>
                </div>

                <div className="lg:hidden flex flex-col space-y-7 mt-10">
                    <div className="ml-10 ">
                        <div className="w-[160px] flex justify-center  items-center space-x-2 rounded-3xl bg-[#FE9B07] px-3 py-2 ">
                            <Image src={icon1} width={20} alt="24/7"></Image>
                            <p className="text-[10px] font-bold">24/7 Availability</p>
                        </div>

                    </div>

                    <div className=" flex items-center gap-2 ">
                        <Image src={icon2} width={50} height={30} alt="" className="align-top"></Image>
                        <p className="text-left text-[14px]">
                            At TaskHub, we understand the importance of being there for our{" "}
                            customers whenever they need us. That&apos;s why we are proud to
                            offer round-the-clock availability, ensuring that assistance and
                            support are always just a click or a call away.
                        </p>


                    </div>

                    <div className="ml-10 ">
                        <div className="w-[220px] flex items-center justify-center space-x-2 rounded-3xl bg-[#FE9B07] px-3 py-2 ">
                            <Image src={icon3} width={20} alt="24/7"></Image>
                            <p className="text-[10px] font-bold">
                                Professional Service Providers
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-2">
                        <Image src={icon4} width={50} alt=""></Image>
                        <p className="text-left text-[14px]" >
                            Our Specialists offer specialized services with a high level of
                            expertise, integrity, and reliability. They offer tailored
                            solutions to meet your unique needs, maintaining professionalism
                            and adhering to industry standards.
                        </p>
                    </div>


                    <button
                        className="text-bold rounded-[50px] w-[250px] bg-[#FE9B07] text-[#FFF5E6] lg:text-[16px]
                          px-3 py-2   ml-10 mt-10 hover:bg-[#e79823]  "
                    >
                        {session?.user?.user?.roles[0] === "CUSTOMER" ? (
                            <div
                                onClick={handleBecomeSP}
                                className="flex items-center justify-center"
                            >
                                <p className="">Become a Service Provider</p>
                                <span className="-rotate-45">
                                    <IoArrowForward />
                                </span>
                            </div>
                        ) : (
                            <Link
                                href="/service-provider/dashboard"
                                className="flex items-center justify-center"
                            >
                                <p className="">Become a Service Provider</p>
                                <span className="-rotate-45">
                                    <IoArrowForward />
                                </span>
                            </Link>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SPHomepage;
