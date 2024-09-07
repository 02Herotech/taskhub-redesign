"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Reviews from "@/components/matkeplaceSingleTask/Reviews";
import axios from "axios";
import ImageModal from "@/components/main/marketplace/ImageModal";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MessageButton from "@/components/global/MessageButton";
import { useSession } from "next-auth/react";
import AllServices from "@/components/dashboard/serviceProvider/services/AllServices";
import { truncateText } from "@/utils/marketplace";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiDotsVertical } from "react-icons/bi";
import { BsPencilSquare, BsX } from "react-icons/bs";

const Page = () => {
    const session = useSession();
    const token = session?.data?.user.refreshToken;
    const [displayData, setDisplayData] = useState<ListingDataType>();
    const [currentListing, setCurrentListing] = useState<ListingDataType>();
    const [providerListings, setProviderListings] = useState<ListingDataType[]>([]);
    const [showImageModal, setShowImageModal] = useState({
        state: false,
        image: "",
    });

    const { id } = useParams();

    const { userProfileAuth: auth } = useSelector(
        (state: RootState) => state.userProfile,
    );

    useEffect(() => {
        const tempList = localStorage.getItem("content");
        if (tempList) {
            const content: ListingDataType = JSON.parse(tempList);
            setDisplayData(content);
        }
    }, []);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                if (!displayData) return;
                const url = `https://smp.jacinthsolutions.com.au/api/v1/listing/${id}`;
                const { data } = await axios.get(url);
                setCurrentListing(data);
            } catch (error: any) {
                console.log(error.response.data);
            }
        };
        fetchListing();
    }, [displayData, id]);

    useEffect(() => {
        const fetchProviderListings = async () => {
            try {
                const serviceProviderId = displayData?.serviceProvider.id;
                console.log(serviceProviderId)
                const url = `https://smp.jacinthsolutions.com.au/api/v1/service_provider/get-profile/${serviceProviderId}`;
                const response = await axios.get(url,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                 );
                console.log(response.data?.serviceProviderListing)
                setProviderListings(response.data?.serviceProviderListing); 
            } catch (error: any) {
                console.log(error.response.data);
            }
        };
        fetchProviderListings();
    }, [token, displayData]);

    return (
        <>
            <main className=" relative  pt-16 font-satoshiMedium text-[#221354] ">
                <section className="grid gap-4">
                    <article className="space-y-4 lg:col-span-7">
                        <div className="container space-y-4 ">
                            <div className="space-y-6 py-4">
                                <h1 className="font-satoshiBold text-3xl font-bold">
                                    About the provider
                                </h1>
                                <div className="flex listings-center justify-between">
                                    <div className="flex listings-center gap-4">
                                        <Image
                                            src={
                                                displayData?.serviceProvider?.user.profileImage ??
                                                "/assets/images/serviceProvider/user.jpg"
                                            }
                                            alt="User"
                                            width={80}
                                            height={80}
                                            quality={100}
                                            className="size-20 rounded-full object-cover "
                                        />
                                        <div className="space-y-2">
                                            <p className="text-xl font-medium">
                                                {displayData?.serviceProvider?.user?.fullName}
                                            </p>
                                            <div>
                                                <div className="flex listings-center gap-2">
                                                    <FaStar
                                                        fill="rgb(203 213 225)"
                                                        color="rgb(203 213 225)"
                                                    />
                                                    <FaStar
                                                        fill="rgb(203 213 225)"
                                                        color="rgb(203 213 225)"
                                                    />
                                                    <FaStar
                                                        fill="rgb(203 213 225)"
                                                        color="rgb(203 213 225)"
                                                    />
                                                    <FaStar
                                                        fill="rgb(203 213 225)"
                                                        color="rgb(203 213 225)"
                                                    />
                                                    <FaStar
                                                        fill="rgb(203 213 225)"
                                                        color="rgb(203 213 225)"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {currentListing &&
                                        auth.token &&
                                        auth.role?.[0] === "CUSTOMER" && (
                                            <MessageButton
                                                recipientId={currentListing.serviceProvider.user.id.toString()}
                                                recipientName={
                                                    currentListing?.serviceProvider.user.fullName
                                                }
                                            />
                                        )}
                                </div>
                                <p className="font-medium">
                                    {/* @ts-ignore */}
                                    {currentListing?.serviceProvider.bio}
                                </p>
                            </div>
                        </div>
                    </article>
                </section>

                {/* Portfolio */}
                <section className="mx-auto w-full space-y-4 p-4  py-8 lg:p-16 ">
                    <h1 className="text-3xl text-center font-bold text-violet-darkHover">
                        Portfolio
                    </h1>
                    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12">
                        <Image
                            src={displayData?.businessPictures[0] ?? ""}
                            alt={displayData?.businessPictures[0] ?? ""}
                            width={1600}
                            height={1600}
                            quality={100}
                            onClick={() =>
                                setShowImageModal({
                                    state: true,
                                    image: displayData?.businessPictures[0] ?? "",
                                })
                            }
                            className="mx-auto h-96 w-full rounded-xl  object-cover lg:col-span-6 "
                        />
                        <div className="flex flex-col gap-5 md:grid md:grid-cols-2 lg:col-span-6">
                            {displayData?.businessPictures
                                .slice(1, 4)
                                .map((listing, index) => (
                                    <Image
                                        key={listing}
                                        src={listing}
                                        alt={listing}
                                        width={1600}
                                        height={1600}
                                        quality={100}
                                        onClick={() =>
                                            setShowImageModal({ state: true, image: listing })
                                        }
                                        className={`mx-auto h-44 w-full rounded-xl object-cover ${index === 0 && "md:col-span-2"} `}
                                    />
                                ))}
                        </div>
                    </div>
                </section>

                {/* All Listings */}
                <section className="mx-auto w-full space-y-4 p-4  py-8 lg:p-12 ">
                    <h1 className="text-3xl text-center font-bold text-violet-darkHover">
                        All Listings
                    </h1>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {providerListings.map((listing, index) => (
                            //<Link href={`/marketplace/${listing.id}`} key={listing.id}>
                            <motion.div
                                key={index}
                                className=" group cursor-pointer space-y-8 rounded-xl bg-[#EBE9F4] p-2 transition-all duration-300 "
                                initial={{ opacity: 0, translateY: "5rem" }}
                                whileInView={{ opacity: 1, translateY: "0" }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="space-y-2">
                                    <div className="relative h-52  w-72 overflow-hidden rounded-xl">
                                        <Image
                                            src={listing.businessPictures[0] ?? ""}
                                            width={400}
                                            height={400}
                                            alt={listing.listingTitle}
                                            className=" h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 "
                                        />
                                    </div>
                                    <p className="line-clamp-1 px-2 text-3xl font-bold text-[#190E3F] ">
                                        {truncateText(listing.listingTitle, 15)}
                                    </p>

                                    <div
                                        className="px-2"
                                    >
                                        {/* <p className="text-xs"> 4.5 </p> */}
                                        <div className="flex listings-center gap-1">
                                            {/* <FaStar size={10} color="gold" />*/}
                                            <FaStar size={10} color="grey" />
                                            <FaStar size={10} color="grey" />
                                            <FaStar size={10} color="grey" />
                                            <FaStar size={10} color="grey" />
                                            <FaStar size={10} color="grey" />
                                        </div>
                                        <div className="flex listings-center justify-between gap-3">
                                            <div className="flex listings-center gap-2 py-3">
                                                <Image
                                                    src={
                                                        displayData?.serviceProvider.user.profileImage ??
                                                        "/assets/images/serviceProvider/user.jpg"
                                                    }
                                                    alt={listing.listingTitle ?? "user"}
                                                    width={20}
                                                    height={20}
                                                    className="size-5 rounded-full"
                                                />
                                                <p className="text-xs">
                                                    {displayData?.serviceProvider.user.fullName}
                                                </p>
                                            </div>
                                            <p className="font-bold text-[#381F8C] ">
                                                From ${listing.planOnePrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                </motion.div>
                            //</Link>
                        ))}
                    </div>
                </section>

                <Reviews />
            </main>
        </>
    );
};

export default Page;
