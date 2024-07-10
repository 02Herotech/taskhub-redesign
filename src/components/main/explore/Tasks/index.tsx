"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useGetActiveTasksQuery, useSearchTaskByTextQuery } from "@/services/tasks";
import { Task } from "@/types/services/tasks";
import Dropdown from "@/components/global/Dropdown";
import TaskCard from "../TaskCard";
import Button from "@/components/global/Button";
import ReactSlider from "react-slider";
import axios from "axios";
import Loading from "@/shared/loading";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown } from "react-icons/io";
import { locationData } from "@/data/marketplace/data";
import { IoCloseCircle } from "react-icons/io5";

type Category = {
    id: number;
    categoryName: string;
};

type FilterState = {
    category: string | null;
    location: string | null;
    serviceType: "REMOTE_SERVICE" | "PHYSICAL_SERVICE" | null;
    price: [number, number] | null;
    other: string | null;
};

const Tasks: React.FC = () => {
    const [priceValues, setPriceValues] = useState<[number, number]>([5, 10000]);
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchResultsPage, setSearchResultsPage] = useState(1);
    const itemsPerPage = 9;
    const [filteredData, setFilteredData] = useState<Task[]>([]);
    const [dataToRender, setDataToRender] = useState<Task[]>([]);
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [paginationLength, setPaginationLength] = useState(9);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedLocation, setSelectedLocation] = useState("")
    const [selectedServiceType, setSelectedServiceType] = useState("")
    const [activeFilters, setActiveFilters] = useState<FilterState>({
        category: null,
        location: null,
        serviceType: null,
        price: null,
        other: null
    });

    const { data: tasksData, isLoading, refetch } = useGetActiveTasksQuery(currentPage);
    const { data: searchResults } = useSearchTaskByTextQuery({ text: searchText, pageNumber: currentPage });
    console.log(tasksData)

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const response = await axios.get<Category[]>(`${process.env.NEXT_PUBLIC_API_URL}/util/all-categories`);
                setCategoriesData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategoriesData();
    }, []);

    const handlePageChange = useCallback((pageNumber: number, isSearch: boolean = false) => {
        if (isSearch) {
            setSearchResultsPage(pageNumber);
        } else {
            setCurrentPage(pageNumber);
        }
    }, []);

    const totalPages = Math.ceil((tasksData?.totalElements || 0) / itemsPerPage);
    const searchTotalPages = Math.ceil((searchResults?.totalElements || 0) / itemsPerPage);
    const filteredTotalPages = Math.ceil(filteredData.length / itemsPerPage);

    const applyFilters = useCallback((filters: FilterState) => {
        if (!tasksData?.content) return;
        let filtered = tasksData.content;

        if (filters.category !== null) {
            filtered = filtered.filter(item => item.category.categoryName === filters.category);
        }

        if (filters.location !== null) {
            filtered = filtered.filter(item => item.state === filters.location);
        }

        if (filters.serviceType !== null) {
            filtered = filtered.filter(item => item.taskType === filters.serviceType);
        }

        // if (filters.price !== null) {
        //     filtered = filtered.filter(item =>
        //         item.customerBudget >= filters.price[0] &&
        //         item.customerBudget <= filters.price[1]
        //     );
        // }

        if (filters.other) {
            switch (filters.other) {
                case "priceDesc":
                    filtered.sort((a, b) => b.customerBudget - a.customerBudget);
                    break;
                case "priceAsc":
                    filtered.sort((a, b) => a.customerBudget - b.customerBudget);
                    break;
                case "dateAsc":
                    filtered.sort((a, b) => new Date(a.taskTime).getTime() - new Date(b.taskTime).getTime());
                    break;
                case "dateDesc":
                    filtered.sort((a, b) => new Date(b.taskTime).getTime() - new Date(a.taskTime).getTime());
                    break;
            }
        }

        setFilteredData(filtered);
        setFiltersApplied(true);
    }, [tasksData]);

    const updateFilter = useCallback((key: keyof FilterState, value: any) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev, [key]: value };
            applyFilters(newFilters);
            return newFilters;
        });
    }, [applyFilters]);

    const handleFilterByCategory = useCallback((categoryName: string) => {
        updateFilter('category', categoryName);
    }, [updateFilter]);

    const handleFilterByPriceRange = useCallback((minPrice: number, maxPrice: number) => {
        updateFilter('price', [minPrice, maxPrice]);
    }, [updateFilter]);

    const handleFilterByType = useCallback((type: "REMOTE_SERVICE" | "PHYSICAL_SERVICE") => {
        updateFilter('serviceType', type);
    }, [updateFilter]);

    const handleFilterByLocation = useCallback((location: string) => {
        updateFilter('location', location);
    }, [updateFilter]);

    const handleSortByPrice = useCallback((order: "asc" | "desc") => {
        updateFilter('other', order === "asc" ? "priceAsc" : "priceDesc");
    }, [updateFilter]);

    const handleFilterByDate = useCallback((order: "asc" | "desc") => {
        updateFilter('other', order === "asc" ? "dateAsc" : "dateDesc");
    }, [updateFilter]);

    // const resetFilters = useCallback(() => {
    //     setActiveFilters({
    //         category: null,
    //         location: null,
    //         serviceType: null,
    //         price: null,
    //         other: null
    //     });
    //     setFilteredData([]);
    //     setFiltersApplied(false);
    //     refetch();
    // }, [refetch]);

    useEffect(() => {
        if (filteredData.length > 0) {
            setDataToRender(filteredData);
            setPaginationLength(filteredTotalPages);
        } else if (filtersApplied && filteredData.length === 0) {
            setDataToRender([]);
            setPaginationLength(filteredTotalPages)
        } else if (searchText !== "") {
            setDataToRender(searchResults?.content || []);
            setPaginationLength(searchTotalPages);
        } else {
            setDataToRender(tasksData?.content || []);
            setPaginationLength(totalPages);
        }
    }, [filteredData, tasksData, filtersApplied, searchText, searchResults, filteredTotalPages, searchTotalPages, totalPages]);

    const resetFilters = () => {
        const initialFilters: FilterState = {
            category: null,
            location: null,
            serviceType: null,
            price: null,
            other: null
        };
        setActiveFilters(initialFilters);
        setFilteredData([]);
        setFiltersApplied(false);
        setSearchText("");
        refetch();
    };

    useEffect(() => {
        if (filteredData.length > 0) {
            setDataToRender(filteredData);
            setPaginationLength(filteredTotalPages);
        } else if (filtersApplied && filteredData.length === 0) {
            setDataToRender([]);
            setPaginationLength(filteredTotalPages)
        } else if (searchText !== "") {
            setDataToRender(searchResults?.content || []);
            setPaginationLength(searchTotalPages);
        } else {
            setDataToRender(tasksData?.content || []);
            setPaginationLength(tasksData?.totalPages!);
        }
    }, [filteredData, tasksData, filtersApplied, searchText, searchResults]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="w-full flex items-center justify-center h-[300px]">
                    <Loading />
                </div>
            );
        } else if (dataToRender.length === 0) {
            return <div className="text-center text-status-darkViolet text-2xl font-semibold my-20">Tasks not found</div>;
        } else {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
                    {dataToRender.map((task, index) => (
                        <TaskCard task={task} key={index} />
                    ))}
                </div>
            );
        }
    };

    const otherOptionsDropdown = [
        {
            label: "Price: High to low",
            onClick: () => {
                handleSortByPrice("desc")
                setSelectedFilter("Price: High to low")
            },
        },
        {
            label: "Price: Low to high",
            onClick: () => {
                handleSortByPrice("asc")
                setSelectedFilter("Price: Low to high")
            },
        },
        {
            label: "Date: Ascending",
            onClick: () => {
                handleFilterByDate("asc")
                setSelectedFilter("Date: Ascending")
            },
        },
        {
            label: "Date: Descending",
            onClick: () => {
                handleFilterByDate("desc")
                setSelectedFilter("Date: Descending")
            },
        },
    ];

    type FilterKey = keyof FilterState;

    const removeFilter = (filter: FilterKey) => {
        const newFilters = { ...activeFilters };
        newFilters[filter] = null;
        setActiveFilters(newFilters);
        setFilteredData({ ...filteredData, [filter]: null } as any);
        applyFilters(newFilters);
        setSearchText("");
    };

    return (
        <section className="py-10 container">
            {/* Search bar */}
            <section className="pt-10">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-4 max-lg:my-4 max-lg:w-full max-lg:justify-between max-lg:px-1">
                        <div className="flex h-[29px] items-center space-x-2 rounded-lg border border-status-violet bg-[#F1F1F2] px-4 max-sm:w-full lg:h-[55px] lg:w-[300px] lg:rounded-2xl">
                            <CiSearch className="h-6 w-6 text-status-violet" />
                            <input
                                placeholder="Search"
                                onChange={(e) => {
                                    setFiltersApplied(false);
                                    setSearchText(e.target.value)
                                }}
                                type="search"
                                value={searchText}
                                className="w-full bg-[#F1F1F2] text-base outline-none placeholder:text-base focus:outline-none active:outline-none lg:py-3"
                            />
                        </div>
                        <button type="button" className="flex h-[29px] w-[29px] items-center justify-center rounded-lg bg-primary lg:h-[55px] lg:w-[55px] lg:rounded-2xl">
                            <CiSearch className="h-5 w-5 text-status-violet lg:h-7 lg:w-7" />
                        </button>
                    </div>
                </div>
            </section>
            <div className="hidden lg:flex lg:space-x-4 mt-10 items-center">
                <Button className="rounded-full text-center w-[100px] text-sm" onClick={resetFilters}>
                    All
                </Button>

                {/* Category */}
                <div className="">
                    <Dropdown
                        trigger={() => (
                            <div className={`w-full cursor-pointer border-2 ${activeFilters.category !== null ? 'border-tc-orange text-tc-orange' : 'border-primary text-primary'}  bg-[#F1F1F2] flex items-center justify-center space-x-2 font-semibold py-2 px-4 rounded-full`}>
                                <h2 className="text-sm">{activeFilters.category !== null ? selectedCategory : "Category"}</h2>
                                {activeFilters.category ? <IoCloseCircle className="text-tc-orange cursor-pointer size-7 absolute -top-4 -right-3" onClick={() => removeFilter("category")} /> : <IoMdArrowDropdown />}
                            </div>
                        )}
                        className='left-0 right-0 top-14'
                    >
                        <form className='bg-white min-w-[240px] rounded-2xl p-2'>
                            {categoriesData.map((category, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleFilterByCategory(category.categoryName)}
                                    className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between p-2'>
                                    <div className="">
                                        {category?.categoryName}
                                    </div>
                                </div>
                            ))}
                        </form>
                    </Dropdown>
                </div>

                {/* Location */}
                <div className="">
                    <Dropdown
                        trigger={() => (
                            <div className={`w-full cursor-pointer border-2 ${activeFilters.location !== null ? 'border-tc-orange text-tc-orange' : 'border-primary text-primary'} bg-[#F1F1F2] flex items-center justify-center space-x-2 font-semibold py-2 px-4 rounded-full`}>
                                <h2 className="text-sm">{activeFilters.location !== null ? selectedLocation : "Location"}</h2>
                                {activeFilters.location ? <IoCloseCircle className="text-tc-orange cursor-pointer size-7 absolute -top-4 -right-3" onClick={() => removeFilter("location")} /> : <IoMdArrowDropdown />}
                            </div>
                        )}
                        className='-left-24 top-14'>
                        <form className='bg-white min-w-[240px] rounded-2xl p-4'>
                            {locationData.map((location, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleFilterByLocation(location)}
                                    className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between p-2'>
                                    <div className="">
                                        {location}
                                    </div>
                                </div>
                            ))}
                        </form>
                    </Dropdown>
                </div>

                {/* Type of service */}
                <div className="">
                    <Dropdown
                        trigger={() => (
                            <div id="typeOfService" className={`w-full cursor-pointer border-2 ${activeFilters.serviceType !== null ? 'border-tc-orange text-tc-orange' : 'border-primary text-primary'} bg-[#F1F1F2] flex items-center justify-center space-x-2 font-semibold py-2 px-4 rounded-full`}>
                                <h2 className="text-sm">{activeFilters.serviceType !== null ? selectedServiceType : "Type of service"}</h2>
                                {activeFilters.serviceType ? <IoCloseCircle className="text-tc-orange cursor-pointer size-7 absolute -top-4 -right-3" onClick={() => removeFilter("serviceType")} /> : <IoMdArrowDropdown />}
                            </div>
                        )}
                        className='-left-24 top-14'>
                        <div className='bg-white min-w-[240px] rounded-2xl p-5 space-y-5'>
                            <h4 className="text-xl text-black font-semibold">Type of service</h4>
                            <div className="flex mb-6 w-full rounded-full bg-orange-100">
                                <button
                                    className={`px-6 py-2 rounded-full text-status-darkViolet font-bold text-lg focus:outline-none ${activeFilters.serviceType === 'REMOTE_SERVICE' ? 'bg-orange-500 flex-1' : 'bg-transparent'}`}
                                    onClick={() => handleFilterByType('REMOTE_SERVICE')}
                                >
                                    Remote
                                </button>
                                <button
                                    className={`px-6 py-2 rounded-full text-status-darkViolet font-bold text-lg focus:outline-none ${activeFilters.serviceType === 'PHYSICAL_SERVICE' ? 'bg-orange-500  flex-1' : 'bg-transparent'}`}
                                    onClick={() => handleFilterByType('PHYSICAL_SERVICE')}
                                >
                                    Physical
                                </button>
                            </div>
                        </div>
                    </Dropdown>
                </div>

                {/* Price range */}
                <div className="relative">
                    <Dropdown
                        trigger={() => (
                            <div className={`w-full cursor-pointer border-2 ${activeFilters.price !== null ? 'border-tc-orange text-tc-orange' : 'border-primary text-primary'} bg-[#F1F1F2] flex items-center justify-center space-x-2 font-semibold py-2 px-4 rounded-full`}>
                                <h2 className="text-sm">Pricing</h2>
                                {activeFilters.price ? (
                                    <IoCloseCircle
                                        className="text-tc-orange cursor-pointer size-7 absolute -top-4 -right-3"
                                        onClick={() => {
                                            setPriceValues([5, 10000]);
                                            setActiveFilters({ ...activeFilters, price: null });
                                            applyFilters({ ...activeFilters, price: null });
                                        }}
                                    />
                                ) : (
                                    <IoMdArrowDropdown />
                                )}
                            </div>
                        )}
                        className='-left-24 top-14'>
                        <div className='bg-white min-w-[240px] rounded-2xl p-5 space-y-6'>
                            <h4 className="text-xl text-black font-semibold">Price</h4>
                            <div className="flex justify-center space-x-2 text-lg text-status-darkViolet font-bold">
                                <span>${priceValues[0]}</span>
                                <span>-</span>
                                <span>${priceValues[1]}</span>
                            </div>
                            <ReactSlider
                                className="relative w-full h-2 bg-[#FE9B07] rounded-2xl"
                                thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                                trackClassName="top-1/2 bg-[#FE9B07]"
                                min={5}
                                max={10000}
                                defaultValue={[5, 10000]}
                                onChange={(values) => setPriceValues(values as [number, number])}
                                onAfterChange={(values) => handleFilterByPriceRange(values[0], values[1])}
                            />
                            <div className="flex items-center justify-between space-x-8 w-full">
                                <Button theme="outline" className="rounded-full" onClick={() => setPriceValues([5, 10000])}>
                                    Cancel
                                </Button>
                                <Button className="rounded-full" onClick={() => {
                                    handleFilterByPriceRange(priceValues[0], priceValues[1])
                                    setShowPriceDropdown(false)
                                }}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </Dropdown>
                </div>

                {/* Other options */}
                <div className="relative">
                    <Dropdown
                        trigger={() => (
                            <div className={`w-full relative cursor-pointer border-2 ${activeFilters.other !== null ? 'border-tc-orange text-tc-orange' : 'border-primary text-primary'} bg-[#F1F1F2] flex items-center justify-center space-x-2 font-semibold py-2 px-4 rounded-full`}>
                                <h2 className="text-sm">{selectedFilter != "" ? selectedFilter : "Others"}</h2>
                                {activeFilters.other ? (
                                    <IoCloseCircle
                                        className="text-tc-orange cursor-pointer size-7 absolute -top-4 -right-3"
                                        onClick={() => {
                                            setActiveFilters({ ...activeFilters, other: null });
                                            applyFilters({ ...activeFilters, other: null });
                                        }}
                                    />
                                ) : (
                                    <IoMdArrowDropdown />
                                )}
                            </div>
                        )}
                        className='-left-24 top-14'>
                        <div className='bg-white min-w-[200px] rounded-2xl p-5 space-y-5'>
                            <h4 className="text-xl text-black font-semibold">Others</h4>
                            {otherOptionsDropdown.map((option, index) => (
                                <div
                                    key={index}
                                    onClick={option.onClick}
                                    className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between'>
                                    <div className="">
                                        {option.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Dropdown>
                </div>

                <Button className="rounded-full bg-tc-orange border-none text-center text-sm" onClick={resetFilters}>
                    Reset filters
                </Button>
            </div>

            {/* Mobile filters */}  
            <div className="flex items-center justify-center w-full">
                <div className="lg:hidden flex justify-between items-center space-x-4 mt-5">
                    <Dropdown
                        trigger={() => (
                            <Button theme="outline" className="flex items-center space-x-4 rounded-full w-[270px]" onClick={() => setShowMobileFilters(true)}>
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 2.00191C4.73478 2.00191 4.48043 2.10723 4.29289 2.29472C4.10536 2.4822 4 2.73649 4 3.00163C4 3.26678 4.10536 3.52106 4.29289 3.70855C4.48043 3.89603 4.73478 4.00136 5 4.00136C5.26522 4.00136 5.51957 3.89603 5.70711 3.70855C5.89464 3.52106 6 3.26678 6 3.00163C6 2.73649 5.89464 2.4822 5.70711 2.29472C5.51957 2.10723 5.26522 2.00191 5 2.00191ZM2.17 2.00191C2.3766 1.41653 2.75974 0.909636 3.2666 0.55109C3.77346 0.192543 4.37909 0 5 0C5.62091 0 6.22654 0.192543 6.7334 0.55109C7.24026 0.909636 7.6234 1.41653 7.83 2.00191H15C15.2652 2.00191 15.5196 2.10723 15.7071 2.29472C15.8946 2.4822 16 2.73649 16 3.00163C16 3.26678 15.8946 3.52106 15.7071 3.70855C15.5196 3.89603 15.2652 4.00136 15 4.00136H7.83C7.6234 4.58673 7.24026 5.09363 6.7334 5.45218C6.22654 5.81072 5.62091 6.00327 5 6.00327C4.37909 6.00327 3.77346 5.81072 3.2666 5.45218C2.75974 5.09363 2.3766 4.58673 2.17 4.00136H1C0.734784 4.00136 0.48043 3.89603 0.292893 3.70855C0.105357 3.52106 0 3.26678 0 3.00163C0 2.73649 0.105357 2.4822 0.292893 2.29472C0.48043 2.10723 0.734784 2.00191 1 2.00191H2.17ZM11 8.00027C10.7348 8.00027 10.4804 8.1056 10.2929 8.29309C10.1054 8.48057 10 8.73486 10 9C10 9.26514 10.1054 9.51943 10.2929 9.70691C10.4804 9.8944 10.7348 9.99973 11 9.99973C11.2652 9.99973 11.5196 9.8944 11.7071 9.70691C11.8946 9.51943 12 9.26514 12 9C12 8.73486 11.8946 8.48057 11.7071 8.29309C11.5196 8.1056 11.2652 8.00027 11 8.00027ZM8.17 8.00027C8.3766 7.4149 8.75974 6.908 9.2666 6.54946C9.77346 6.19091 10.3791 5.99837 11 5.99837C11.6209 5.99837 12.2265 6.19091 12.7334 6.54946C13.2403 6.908 13.6234 7.4149 13.83 8.00027H15C15.2652 8.00027 15.5196 8.1056 15.7071 8.29309C15.8946 8.48057 16 8.73486 16 9C16 9.26514 15.8946 9.51943 15.7071 9.70691C15.5196 9.8944 15.2652 9.99973 15 9.99973H13.83C13.6234 10.5851 13.2403 11.092 12.7334 11.4505C12.2265 11.8091 11.6209 12.0016 11 12.0016C10.3791 12.0016 9.77346 11.8091 9.2666 11.4505C8.75974 11.092 8.3766 10.5851 8.17 9.99973H1C0.734784 9.99973 0.48043 9.8944 0.292893 9.70691C0.105357 9.51943 0 9.26514 0 9C0 8.73486 0.105357 8.48057 0.292893 8.29309C0.48043 8.1056 0.734784 8.00027 1 8.00027H8.17ZM5 13.9986C4.73478 13.9986 4.48043 14.104 4.29289 14.2915C4.10536 14.4789 4 14.7332 4 14.9984C4 15.2635 4.10536 15.5178 4.29289 15.7053C4.48043 15.8928 4.73478 15.9981 5 15.9981C5.26522 15.9981 5.51957 15.8928 5.70711 15.7053C5.89464 15.5178 6 15.2635 6 14.9984C6 14.7332 5.89464 14.4789 5.70711 14.2915C5.51957 14.104 5.26522 13.9986 5 13.9986ZM2.17 13.9986C2.3766 13.4133 2.75974 12.9064 3.2666 12.5478C3.77346 12.1893 4.37909 11.9967 5 11.9967C5.62091 11.9967 6.22654 12.1893 6.7334 12.5478C7.24026 12.9064 7.6234 13.4133 7.83 13.9986H15C15.2652 13.9986 15.5196 14.104 15.7071 14.2915C15.8946 14.4789 16 14.7332 16 14.9984C16 15.2635 15.8946 15.5178 15.7071 15.7053C15.5196 15.8928 15.2652 15.9981 15 15.9981H7.83C7.6234 16.5835 7.24026 17.0904 6.7334 17.4489C6.22654 17.8075 5.62091 18 5 18C4.37909 18 3.77346 17.8075 3.2666 17.4489C2.75974 17.0904 2.3766 16.5835 2.17 15.9981H1C0.734784 15.9981 0.48043 15.8928 0.292893 15.7053C0.105357 15.5178 0 15.2635 0 14.9984C0 14.7332 0.105357 14.4789 0.292893 14.2915C0.48043 14.104 0.734784 13.9986 1 13.9986H2.17Z" fill="#381F8C" />
                                </svg>
                                <h3>Filter by</h3>
                            </Button>
                        )}
                        closeOnClick={false}
                        className='left-0 right-0 mx-auto top-14'>
                        {showMobileFilters && (
                            <div className='bg-white rounded-2xl px-8 py-10 space-y-8 font-satoshi h-[500px] small-scrollbar overflow-y-auto'>
                                <h3 className="font-bold text-primary text-2xl">Filter by</h3>
                                <form action="" className="space-y-6">
                                    {locationData.map((location, index) => (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                handleFilterByLocation(location)
                                                setShowMobileFilters(false)
                                            }}
                                            className='flex w-full transition-all text-primary text-base font-medium hover:text-tc-orange cursor-pointer items-center space-x-3'>
                                            <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                            <div className="">
                                                {location}
                                            </div>
                                        </div>
                                    ))}
                                </form>

                                <form action="" className="space-y-8 mt-5">
                                    <h3 className="font-bold text-status-darkViolet text-2xl">Services</h3>
                                    {categoriesData.map((category, index) => (
                                        <div className="flex items-center space-x-3 cursor-pointer hover:text-tc-orange" key={index} onClick={() => {
                                            handleFilterByCategory(category.categoryName)
                                            setShowMobileFilters(false)
                                        }}>
                                            <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                            <div className="font-medium text-base text-primary hover:text-tc-orange">{category.categoryName}</div>
                                        </div>
                                    ))}
                                </form>

                                <form action="" className="space-y-8 mt-5">
                                    <h3 className="font-bold text-status-darkViolet text-2xl">Type of Service</h3>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => {
                                        handleFilterByType('PHYSICAL_SERVICE')
                                        setShowMobileFilters(false)
                                    }}>
                                        <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                        <div className="font-medium text-lg text-primary">Physical</div>
                                    </div>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => {
                                        handleFilterByType('REMOTE_SERVICE')
                                        setShowMobileFilters(false)
                                    }}>
                                        <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                        <div className="font-medium text-lg text-primary">Remote</div>
                                    </div>
                                </form>

                                <form action="" className="space-y-8 mt-5">
                                    <h3 className="font-bold text-status-darkViolet text-2xl">Pricing</h3>
                                    <div className="w-full space-y-6">
                                        <h4 className="text-md text-primary font-medium">Price range</h4>
                                        <ReactSlider
                                            className="relative w-full h-2 bg-[#FE9B07] rounded-2xl"
                                            thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                                            trackClassName="top-1/2 bg-[#FE9B07]"
                                            value={priceValues}
                                            min={5}
                                            max={10000}
                                            step={5}
                                            onChange={(newValues) => setPriceValues(newValues as [number, number])}
                                        />
                                        <div className="text-sm text-primary text-center mt-4">
                                            ${priceValues[0]} - ${priceValues[1]}
                                        </div>
                                        <div className="flex items-center justify-between space-x-8 w-full">
                                            <Button theme="outline" className="rounded-full" onClick={() => setPriceValues([5, 10000])}>
                                                Cancel
                                            </Button>
                                            <Button className="rounded-full" onClick={() => {
                                                handleFilterByPriceRange(priceValues[0], priceValues[1])
                                                setShowMobileFilters(false)
                                            }}>
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => {
                                        handleSortByPrice("desc")
                                        setShowMobileFilters(false)
                                    }}>
                                        <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                        <div className="font-medium text-lg text-primary">Highest to Lowest</div>
                                    </div>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => {
                                        handleSortByPrice("asc")
                                        setShowMobileFilters(false)
                                    }}>
                                        <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                        <div className="font-medium text-lg text-primary">Lowest to Highest</div>
                                    </div>
                                </form>

                                <form action="" className="space-y-8 mt-5">
                                    <h3 className="font-bold text-status-darkViolet text-2xl">Others</h3>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => {
                                        handleFilterByDate("asc")
                                        setShowMobileFilters(false)
                                    }}>
                                        <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                        <div className="font-medium text-lg text-primary">Earliest</div>
                                    </div>
                                    <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => {
                                        handleFilterByDate("desc")
                                        setShowMobileFilters(false)
                                    }}>
                                        <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                        <div className="font-medium text-lg text-primary">Latest</div>
                                    </div>
                                </form>
                            </div>
                        )}
                    </Dropdown>
                    <Button className="rounded-full text-center w-full text-sm" onClick={resetFilters}>
                        Reset filters
                    </Button>
                </div>
            </div>


            <div className="w-full">
                {renderContent()}
                {dataToRender.length > 0 && (
                    <div className="flex justify-center items-center my-4">
                        <button
                            onClick={() => handlePageChange((searchText ? searchResultsPage : currentPage) - 1, searchText !== "")}
                            disabled={searchText ? searchResultsPage === 1 : currentPage === 1}
                            className={`bg-primary text-white mr-10 rounded max-lg:text-xs lg:rounded-[10px] h-[39px] w-[39px] flex items-center justify-center ${searchText ? searchResultsPage === 1 : currentPage === 1 ? 'bg-status-violet' : ''}`}
                        >
                            <FaChevronLeft />
                        </button>
                        {Array.from({ length: paginationLength }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1, searchText !== "")}
                                className={`border font-bold rounded max-lg:text-xs mx-2 lg:rounded-[10px] h-[39px] w-[39px] flex items-center justify-center ${searchText ? searchResultsPage === index + 1 : currentPage === index + 1 ? "bg-primary text-white" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange((searchText ? searchResultsPage : currentPage) + 1, searchText !== "")}
                            disabled={searchText ? searchResultsPage === searchTotalPages : currentPage === totalPages}
                            className={`bg-primary text-white ml-10 rounded max-lg:text-xs lg:rounded-[10px] h-[39px] w-[39px] flex items-center justify-center ${searchText ? searchResultsPage === searchTotalPages : currentPage === totalPages ? 'bg-status-violet' : ''}`}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
};

export default Tasks;