"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowRight, FaRegUser } from "react-icons/fa6";

import Loading from "@/shared/loading";
import Listing from "../Listing";

interface CategoryListingProps {
  category: string;
  setViewMore: any;
  setListingData: any;
  listingData: any;
  setCategoryHeader: any;
  setViewMoreListing: any;
  viewMoreListing: any;
}

const CategoryListing: React.FC<CategoryListingProps> = ({
  category,
  setViewMore,
  setListingData,
  listingData,
  setCategoryHeader,
  setViewMoreListing,
  viewMoreListing,
}) => {
  const categoryNames: { [key: string]: string } = {
    category1: "Home Services",
    category2: "Beauty",
    category4: "Information and Technology",
    category3: "Events",
    category5: "Art and craft",
    category6: "Petcare",
    category7: "Custodian",
    category8: "Grocery",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [imgErrMsg, setImgErrMsg] = useState("");
  const [IdCategoryValue, setIdCategoryValue] = useState("");

  const [profileImages, setProfileImages] = useState<{ [key: number]: string }>(
    {},
  );
  const [firstName, setFirstName] = useState<{ [key: number]: string }>({});
  const [lastName, setLastName] = useState<{ [key: number]: string }>({});

  const handleFetchCategory = async () => {
    setIsLoading(true);

    try {
      if (!category) {
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/listing/search-by-category?string=${category}`,
      );

      if (response.status === 200) {
        const slideListingData = response.data.slice(0, 4);
        setListingData(slideListingData);
      }
    } catch (error) {
      setErrorMsg("Error searching listing");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchCategoryViewMore = async () => {
    setIsLoading(true);

    try {
      if (!category) {
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/listing/search-by-category?string=${category}`,
      );

      if (response.status === 200) {
        const slideListingData = response.data;
        setViewMoreListing(slideListingData);
      }
    } catch (error) {
      setErrorMsg("Error searching listing");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserProfile = async (posterId: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile/${posterId}`,
      );

      if (response.status === 200) {
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
      }
    } catch (error) {
      setImgErrMsg("Error loading image");
    }
  };

  useEffect(() => {
    handleFetchCategory();
  }, [category]);

  useEffect(() => {
    if (listingData.length > 0) {
      listingData.forEach((task: any) => {
        handleUserProfile(task.posterId);
      });
    }
    if (viewMoreListing.length > 0) {
      viewMoreListing.forEach((task: any) => {
        handleUserProfile(task.posterId);
      });
    }
  }, [listingData, viewMoreListing]);

  useEffect(() => {
    if (category) {
      const idValue =
        categoryNames[category as keyof typeof categoryNames] || "";
      setIdCategoryValue(idValue);
    }
  }, [category]);

  const handleClick = () => {
    setViewMore(true);
    handleFetchCategoryViewMore();

    if (category) {
      const idValue =
        categoryNames[category as keyof typeof categoryNames] || "";
      setCategoryHeader(idValue);
    }
  };

  return (
    <div className="my-14 h-full w-full font-satoshi">
      <div className="mb-5 flex items-center justify-between">
        <h1 className=" text-lg font-bold text-violet-dark md:text-2xl">
          {IdCategoryValue}
        </h1>

        {listingData.length > 0 && (
          <div className="group text-[13px] font-bold text-primary transition-colors duration-200  hover:text-status-darkViolet md:mr-10 md:text-[18px] ">
            <div
              className=" flex cursor-pointer items-center space-x-1"
              onClick={handleClick}
            >
              <p>View more</p>

              <span className="bold hidden -rotate-45 lg:block">
                <FaArrowRight size={15} />
              </span>
              <span className="bold block -rotate-45 lg:hidden">
                <FaArrowRight size={10} />
              </span>
            </div>
            <span className="block h-[1.5px] w-[90px] bg-primary transition-colors duration-200 group-hover:bg-status-darkViolet"></span>
          </div>
        )}
      </div>

      {ErrorMsg && (
        <div className="flex h-[200px] w-full items-center justify-center md:h-[300px]">
          <p className="sm:text[13px] text-center text-red-500 md:text-[16px]">
            {ErrorMsg}
          </p>
        </div>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <Listing
          data={listingData}
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
