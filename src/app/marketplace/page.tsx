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
  const session = useSession();
  const router = useRouter()
  const isAuth = session.status === "authenticated";
  const isComplete = session.data?.user.user.enabled;

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
  const [showPopup, setShowPopup] = useState(true);

  const handleSearch1 = (e: any) => {
    setSearch1(e.target.value);
  };
  const handleClearSearch = () => {
    setSearch1("");
  };

  // const handleUserProfile = async (posterId: number) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile/${posterId}`,
  //     );
  //     if (response.status === 200) {
  //       setProfileImages((prevProfileImages) => ({
  //         ...prevProfileImages,
  //         [posterId]: response.data.profileImage,
  //       }));

  //       setFirstName((prevFirstName) => ({
  //         ...prevFirstName,
  //         [posterId]: response.data.firstName,
  //       }));

  //       setLastName((prevLastName) => ({
  //         ...prevLastName,
  //         [posterId]: response.data.lastName,
  //       }));
  //     }
  //   } catch (error) {
  //     setImgErrMsg("Error loading image");
  //   }
  // };

  // const handleFilterByCatAndSubCatAndLocation = async () => {
  //   setIsLoading(true);
  //   setSearching(true);

  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/listing/marketplace-search?businessName=${selectedCategory}&location=${location}&subcategory=${selectedSubCategory}`,
  //     );
  //     if (response.status === 200) {
  //       setFilterData(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setErrorMsg("Error searching listing");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (selectedCategory || selectedSubCategory || location) {
  //     handleFilterByCatAndSubCatAndLocation();
  //   }
  //   // eslint-disable-next-line
  // }, [selectedCategory, selectedSubCategory, location]);

  // useEffect(() => {
  //   if (filterData.length > 0) {
  //     filterData.forEach((task) => {
  //       handleUserProfile(task.posterId);
  //     });
  //   }
  // }, [filterData]);

  // useEffect(() => {
  //   if (isAuth && !isComplete) {
  //     setShowPopup(true);
  //     const timer = setTimeout(() => {
  //       setShowPopup(false);
  //     }, 8000); // Hide Popup after 8 seconds

  //     return () => clearTimeout(timer); // Cleanup timer on unmount
  //   }
  // }, [isAuth, isComplete]);

  return (
    <main className="font-satoshi">

      {showPopup && (
        <Popup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
        >
          <div className="lg:w-[577px] h-[312px] relative">
            <div className="text-center space-y-7 flex flex-col items-center justify-center h-full">
              <h1 className="font-clashDisplay text-[#2A1769] text-4xl font-semibold">Welcome to TaskHUB</h1>
              <p className="text-black font-satoshi font-medium text-xl mb-8">We are thrilled to have you! Please complete your profile to get access to all our features.</p>
              <Button className="w-[151px] rounded-full py-6" onClick={() => router.push("/service-provider/dashboard")}>Go to Profile</Button>
            </div>
            <Image
              src={ModalImage2}
              alt="image"
              className="absolute left-0 bottom-0 size-[160px]"
            />
            <Image
              src={ModalImage1}
              alt="image"
              className="absolute -right-1 -bottom-1 size-[110px]"
            />
          </div>
        </Popup>
      )}

      <MarketPlaceHeader />
      <div className="mx-auto flex flex-col px-6 md:max-w-7xl md:px-20">
        <MarketPlaceFilter categoryHeader={categoryHeader} />
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
