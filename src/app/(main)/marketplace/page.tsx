"use client";
import React from "react";
import { useGetCategoriesQuery } from "@/services/listings";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import MarketPlaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import { useSession } from "next-auth/react";
import Loading from "@/shared/loading";
import BoxFilter from "@/components/main/marketplace/BoxFilter";
import Popup from "@/components/global/Popup/PopupTwo";
import { getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MarketPlaceFilter from "./MarketPlaceFilter";
import CategoryData from "./CategoryData";

const categoryIcons = [
  FaHome,
  MdPersonalInjury,
  GrPersonalComputer,
  FaGraduationCap,
  FaImage,
  FaHeartbeat,
  BsCalendar2EventFill,
  MdLocalGroceryStore,
];

const initialFilterData = {
  category: "",
  location: "",
  typeOfService: "",
  typeOfServiceDisplay: "",
  minPrice: 5,
  maxPrice: 1000,
};

function Page() {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  const session = useSession();

  const [firstTimePopup, setfirstTimePopup] = useState(false);

  //To prevent 'MarketplaceFilter' component from throwing error
  const [filterData, setFilterData] =
    useState<FilterDataStructure>(initialFilterData);

  useEffect(() => {
    if (session.data && getCookie("firstLogin")) {
      //Would still display if signed up user is diffeerent from logged in user
      setfirstTimePopup(true);
      deleteCookie("firstLogin");
    }
  }, [session.data]);

  const categoriesSlice = categories?.slice(0, 8);

  const userType = session.data?.user.user.roles[0];

  const pathname = usePathname();

  const isMarketPlacePage = pathname === "/marketplace";

  return (
    <main className="mx-auto max-w-screen-2xl">
      <MarketPlaceHeader />
      <Popup isOpen={firstTimePopup} onClose={() => setfirstTimePopup(false)}>
        <div className="relative mt-6 max-h-[700px] min-w-[320px] max-w-[800px] bg-white p-5 sm:min-w-[560px]">
          <h3 className="mb-2 text-center font-clashSemiBold text-2xl text-[#2A1769] md:mb-4 md:text-4xl">
            Congratulations!!!
          </h3>
          <div className="mx-auto mb-6 max-w-[500px] space-y-3">
            <p className="mb-2 text-center text-base font-semibold text-[#2A1769] md:text-2xl">
              You’re officially welcome to the Hub
            </p>
            <p className="text-center text-sm text-[#55535A] sm:text-xl">
              You just unlocked a world of opportunities🚀
            </p>
            <p className="text-center text-sm text-[#55535A] sm:text-xl">
              <span className="font-semibold text-[#E58C06]">Next Steps?</span>{" "}
              Complete your profile to stand out and start connecting with the
              right people!
            </p>
          </div>
          <div className="my-3 flex flex-col justify-center gap-3 sm:flex-row">
            {userType && (
              <Link
                href={
                  userType === "CUSTOMER"
                    ? "/customer/add-task"
                    : "/provide-service"
                }
                className="w-full rounded-full border border-primary bg-[#EBE9F4] px-10 py-2 text-center font-satoshiBold font-bold text-primary sm:w-max"
              >
                {userType === "CUSTOMER"
                  ? "Post my first task"
                  : "Create a listing"}
              </Link>
            )}
            <Link
              href={
                userType === "CUSTOMER"
                  ? "/customer/profile/edit-profile"
                  : "/service-provider/profile/edit-profile"
              }
              className="w-full rounded-full bg-primary px-10 py-2 text-center font-satoshiBold font-bold text-white sm:w-max"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </Popup>

      <div
        className={`mx-auto flex max-w-screen-xl flex-col px-6 md:px-16 ${!isMarketPlacePage ? "pt-16 " : "lg:pt-32"}`}
      >
        <MarketPlaceFilter
          filterDataStructure={filterData}
          setFilterDataStructure={setFilterData}
          categories={categories}
        />

        {isLoading && (
          <div className="flex min-h-80 items-center justify-center">
            <Loading />
          </div>
        )}

        {categories && (
          <div>
            <CategoryData category="All" />
            <div className="my-10 md:my-0">
              <h1 className=" py-4 text-[20px] font-bold text-black md:text-[28px]  ">
                Browse by category
              </h1>
              <div className="my-5 flex flex-wrap gap-3 max-sm:grid max-sm:grid-cols-2 ">
                {categoriesSlice.map((item, index) => (
                  <BoxFilter
                    key={item.id}
                    id={item.id}
                    category={item.categoryName}
                    Icon={categoryIcons[index % categoryIcons.length]}
                  />
                ))}
              </div>
            </div>

            <div>
              {categories.map((category) => (
                <CategoryData
                  key={category.id}
                  category={category.categoryName}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Page;
