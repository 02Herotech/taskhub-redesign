"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useGetListingsBySearchQuery } from "@/services/listings";
import Loading from "@/shared/loading";
import SingleListingCard from "@/components/main/marketplace/marketplace/SingleListingCard";
import Pagination from "@/components/main/marketplace/Pagination";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText_ = searchParams.get("searchText");
  const [searchInput, setSearchInput] = useState(searchText_);
  const [searchText, setSearchText] = useState(searchText_);
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isLoading, error, isFetching } =
    useGetListingsBySearchQuery(searchText);

  const updateQuery = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("searchText", newValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-screen-xl flex-col px-6 pt-16 md:px-16">
      {/* Search form */}
      <div className="mb-6 flex justify-between gap-4 py-4 max-md:flex-col md:gap-8 lg:items-center">
        <div className="">
          <h1 className="text-xl font-bold text-violet-dark md:text-3xl">
            Results “{searchText}”
          </h1>
          <p className="text-base font-[400] text-violet-darkHover md:text-lg">
            Here’s a few of our {searchText} listings
          </p>
        </div>

        <form
          className="flex w-full items-center gap-2 lg:max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const searchInput_ = searchInput.trim();
            if (searchInput_.length < 3) return;
            setSearchText(searchInput_);
            updateQuery(searchInput_);
          }}
        >
          <div className="w-full">
            <input
              type="text"
              className="w-full rounded-xl border border-violet-normal px-4 py-3   text-lg text-slate-500 shadow  placeholder-shown:border-slate-300 placeholder-shown:outline-none focus:outline-none "
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-primary p-3 text-[12px] text-white hover:bg-status-darkViolet focus:outline-none"
          >
            <FiSearch size={20} />
          </button>
        </form>
      </div>

      {(isLoading || isFetching) && <Loading />}

      {error && (
        <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 md:h-[100px]">
          <p className="sm:text[13px] text-center font-semibold text-red-500 md:text-[16px]">
            Kindly check your connection
          </p>
        </div>
      )}

      {data?.content.length < 1 && !isFetching && <div>No search results</div>}

      <ul
        aria-label="List of services"
        className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {data &&
          !isFetching &&
          data.content.map((listing) => (
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
                profileImage={listing?.serviceProvider?.user?.profileImage}
                review={listing.reviews}
              />
            </li>
          ))}
      </ul>

      {/* {data && (
        <Pagination
          pageNumber={data?.pageNumber}
          setPage={setPage}
          totalPages={data?.totalPages}
        />
      )} */}
    </div>
  );
}

export default Page;
