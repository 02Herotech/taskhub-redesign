import React, { useState } from "react";
import SingleListingCard from "@/components/main/marketplace/marketplace/SingleListingCard";
import { usePathname } from "next/navigation";
import { FaArrowUp } from "react-icons/fa";
import Loading from "@/shared/loading";
import Link from "next/link";
import Pagination from "@/components/main/marketplace/Pagination";

type Props = {
  setPage?: any;
  category: string;
  data: ServicesResult;
  isLoading: boolean;
  error: any;
};

/**Renders all listing and pagination */
function Category({ setPage, category, data, isLoading, error }: Props) {
  const isMarketPlacePage = usePathname() === "/marketplace";
  return (
    <>
      {(!data ||
        (data && (!isMarketPlacePage || data.content.length >= 4))) && (
        <div className="h-full w-full py-4 ">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex w-full items-center justify-between gap-4">
              <h1 className="text-xl font-bold text-violet-darkHover md:text-2xl">
                {category}
              </h1>
              {data?.content.length > 4 && (
                <Link
                  href={
                    isMarketPlacePage
                      ? "/marketplace/category?selected=" + category
                      : "/marketplace"
                  }
                  className="flex items-center gap-2 border-b-2 border-violet-normal text-sm font-bold  text-violet-normal"
                >
                  <span className="whitespace-nowrap">
                    {isMarketPlacePage ? "View More" : "View Less"}
                  </span>
                  <span>
                    <FaArrowUp
                      className={`size-3  ${isMarketPlacePage ? "rotate-45" : "rotate-90"} `}
                    />
                  </span>
                </Link>
              )}
            </div>
          </div>

          {isLoading && <Loading />}

          {error && (
            <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 md:h-[100px]">
              <p className="sm:text[13px] text-center font-semibold text-red-500 md:text-[16px]">
                Kindly check your connection
              </p>
            </div>
          )}

          <ul
            aria-label="List of services"
            className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {data &&
              (isMarketPlacePage ? data.content.slice(0, 4) : data.content).map(
                (listing) => (
                  <li key={listing.id}>
                    <SingleListingCard
                      key={listing.id}
                      singleListing={listing}
                      listingId={listing.id}
                      posterId={listing?.serviceProvider?.id}
                      businessName={listing.listingTitle}
                      displayImage={listing.businessPictures[0]}
                      pricing={listing.planOnePrice ?? 0}
                      fullName={listing?.serviceProvider?.user?.fullName}
                      profileImage={
                        listing?.serviceProvider?.user?.profileImage
                      }
                      review={listing.reviews}
                    />
                  </li>
                ),
              )}
          </ul>

          {/* Pagination (Display when not on marketplace page) */}
          {data && !isMarketPlacePage && (
            <Pagination
              pageNumber={data?.pageNumber}
              setPage={setPage}
              totalPages={data?.totalPages}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Category;
