"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import heroImage1 from "../../../../public/assets/images/homepage/hero/1.png";
import heroImage1a from "../../../../public/assets/images/homepage/hero/1a.png";
import heroImage2 from "../../../../public/assets/images/homepage/hero/2.png";
import heroImage2a from "../../../../public/assets/images/homepage/hero/2a.png";
import heroImage3 from "../../../../public/assets/images/homepage/hero/3.png";
import heroImage3a from "../../../../public/assets/images/homepage/hero/3a.png";
import heroImage4 from "../../../../public/assets/images/homepage/hero/4.png";
import heroImage4a from "../../../../public/assets/images/homepage/hero/4a.png";
// import icon1 from "../../../../public/assets/images/homepage/hero/icon1.png";
// import icon2 from "../../../../public/assets/images/homepage/hero/icon2.png";
// import icon3 from "../../../../public/assets/images/homepage/hero/icon3.png";

const useImageTransition = (images: any, transitionDuration: any) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Change image after the specified duration
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, transitionDuration);

        return () => clearInterval(interval); // Cleanup function to clear interval
    }, [images.length, transitionDuration]);

    return currentImageIndex;
};

interface searchListing {
    id: number;
    posterId: number;
    businessName: string;
    serviceCategory: string;
    subCategory: string;
    serviceDescription: string;
    serviceName: string;
    pricing: number;
    availableDays: [string];
    available: boolean;
    startHour: number;
    closeMinute: number;
    closeHour: number;
    startMinute: number;
    availableFrom: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
    };
    availableTo: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
    };
    userAddress: {
        id: number;
        streetNumber: string;
        streetName: string;
        unitNumber: string;
        suburb: string;
        state: string;
        postCode: string;
    };
    deleted: boolean;
    stripeId: string;
    businessPictures: [""];
}

