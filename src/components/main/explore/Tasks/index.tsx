"use client"

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
    useFilterTaskByPriceQuery,
    useFilterTaskByTypeQuery,
    useGetActiveTasksQuery,
    useFilterTaskByEarliestDateQuery,
    useFilterTaskByLatestDateQuery,
    useFilterTaskByPriceAscQuery,
    useFilterTaskByPriceDescQuery
} from "@/services/tasks";
import Dropdown from "@/components/global/Dropdown";
import TaskCard from "../TaskCard";
import loader from "../../../../../public/assets/images/marketplace/taskhub-newloader.gif";
import Image from "next/image";
import Button from "@/components/global/Button";
import { FaSortDown } from "react-icons/fa";
import ReactSlider from 'react-slider'

const Tasks = () => {
    const [priceValues, setPriceValues] = useState<[number, number]>([5, 10000]);
    const [locationValues, setLocationValues] = useState<[number, number]>([1, 50]);
    const [selectedService, setSelectedService] = useState<'Remote' | 'In Person'>('In Person');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const serviceType = selectedService === 'Remote' ? 'REMOTE_SERVICE' : 'PHYSICAL_SERVICE';

    const { data, isLoading, refetch } = useGetActiveTasksQuery(currentPage);
    const { data: filteredByPriceData, isLoading: isFilteredLoading, refetch: refetchFiltered } = useFilterTaskByPriceQuery({
        page: currentPage,
        minPrice: priceValues[0],
        maxPrice: priceValues[1]
    });
    const { data: filteredByTypeData, isLoading: isFilteredByTypeLoading, refetch: refetchFilteredByType } = useFilterTaskByTypeQuery({
        page: currentPage,
        type: serviceType
    });
    const { data: filteredByEarliestDateData, isLoading: isFilteredByEarliestDateLoading, refetch: refetchFilteredByEarliestDate } = useFilterTaskByEarliestDateQuery(currentPage);
    const { data: filteredByLatestDateData, isLoading: isFilteredByLatestDateLoading, refetch: refetchFilteredByLatestDate } = useFilterTaskByLatestDateQuery(currentPage);
    const { data: filteredByPriceAscData, isLoading: isFilteredByPriceAscLoading, refetch: refetchFilteredByPriceAsc } = useFilterTaskByPriceAscQuery(currentPage);
    const { data: filteredByPriceDescData, isLoading: isFilteredByPriceDescLoading, refetch: refetchFilteredByPriceDesc } = useFilterTaskByPriceDescQuery(currentPage);

    useEffect(() => {
        refetchFilteredByType()
    }, [currentPage, refetchFilteredByType])

    useEffect(() => {
        refetchFiltered(); // Fetch new data when the current page changes
    }, [currentPage, refetchFiltered]);

    useEffect(() => {
        refetch(); // Fetch new data when the current page changes
    }, [currentPage, refetch]);

    const totalPages = Math.ceil(data?.totalElements! / itemsPerPage); // Calculate total pages

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderContent = () => {
        return (
            <div>
                {isLoading ? (
                    <div className="w-full flex items-center justify-center h-[300px]">
                        <Image src={loader} alt="loader" width={80} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14">
                        {data?.content.map((task, index) => (
                            <TaskCard task={task} key={index} />
                        ))}
                    </div>
                )}
            </div>
        );
    };


    const otherOptionsDropdown = [
        {
            label: "Price: High to low",
            onClick: () => refetchFilteredByPriceDesc
        },
        {
            label: "Price: Low to high",
            onClick: () => refetchFilteredByPriceAsc
        },
        {
            label: "Due date: Earliest",
            onClick: () => refetchFilteredByEarliestDate
        },
        {
            label: "Due date: Latest",
            onClick: () => refetchFilteredByLatestDate
        },
        {
            label: "Closest to me",
            onClick: () => {}
        },
    ];

    const categoryDropdown = [
        {
            label: "Home Services",
            onClick: () => setSelectedCategory('Home Services')
        },
        {
            label: "Beauty",
            onClick: () => setSelectedCategory('Beauty')
        },
        {
            label: "Information & Technology",
            onClick: () => setSelectedCategory('Information & Technology')
        },
        {
            label: "Events",
            onClick: () => setSelectedCategory('Events')
        },
        {
            label: "Arts and Crafts",
            onClick: () => setSelectedCategory('Arts and Crafts')
        },
        {
            label: "Pet care",
            onClick: () => setSelectedCategory('Pet care')
        },
        {
            label: "Custodial",
            onClick: () => setSelectedCategory('Custodial')
        },
        {
            label: "Grocery",
            onClick: () => setSelectedCategory('Grocery')
        }
    ];

    return (
        <section className="pt-7 container">
            <div className="hidden lg:flex lg:space-x-4 mt-20 items-center">

                {/* Category */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Category</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <form className='bg-white rounded-md py-4 px-2'>
                        {categoryDropdown.map((button, index) => (
                            <div
                                key={index}
                                onClick={button.onClick}
                                className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between py-3 px-5'>
                                <div className="">
                                    {button.label}
                                </div>
                            </div>
                        ))}
                    </form>
                </Dropdown>

                {/* Location */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Location</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <form className='bg-white rounded-md flex items-center p-4'>
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
                        <div id="typeOfService" className="w-full border-2 border-primary flex items-center justify-between text-primary font-semibold py-2 px-4 rounded-full">
                            <h2>Type of service</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <div className='bg-white rounded-md p-4 space-y-10'>
                        <h4 className="text-lg text-[#190E3F] font-medium">Type of service</h4>
                        <div className="flex mb-6 w-full rounded-full bg-orange-100">
                            <button
                                className={`px-6 py-2 rounded-full text-status-darkViolet font-bold text-lg focus:outline-none ${selectedService === 'Remote' ? 'bg-orange-500 flex-1' : 'bg-transparent'
                                    }`}
                                onClick={() => setSelectedService('Remote')}
                            >
                                Remote
                            </button>
                            <button
                                className={`px-6 py-2 rounded-full text-status-darkViolet font-bold text-lg focus:outline-none ${selectedService === 'In Person' ? 'bg-orange-500  flex-1' : 'bg-transparent'
                                    }`}
                                onClick={() => setSelectedService('In Person')}
                            >
                                In Person
                            </button>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Button theme="outline" className="rounded-full">
                                Cancel
                            </Button>
                            <Button className="rounded-full" onClick={() => refetchFilteredByType}>
                                Apply
                            </Button>
                        </div>
                    </div>
                </Dropdown>

                {/* Pricing */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Pricing</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <form className='bg-white rounded-md flex items-center p-2'>
                        <div className="space-y-8 w-full p-3">
                            <h4 className="text-lg text-[#190E3F] font-medium">Price</h4>
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
                                step={50}
                                onChange={(newValues) => setPriceValues(newValues as [number, number])}
                            />
                            <div className="flex items-center justify-between w-full">
                                <Button theme="outline" className="rounded-full" onClick={() => setPriceValues([5, 10000])}>
                                    Cancel
                                </Button>
                                <Button className="rounded-full" onClick={() => refetchFiltered}>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </form>
                </Dropdown>

                {/* Others */}
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Others</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <div className='bg-white rounded-md p-3'>
                        {otherOptionsDropdown.map((button, index) => (
                            <div
                                key={index}
                                onClick={button.onClick}
                                className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between p-3'>
                                <div className="">
                                    {button.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </Dropdown>
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
}

export default Tasks;
