"use client";

import { truncateText } from "@/utils/marketplace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";

interface ListingCardProps {
  listingId: number;
  posterId: number;
  displayImage: string;
  businessName: string;
  pricing: number;
  fullName: string;
  profileImage: string;
}

const handlestoreListingId = (listingId: number, posterId: number) => {
  const content = { a: listingId, b: posterId };
  localStorage.setItem("content", JSON.stringify(content));
};

const SingleListingCard = ({
  listingId,
  posterId,
  displayImage,
  businessName,
  pricing,
  fullName,
  profileImage,
}: ListingCardProps) => {
  return (
    <Link
      href={`/marketplace/${listingId}`}
      onClick={() => handlestoreListingId(listingId, posterId)}
      className="group transition-transform duration-300 hover:-translate-y-2 "
    >
      <div className=" my-3 flex w-full justify-center">
        <div className="flex w-full max-w-sm flex-col rounded-2xl  bg-[#EBE9F4] p-3 ">
          <div className="">
            <Image
              src={displayImage}
              alt="user"
              width={200}
              height={200}
              className="h-40  w-full rounded-xl border border-[#D9D9D9] object-cover transition-all  duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-2 flex h-full flex-col justify-between">
            <h2 className="text-lg  font-bold md:text-lg">{businessName}</h2>
            <div className="py-4 ">
              <p className="text-xs">4.5</p>
              <div className="flex items-center gap-1 ">
                <BsStarFill className="size-3 fill-orange-normal" />
                <BsStarFill className="size-3 fill-orange-normal" />
                <BsStarFill className="size-3 fill-orange-normal" />
                <BsStarFill className="size-3 fill-orange-normal" />
                <BsStarFill className="size-3 fill-violet-400" />
              </div>
            </div>

            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <Image
                  src={
                    profileImage ?? "/assets/images/serviceProvider/user.jpg"
                  }
                  alt={fullName}
                  width={200}
                  height={200}
                  className="size-8 rounded-full object-cover "
                />
                <p className="text-sm font-semibold text-violet-dark">
                  {truncateText(fullName, 10)}
                </p>
              </div>
              <p className="font-bold text-violet-normal">From ${pricing}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleListingCard;
