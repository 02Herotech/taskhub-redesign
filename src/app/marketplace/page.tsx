"use client"

import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdPersonalInjury } from "react-icons/md";


import header from "../../../public/marketplaceHeader.png"
import MarketplaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import MarketPlaceFilter from "@/components/main/marketplace/MarketPlaceFilter";
import MarketPlaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import CategoryListing from "@/components/main/marketplace/CategoryListing";
import BoxFilter from "@/components/main/marketplace/BoxFilter";
import Filter from "@/components/main/marketplace/FilterResult/filter";
import HomeNavigation from "@/components/layout/HomeNavigation";
import Loading from "@/shared/loading";

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
            <div className="max-w-7xl mx-auto px-20 flex flex-col">

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


                    <div>
                        <h1 className=" font-bold text-[28px]">Browse by category</h1>

                        <div className="flex flex-col my-5">
                            <div className="flex">

                                <BoxFilter category="Home Services" Icon={FaHome} />
                                <BoxFilter category="Personal Services" Icon={MdPersonalInjury} />
                                <BoxFilter category="Events & Entertainment" Icon={FaHome} />
                                <BoxFilter category="Education & Tutoring" Icon={FaHome} />
                                <BoxFilter category="Professional Services" Icon={FaHome} />
                                <BoxFilter category="Health & Fitness" Icon={FaHome} />
                            </div>

                            <div className="flex my-5">

                                <BoxFilter category="Technology & Electronics" Icon={FaHome} />
                                <BoxFilter category="Real Estate Services" Icon={FaHome} />
                                <BoxFilter category="Automotive Services" Icon={FaHome} />
                                <BoxFilter category="Childcare & Babysitting" Icon={FaHome} />
                                <BoxFilter category="Travel & Adventure" Icon={FaHome} />

                            </div>

                            <div className="flex">

                                <BoxFilter category="Art & Creativity" Icon={FaHome} />
                                <BoxFilter category="Wedding Services" Icon={FaHome} />
                                <BoxFilter category="Home Improvement" Icon={FaHome} />

                            </div>


                        </div>
                    </div>

                    <div>
                        <CategoryListing category='category1' />

                        <CategoryListing category='category2' />

                        <CategoryListing category='category5' />
                    </div>

                </div>

            </div>
        </div >
    );
}

export default MareketPlace;