"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaSortDown } from "react-icons/fa";
import {
    useGetActiveTasksQuery,
} from "@/services/tasks";
import Dropdown from "@/components/global/Dropdown";
import TaskCard from "../TaskCard";
import loader from "../../../../../public/assets/images/marketplace/taskhub-newloader.gif";
import Image from "next/image";
import Button from "@/components/global/Button";
import ReactSlider from "react-slider";
import axios from "axios";
import { Task } from "@/types/services/tasks";
import { useSession } from "next-auth/react";
import Loading from "@/shared/loading";
import NewDropdown from "@/components/global/NewDropdown";
import { set } from "react-hook-form";

type Category = {
    id: number;
    categoryName: string;
};

const Tasks = () => {
    const session = useSession()
    const [priceValues, setPriceValues] = useState<[number, number]>([5, 10000]);
    const [locationValues, setLocationValues] = useState<[number, number]>([1, 50]);
    const [selectedService, setSelectedService] = useState<"REMOTE_SERVICE" | "PHYSICAL_SERVICE">("PHYSICAL_SERVICE");
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState<Task[]>([]);
    const itemsPerPage = 9;
    const [dataToRender, setDataToRender] = useState<Task[]>([]);
    const [filtersApplied, setFiltersApplied] = useState(false);
    const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)

    const { data: tasksData, isLoading, refetch } = useGetActiveTasksQuery(currentPage);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/util/all-categories`,
                );
                setCategoriesData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCategoriesData();
    }, []);

    const totalPages = Math.ceil(tasksData?.totalElements! / itemsPerPage); // Calculate total pages

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // const handleFilterByCategory = (category: string) => {
    //     if (!tasksData?.content) return;
    //     const filtered = tasksData.content.filter((item) => item. === category);
    //     setFilteredData(filtered);
    //     setFiltersApplied(true);
    // }

    const handleFilterByPriceRange = (minPrice: number, maxPrice: number) => {
        if (!tasksData?.content) return;
        const filtered = tasksData.content.filter((item) => item.customerBudget >= minPrice && item.customerBudget <= maxPrice);
        setFilteredData(filtered);
        setFiltersApplied(true);
    };

    const handleFilterByType = (type: "REMOTE_SERVICE" | "PHYSICAL_SERVICE") => {
        if (!tasksData?.content) return;
        setSelectedService(type);
        const filtered = tasksData.content.filter((item) => item.taskType === type);
        setFilteredData(filtered);
        setFiltersApplied(true);
    };

    const handleFilterByDate = (order: "asc" | "desc") => {
        if (!tasksData?.content) return;
        const sortedData = [...tasksData.content].sort((a, b) => {
            const dateA = new Date(a.taskTime).getTime();
            const dateB = new Date(b.taskTime).getTime();
            return order === "asc" ? dateA - dateB : dateB - dateA;
        });
        setFilteredData(sortedData);
        setFiltersApplied(true);
    };

    const handleSortByPrice = (order: "asc" | "desc") => {
        if (!tasksData?.content) return;
        const sortedData = [...tasksData.content].sort((a, b) => {
            return order === "asc" ? a.customerBudget - b.customerBudget : b.customerBudget - a.customerBudget;
        });
        setFilteredData(sortedData);
        setFiltersApplied(true);
    };

    const resetFilters = () => {
        setFilteredData([]);
        setFiltersApplied(false);
        refetch();
    };

    // Originally, render the tasksData.content but once a filter is applied, render the filteredData and if it's empty, show no filter result found
    useEffect(() => {
        if (filteredData.length > 0) {
            setDataToRender(filteredData);
        } else if (filtersApplied && filteredData.length === 0) {
            setDataToRender([]);
        } else {
            setDataToRender(tasksData?.content || []);
        }
    }, [filteredData, tasksData, filtersApplied]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="w-full flex items-center justify-center h-[300px]">
                    <Loading />
                </div>
            );
        } else if (dataToRender.length === 0) {
            return <div className="text-center text-status-darkViolet text-2xl font-semibold my-20">No results found</div>;
        } else {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14">
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
            onClick: () => handleSortByPrice("desc"),
        },
        {
            label: "Price: Low to high",
            onClick: () => handleSortByPrice("asc"),
        },
        {
            label: "Due date: Earliest",
            onClick: () => handleFilterByDate("asc"),
        },
        {
            label: "Due date: Latest",
            onClick: () => handleFilterByDate("desc"),
        },
        {
            label: "Closest to me",
            onClick: () => { },
        },
    ];

    console.log(tasksData)

    return (
        <section className="pt-7 container">
            <div className="hidden lg:flex lg:space-x-4 mt-14 items-center">
                {/* Category */}
                <NewDropdown
                    name="Category"
                    setIsDropdownOpen={setIsCategoryFilterOpen}
                >
                    <form className='bg-white rounded-2xl py-4 px-2'>
                        {categoriesData.map((category, index) => (
                            <div
                                key={index}
                                className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between py-3 px-5'>
                                <div className="">
                                    {category?.categoryName}
                                </div>
                            </div>
                        ))}
                    </form>
                </NewDropdown>

                {/* Location */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary bg-[#F1F1F2] flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Location</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <form className='bg-white min-w-[240px] rounded-2xl flex items-center p-4'>
                        <div className="space-y-8 w-full p-3">
                            <h4 className="text-lg text-[#190E3F] font-medium">Distance</h4>
                            <div className="text-2xl text-black font-bold text-center mb-6">
                                {locationValues[0]}km - {locationValues[1]}km
                            </div>
                            <ReactSlider
                                className="relative w-full h-2 bg-[#FE9B07] rounded-2xl"
                                thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                                trackClassName="top-1/2 bg-[#FE9B07]"
                                value={locationValues}
                                min={1}
                                max={50}
                                step={1}
                                onChange={(newValues) => setLocationValues(newValues as [number, number])}
                            />
                            <div className="flex items-center justify-between space-x-4 w-full">
                                <Button theme="outline" className="rounded-full" onClick={() => setLocationValues([1, 50])}>
                                    Cancel
                                </Button>
                                <Button className="rounded-full">
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </form>
                </Dropdown>

                {/* Type of service */}
                <Dropdown
                    trigger={() => (
                        <div id="typeOfService" className="w-full border-2 border-primary bg-[#F1F1F2] flex items-center justify-between text-primary font-semibold py-2 px-4 rounded-full">
                            <h2>Type of service</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <div className='bg-white min-w-[240px] rounded-2xl p-4 space-y-8'>
                        <h4 className="text-xl text-[#190E3F] font-medium">Type of service</h4>
                        <div className="flex mb-6 w-full rounded-full bg-orange-100">
                            <button
                                className={`px-6 py-2 rounded-full text-status-darkViolet font-bold text-lg focus:outline-none ${selectedService === 'REMOTE_SERVICE' ? 'bg-orange-500 flex-1' : 'bg-transparent'
                                    }`}
                                onClick={() => handleFilterByType('REMOTE_SERVICE')}
                            >
                                Remote
                            </button>
                            <button
                                className={`px-6 py-2 rounded-full text-status-darkViolet font-bold text-lg focus:outline-none ${selectedService === 'PHYSICAL_SERVICE' ? 'bg-orange-500  flex-1' : 'bg-transparent'
                                    }`}
                                onClick={() => handleFilterByType('PHYSICAL_SERVICE')}
                            >
                                In Person
                            </button>
                        </div>
                    </div>
                </Dropdown>

                {/* Price */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary bg-[#F1F1F2] flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Pricing</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <form className='bg-white min-w-[240px] rounded-2xl flex items-center p-4'>
                        <div className="space-y-8 w-full p-3">
                            <h4 className="text-xl text-[#190E3F] font-medium">Price</h4>
                            <div className="text-2xl text-black font-bold text-center mb-6">
                                ${priceValues[0]} - ${priceValues[1]}
                            </div>
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
                            <div className="flex items-center justify-between space-x-8 w-full">
                                <Button theme="outline" className="rounded-full" onClick={() => setPriceValues([5, 10000])}>
                                    Cancel
                                </Button>
                                <Button className="rounded-full" onClick={() => handleFilterByPriceRange(priceValues[0], priceValues[1])}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </form>
                </Dropdown>

                {/* Others */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary bg-[#F1F1F2] flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Others</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <form className='bg-white rounded-2xl p-4'>
                        <h4 className="text-lg text-black font-medium mb-4 px-5">Others</h4>
                        {otherOptionsDropdown.map((option, index) => (
                            <div
                                key={index}
                                onClick={option.onClick}
                                className='flex w-full transition-all text-[#140B31] text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between py-2 px-5'>
                                <div className="">
                                    {option.label}
                                </div>
                            </div>
                        ))}
                    </form>
                </Dropdown>

                <Button className="rounded-full w-full" onClick={resetFilters}>
                    Reset
                </Button>
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="lg:hidden mt-5">
                    <Dropdown
                        trigger={() => (
                            <Button theme="outline" className="flex items-center space-x-4 rounded-full w-[250px]">
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 2.00191C4.73478 2.00191 4.48043 2.10723 4.29289 2.29472C4.10536 2.4822 4 2.73649 4 3.00163C4 3.26678 4.10536 3.52106 4.29289 3.70855C4.48043 3.89603 4.73478 4.00136 5 4.00136C5.26522 4.00136 5.51957 3.89603 5.70711 3.70855C5.89464 3.52106 6 3.26678 6 3.00163C6 2.73649 5.89464 2.4822 5.70711 2.29472C5.51957 2.10723 5.26522 2.00191 5 2.00191ZM2.17 2.00191C2.3766 1.41653 2.75974 0.909636 3.2666 0.55109C3.77346 0.192543 4.37909 0 5 0C5.62091 0 6.22654 0.192543 6.7334 0.55109C7.24026 0.909636 7.6234 1.41653 7.83 2.00191H15C15.2652 2.00191 15.5196 2.10723 15.7071 2.29472C15.8946 2.4822 16 2.73649 16 3.00163C16 3.26678 15.8946 3.52106 15.7071 3.70855C15.5196 3.89603 15.2652 4.00136 15 4.00136H7.83C7.6234 4.58673 7.24026 5.09363 6.7334 5.45218C6.22654 5.81072 5.62091 6.00327 5 6.00327C4.37909 6.00327 3.77346 5.81072 3.2666 5.45218C2.75974 5.09363 2.3766 4.58673 2.17 4.00136H1C0.734784 4.00136 0.48043 3.89603 0.292893 3.70855C0.105357 3.52106 0 3.26678 0 3.00163C0 2.73649 0.105357 2.4822 0.292893 2.29472C0.48043 2.10723 0.734784 2.00191 1 2.00191H2.17ZM11 8.00027C10.7348 8.00027 10.4804 8.1056 10.2929 8.29309C10.1054 8.48057 10 8.73486 10 9C10 9.26514 10.1054 9.51943 10.2929 9.70691C10.4804 9.8944 10.7348 9.99973 11 9.99973C11.2652 9.99973 11.5196 9.8944 11.7071 9.70691C11.8946 9.51943 12 9.26514 12 9C12 8.73486 11.8946 8.48057 11.7071 8.29309C11.5196 8.1056 11.2652 8.00027 11 8.00027ZM8.17 8.00027C8.3766 7.4149 8.75974 6.908 9.2666 6.54946C9.77346 6.19091 10.3791 5.99837 11 5.99837C11.6209 5.99837 12.2265 6.19091 12.7334 6.54946C13.2403 6.908 13.6234 7.4149 13.83 8.00027H15C15.2652 8.00027 15.5196 8.1056 15.7071 8.29309C15.8946 8.48057 16 8.73486 16 9C16 9.26514 15.8946 9.51943 15.7071 9.70691C15.5196 9.8944 15.2652 9.99973 15 9.99973H13.83C13.6234 10.5851 13.2403 11.092 12.7334 11.4505C12.2265 11.8091 11.6209 12.0016 11 12.0016C10.3791 12.0016 9.77346 11.8091 9.2666 11.4505C8.75974 11.092 8.3766 10.5851 8.17 9.99973H1C0.734784 9.99973 0.48043 9.8944 0.292893 9.70691C0.105357 9.51943 0 9.26514 0 9C0 8.73486 0.105357 8.48057 0.292893 8.29309C0.48043 8.1056 0.734784 8.00027 1 8.00027H8.17ZM5 13.9986C4.73478 13.9986 4.48043 14.104 4.29289 14.2915C4.10536 14.4789 4 14.7332 4 14.9984C4 15.2635 4.10536 15.5178 4.29289 15.7053C4.48043 15.8928 4.73478 15.9981 5 15.9981C5.26522 15.9981 5.51957 15.8928 5.70711 15.7053C5.89464 15.5178 6 15.2635 6 14.9984C6 14.7332 5.89464 14.4789 5.70711 14.2915C5.51957 14.104 5.26522 13.9986 5 13.9986ZM2.17 13.9986C2.3766 13.4133 2.75974 12.9064 3.2666 12.5478C3.77346 12.1893 4.37909 11.9967 5 11.9967C5.62091 11.9967 6.22654 12.1893 6.7334 12.5478C7.24026 12.9064 7.6234 13.4133 7.83 13.9986H15C15.2652 13.9986 15.5196 14.104 15.7071 14.2915C15.8946 14.4789 16 14.7332 16 14.9984C16 15.2635 15.8946 15.5178 15.7071 15.7053C15.5196 15.8928 15.2652 15.9981 15 15.9981H7.83C7.6234 16.5835 7.24026 17.0904 6.7334 17.4489C6.22654 17.8075 5.62091 18 5 18C4.37909 18 3.77346 17.8075 3.2666 17.4489C2.75974 17.0904 2.3766 16.5835 2.17 15.9981H1C0.734784 15.9981 0.48043 15.8928 0.292893 15.7053C0.105357 15.5178 0 15.2635 0 14.9984C0 14.7332 0.105357 14.4789 0.292893 14.2915C0.48043 14.104 0.734784 13.9986 1 13.9986H2.17Z" fill="#381F8C" />
                                </svg>
                                <h3>Filter by</h3>
                            </Button>
                        )}
                        className='left-0 right-0 mx-auto h-[500px] overflow-y-scroll top-14'>
                        <div className='bg-white rounded-2xl px-5 py-10 space-y-8 font-satoshi small-scrollbar overflow-y-auto'>
                            <h3 className="font-bold text-primary text-2xl">Filter by</h3>

                            <form action="" className="space-y-8">
                                <div className="flex items-center space-x-3 text-primary">
                                    <input type="checkbox" />
                                    <label htmlFor="" className="font-medium text-lg">Available task only</label>
                                </div>
                                <div className="flex items-center space-x-3 text-primary">
                                    <input type="checkbox" />
                                    <label htmlFor="" className="font-medium text-lg">Task with no offers only</label>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <Button theme="outline" className="rounded-full">
                                        Cancel
                                    </Button>
                                    <Button className="rounded-full" onClick={() => handleFilterByType(selectedService)}>
                                        Apply
                                    </Button>
                                </div>
                            </form>

                            <form action="" className="space-y-8 mt-5">
                                <h3 className="font-bold text-status-darkViolet text-2xl">Services</h3>
                                {categoriesData.map((category, index) => (
                                    <div className="flex items-center space-x-3 cursor-pointer hover:underline" key={index}>
                                        <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                        <div className="font-medium text-lg text-primary">{category.categoryName}</div>
                                    </div>
                                ))}
                            </form>

                            <form action="" className="space-y-8 mt-5">
                                <h3 className="font-bold text-status-darkViolet text-2xl">Type of Service</h3>
                                <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => handleFilterByType('PHYSICAL_SERVICE')}>
                                    <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                    <div className="font-medium text-lg text-primary">Physical</div>
                                </div>
                                <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => handleFilterByType('REMOTE_SERVICE')}>
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
                                        <Button className="rounded-full" onClick={() => handleFilterByPriceRange(priceValues[0], priceValues[1])}>
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => handleSortByPrice("desc")}>
                                    <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                    <div className="font-medium text-lg text-primary">Highest to Lowest</div>
                                </div>
                                <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => handleSortByPrice("asc")}>
                                    <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                    <div className="font-medium text-lg text-primary">Lowest to Highest</div>
                                </div>
                            </form>

                            <form action="" className="space-y-8 mt-5">
                                <h3 className="font-bold text-status-darkViolet text-2xl">Others</h3>
                                <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => handleFilterByDate("asc")}>
                                    <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                    <div className="font-medium text-lg text-primary">Earliest</div>
                                </div>
                                <div className="flex items-center space-x-3 cursor-pointer hover:underline" onClick={() => handleFilterByDate("desc")}>
                                    <div className="w-3 h-3 bg-tc-orange rounded-full" />
                                    <div className="font-medium text-lg text-primary">Latest</div>
                                </div>
                            </form>

                        </div>
                    </Dropdown>
                </div>
            </div>

            <div className="w-full">
                {renderContent()}
                {dataToRender.length > 0 && (
                    <div className="flex justify-center items-center my-4">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`bg-primary text-white mr-10 rounded max-lg:text-xs lg:rounded-[10px] h-[39px] w-[39px] flex items-center justify-center ${currentPage === 1 && 'bg-status-violet'}`}
                        >
                            <FaChevronLeft />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`border font-bold rounded max-lg:text-xs mx-2 lg:rounded-[10px] h-[39px] w-[39px] flex items-center justify-center ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white text-primary '}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`bg-primary text-white ml-10 rounded max-lg:text-xs lg:rounded-[10px] h-[39px] w-[39px] flex items-center justify-center ${currentPage === totalPages && 'bg-status-violet'
                                }`}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Tasks;
