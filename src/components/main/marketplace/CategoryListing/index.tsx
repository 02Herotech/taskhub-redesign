"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/shared/loading";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateListingArray } from "@/store/Features/marketplace";
import Image from "next/image";
import SingleListingCard from "../marketplace/SingleListingCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CategoryListingProps {
  category: string;
}
interface PosterProfileTypes {
  id: number;
  profileImage: string;
  firstName: string;
  lastName: string;
}
const CategoryListing: React.FC<CategoryListingProps> = ({ category }) => {
  const dispatch = useDispatch();
  const { categories, listing, isFiltering, filteredData } = useSelector(
    (state: RootState) => state.market,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [allListsting, setallListsting] = useState<ListingDataType2[]>([]);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [imgErrMsg, setImgErrMsg] = useState("");
  const [IdCategoryValue, setIdCategoryValue] = useState(0);
  const [isViewMore, setIsViewMore] = useState({ state: false });
  const [displayListing, setDisplayListing] = useState<ListingDataType2[]>([]);
  const [page, setPage] = useState(0);

  const handleFetchCategory = async () => {
    setIsLoading(true);
    try {
      if (!category) {
        return;
      }
      let url;
      if (category === "All") {
        url =
          "https://smp.jacinthsolutions.com.au/api/v1/listing/all-active-listings/" +
          page;
      } else {
        url =
          "https://smp.jacinthsolutions.com.au/api/v1/listing/listing-by-category/" +
          IdCategoryValue +
          "?pn=0" +
          page;
      }
      const { data } = await axios.get(url);
      dispatch(updateListingArray(data.content));
      setallListsting(data.content);
      setDisplayListing(data.content);
    } catch (error) {
      setErrorMsg("Error searching listing");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleFetchCategory();
    // eslint-disable-next-line
  }, [page]);

  const [posterProfiles, setPosterProfiles] = useState<PosterProfileTypes[]>(
    [],
  );

  const handleFetchUserProfile = async (posterId: number) => {
    try {
      const url =
        "https://smp.jacinthsolutions.com.au/api/v1/user/user-profile/" +
        posterId;
      const {
        data: { profileImage, firstName, lastName },
      } = await axios.get(url);
      setPosterProfiles((prev) => [
        ...prev,
        { id: posterId, profileImage, firstName, lastName },
      ]);
    } catch (error) {
      setImgErrMsg("Error loading image");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (displayListing.length > 0) {
        setDisplayListing((prev) => [...prev.slice(0, 4)]);
        // for (let i = 0; i < displayListing.length; i++) {
        //   const id = displayListing[i].serviceProvider.id;
        //     await handleFetchUserProfile(id);
        // }
        // displayListing.forEach((task) => {
        //   handleFetchUserProfile(task.serviceProvider.id);
        // });
      }
      if (isViewMore.state) {
        setDisplayListing(allListsting);
        // displayListing.forEach((task) => {
        //   handleFetchUserProfile(task.serviceProvider.id);
        // });
        // for (let i = 0; i < displayListing.length; i++) {
        //   const id = displayListing[i].serviceProvider.id;
        //     await handleFetchUserProfile(id);
        // }
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [listing, category, isViewMore]);

  useEffect(() => {
    if (category) {
      setIdCategoryValue(
        categories?.filter((item) => item.categoryName === category)[0]?.id,
      );
    }
    // eslint-disable-next-line
  }, [category]);

  return (
    <div className="my-14 h-full w-full font-satoshi">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <h1 className=" text-lg font-bold text-violet-dark md:text-2xl">
            {isFiltering ? "Filtering" : category}
          </h1>
          {displayListing.length > 3 && (
            <button
              className="flex items-center gap-2 border-b-2 border-violet-normal text-sm font-bold  text-violet-normal"
              onClick={() =>
                setIsViewMore((prev) => ({ ...prev, state: !prev.state }))
              }
            >
              <span>{isViewMore.state ? "View Less" : "View More"}</span>
              <span>
                <FaArrowUp
                  className={`size-3  ${isViewMore.state ? "rotate-90" : "rotate-45"} `}
                />
              </span>
            </button>
          )}
        </div>
      </div>

      {ErrorMsg && (
        <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 md:h-[100px]">
          <Image
            src="/assets/images/marketplace/undraw_void_-3-ggu.svg"
            alt="nothing illustration"
            width={200}
            height={200}
            className="mx-auto h-full max-h-40"
          />
          <p className="sm:text[13px] text-center font-semibold text-violet-normal md:text-[16px]">
            No listing Available
          </p>
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : isFiltering ? (
        filteredData.length === 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center gap-4">
            <Image
              src={"/assets/images/marketplace/undraw_void_-3-ggu.svg"}
              alt="void"
              width={200}
              height={200}
            />
            <p className="text-lg text-violet-normal">
              No Listing Available at the moment
            </p>
          </div>
        ) : (
          <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredData.map((item, index) => {
              const currentPosterProfile: PosterProfileTypes =
                posterProfiles.filter(
                  (poster) => poster.id === item.serviceProvider.id,
                )[0];
              return (
                <SingleListingCard
                  key={index}
                  posterId={item.id}
                  listingId={item.id}
                  businessName={item.listingTitle}
                  displayImage={item.businessPictures[0]}
                  pricing={item.planOnePrice ?? 0}
                  firstName={currentPosterProfile?.firstName}
                  profileImage={currentPosterProfile?.profileImage}
                  lastName={currentPosterProfile?.lastName}
                />
              );
            })}
          </div>
        )
      ) : displayListing.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center gap-4">
          <Image
            src={"/assets/images/marketplace/undraw_void_-3-ggu.svg"}
            alt="void"
            width={200}
            height={200}
          />
          <p className="text-lg text-violet-normal">
            No Listing Available at the moment
          </p>
        </div>
      ) : (
        <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {displayListing.map((item, index) => {
            const currentPosterProfile: PosterProfileTypes =
              posterProfiles.filter((poster) => poster.id === item.id)[0];
            return (
              <SingleListingCard
                key={index}
                posterId={item.id}
                listingId={item.id}
                businessName={item.listingTitle}
                displayImage={item.businessPictures[0]}
                pricing={item.planOnePrice ?? 0}
                firstName={currentPosterProfile?.firstName}
                profileImage={currentPosterProfile?.profileImage}
                lastName={currentPosterProfile?.lastName}
              />
            );
          })}
        </div>
      )}
      {isViewMore.state && (
        <div className="mt-10 flex w-full items-center justify-center space-x-7">
          <button
            className="rounded-md bg-status-lightViolet p-2 hover:bg-primary disabled:bg-status-lightViolet disabled:opacity-50"
            // onClick={handlePreviousPage}
            // disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </button>
          {/* {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`rounded-md px-3 py-[6px] ${currentPage === index + 1 ? "bg-primary text-white" : "border border-black  hover:bg-status-lightViolet"} text-[11px] font-bold`}
              // onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </button>
          ))} */}
          <button
            className="rounded-md bg-status-lightViolet p-2 hover:bg-primary disabled:bg-status-lightViolet disabled:opacity-50"
            // onClick={handleNextPage}
            // disabled={currentPage === totalPages}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryListing;
