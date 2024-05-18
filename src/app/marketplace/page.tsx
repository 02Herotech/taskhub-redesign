"use client"

import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";
import { GrPersonalComputer } from "react-icons/gr";
import { BsCalendar2EventFill } from "react-icons/bs";
import { GiStoneCrafting } from "react-icons/gi";
import { FaBabyCarriage } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";

import header from "../../../public/marketplaceHeader.png"
import MarketplaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import MarketPlaceFilter from "@/components/main/marketplace/MarketPlaceFilter";
import MarketPlaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import CategoryListing from "@/components/main/marketplace/CategoryListing";
import BoxFilter from "@/components/main/marketplace/BoxFilter";
import HomeNavigation from "@/components/layout/HomeNavigation";
import Footer from "@/components/layout/Footer";


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


    const [listingData, setListingData] = useState<listingData[]>([]);
    const [filterData, setFilterData] = useState<listingData[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState("");
    const [service, setService] = useState("");
    const [pricing, setPricing] = useState("");
    const [others, setOthers] = useState("");
    const [search1, setSearch1] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const category = event.target.value;
        setSelectedCategory(category);
        setSelectedSubCategory("");
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



    return (
        <div>
            <HomeNavigation />
            <MarketPlaceHeader />
            <div className="md:max-w-7xl mx-auto md:px-20 flex flex-col px-8">

                <MarketPlaceFilter
                    selectedCategory={selectedCategory}
                    selectedSubCategory={selectedSubCategory}
                    location={location}
                    service={service}
                    pricing={pricing}
                    others={others}
                    search1={search1}
                    handleCategoryChange={handleCategoryChange}
                    handleSubCategoryChange={handleSubCategoryChange}
                    handleLocation={handleLocation}
                    handleService={handleService}
                    handlePricing={handlePricing}
                    handleOther={handleOther}
                    handleSearch1={handleSearch1}
                    handleClearSearch={handleClearSearch}
                    categories={categories}
                    setIsLoading={setIsLoading}
                    filterData={filterData}
                    setFilterData={setFilterData}
                    setErrorMsg={setErrorMsg}

                />

                <div>
                    <div>
                        <CategoryListing category='category1' />

                        <CategoryListing category='category2' />

                        <CategoryListing category='category5' />
                    </div>


                    <div className="my-10 md:my-0">
                        <h1 className=" font-bold md:text-[28px] text-[23px]  ">Browse by category</h1>


                        <div className="flex flex-wrap my-5 w-[330px] md:w-[820px]">

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
                        <CategoryListing category='category1' />

                        <CategoryListing category='category2' />

                        <CategoryListing category='category5' />
                    </div>

                </div>

            </div>

            <Footer />
        </div >
    );
}

export default MareketPlace;