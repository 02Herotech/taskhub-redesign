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
import Toast from "@/components/global/Toast";
import Link from "next/link";
import { updateFilterData } from "@/store/Features/marketplace";

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
  const { categories, isFiltering, filteredData, currentFilterStatus } =
    useSelector((state: RootState) => state.market);
  const session = useSession();
  const isAuth = session.status === "authenticated";
  const isComplete = session.data?.user.user.enabled;

  const [filterData, setFilterData] = useState<ListingDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryHeader, setCategoryHeader] = useState("");
  const [profileImages, setProfileImages] = useState<{ [key: number]: string }>(
    {},
  );
  const [firstName, setFirstName] = useState<{ [key: number]: string }>({});
  const [lastName, setLastName] = useState<{ [key: number]: string }>({});
  const [imgErrMsg, setImgErrMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const { category, subCategory, pricing, search, location } =
      currentFilterStatus;
    const filterData = async () => {
      const page = 0;
      try {
        if (isFiltering) {
          if (category) {
            const id = categories.filter(
              (item) => item.categoryName === category,
            )[0].id;
            const url =
              "https://smp.jacinthsolutions.com.au/api/v1/listing/listing-by-category/" +
              id +
              "?pageNumber=" +
              page;
            const { data } = await axios.get(url);
            console.log(data);
            dispatch(
              updateFilterData({ data, section: "category", value: category }),
            );
            // handle filterby category
          } else if (subCategory) {
            // handle filter by sub category
          } else if (pricing) {
          } else if (search) {
          } else if (location) {
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    filterData();
    // eslint-disable-next-line
  }, [filteredData, isFiltering, currentFilterStatus]);

  // console.log(filteredData)

  useEffect(() => {
    if (isAuth && !isComplete) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 8000); // Hide toast after 8 seconds

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [isAuth, isComplete]);

  return (
    <main className="font-satoshi">
      {showToast && (
        <Toast
          body={
            <div className="space-y-4 font-satoshi">
              <h3 className="text-base font-bold text-primary">
                Complete your profile!!
              </h3>
              <p className="text-sm font-normal text-primary">
                Please complete your profile to get access to all the features
                on TaskHub.
              </p>
              <div className="flex items-center justify-end">
                <Link
                  href="/service-provider/dashboard"
                  className="text-base font-bold text-tc-orange underline underline-offset-2"
                >
                  Go To Profile
                </Link>
              </div>
            </div>
          }
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      )}
      <MarketPlaceHeader />
      <div className="mx-auto flex flex-col px-6 md:max-w-7xl md:px-20">
        <MarketPlaceFilter categoryHeader={categoryHeader} />
        <div>
          {currentFilterStatus.search ? (
            <SearchResult
              isLoading={isLoading}
              filterData={filterData}
              profileImages={profileImages}
              imgErrMsg={imgErrMsg}
              firstName={firstName}
              lastName={lastName}
            />
          ) : isFiltering ? (
            <div>
              <CategoryListing category="All" />
            </div>
          ) : (
            <div>
              {categories.length < 1 ? (
                <Loading />
              ) : (
                <div>
                  <CategoryListing category="All" />
                  <CategoryListing category={categories[1]?.categoryName} />
                  <CategoryListing category={categories[2]?.categoryName} />
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
                    <CategoryListing category={"All"} />
                    <CategoryListing category={categories[1]?.categoryName} />
                    <CategoryListing category={categories[2]?.categoryName} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MareketPlace;
