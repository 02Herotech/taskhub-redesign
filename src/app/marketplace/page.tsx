"use client";

import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { BsCalendar2EventFill } from "react-icons/bs";
import { GiStoneCrafting } from "react-icons/gi";
import { FaBabyCarriage } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import axios from "axios";

import MarketPlaceFilter from "@/components/main/marketplace/MarketPlaceFilter";
import MarketPlaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import CategoryListing from "@/components/main/marketplace/CategoryListing";
import BoxFilter from "@/components/main/marketplace/BoxFilter";
import SearchResult from "@/components/main/marketplace/SearchResult";
import ViewMore from "@/components/main/marketplace/view-more";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Loading from "@/shared/loading";

const categoryIcons = [
  FaHome,
  MdPersonalInjury,
  GrPersonalComputer,
  BsCalendar2EventFill,
  GiStoneCrafting,
  FaBabyCarriage,
  MdSecurity,
  MdLocalGroceryStore,
];

const MareketPlace = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.market);

  const [filterData, setFilterData] = useState<ListingDataType[]>([]);
  const [viewMoreListing, setViewMoreListing] = useState<ListingDataType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [location, setLocation] = useState("");
  const [search1, setSearch1] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [categoryHeader, setCategoryHeader] = useState("");
  const [profileImages, setProfileImages] = useState<{ [key: number]: string }>(
    {},
  );
  const [firstName, setFirstName] = useState<{ [key: number]: string }>({});
  const [lastName, setLastName] = useState<{ [key: number]: string }>({});
  const [imgErrMsg, setImgErrMsg] = useState("");

  const handleSearch1 = (e: any) => {
    setSearch1(e.target.value);
  };
  const handleClearSearch = () => {
    setSearch1("");
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

  const handleFilterByCatAndSubCatAndLocation = async () => {
    setIsLoading(true);
    setSearching(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/listing/marketplace-search?businessName=${selectedCategory}&location=${location}&subcategory=${selectedSubCategory}`,
      );
      if (response.status === 200) {
        setFilterData(response.data);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Error searching listing");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory || selectedSubCategory || location) {
      handleFilterByCatAndSubCatAndLocation();
    }
    // eslint-disable-next-line
  }, [selectedCategory, selectedSubCategory, location]);

  useEffect(() => {
    if (filterData.length > 0) {
      filterData.forEach((task) => {
        handleUserProfile(task.posterId);
      });
    }
  }, [filterData]);

  return (
    <main className="font-satoshi">
      <MarketPlaceHeader />
      <div className="mx-auto flex flex-col px-6 md:max-w-7xl md:px-20">
        <MarketPlaceFilter
          search1={search1}
          handleSearch1={handleSearch1}
          handleClearSearch={handleClearSearch}
          categoryHeader={categoryHeader}
        />

        {viewMore ? (
          <ViewMore
            isLoading={isLoading}
            viewMoreListing={viewMoreListing}
            profileImages={profileImages}
            imgErrMsg={imgErrMsg}
            firstName={firstName}
            lastName={lastName}
          />
        ) : (
          <div>
            {searching ? (
              <SearchResult
                isLoading={isLoading}
                filterData={filterData}
                profileImages={profileImages}
                imgErrMsg={imgErrMsg}
                firstName={firstName}
                lastName={lastName}
              />
            ) : (
              <div>
                {categories.length < 1 ? (
                  <Loading />
                ) : (
                  <div>
                    <CategoryListing category={categories[1]?.categoryName} />
                    <CategoryListing category={categories[2]?.categoryName} />
                    <CategoryListing category={categories[3]?.categoryName} />
                  </div>
                )}

                <div className="my-10 md:my-0">
                  <h1 className=" text-[20px] font-bold text-violet-darkHover md:text-[28px]  ">
                    Browse by category
                  </h1>
                  <div className="my-5 flex w-[350px] flex-wrap md:w-[700px] lg:w-full">
                    {categories.map((item, index) => (
                      <BoxFilter
                        key={item.id}
                        category={item.categoryName}
                        Icon={categoryIcons[index]}
                      />
                    ))}
                  </div>
                </div>

                <div className="lg:hidden">
                  {categories.length < 1 ? (
                    <Loading />
                  ) : (
                    <div>
                      <CategoryListing category={categories[1]?.categoryName} />
                      <CategoryListing category={categories[2]?.categoryName} />
                      <CategoryListing category={categories[3]?.categoryName} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MareketPlace;
