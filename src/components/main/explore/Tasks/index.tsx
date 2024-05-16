"use client"

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGetActiveTasksQuery } from "@/services/tasks";
import Dropdown from "@/components/global/Dropdown";
import TaskCard from "../TaskCard";
import loader from "../../../../../public/assets/images/marketplace/taskhub-newloader.gif";
import Image from "next/image";
import RangeSlider from "@/components/global/RangeSlider";

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
    const { data, isLoading } = useGetActiveTasksQuery(currentPage);

    const totalPages = Math.ceil(data?.totalElements! / itemsPerPage); // Calculate total pages

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderContent = () => {
        return (
            <div>
                {isLoading ? (
                    <div className="w-full flex items-center justify-center h-[300px] ">
                        <Image src={loader} alt="loader" width={80} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14">
                        {data?.content
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) // Slice content based on current page
                            .map((task, index) => (
                                <TaskCard task={task} key={index} />
                            ))}
                    </div>
                )}
            </div>
        );
    };

    const handleFilterChange = (filterName: string, value: string) => {
        setSelectedFilters({
            ...selectedFilters,
            [filterName]: value
        });
    }

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


    return (
        <section className="pt-7 container">
            {/* <RangeSlider /> */}
            <div className="hidden lg:flex lg:space-x-4 lg:max-w-[810px] items-center gap-6">
                <select id="category" name="category" onChange={(e) => handleFilterChange('category', e.target.value)} className="w-full border-2 border-primary text-primary font-semibold bg-[#F1F1F2] py-2 px-4 rounded-full">
                    <option value="">Category</option>
                    <option value="Home Services">Home Services</option>
                    <option value="Personal Services">Personal Services</option>
                    <option value="Events & Entertainment">Events & Entertainment</option>
                    <option value="Education & Tutoring">Education & Tutoring</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Automotive Services">Automotive Services</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Technology & Electronics">Technology & Electronics</option>
                    <option value="Home Improvement">Home Improvement</option>
                    <option value="Real Estate Services">Real Estate Services</option>
                    <option value="Delivery & Logistics">Delivery & Logistics</option>
                    <option value="Art & Creativity">Art & Creativity</option>
                    <option value="Wedding Services">Wedding Services</option>
                    <option value="Childcare & Babysitting">Childcare & Babysitting</option>
                    <option value="Travel & Adventure">Travel & Adventure</option>
                </select>
                <select id="location" name="location" onChange={(e) => handleFilterChange('location', e.target.value)} className="w-full border-2 border-primary text-primary bg-[#F1F1F2] font-semibold py-2 px-4 rounded-full">
                    <option value="">Location</option>

                </select>
                <Dropdown
                    trigger={() => (
                        <div id="typeOfService" className="w-full border-2 border-primary text-primary font-semibold py-2 px-4 rounded-full">
                            Type of service
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
                <select id="pricing" name="pricing" onChange={(e) => handleFilterChange('pricing', e.target.value)} className="w-full border-2 border-primary text-primary font-semibold py-2 px-4 rounded-full">
                    <option value="">Pricing</option>

                </select>
                <select id="others" name="others" onChange={(e) => handleFilterChange('others', e.target.value)} className="w-full border-2 border-primary text-primary font-semibold py-2 px-4 rounded-full">
                    <option value="">
                        Others
                    </option>
                </select>
            </div>
            <div className="lg:hidden flex items-center w-full justify-center">
                <Dropdown
                    trigger={() => (
                        <div className="w-full border-2 border-primary flex items-center justify-center space-x-4 text-primary font-semibold py-2 px-4 rounded-full">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 2.00191C4.73478 2.00191 4.48043 2.10723 4.29289 2.29472C4.10536 2.4822 4 2.73649 4 3.00163C4 3.26678 4.10536 3.52106 4.29289 3.70855C4.48043 3.89603 4.73478 4.00136 5 4.00136C5.26522 4.00136 5.51957 3.89603 5.70711 3.70855C5.89464 3.52106 6 3.26678 6 3.00163C6 2.73649 5.89464 2.4822 5.70711 2.29472C5.51957 2.10723 5.26522 2.00191 5 2.00191ZM2.17 2.00191C2.3766 1.41653 2.75974 0.909636 3.2666 0.55109C3.77346 0.192543 4.37909 0 5 0C5.62091 0 6.22654 0.192543 6.7334 0.55109C7.24026 0.909636 7.6234 1.41653 7.83 2.00191H15C15.2652 2.00191 15.5196 2.10723 15.7071 2.29472C15.8946 2.4822 16 2.73649 16 3.00163C16 3.26678 15.8946 3.52106 15.7071 3.70855C15.5196 3.89603 15.2652 4.00136 15 4.00136H7.83C7.6234 4.58673 7.24026 5.09363 6.7334 5.45218C6.22654 5.81072 5.62091 6.00327 5 6.00327C4.37909 6.00327 3.77346 5.81072 3.2666 5.45218C2.75974 5.09363 2.3766 4.58673 2.17 4.00136H1C0.734784 4.00136 0.48043 3.89603 0.292893 3.70855C0.105357 3.52106 0 3.26678 0 3.00163C0 2.73649 0.105357 2.4822 0.292893 2.29472C0.48043 2.10723 0.734784 2.00191 1 2.00191H2.17ZM11 8.00027C10.7348 8.00027 10.4804 8.1056 10.2929 8.29309C10.1054 8.48057 10 8.73486 10 9C10 9.26514 10.1054 9.51943 10.2929 9.70691C10.4804 9.8944 10.7348 9.99973 11 9.99973C11.2652 9.99973 11.5196 9.8944 11.7071 9.70691C11.8946 9.51943 12 9.26514 12 9C12 8.73486 11.8946 8.48057 11.7071 8.29309C11.5196 8.1056 11.2652 8.00027 11 8.00027ZM8.17 8.00027C8.3766 7.4149 8.75974 6.908 9.2666 6.54946C9.77346 6.19091 10.3791 5.99837 11 5.99837C11.6209 5.99837 12.2265 6.19091 12.7334 6.54946C13.2403 6.908 13.6234 7.4149 13.83 8.00027H15C15.2652 8.00027 15.5196 8.1056 15.7071 8.29309C15.8946 8.48057 16 8.73486 16 9C16 9.26514 15.8946 9.51943 15.7071 9.70691C15.5196 9.8944 15.2652 9.99973 15 9.99973H13.83C13.6234 10.5851 13.2403 11.092 12.7334 11.4505C12.2265 11.8091 11.6209 12.0016 11 12.0016C10.3791 12.0016 9.77346 11.8091 9.2666 11.4505C8.75974 11.092 8.3766 10.5851 8.17 9.99973H1C0.734784 9.99973 0.48043 9.8944 0.292893 9.70691C0.105357 9.51943 0 9.26514 0 9C0 8.73486 0.105357 8.48057 0.292893 8.29309C0.48043 8.1056 0.734784 8.00027 1 8.00027H8.17ZM5 13.9986C4.73478 13.9986 4.48043 14.104 4.29289 14.2915C4.10536 14.4789 4 14.7332 4 14.9984C4 15.2635 4.10536 15.5178 4.29289 15.7053C4.48043 15.8928 4.73478 15.9981 5 15.9981C5.26522 15.9981 5.51957 15.8928 5.70711 15.7053C5.89464 15.5178 6 15.2635 6 14.9984C6 14.7332 5.89464 14.4789 5.70711 14.2915C5.51957 14.104 5.26522 13.9986 5 13.9986ZM2.17 13.9986C2.3766 13.4133 2.75974 12.9064 3.2666 12.5478C3.77346 12.1893 4.37909 11.9967 5 11.9967C5.62091 11.9967 6.22654 12.1893 6.7334 12.5478C7.24026 12.9064 7.6234 13.4133 7.83 13.9986H15C15.2652 13.9986 15.5196 14.104 15.7071 14.2915C15.8946 14.4789 16 14.7332 16 14.9984C16 15.2635 15.8946 15.5178 15.7071 15.7053C15.5196 15.8928 15.2652 15.9981 15 15.9981H7.83C7.6234 16.5835 7.24026 17.0904 6.7334 17.4489C6.22654 17.8075 5.62091 18 5 18C4.37909 18 3.77346 17.8075 3.2666 17.4489C2.75974 17.0904 2.3766 16.5835 2.17 15.9981H1C0.734784 15.9981 0.48043 15.8928 0.292893 15.7053C0.105357 15.5178 0 15.2635 0 14.9984C0 14.7332 0.105357 14.4789 0.292893 14.2915C0.48043 14.104 0.734784 13.9986 1 13.9986H2.17Z" fill="#381F8C" />
                            </svg>
                            <h4>Filter by</h4>
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
                    <div className='w-full bg-white rounded-md flex items-center justify-center p-3 space-y-8'>
                        <div className='flex w-full transition-all text-sm items-center justify-between p-3'>
                            <div className="">
                                1123456
                            </div>
                        </div>
                    </div>
                </Dropdown>
            </div>

            <div className="">
                {renderContent()}
                <div className="flex items-center justify-center w-full">
                    <div className="flex items-center my-10 mx-20 text-2xl border-[#D0D5DD] rounded-xl">
                        <button
                            className={`bg-primary text-white mr-10 rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === 1 && 'bg-status-violet'
                                }`}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <FaChevronLeft />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                className={`bg-primary text-white rounded max-lg:text-xs mx-2 lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === number && 'bg-status-violet'
                                    }`}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            className={`bg-primary text-white ml-10 rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === totalPages && 'bg-status-violet'
                                }`}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Tasks