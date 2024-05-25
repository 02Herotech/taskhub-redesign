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
import ModalImage1 from "../../../public/assets/images/marketplace/complete-profile-1.png";
import ModalImage2 from "../../../public/assets/images/marketplace/complete-profile-2.png";

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
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { updateFilterData } from "@/store/Features/marketplace";
import { setCookie, getCookie } from "cookies-next";

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
  // set states for market place
  const {
    categories,
    isFiltering,
    currentFilterStatus: { search },
  } = useSelector((state: RootState) => state.market);

  // Getting session and router for pop up and user anthentication state
  const session = useSession();
  const router = useRouter();
  const isAuth = session.status === "authenticated";
  const isComplete = session?.data?.user?.user?.enabled;
  const [showPopup, setShowPopup] = useState(false);

  // Figure out what this is used for

  // Setting user popup state
  useEffect(() => {
    const popupCookie = getCookie("showPopup");
    if (!popupCookie && isAuth && isComplete) {
      setCookie("showPopup", true, { maxAge: 60 * 2 });
      setShowPopup(true);
    }
  }, [isAuth, isComplete]);

  return (
    <main>
      {showPopup && (
        <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
          <div className="relative h-[312px] max-lg:mx-10 lg:w-[577px]">
            <div className="flex h-full flex-col items-center justify-center space-y-7 text-center">
              <h1 className="font-clashDisplay text-4xl font-semibold text-[#2A1769]">
                Welcome to TaskHUB
              </h1>
              <p className="mb-8 font-satoshi text-xl font-medium text-black">
                We are thrilled to have you! Please complete your profile to get
                access to all our features.
              </p>
              <Button
                className="w-[151px] rounded-full py-6"
                onClick={() => router.push("/service-provider/dashboard")}
              >
                Go to Profile
              </Button>
            </div>
            <Image
              src={ModalImage2}
              alt="image"
              className="absolute bottom-0 left-0 size-[120px] lg:size-[160px]"
            />
            <Image
              src={ModalImage1}
              alt="image"
              className="absolute -bottom-1 -right-1 size-[90px] lg:size-[110px]"
            />
          </div>
        </Popup>
      )}

      <MarketPlaceHeader />
      <div className="mx-auto flex flex-col px-6 md:max-w-7xl md:px-20">
        <MarketPlaceFilter />
        <div>
          {search && search.length !== 0 ? (
            <div>Show search Results</div>
          ) : // <SearchResult
          //   isLoading={isLoading}
          //   filterData={filterData}
          //   profileImages={profileImages}
          //   imgErrMsg={imgErrMsg}
          //   firstName={firstName}
          //   lastName={lastName}
          // />
          isFiltering ? (
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
