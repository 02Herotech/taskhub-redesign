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

import MarketPlaceFilter from "@/components/main/marketplace/MarketPlaceFilter";
import MarketPlaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import CategoryListing from "@/components/main/marketplace/CategoryListing";
import BoxFilter from "@/components/main/marketplace/BoxFilter";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Loading from "@/shared/loading";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    search: { isSearching },
  } = useSelector((state: RootState) => state.market);

  // Getting session and router for pop up and user anthentication state
  const session = useSession();
  const router = useRouter();
  const isAuth = session.status === "authenticated";
  const isComplete = session?.data?.user?.user?.enabled;
  const [showPopup, setShowPopup] = useState(false);

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
              src="/assets/images/marketplace/complete-profile-2.png"
              alt="image"
              className="absolute bottom-0 left-0 size-[120px] lg:size-[160px]"
              width={160}
              height={160}
            />
            <Image
              src="/assets/images/marketplace/complete-profile-1.png"
              alt="image"
              className="absolute -bottom-1 -right-1 size-[90px] lg:size-[110px]"
              width={110}
              height={110}
            />
          </div>
        </Popup>
      )}

      {!isFiltering && !isSearching && <MarketPlaceHeader />}

      <div
        className={`mx-auto flex flex-col px-6 md:max-w-screen-2xl  ${(isFiltering || isSearching) && "pt-12"} `}
      >
        <MarketPlaceFilter />
        <div>
          {isFiltering || isSearching ? (
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
                <div className="my-5 flex flex-wrap gap-3 ">
                  {categories.map((item, index) => (
                    <BoxFilter
                      key={item.id}
                      category={item.categoryName}
                      Icon={categoryIcons[index]}
                    />
                  ))}
                </div>
              </div>

              <div>
                {categories.length < 1 ? (
                  <Loading />
                ) : (
                  <div>
                    <CategoryListing category={categories[3]?.categoryName} />
                    <CategoryListing category={categories[4]?.categoryName} />
                    <CategoryListing category={categories[5]?.categoryName} />
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
