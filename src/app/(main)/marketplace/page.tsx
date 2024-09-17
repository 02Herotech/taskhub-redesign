"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { BsCalendar2EventFill } from "react-icons/bs";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { FaImage } from "react-icons/fa";

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
import axios from "axios";
import { defaultUserDetails } from "@/data/data";

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

const MareketPlace = () => {
  const { categories, isFiltering, isFilteringLoading } = useSelector(
    (state: RootState) => state.market,
  );

  const session = useSession();
  const router = useRouter();
  const isAuth = session.status === "authenticated";
  const token = session?.data?.user?.accessToken;
  const isServiceProvider = session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";
  const [showPopup, setShowPopup] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState(defaultUserDetails);
  const [loadingProfile, setLoadingProfile] = useState(true); // New loading state for profile

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const url = "https://smp.jacinthsolutions.com.au/api/v1/customer/profile";
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setFetchedUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile(false); // Set loading to false when data is fetched
      }
    };
    fetchUserData();
  }, [token]);

  const { profile: user } = useSelector((state: RootState) => state.userProfile);

  /* eslint-disable react-hooks/exhaustive-deps */
  const profileProgressData = [
    {
      title: "Profile Picture",
      status: fetchedUserData?.profileImage,
    },
    {
      title: "Email Address",
      status: user?.emailAddress,
    },
    {
      title: "Address Information",
      status: user?.address?.state,
    },
    {
      title: "Mobile Number",
      status: user?.phoneNumber,
    },
    {
      title: "Identification Document",
      status: fetchedUserData.idImage,
    },
    {
      title: "Date of Birth",
      status: fetchedUserData.dateOfBirth,
    },
  ];

  // Popup logic to show after profile data is fully loaded
  useEffect(() => {
    if (!loadingProfile) {
      const isProfileComplete = profileProgressData.every(
        (item) => item.status !== "" && item.status !== null && item.status !== undefined
      );
      console.log("Profile Complete:", isProfileComplete);

      if (isAuth && !isProfileComplete) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    }
  }, [isAuth, profileProgressData, loadingProfile]);

  return (
    <main className="mx-auto max-w-screen-2xl">
      {showPopup && (
        <Popup isOpen={showPopup} onClose={() =>{
          setCookie("showPopup", false)
          setShowPopup(false)
        } }>
          <div className="relative h-[312px] max-lg:mx-5 lg:w-[577px]">
            <div className="flex h-full flex-col items-center justify-center space-y-7 text-center">
              <h1 className="font-clashDisplay text-4xl font-semibold text-[#2A1769]">
                Welcome to Olójà
              </h1>
              <p className="mb-8 font-satoshi text-xl font-medium text-black">
                We are thrilled to have you! Please complete your profile to get
                access to all our features.
              </p>
              <Button
                className="w-[151px] rounded-full py-6 max-lg:text-sm"
                onClick={() =>
                  router.push(
                    isServiceProvider
                      ? "/service-provider/profile"
                      : "/customer/profile",
                  )
                }
              >
                Go to Profile
              </Button>
            </div>
            <Image
              src="/assets/images/marketplace/complete-profile-2.png"
              alt="image"
              className="absolute bottom-1 left-1  size-1/4 lg:size-[160px] "
              width={160}
              height={160}
            />
            <Image
              src="/assets/images/marketplace/complete-profile-1.png"
              alt="image"
              className="absolute bottom-0 right-0 size-[70px] lg:size-[110px]"
              width={110}
              height={110}
            />
          </div>
        </Popup>
      )}
      {!isFiltering && <MarketPlaceHeader />}

      <div
        className={`mx-auto flex max-w-screen-xl flex-col px-6 md:px-16 ${isFiltering ? "pt-16 " : "lg:pt-32"}`}
      >
        <MarketPlaceFilter />
        <div>
          {isFilteringLoading ? (
            <div className="min-h-80 items-center justify-center p-4">
              <Loading />
            </div>
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
                  <CategoryListing category={categories[0]?.categoryName} />
                  <CategoryListing category={categories[1]?.categoryName} />
                </div>
              )}

              <div className="my-10 md:my-0">
                <h1 className=" py-4 text-[20px] font-bold text-black md:text-[28px]  ">
                  Browse by category
                </h1>
                <div className="my-5 flex flex-wrap gap-3 max-sm:grid max-sm:grid-cols-2 ">
                  {categories.map((item, index) => (
                    <BoxFilter
                      key={item.id}
                      id={item.id}
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
                    <CategoryListing category={categories[2]?.categoryName} />
                    <CategoryListing category={categories[3]?.categoryName} />
                    <CategoryListing category={categories[4]?.categoryName} />
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
