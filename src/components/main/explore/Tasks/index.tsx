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

const Tasks = () => {
    const [priceValues, setPriceValues] = useState<[number, number]>([5, 10000]);
    const [locationValues, setLocationValues] = useState<[number, number]>([1, 50]);
    const [selectedService, setSelectedService] = useState<"REMOTE_SERVICE" | "PHYSICAL_SERVICE">("PHYSICAL_SERVICE");
    const [categoriesData, setCategoriesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState<Task[]>([]);
    const itemsPerPage = 9;
    const [dataToRender, setDataToRender] = useState<Task[]>([]);
    const [filtersApplied, setFiltersApplied] = useState(false);

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
                    <Image src={loader} alt="loader" width={80} />
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

    return (
        <section className="pt-7 container">
            <div className="hidden lg:flex lg:space-x-4 mt-14 items-center">

                {/* Category */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary bg-[#F1F1F2] flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Category</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <form className='bg-white rounded-md py-4 px-2'>
                        {categoriesData.map((button, index) => (
                            <div
                                key={index}
                                className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between py-3 px-5'>
                                <div className="">
                                    {/* {button.label} */}
                                </div>
                            </div>
                        ))}
                    </form>
                </Dropdown>

                {/* Location */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary bg-[#F1F1F2] flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Location</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <form className='bg-white min-w-[240px] rounded-md flex items-center p-4'>
                        <div className="space-y-8 w-full p-3">
                            <h4 className="text-lg text-[#190E3F] font-medium">Distance</h4>
                            <div className="text-2xl text-black font-bold text-center mb-6">
                                {locationValues[0]}km - {locationValues[1]}km
                            </div>
                            <ReactSlider
                                className="relative w-full h-2 bg-[#FE9B07] rounded-md"
                                thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                                trackClassName="top-1/2 bg-[#FE9B07]"
                                value={locationValues}
                                min={1}
                                max={50}
                                step={1}
                                onChange={(newValues) => setLocationValues(newValues as [number, number])}
                            />
                            <div className="flex items-center justify-between w-full">
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
                    <div className='bg-white min-w-[240px] rounded-md p-4 space-y-8'>
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
                                Physical
                            </button>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Button theme="outline" className="rounded-full">
                                Cancel
                            </Button>
                            <Button className="rounded-full" onClick={() => handleFilterByType(selectedService)}>
                                Apply
                            </Button>
                        </div>
                    </div>
                </Dropdown>

                {/* Price */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary bg-[#F1F1F2] flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Price</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <form className='bg-white min-w-[240px] rounded-md flex items-center p-4'>
                        <div className="space-y-8 w-full p-3">
                            <h4 className="text-xl text-[#190E3F] font-medium">Price</h4>
                            <div className="text-2xl text-black font-bold text-center mb-6">
                                ${priceValues[0]} - ${priceValues[1]}
                            </div>
                            <ReactSlider
                                className="relative w-full h-2 bg-[#FE9B07] rounded-md"
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
                    <form className='bg-white rounded-md p-4'>
                        <h4 className="text-lg text-[#190E3F] font-medium mb-4">Others</h4>
                        {otherOptionsDropdown.map((option, index) => (
                            <div
                                key={index}
                                onClick={option.onClick}
                                className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between py-3 px-5'>
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

            <div className="w-full">
                {renderContent()}
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
            </div>
        </section>
    );
};

export default Tasks;
