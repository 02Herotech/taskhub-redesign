"use client"

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGetActiveTasksQuery } from "@/services/tasks";
import Dropdown from "@/components/global/Dropdown";
import TaskCard from "../TaskCard";
import loader from "../../../../../public/assets/images/marketplace/taskhub-newloader.gif";
import Image from "next/image";
// import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Button from "@/components/global/Button";
import { FaSortDown } from "react-icons/fa";

const Tasks = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        location: '',
        typeOfService: '',
        pricing: '',
        others: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const { data, isLoading, refetch } = useGetActiveTasksQuery(currentPage);

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

    const handleFilterChange = (filterName: string, value: any) => {
        setSelectedFilters({
            ...selectedFilters,
            [filterName]: value
        });
    };

    const typeOfServiceDropdown = [
        {
            label: "Remote",
            onClick: () => handleFilterChange('typeOfService', 'Remote')
        },
        {
            label: "In Person",
            onClick: () => handleFilterChange('typeOfService', 'In Person')
        },
    ];

    const otherOptionsDropdown = [
        {
            label: "Price: High to low",
            onClick: () => handleFilterChange('others', 'Price: High to low')
        },
        {
            label: "Price: Low to high",
            onClick: () => handleFilterChange('others', 'Price: Low to high')
        },
        {
            label: "Due date: Earliest",
            onClick: () => handleFilterChange('others', 'Due date: Earliest')
        },
        {
            label: "Due date: Latest",
            onClick: () => handleFilterChange('others', 'Due date: Latest')
        },
        {
            label: "Closest to me",
            onClick: () => handleFilterChange('others', 'Closest to me')
        },
    ];

    const categoryDropdown = [
        {
            label: "Home Services",
            onClick: () => handleFilterChange('category', 'Home Services')
        },
        {
            label: "Personal Services",
            onClick: () => handleFilterChange('category', 'Personal Services')
        },
        {
            label: "Events & Entertainment",
            onClick: () => handleFilterChange('category', 'Events & Entertainment')
        },
        {
            label: "Education & Tutoring",
            onClick: () => handleFilterChange('category', 'Education & Tutoring')
        },
        {
            label: "Professional Services",
            onClick: () => handleFilterChange('category', 'Professional Services')
        },
        {
            label: "Automotive Services",
            onClick: () => handleFilterChange('category', 'Automotive Services')
        },
        {
            label: "Health & Fitness",
            onClick: () => handleFilterChange('category', 'Health & Fitness')
        },
        {
            label: "Technology & Electronics",
            onClick: () => handleFilterChange('category', 'Technology & Electronics')
        },
        {
            label: "Home Improvement",
            onClick: () => handleFilterChange('category', 'Home Improvement')
        },
        {
            label: "Real Estate Services",
            onClick: () => handleFilterChange('category', 'Real Estate Services')
        },
        {
            label: "Delivery & Logistics",
            onClick: () => handleFilterChange('category', 'Delivery & Logistics')
        },
        {
            label: "Art & Creativity",
            onClick: () => handleFilterChange('category', 'Art & Creativity')
        },
        {
            label: "Wedding Services",
            onClick: () => handleFilterChange('category', 'Wedding Services')
        },
        {
            label: "Childcare & Babysitting",
            onClick: () => handleFilterChange('category', 'Childcare & Babysitting')
        },
        {
            label: "Travel & Adventure",
            onClick: () => handleFilterChange('category', 'Travel & Adventure')
        },
    ];

    return (
        <section className="pt-7 container">
            <div className="hidden lg:flex lg:space-x-4 lg:max-w-[810px] items-center gap-6">
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Category</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-20 top-14'>
                    <form className='w-[240px] bg-white rounded-md p-4'>
                        {categoryDropdown.map((button, index) => (
                            <div
                                key={index}
                                onClick={button.onClick}
                                className='flex w-full transition-all text-status-darkViolet text-base font-bold hover:text-tc-orange cursor-pointer items-center justify-between p-3'>
                                <div className="">
                                    {button.label}
                                </div>
                            </div>
                        ))}
                    </form>
                </Dropdown>
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Location</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <form className='w-[240px] bg-white rounded-md flex items-center p-4'>
                        <div className="space-y-8 w-full">
                            <h4 className="text-lg text-black font-medium">Distance</h4>
                            <div className="flex items-center justify-between w-full">
                                <Button theme="outline">
                                    Cancel
                                </Button>
                                <Button>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </form>
                </Dropdown>
                <Dropdown
                    trigger={() => (
                        <div id="typeOfService" className="w-full border-2 border-primary flex items-center justify-between text-primary font-semibold py-2 px-4 rounded-full">
                            <h2>Type of service</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <div className='w-[240px] bg-white rounded-md flex items-center'>
                        {typeOfServiceDropdown.map((button, index) => (
                            <div
                                key={index}
                                onClick={button.onClick}
                                className='flex w-full transition-all text-sm items-center justify-between p-3'>
                                <div className="">
                                    {button.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </Dropdown>
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Pricing</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <form className='w-[240px] bg-white rounded-md flex items-center p-4'>
                        <div className="space-y-8 w-full">
                            <h4 className="text-lg text-black font-medium">Price</h4>
                            <div className="flex items-center justify-between w-full">
                                <Button theme="outline">
                                    Cancel
                                </Button>
                                <Button>
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </form>
                </Dropdown>
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary text-primary flex items-center justify-between font-semibold py-2 px-4 rounded-full">
                            <h2>Others</h2>
                            <FaSortDown />
                        </div>
                    )}
                    className='-left-24 top-14'>
                    <div className='w-[240px] bg-white rounded-md'>
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
