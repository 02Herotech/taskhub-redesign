"use client"

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGetActiveTasksQuery } from "@/services/tasks";
import Dropdown from "@/components/global/Dropdown";
import { useSession } from "next-auth/react";
import TaskCard from "../TaskCard";

const Tasks = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        location: '',
        typeOfService: '',
        pricing: '',
        others: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const pageNumber = 1;
    const { data } = useGetActiveTasksQuery(pageNumber);

    const paginate = () => setCurrentPage(data?.pageNumber!);

    const handleFilterChange = (filterName: string, value: string) => {
        setSelectedFilters({
            ...selectedFilters,
            [filterName]: value
        });
    }

    const renderContent = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14">
                {data?.content?.map((task, index) => (
                    <TaskCard {...task} key={index} />
                ))}
            </div>
        );
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


    return (
        <section className="pt-7 container">
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
                        <div className="w-full border-2 border-primary flex items-center justify-center text-primary font-semibold py-2 px-4 rounded-full">
                            Filter by
                        </div>
                    )}
                    className='left-0 right-0 mx-auto top-14'>
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
            </div>

            <div className="">
                {renderContent()}
                {/* <div className="flex items-center justify-center w-full">
                    <div className="flex items-center my-10 mx-20 text-2xl border-[#D0D5DD] rounded-xl">
                        <button
                            className={`bg-primary text-white mr-10 rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === 1 && 'bg-status-violet'}`}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <FaChevronLeft />
                        </button>

                        {data && Array.from({ length: Math.ceil(data.content.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                className={`bg-primary text-white rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === number && 'bg-status-violet'}`}
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            className={`bg-primary text-white ml-10 rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === Math.ceil(data?.content?.length! / itemsPerPage) && 'bg-status-violet'}`}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(data?.content?.length! / itemsPerPage)}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default Tasks