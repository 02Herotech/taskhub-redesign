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
import PopupNew from "@/components/global/Popup/PopupTwo";
import { getCookie, deleteCookie } from "cookies-next";
import Link from "next/link";

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
  const [firstTimePopup, setfirstTimePopup] = useState(false);

  useEffect(() => {
    if (session.data && getCookie("firstLogin")) {
      setfirstTimePopup(true);
      deleteCookie("firstLogin");
    }
  }, [session.data]);

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

  const userType = session.data?.user.user.roles[0];

  return (
    <main className="mx-auto max-w-screen-2xl">
      {/* <div>
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
                  We are thrilled to have you! Please complete your profile to
                  get access to all our features.
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
      </div> */}

      {!isFiltering && <MarketPlaceHeader />}

      <PopupNew
        isOpen={firstTimePopup}
        onClose={() => setfirstTimePopup(false)}
      >
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
                  ? "/customer/profile"
                  : "/service-provider/profile"
              }
              className="w-full rounded-full bg-primary px-10 py-2 text-center font-satoshiBold font-bold text-white sm:w-max"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </PopupNew>

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
