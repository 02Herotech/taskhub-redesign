"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight, FaRegUser } from "react-icons/fa6";

import Loading from "@/shared/loading";
import Listing from "../Listing";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateListingArray } from "@/store/Features/marketplace";
import Image from "next/image";

interface CategoryListingProps {
  category: string;
}

const CategoryListing: React.FC<CategoryListingProps> = ({ category }) => {
  const dispatch = useDispatch();
  const { categories, listing } = useSelector(
    (state: RootState) => state.market,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [imgErrMsg, setImgErrMsg] = useState("");
  const [IdCategoryValue, setIdCategoryValue] = useState(0);
  const [profileImages, setProfileImages] = useState<{ [key: number]: string }>(
    {},
  );
  const [firstName, setFirstName] = useState<{ [key: number]: string }>({});
  const [lastName, setLastName] = useState<{ [key: number]: string }>({});
  const [isViewMore, setIsViewMore] = useState({ state: false });
  const [displayListing, setDisplayListing] = useState<ListingDataType[]>([]);

  const handleFetchCategory = async () => {
    setIsLoading(true);
    try {
      if (!category) {
        return;
      }
      const url = `${process.env.NEXT_PUBLIC_API_URL}/listing/search-by-category?string=${category}`;
      const response = await axios.post(url);
      dispatch(updateListingArray(response.data));
      setDisplayListing(response.data);
    } catch (error) {
      setErrorMsg("Error searching listing");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchUserProfile = async (posterId: number) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile/${posterId}`;
      const response = await axios.get(url);

      setProfileImages((prevProfileImages) => ({
        ...prevProfileImages,
        [posterId]: response.data.profileImage,
      }));

      setFirstName((prevFirstName) => ({
        ...prevFirstName,
        [posterId]: response.data.firstName,
      }));

      setLastName((prevLastName) => ({
        ...prevLastName,
        [posterId]: response.data.lastName,
      }));
    } catch (error) {
      setImgErrMsg("Error loading image");
    }
  };

  useEffect(() => {
    handleFetchCategory();
    // eslint-disable-next-line
  }, [category]);

  useEffect(() => {
    if (listing.length > 0) {
      setDisplayListing(listing.slice(0, 4));
      displayListing.forEach((task: any) => {
        handleFetchUserProfile(task.posterId);
      });
    }
    if (isViewMore.state) {
      displayListing.forEach((task: any) => {
        handleFetchUserProfile(task.posterId);
      });
    }
  }, [listing, isViewMore, displayListing]);

  useEffect(() => {
    if (category) {
      setIdCategoryValue(
        categories?.filter((item) => item.categoryName === category)[0]?.id,
      );
    }
  }, [category, categories]);

  return (
    <div className="my-14 h-full w-full font-satoshi">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex w-full items-center justify-between">
          <h1 className=" text-lg font-bold text-violet-dark md:text-2xl">
            {category}
          </h1>
          {listing.length > 0 && (
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
          <p className="sm:text[13px] text-center text-red-500 md:text-[16px]">
            Kindly Check Your Connection And Try Again
          </p>
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <Listing
          data={displayListing}
          profileImages={profileImages}
          imgErrMsg={imgErrMsg}
          firstName={firstName}
          lastName={lastName}
        />
      )}
    </div>
  );
};

export default CategoryListing;
