"use client"

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


interface Category {
    name: string;
    subcategories: string[];
}

type Categories = {
    [key: string]: {
        name: string;
        subcategories: string[];
    };
};

interface listingData {
    id: number;
    posterId: number;
    businessName: string;
    serviceCategory: string;
    subCategory: string;
    serviceDescription: string;
    serviceName: string;
    pricing: number;
    availableDays: [string];
    available: boolean;
    startHour: number;
    closeMinute: number;
    closeHour: number;
    startMinute: number;
    availableFrom: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
    };
    availableTo: {
        hour: number;
        minute: number;
        second: number;
        nano: number;
    };
    userAddress: {
        id: number;
        streetNumber: string;
        streetName: string;
        unitNumber: string;
        suburb: string;
        state: string;
        postCode: string;
    };
    deleted: boolean;
    stripeId: string;
    businessPictures: string[]; // Updated to an array of strings
}


const MareketPlace = () => {

    const categories: Categories = {
        category1: {
            name: "Home Services",
            subcategories: [
                "Landscaper/ground keeper",
                "Gardeners",
                "House Keeping",
            ],
        },
        category2: {
            name: "Beauty",
            subcategories: [
                "Hair vendors",
                "Beauty products"
            ],
        },
        category3: {
            name: "Information and Technology",
            subcategories: [
                "Graphic designer",
                "Web designer",
                "Social Media Marketing/marketer",
                "Video editor",
                "Resume support",
                "Cv writing",
            ],
        },
        category4: {
            name: "Events",
            subcategories: [
                "Event planning",
                "Waiter",
                "Photographer",
                "Catering services ",
            ],
        },
        category5: {
            name: "Art and craft",
            subcategories: [
                "Writer",
                "Painter",
                "Artist",
            ],
        },
        category6: {
            name: "Petcare",
            subcategories: [
                "Dog walker"
            ],
        },
        category7: {
            name: "Custodian",
            subcategories: [
                "Janitor"
            ],
        },
        category8: {
            name: "Grocery",
            subcategories: [
                "Grocery delivery"
            ],
        },
    };



    const [filterData, setFilterData] = useState<listingData[]>([]);
    const [listingData, setListingData] = useState<listingData[]>([]);
    const [viewMoreListing, setViewMoreListing] = useState<listingData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [viewMore, setViewMore] = useState(false)
    const [location, setLocation] = useState("");
    const [service, setService] = useState("");
    const [pricing, setPricing] = useState("");
    const [others, setOthers] = useState("");
    const [search1, setSearch1] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [categoryHeader, setCategoryHeader] = useState("");
    const [profileImages, setProfileImages] = useState<{ [key: number]: string }>(
        {}
    );
    const [firstName, setFirstName] = useState<{ [key: number]: string }>({});
    const [lastName, setLastName] = useState<{ [key: number]: string }>({});
    const [imgErrMsg, setImgErrMsg] = useState("")


    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSelectedSubCategory("");
        setLocation("")
    };

    const handleSubCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const subCategory = event.target.value;
        setSelectedSubCategory(subCategory);
    };

    const handleLocation = (e: any) => {
        setLocation(e.target.value)

    }
    const handleService = (e: any) => {
        setService(e.target.value)
    }
    const handlePricing = (e: any) => {
        setPricing(e.target.value)
    }
    const handleOther = (e: any) => {
        setOthers(e.target.value)
    }
    const handleSearch1 = (e: any) => {
        setSearch1(e.target.value)
    }
    const handleClearSearch = () => {
        setSearch1("")
    }


    const handleUserProfile = async (posterId: number) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile/${posterId}`
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
                `${process.env.NEXT_PUBLIC_API_URL}/listing/marketplace-search?businessName=${selectedCategory}&location=${location}&subcategory=${selectedSubCategory}`
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
            <div className="md:max-w-7xl mx-auto md:px-20 flex flex-col px-6">

                <MarketPlaceFilter
                    selectedCategory={selectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    location={location}
                    pricing={pricing}
                    search1={search1}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleLocation={handleLocation}
                    handlePricing={handlePricing}
                    handleSearch1={handleSearch1}
                    handleClearSearch={handleClearSearch}
                    categories={categories}
                    categoryHeader={categoryHeader}

                />
                {
                    viewMore ?

                        <ViewMore
                            isLoading={isLoading}
                            viewMoreListing={viewMoreListing}
                            profileImages={profileImages}
                            imgErrMsg={imgErrMsg}
                            firstName={firstName}
                            lastName={lastName}
                        />
                        :
                        <div>
                            {
                                searching ?

                                    <SearchResult
                                        isLoading={isLoading}
                                        filterData={filterData}
                                        profileImages={profileImages}
                                        imgErrMsg={imgErrMsg}
                                        firstName={firstName}
                                        lastName={lastName}
                                    />
                                    :
                                    <div>
                                        <div>
                                            <CategoryListing category='category1' setViewMore={setViewMore} listingData={listingData} setListingData={setListingData} setCategoryHeader={setCategoryHeader} setViewMoreListing={setViewMoreListing} viewMoreListing={viewMoreListing} />

                                            <CategoryListing category='category2' setViewMore={setViewMore} listingData={listingData} setListingData={setListingData} setCategoryHeader={setCategoryHeader} setViewMoreListing={setViewMoreListing} viewMoreListing={viewMoreListing} />

                                            <CategoryListing category='category5' setViewMore={setViewMore} listingData={listingData} setListingData={setListingData} setCategoryHeader={setCategoryHeader} setViewMoreListing={setViewMoreListing} viewMoreListing={viewMoreListing} />
                                        </div>


                                        <div className="my-10 md:my-0">
                                            <h1 className=" font-bold md:text-[28px] text-[20px]  ">Browse by category</h1>


                                            <div className="flex flex-wrap my-5 w-[350px] md:w-[700px] lg:w-full">

                                                <BoxFilter category="Home Services" Icon={FaHome} />
                                                <BoxFilter category="Beauty" Icon={MdPersonalInjury} />
                                                <BoxFilter category="Events" Icon={BsCalendar2EventFill} />
                                                <BoxFilter category="Custodian" Icon={MdSecurity} />
                                                <BoxFilter category="Art and Craft" Icon={GiStoneCrafting} />
                                                <BoxFilter category="Information & Technology" Icon={GrPersonalComputer} />
                                                <BoxFilter category="Grocery" Icon={MdLocalGroceryStore} />
                                                <BoxFilter category="Petcare" Icon={FaBabyCarriage} />


                                            </div>

                                        </div>

                                        <div className="hidden lg:block">
                                            <CategoryListing category='category1' setViewMore={setViewMore} listingData={listingData} setListingData={setListingData} setCategoryHeader={setCategoryHeader} setViewMoreListing={setViewMoreListing} viewMoreListing={viewMoreListing} />

                                            <CategoryListing category='category2' setViewMore={setViewMore} listingData={listingData} setListingData={setListingData} setCategoryHeader={setCategoryHeader} setViewMoreListing={setViewMoreListing} viewMoreListing={viewMoreListing} />

                                            <CategoryListing category='category5' setViewMore={setViewMore} listingData={listingData} setListingData={setListingData} setCategoryHeader={setCategoryHeader} setViewMoreListing={setViewMoreListing} viewMoreListing={viewMoreListing} />
                                        </div>

                                    </div>
                            }
                        </div>
                }
            </div>

        </main >
    );
}

export default MareketPlace;