"use client"

import { useState } from "react";
import { FaHome } from "react-icons/fa";

import header from "../../../public/marketplaceHeader.png"
import MarketplaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import MarketPlaceFilter from "@/components/main/marketplace/MarketPlaceFilter";
import MarketPlaceHeader from "@/components/main/marketplace/MarketPlaceHeader";
import CategoryListing from "@/components/main/marketplace/CategoryListing";
import BoxFilter from "@/components/main/marketplace/BoxFilter";

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

const MareketPlace = () => {

    const categories: Categories = {
        category1: {
            name: "Home Services",
            subcategories: [
                "Cleaning",
                "Plumbing",
                "Electrician",
                "Carpentry",
                "Pest Control",
                "Landscaping",
                "HVAC (Heating, Ventilation, and Air Conditioning)",
            ],
        },
        category2: {
            name: "Personal Services",
            subcategories: [
                "Beauty & Wellness",
                "Personal Training",
                "Massage Therapy",
                "Yoga & Meditation",
                "Life Coaching",
                "Pet Care & Grooming",
            ],
        },
        category3: {
            name: "Events & Entertainment",
            subcategories: [
                "Event Planning",
                "Photography & Videography",
                "DJ Services",
                "Catering",
                "Live Performers (Musicians, Magicians, etc.)",
            ],
        },
        category4: {
            name: "Education & Tutoring",
            subcategories: [
                "Academic Tutoring",
                "Language Lessons",
                "Music Lessons",
                "Art Classes",
                "Test Preparationol",
            ],
        },
        category5: {
            name: "Professional Services",
            subcategories: [
                "Legal Services",
                "Financial Planning",
                "Marketing & Design",
                "IT Support & Consulting",
                "Writing & Editing",
            ],
        },
        category6: {
            name: "Automotive  Services",
            subcategories: [
                "Auto Repair",
                "Car Detailing",
                "Towing Services",
                "Tire Services",
            ],
        },
        category7: {
            name: "Health & Fitness",
            subcategories: [
                "Fitness Training",
                "Nutrition Coaching",
                "Physical Therapy",
                "Holistic Healing",
            ],
        },
        category8: {
            name: "Technology & Electronics",
            subcategories: [
                "Computer Repair",
                "Web Development",
                "App Development",
                "Graphic Design",
            ],
        },
        category9: {
            name: "Home Improvement",
            subcategories: [
                "Interior Design/ Decor",
                "Renovation Services",
                "Home Maintenance",
                "Flooring & Tiling",
            ],
        },
        category10: {
            name: "Real Estate Services",
            subcategories: [
                "Property Management",
                "Home Inspection",
                "Real Estate Agent Services",
            ],
        },
        category11: {
            name: "Delivery & Logistics",
            subcategories: [
                "Courier Services",
                "Grocery Delivery",
                "Moving Services",
            ],
        },
        category12: {
            name: "Art & Creativity",
            subcategories: [
                "Custom Artwork",
                "Artist",
                "Music Instructor",
                "Craftsmanship",
                "Creative Workshops",
            ],
        },
        category13: {
            name: "Wedding Services",
            subcategories: [
                "Wedding Planning",
                "Bridal Makeup & Styling",
                "Wedding Photography",
            ],
        },
        category14: {
            name: "Childcare & Babysitting",
            subcategories: ["Childcare Services", "Babysitting", "Nanny Services"],
        },
        category15: {
            name: "Travel & Adventure",
            subcategories: ["Tour Guides", "Adventure Excursions", "Travel Planning"],
        },
        category16: {
            name: "Groceries",
            subcategories: ["Yam", "Vegetables", "Indomie"],
        },
    };

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [location, setLocation] = useState("");
    const [service, setService] = useState("");
    const [pricing, setPricing] = useState("");
    const [others, setOthers] = useState("");
    const [search1, setSearch1] = useState("");

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
                />

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
                            <BoxFilter category="Personal Services" Icon={FaHome} />
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
    );
}

export default MareketPlace;