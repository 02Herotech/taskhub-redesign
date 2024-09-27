"use client";

import { truncateText } from "@/utils/marketplace";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaRegUser, FaStar } from "react-icons/fa6";

interface ListingCardProps {
  listingId: number;
  posterId: number;
  displayImage: string;
  businessName: string;
  pricing: number;
  fullName: string;
  profileImage: string;
  singleListing: ListingDataType;
  review: Review[];
}

const SingleListingCard = ({
  listingId,
  posterId,
  displayImage,
  businessName,
  pricing,
  fullName,
  profileImage,
  singleListing,
  review
}: ListingCardProps) => {
  const handlestoreListingId = (listingId: number, posterId: number) => {
    localStorage.setItem("content", JSON.stringify(singleListing));
  };
  const totalRatings = review.reduce((sum, reviews) => sum + reviews.rating, 0);
  const averageRating = Math.round(totalRatings / review.length);

  function abbreviateNumber(amount: number): string {
      return amount.toLocaleString();
  }

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} fill={i <= rating ? "gold" : "rgb(203 213 225)"} />
      );
    }
    return stars;
  };

  return (
    <Link
      href={`/marketplace/${listingId}`}
      onClick={() => handlestoreListingId(listingId, posterId)}
      className="group transition-transform duration-300 hover:-translate-y-2 "
    >
      <div className=" my-3 flex w-full lg:h-[320px] justify-center">
        <div className="flex w-full max-w-sm flex-col gap-2 rounded-2xl  bg-[#EBE9F4] p-3 ">
          <div className="">
            <Image
              src={displayImage}
              alt="user"
              width={200}
              height={200}
              quality={100}
              className="h-40  w-full rounded-xl border border-[#D9D9D9] object-cover transition-all  duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-2 flex h-full flex-col justify-between gap-2">
            <h2 className="text-lg font-bold  first-letter:uppercase md:text-lg">
              {truncateText(businessName, 20)}
            </h2>
            <p className="font-bold text-violet-normal text-[16px]">From ${abbreviateNumber(pricing)}</p>
            

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
              <div className="flex items-center gap-2">
                {renderStars(averageRating)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleListingCard;
