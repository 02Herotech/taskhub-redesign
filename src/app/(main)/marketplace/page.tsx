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
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Loading from "@/shared/loading";
import Popup from "@/components/global/Popup";
import Button from "@/components/global/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { defaultUserDetails } from "@/data/data";
import BoxFilter from "@/components/main/marketplace/BoxFilter";
import instance from "@/utils/axios.config";

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
  const isServiceProvider =
    session?.data?.user?.user?.roles[0] === "SERVICE_PROVIDER";
  const [showPopup, setShowPopup] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState(defaultUserDetails);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [hasClosedPopup, setHasClosedPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      try {
        const url = isServiceProvider
          ? `service_provider/profile`
          : `customer/profile`;
        const { data } = await instance.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFetchedUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingProfile(false);
      }
    };
    fetchUserData();
  }, [token, isServiceProvider]);

  const { profile: user } = useSelector(
    (state: RootState) => state.userProfile,
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  const profileProgressData = [
    {
      title: "Profile Picture",
      status: user?.profileImage,
    },
    {
      title: "Email Address",
      status: user?.emailAddress,
    },
    {
      title: "Address Information",
      status: user?.address?.postCode,
    },
    // {
    //   title: "Mobile Number",
    //   status: user?.phoneNumber,
    // },
    {
      title: "Identification Document",
      status: fetchedUserData.idImageFront,
    },
    {
      title: "Date of Birth",
      status: fetchedUserData.dateOfBirth,
    },
    ...(fetchedUserData.idType !== "INTERNATIONAL_PASSPORT"
      ? [
          {
            title: "Identification Document Back",
            status: fetchedUserData?.idImageBack,
          },
        ]
      : []),
  ];

  // Popup logic to show after profile data is fully loaded
  useLayoutEffect(() => {
    if (!loadingProfile && user && !hasClosedPopup) {
      const isProfileComplete = profileProgressData.every(
        (item) =>
          item.status !== "" &&
          item.status !== null &&
          item.status !== undefined &&
          item.status !== "null" && // Check for "null" string
          item.status !== "undefined" && // Check for "undefined" string
          !(typeof item.status === "string" && item.status.trim() === ""),
      );

      if (isAuth && isServiceProvider && !isProfileComplete) {
        setShowPopup(true);
      }
    }
  }, [loadingProfile, user, fetchedUserData, isAuth, profileProgressData]);

  const categoriesSlice = categories.slice(0, 8);

  return (
    <main className="mx-auto max-w-screen-2xl">
      {showPopup && (
        <Popup
          isOpen={showPopup}
          onClose={() => {
            setShowPopup(false);
            setHasClosedPopup(true);
          }}
        >
          <div className="relative h-[312px] w-full max-lg:mx-2 lg:w-[577px]">
            <div className="flex h-full flex-col items-center justify-center space-y-7 text-center">
              <h1 className="font-clashDisplay text-4xl font-semibold text-[#2A1769]">
                Welcome to Olójà
              </h1>
              <p className="mb-8 font-satoshi text-xl font-medium text-black">
                We are thrilled to have you! Please complete your profile to get
                access to all our features.
              </p>
              <Button
                className="rounded-full max-lg:text-sm lg:w-[151px] lg:py-6"
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
              className="absolute bottom-1 left-1 size-1/4 lg:size-[160px] "
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
