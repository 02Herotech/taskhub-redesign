import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";

interface ListingCardProps {
  listingId: number;
  posterId: number;
  displayImage: string;
  businessName: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  pricing: number;
}

const handlestoreListingId = (id: number) => {
  localStorage.setItem("listingId", JSON.stringify(id));
};

const SingleListingCard = ({
  listingId,
  posterId,
  displayImage,
  businessName,
  profileImage,
  firstName,
  lastName,
  pricing,
}: ListingCardProps) => {
  return (
    <Link
      href={`/marketplace/${listingId}?listingId=${listingId}&posterId=${posterId}`}
      onClick={() => handlestoreListingId(listingId)}
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
            <h2 className="text-lg  font-bold md:text-lg">
              {/* {businessName} */}
              Football coaching
            </h2>
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

            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      profileImage ?? "/assets/images/serviceProvider/user.jpg"
                    }
                    alt={firstName}
                    width={200}
                    height={200}
                    className="size-8 rounded-full object-cover "
                  />
                </div>

                <p className="text-sm font-semibold text-violet-dark">
                  {/* {firstName} {lastName} */}
                  Daniels Oluchi
                </p>
              </div>
              <p className="text-[16px] font-[600] text-violet-normal">
                {/* From ${pricing} */}
                From $100
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleListingCard;
