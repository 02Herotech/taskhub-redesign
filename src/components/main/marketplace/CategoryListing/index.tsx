"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaArrowRight, FaRegUser } from "react-icons/fa6";

import Loading from "@/shared/loading";

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



interface CategoryListingProps {
    category: string;

}


const CategoryListing: React.FC<CategoryListingProps> = ({ category }) => {


    const categoryNames: { [key: string]: string } = {
        category1: "Home Services",
        category2: "Personal Services",
        category4: "Education & Tutoring",
        category3: "Events & Entertainment",
        category5: "Professional Services",
        category6: "Automotive Services",
        category7: "Health & Fitness",
        category8: "Technology & Electronics",
        category9: "Home Improvement",
        category10: "Real Estate Services",
        category11: "Delivery & Logistics",
        category12: "Art & Creativity",
        category13: "Wedding Services",
        category14: "Childcare & Babysitting",
        category15: "Travel & Adventure",
        category16: "Groceries",
    };


    const [isLoading, setIsLoading] = useState(false)
    const [listingData, setListingData] = useState<listingData[]>([]);
    const [ErrorMsg, setErrorMsg] = useState("")
    const [imgErrMsg, setImgErrMsg] = useState("")
    const [IdCategoryValue, setIdCategoryValue] = useState("")


    const [profileImages, setProfileImages] = useState<{ [key: number]: string }>(
        {}
    );
    const [firstName, setFirstName] = useState<{ [key: number]: string }>({});
    const [lastName, setLastName] = useState<{ [key: number]: string }>({});

    const handleFetchCategory = async () => {
        setIsLoading(true);

        try {
            if (!category) {
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/listing/search-by-category?string=${category}`
            );

            if (response.status === 200) {
                const slideListingData = response.data.slice(0, 4)
                setListingData(slideListingData)
            }
        } catch (error) {
            setErrorMsg("Error searching listing");
        } finally {
            setIsLoading(false);
        }
    };

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

    useEffect(() => {
        handleFetchCategory();
    }, [category]);

    useEffect(() => {
        if (listingData.length > 0) {
            listingData.forEach((task) => {
                handleUserProfile(task.posterId);
            });
        }
    }, [listingData]);



    useEffect(() => {
        if (category) {
            const idValue = categoryNames[category as keyof typeof categoryNames] || "";
            setIdCategoryValue(idValue);
        }
    }, [category]);



    return (
        <div className="w-full my-16">

            <div className="flex justify-between items-center mb-5">
                <h1 className=" font-bold text-[30px]">{IdCategoryValue}</h1>

                {
                    listingData.length > 0 &&
                    <Link
                        href="#"
                    >
                        <div className="text-[18px] font-bold text-primary hover:text-status-darkViolet group  mr-10 transition-colors duration-200 ">
                            <div className=" flex items-center space-x-2">
                                <p>View more</p>
                                <span className="bold -rotate-45">
                                    <FaArrowRight />
                                </span>
                            </div>
                            <span className="h-[1.5px] block bg-primary w-[90px] group-hover:text-status-darkViolet transition-colors duration-200"></span>
                        </div>
                    </Link>
                }
            </div>

            {
                ErrorMsg &&
                <div className="w-full flex items-center justify-center h-[300px] ">
                    <p className="text-[16px] text-center text-red-500">{ErrorMsg}</p>
                </div>
            }

            {
                isLoading ?
                    <Loading />
                    :
                    <div className="flex ">
                        {
                            listingData.map((listing, index) => (
                                <div key={listing.id} className=" w-full">
                                    <div className="grid grid-col-4 gap-x-4 w-[250px] h-[280px] ">
                                        <div className="bg-[#EBE9F4]  flex flex-col p-3 rounded-2xl">
                                            {listing.businessPictures.length > 1 && (
                                                <img
                                                    src={listing.businessPictures[0]}
                                                    alt=""
                                                    width={230}
                                                    className="rounded-xl border-[1.5px] border-[#D9D9D9] h-[150px]"
                                                />
                                            )}
                                            <div className="mt-2 flex flex-col justify-between h-full">
                                                <h2 className="text-[25px] font-bold">{listing.businessName}</h2>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-2 ">
                                                        <div className="flex">
                                                            {profileImages ? (
                                                                <div>
                                                                    {profileImages[listing.posterId] ? (
                                                                        <img
                                                                            src={profileImages[listing.posterId]}
                                                                            alt={`Profile of ${listing.posterId}`}
                                                                            width={25}
                                                                            className="h-[25px] rounded-[50%] "
                                                                        />
                                                                    ) : (
                                                                        <div className="bg-[#b4b2be] text-white p-[9px] rounded-[50%] ">
                                                                            <FaRegUser size={10} />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <p className="text-[12px]">{imgErrMsg}</p>
                                                            )}
                                                        </div>

                                                        <p className="text-[16px] font-[500]">{firstName[listing.posterId]} {lastName[listing.posterId]}</p>
                                                    </div>
                                                    <p className="text-[16px] text-[#381F8C] font-[600]">From ${listing.pricing} </p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }

        </div >
    );
}

export default CategoryListing;