const HeroSection = () => {
    const [search, setSearch] = useState("");
    const [searchListing, setSearchListing] = useState<searchListing[]>([]);
    const [searching, setSearching] = useState(false);

    const handleSearchChange = (e: any) => {
        setSearch(e.target.value); // Update the search state with the input value
    };

    const handleClearSearch = () => {
        setSearch("");
        setSearchListing([]); // Clear the search state
        setSearching(false);
    };

    // Image1 transition
    const images1 = [heroImage1, heroImage1a];
    const currentImageIndex1 = useImageTransition(images1, 3000);

    // Image2 transition
    const images2 = [heroImage2, heroImage2a];
    const currentImageIndex2 = useImageTransition(images2, 3000);

    // Image3 transition
    const images3 = [heroImage3, heroImage3a];
    const currentImageIndex3 = useImageTransition(images3, 3000);

    // Image4 transition
    const images4 = [heroImage4, heroImage4a];
    const currentImageIndex4 = useImageTransition(images4, 3000);

    return (
        <div
            className={` w-full bg-gradient-to-b from-[#f3dcfc] via-[#f5f1f7] to-[#FFFFFF] m-0`}
        >
            <div
                className={`mx-auto flex max-w-7xl items-center lg:justify-between justify-center gap-5 p-5 lg:pb-20 pt-[100px] lg:px-12 xl:px-8  `}
            >
                <div className={`flex lg:w-[45%] flex-col justify-around text-black `}>
                    <div className={`flex flex-col`}>
                        <h1
                            className={`mb-5 lg:mt-[3rem] text-center lg:text-left lg:text-[50px] text-[35px] font-[400] leading-tight lg:w-[500px] w-full font-SatoshiBold`}
                        >
                            Get Quick
                            <br />
                            And <span className={`font-bold text-purpleBase  bg-gradient-to-b from-[#1612C1] to-[#2E095DF2] via-[#32204A59] bg-clip-text text-transparent`}>Efficient</span> <br /> Service

                        </h1>



                        <p className={` text-center lg:text-left lg:w-[400px] font-SatoshiMedium lg:text-[20px] text-[15px] text-[#190E3F] `}
                        >
                            Our user-friendly platform ensures a seamless
                            experience, allowing you to effortlessly find,
                            connect, and engage with the perfect service
                            professionals.
                        </p>
                    </div>

                    {/* <div className="flex lg:flex-col flex-col-reverse items-center justify-center lg:justify-start lg:items-start">
                        <div className={`lg:my-10 my-5  flex items-center justify-center lg:justify-start`}>
                            <Link href="/auth/">
                                <button className="h-[40px] lg:w-[180px] w-[250px] rounded-[50px] border-none  bg-purpleBase text-[12px] lg:text-[16px]  text-white hover:bg-purpleHover">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        <div className="lg:w-[500px] mt-5 lg:mt-0 w-[250px] flex items-center justify-between rounded-xl border-[1.5px] border-grey3 bg-white px-8 py-4 ">
                            <div className="relative w-[30%] ">
                                <p className="text-[#381F8C]  font-bold lg:text-[18px] text-[9px]">
                                    1k+ <br /> customers
                                </p>
                                <span className="lg:block hidden absolute right-10 top-[1px] text-[#FE9B07] lg:text-[18px] text-[9px]">
                                    <Image src={icon1} width={25} alt=""></Image>
                                </span>


                                <span className="lg:hidden absolute  left-8 top-[-3px]  text-[#FE9B07]  text-[9px]">

                                    <Image src={icon1} width={15} alt="" className=" lg:hidden"></Image>
                                </span>
                            </div>


                            <div className="relative  w-[30%]">
                                <p className="text-[#381F8C]  font-bold lg:text-[18px] text-[9px]">
                                    2.5k <br /> tasks done
                                </p>

                                <span className="lg:block hidden absolute right-10 top-[-2px] text-[#FE9B07] lg:text-[18px] text-[9px]">
                                    <Image src={icon2} width={20} alt=""></Image>
                                </span>


                                <span className="lg:hidden absolute  left-8 top-[-3px]  text-[#FE9B07]  text-[9px]">

                                    <Image src={icon2} width={10} alt="" className=" lg:hidden"></Image>
                                </span>
                            </div>
                            <div className="relative  w-[33%]">
                                <p className="lg:text-[18px] text-[9px]  font-bold text-[#381F8C] ">
                                    4k+ <br /> user reviews
                                </p>

                                <span className="lg:block hidden absolute right-10 top-[-3px] text-[#FE9B07] lg:text-[18px] text-[9px]">
                                    <Image src={icon3} width={25} alt=""></Image>
                                </span>


                                <span className="lg:hidden absolute  left-8 top-[-3px]  text-[#FE9B07]  text-[9px]">

                                    <Image src={icon3} width={15} alt="" className=" lg:hidden"></Image>
                                </span>



                                <span className="absolute right-4 top-[3px] text-[#FE9B07]">
                  <Image src={icon3} width={25} alt=""></Image>
                </span> 
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="hidden lg:flex flex-col space-y-4">
                    <div className=" justify-center flex xl:justify-between">
                        <div className="flex flex-col">
                            <div className="">
                                <Image
                                    src={images1[currentImageIndex1]}
                                    alt=""
                                    className={`w-[270px] opacity-0 transition-opacity duration-1000 ease-in-out`}
                                    onLoadingComplete={(image) =>
                                        image.classList.remove("opacity-0")
                                    }
                                />
                            </div>
                            <div className="">
                                <Image
                                    src={images3[currentImageIndex3]}
                                    alt=""
                                    className={`w-[270px] opacity-0 transition-opacity duration-1000 ease-in-out`}
                                    onLoadingComplete={(image) =>
                                        image.classList.remove("opacity-0")
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col  ">
                            <div>
                                <Image
                                    src={images2[currentImageIndex2]}
                                    alt=""
                                    className={`w-[270px] opacity-0 transition-opacity duration-1000 ease-in-out `}
                                    onLoadingComplete={(image) =>
                                        image.classList.remove("opacity-0")
                                    }
                                />
                            </div>
                            <div>
                                <Image
                                    src={images4[currentImageIndex4]}
                                    alt="img"
                                    className={`w-[270px] opacity-0 transition-opacity duration-1000 ease-in-out`}
                                    onLoadingComplete={(image) =>
                                        image.classList.remove("opacity-0")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
