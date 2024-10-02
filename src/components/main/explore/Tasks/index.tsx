"use client";

import React, { useState, useEffect, FormEvent } from "react";
import ReactSlider from "react-slider";
import axios from "axios";
import Loading from "@/shared/loading";
import { CiSearch } from "react-icons/ci";
import { locationData, typeData } from "@/data/marketplace/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchAllMarketplaseCategories } from "@/lib/marketplace";
import { filterExploreTasks, resetFilter, setFilterLoadingState, setFilterParams, updateCategories } from "@/store/Features/explore";
import { BsTriangleFill, BsX } from "react-icons/bs";
import { truncateText } from "@/utils/marketplace";
import { GiSettingsKnobs } from "react-icons/gi";
import ExploreCategoryLising from "../ExploreCategoryListing";
import ExploreMobileFilterModal from "../MobileFIlter";

const Tasks: React.FC = () => {
    const [isMobileFilterModalShown, setIsMobileFilterModalShown] = useState(false);
    const { categories, isFiltering, isFilteringLoading } = useSelector(
        (state: RootState) => state.explore,
    );
    const dispatch = useDispatch();
    const [isMounted, setIsMounted] = useState(false);
    const [searchInputData, setSearchInputData] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        isOpened: false,
        category: "",
    });

    const [filterDataStructure, setfilterDataStructure] =
        useState<FilterDataStructureTypes>({
            category: "",
            location: "",
            typeOfService: "",
            typeOfServiceDisplay: "",
            minPrice: 5,
            maxPrice: 1000,
        });

    // done and working
    useEffect(() => {
        const fetchData = async () => {
            const categoryData: CategoryType[] =
                await fetchAllMarketplaseCategories();
            dispatch(updateCategories(categoryData));
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [isFiltering]);

    // done and working
    const handleShowDropdown = (category: string) => {
        if (isDropdownOpen.category === category && isDropdownOpen.isOpened) {
            setIsDropdownOpen((prev) => ({ ...prev, isOpened: false, category }));
        } else {
            setIsDropdownOpen((prev) => ({ ...prev, isOpened: true, category }));
        }
    };

    const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            dispatch(setFilterLoadingState(true));
            const url =
                "https://smp.jacinthsolutions.com.au/api/v1/task/text/0?text=" +
                searchInputData;
            const { data } = await axios.get(url);
            dispatch(setFilterParams(`?text=${searchInputData}`));
            dispatch(
                filterExploreTasks({ data: data.content, totalPages: data.totalPages }),
            );
        } catch (error: any) {
            console.log(error.response?.data || error);
        } finally {
            dispatch(setFilterLoadingState(false));
        }
    };

    const handleFilter = async () => {
        try {
            dispatch(setFilterLoadingState(true));
            const { category, location, typeOfService, minPrice, maxPrice } =
                filterDataStructure;
            let url =
                "https://smp.jacinthsolutions.com.au/api/v1/task/filter-tasks/0?";
            const params = [];

            if (category) {
                params.push(`category=${category}`);
            }
            if (location) {
                params.push(`location=${location}`);
            }
            if (typeOfService) {
                params.push(`typeOfService=${typeOfService}`);
            }
            if (minPrice > 5) {
                params.push(`minPrice=${minPrice}`);
            }
            if (maxPrice < 1000) {
                params.push(`maxPrice=${maxPrice}`);
            }
            if (params.length > 0) {
                url += params.join("&");
            }
            const response = await axios.get(url);
            dispatch(
                filterExploreTasks({
                    data: response.data.content,
                    totalPages: response.data.totalPages,
                }),
            );
            dispatch(setFilterParams(`?${params.join("&")}`));
        } catch (error: any) {
            console.log(error.response.data || error);
        } finally {
            dispatch(setFilterLoadingState(false));
        }
    };

    const handleResetFilters = () => {
        setfilterDataStructure({
            category: "",
            location: "",
            typeOfService: "",
            minPrice: 5,
            maxPrice: 1000,
            typeOfServiceDisplay: "",
        });
        dispatch(resetFilter());
    };

    useEffect(() => {
        if (isMounted) {
            if (
                filterDataStructure.category ||
                filterDataStructure.location ||
                filterDataStructure.typeOfService ||
                filterDataStructure.typeOfServiceDisplay ||
                filterDataStructure.minPrice !== 5 ||
                filterDataStructure.maxPrice !== 1000
            ) {
                handleFilter();
            } else {
                dispatch(resetFilter());
            }
        } else {
            setIsMounted(true);
        }
        // eslint-disable-next-line
    }, [filterDataStructure]);


    return (
        <section className="py-10 container">
            {/* Search bar */}
            <section className="py-10">
                <div className="flex w-full items-center justify-between">
                    <form className="flex items-center space-x-4 max-lg:my-4 max-lg:w-full max-lg:justify-between max-lg:px-1" onSubmit={handleSearchSubmit}>
                        <div className="flex h-[29px] items-center space-x-2 rounded-lg border border-status-violet bg-[#F1F1F2] px-4 max-sm:w-full lg:h-[55px] lg:w-[300px] lg:rounded-2xl">
                            <CiSearch className="h-6 w-6 text-status-violet" />
                            <input
                                placeholder="Search"
                                value={searchInputData}
                                onChange={(event) => setSearchInputData(event.target.value)}
                                type="search"
                                className="w-full bg-[#F1F1F2] text-base outline-none placeholder:text-base focus:outline-none active:outline-none lg:py-3"
                            />
                        </div>
                        <button type="submit" className="flex h-[29px] w-[29px] items-center justify-center rounded-lg bg-primary lg:h-[55px] lg:w-[55px] lg:rounded-2xl">
                            <CiSearch className="h-5 w-5 text-status-violet lg:h-7 lg:w-7" />
                        </button>
                    </form>
                </div>
            </section>
            <section className="flex flex-col gap-5">
                <div className={`max-md:hidden  ${isFiltering ? "order-2" : ""} `}>
                    <div className="flex flex-wrap gap-4 space-x-2 text-xs lg:space-x-6 ">
                        <button
                            className="cursor-pointer rounded-3xl bg-violet-normal px-4 py-2 text-base  font-bold text-white"
                            onClick={() => {
                                handleResetFilters();
                            }}
                        >
                            All
                        </button>
                        {/* -------------------------------- */}
                        {/* Category */}
                        <div className="relative">
                            {filterDataStructure.category !== "" && (
                                <button
                                    className="pointer-events-auto absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white "
                                    onClick={() => {
                                        setfilterDataStructure((prev) => ({
                                            ...prev,
                                            category: "",
                                        }));
                                    }}
                                >
                                    <span></span>
                                    <BsX />
                                </button>
                            )}
                            <button
                                className="flex items-center gap-2 rounded-3xl border border-violet-normal bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                                onClick={() => handleShowDropdown("category")}
                            >
                                <div
                                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen.isOpened && isDropdownOpen.category === "category" ? "block" : "hidden"} `}
                                    onClick={() => handleShowDropdown("category")}
                                ></div>
                                {filterDataStructure.category === ""
                                    ? "Category"
                                    : truncateText(filterDataStructure.category, 12)}
                                <span>
                                    <BsTriangleFill
                                        fill="rgb(56 31 140)"
                                        className="size-2 rotate-[60deg] text-violet-normal"
                                    />
                                </span>
                            </button>
                            <div
                                className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "category" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
                            >
                                {categories.map((item) => (
                                    <button
                                        className=" relative whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                                        key={item.id}
                                        onClick={() => {
                                            handleShowDropdown("category");
                                            setfilterDataStructure((prev) => ({
                                                ...prev,
                                                category: item.categoryName,
                                            }));
                                        }}
                                    >
                                        {item.categoryName}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* -------------------------------- */}
                        {/* location */}
                        <div className="relative">
                            {filterDataStructure.location !== "" && (
                                <button
                                    className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white"
                                    onClick={() =>
                                        setfilterDataStructure((prev) => ({
                                            ...prev,
                                            location: "",
                                        }))
                                    }
                                >
                                    <BsX />
                                </button>
                            )}
                            <button
                                className=" flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                                onClick={() => handleShowDropdown("location")}
                            >
                                <div
                                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen.isOpened && isDropdownOpen.category === "location" ? "block" : "hidden"} `}
                                    onClick={() => handleShowDropdown("location")}
                                ></div>
                                {filterDataStructure.location === ""
                                    ? "Location"
                                    : truncateText(filterDataStructure.location, 12)}
                                <span>
                                    <BsTriangleFill
                                        fill="rgb(56 31 140)"
                                        className="size-2 rotate-[60deg] text-violet-normal"
                                    />
                                </span>
                            </button>
                            <div
                                className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "location" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
                            >
                                {locationData.map((item, index) => (
                                    <button
                                        className="whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                                        key={index}
                                        onClick={() => {
                                            handleShowDropdown("location");
                                            setfilterDataStructure((prev) => ({
                                                ...prev,
                                                location: item,
                                            }));
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Type of service */}
                        <div className="relative">
                            {filterDataStructure.typeOfService !== "" && (
                                <button
                                    className="pointer-events-auto absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white "
                                    onClick={() => {
                                        setfilterDataStructure((prev) => ({
                                            ...prev,
                                            typeOfService: "",
                                            typeOfServiceDisplay: "",
                                        }));
                                    }}
                                >
                                    <BsX />
                                </button>
                            )}
                            <button
                                className=" flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                                onClick={() => handleShowDropdown("type")}
                            >
                                <div
                                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen.isOpened && isDropdownOpen.category === "type" ? "block" : "hidden"} `}
                                    onClick={() => handleShowDropdown("type")}
                                ></div>
                                {filterDataStructure.typeOfServiceDisplay === ""
                                    ? "Type of service"
                                    : truncateText(
                                        filterDataStructure.typeOfServiceDisplay,
                                        12,
                                    )}
                                <span>
                                    <BsTriangleFill
                                        fill="rgb(56 31 140)"
                                        className="size-2 rotate-[60deg] text-violet-normal"
                                    />
                                </span>
                            </button>
                            <div
                                className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "type" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
                            >
                                {typeData.map((item, index) => (
                                    <button
                                        className="whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                                        key={index}
                                        onClick={() => {
                                            handleShowDropdown("type");
                                            setfilterDataStructure((prev) => ({
                                                ...prev,
                                                typeOfService: item.value,
                                                typeOfServiceDisplay: item.label,
                                            }));
                                        }}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* ----------------------------------------- */}
                        {/* Pricing */}
                        <div className="relative z-20">
                            {(filterDataStructure.minPrice !== 5 ||
                                filterDataStructure.maxPrice !== 1000) && (
                                    <button
                                        className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white"
                                        onClick={() =>
                                            setfilterDataStructure((prev) => ({
                                                ...prev,
                                                minPrice: 5,
                                                maxPrice: 1000,
                                            }))
                                        }
                                    >
                                        <BsX />
                                    </button>
                                )}
                            <button
                                className="flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                                onClick={() => handleShowDropdown("pricing")}
                            >
                                <div
                                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen.isOpened && isDropdownOpen.category === "pricing" ? "block" : "hidden"} `}
                                    onClick={() => handleShowDropdown("pricing")}
                                ></div>
                                Pricing
                                <span>
                                    <BsTriangleFill
                                        fill="rgb(56 31 140)"
                                        className="size-2 rotate-[60deg] text-violet-normal"
                                    />
                                </span>
                            </button>
                            <div
                                className={`small-scrollbar absolute top-[calc(100%+1rem)] z-50 flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "pricing" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
                            >
                                <div className="space-y-4 p-4">
                                    <div className="min-w-64 p-4">
                                        <div className="mb-6 text-center text-2xl font-bold text-violet-normal">
                                            ${filterDataStructure.minPrice} - $
                                            {filterDataStructure.maxPrice}
                                        </div>
                                        <ReactSlider
                                            className="relative h-2 w-full rounded-md bg-[#FE9B07]"
                                            thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                                            trackClassName="top-1/2 bg-[#FE9B07]"
                                            value={[
                                                filterDataStructure.minPrice,
                                                filterDataStructure.maxPrice,
                                            ]}
                                            min={5}
                                            max={1000}
                                            step={5}
                                            onChange={(newValues: number[]) => {
                                                setfilterDataStructure((prev) => ({
                                                    ...prev,
                                                    minPrice: newValues[0],
                                                    maxPrice: newValues[1],
                                                }));
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 ">
                                        <button
                                            onClick={() => handleShowDropdown("pricing")}
                                            className=" rounded-full  bg-violet-normal px-4 py-2 text-left text-sm text-white transition-opacity duration-300 hover:opacity-90 "
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="min-w-40 cursor-pointer rounded-3xl bg-orange-normal px-4 py-2 text-base  font-bold text-white"
                            onClick={handleResetFilters}
                        >
                            Reset filters
                        </button>
                    </div>
                </div>
            </section>

            <div className="relative flex justify-center md:hidden">
                <ExploreMobileFilterModal
                    isMobileFilterModalShown={isMobileFilterModalShown}
                    setIsMobileFilterModalShown={setIsMobileFilterModalShown}
                    setfilterDataStructure={setfilterDataStructure}
                    filterDataStructure={filterDataStructure}
                // handleResetFilters={handleResetFilters}
                />
                <div className="flex gap-4">
                    <button
                        className={`flex items-center justify-center gap-3 rounded-full border border-violet-normal bg-violet-light px-6 py-2 font-bold text-violet-normal ${isFiltering ? "w-auto" : "w-full min-w-72"}`}
                        onClick={() => setIsMobileFilterModalShown(true)}
                    >
                        <span>
                            <GiSettingsKnobs />
                        </span>
                        Filter By
                    </button>
                    {isFiltering && (
                        <button
                            className="min-w-40 flex-grow cursor-pointer rounded-3xl bg-orange-normal px-4 py-2 text-base font-bold text-white"
                            onClick={handleResetFilters}
                        >
                            Reset filters
                        </button>
                    )}
                </div>
            </div>


            <div>
                {isFilteringLoading ? (
                    <div className="min-h-80 items-center justify-center p-4">
                        <Loading />
                    </div>
                ) : isFiltering ? (
                    <div>
                        <ExploreCategoryLising category="All" />
                    </div>
                ) : (
                    <div>
                        {categories.length < 1 ? (
                            <Loading />
                        ) : (
                            <div>
                                <ExploreCategoryLising category="All" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
};

export default Tasks;