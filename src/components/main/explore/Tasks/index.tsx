"use client"

import { useState } from "react";
import TaskCard from "../TaskCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useGetActiveTasksQuery } from "@/services/tasks";
import Dropdown from "@/components/global/Dropdown";
import { useSession } from "next-auth/react";

// Sample task data
const tasksData = {
    content: [
        {
            id: 1,
            posterId: 1,
            taskServiceName: "Gardening",
            category: "Home Services",
            subCategory: "Lawn Mowing",
            taskDescription: "Mow the lawn and trim the bushes.",
            userAddress: "123 Green Street, Cityville",
            postedAt: new Date("2024-05-14T22:15:51.373Z"),
            customerBudget: 50,
            taskImage: "http://example.com/task-image-1.jpg",
            taskDates: [new Date("2024-05-14")],
            active: true
        },
        {
            id: 2,
            posterId: 2,
            taskServiceName: "Plumbing",
            category: "Home Services",
            subCategory: "Pipe Repair",
            taskDescription: "Fix the leaking pipe in the kitchen.",
            userAddress: "456 Main Street, Townville",
            postedAt: new Date("2024-05-14T22:30:00.000Z"),
            customerBudget: 100,
            taskImage: "http://example.com/task-image-2.jpg",
            taskDates: [new Date("2024-05-15")],
            active: true
        },
        {
            id: 3,
            posterId: 3,
            taskServiceName: "Cleaning",
            category: "Home Services",
            subCategory: "House Cleaning",
            taskDescription: "Clean the entire house.",
            userAddress: "789 Oak Street, Villageton",
            postedAt: new Date("2024-05-15T08:00:00.000Z"),
            customerBudget: 80,
            taskImage: "http://example.com/task-image-3.jpg",
            taskDates: [new Date("2024-05-16")],
            active: true
        },
        {
            id: 4,
            posterId: 4,
            taskServiceName: "Painting",
            category: "Home Services",
            subCategory: "Interior Painting",
            taskDescription: "Paint the living room walls.",
            userAddress: "101 Pine Street, Forestville",
            postedAt: new Date("2024-05-15T10:00:00.000Z"),
            customerBudget: 150,
            taskImage: "http://example.com/task-image-4.jpg",
            taskDates: [new Date("2024-05-17")],
            active: true
        },
        {
            id: 5,
            posterId: 5,
            taskServiceName: "Dog Walking",
            category: "Pet Services",
            subCategory: "Dog Walking",
            taskDescription: "Walk the dog for 30 minutes.",
            userAddress: "222 Maple Street, Groveton",
            postedAt: new Date("2024-05-16T12:00:00.000Z"),
            customerBudget: 20,
            taskImage: "http://example.com/task-image-5.jpg",
            taskDates: [new Date("2024-05-17")],
            active: true
        },
        {
            id: 6,
            posterId: 6,
            taskServiceName: "Tutoring",
            category: "Education",
            subCategory: "Math Tutoring",
            taskDescription: "Help with algebra homework for 1 hour.",
            userAddress: "333 Elm Street, Riverside",
            postedAt: new Date("2024-05-16T14:00:00.000Z"),
            customerBudget: 30,
            taskImage: "http://example.com/task-image-6.jpg",
            taskDates: [new Date("2024-05-18")],
            active: true
        }
    ]
};


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

    const { data } = useGetActiveTasksQuery(1);

    console.log("data", data)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleFilterChange = (filterName: string, value: string) => {
        setSelectedFilters({
            ...selectedFilters,
            [filterName]: value
        });
    }

    const renderContent = () => {

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14">
                {tasksData?.content?.map((task, index) => (
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

    const locationDropdown = [
        {
            label: "Western Australia",
            onClick: () => handleFilterChange('location', 'Western Australia')
        },
        {
            label: "Northern Territory",
            onClick: () => handleFilterChange('location', 'Northern Territory')
        },
        {
            label: "South Australia",
            onClick: () => handleFilterChange('location', 'South Australia')
        },
        {
            label: "Queensland",
            onClick: () => handleFilterChange('location', 'Queensland')
        },
        {
            label: "New South Wales",
            onClick: () => handleFilterChange('location', 'New South Wales')
        },
        {
            label: "Victoria",
            onClick: () => handleFilterChange('location', 'Victoria')
        },
        {
            label: "Tasmania",
            onClick: () => handleFilterChange('location', 'Tasmania')
        },
        {
            label: "Australian Capital Territory",
            onClick: () => handleFilterChange('location', 'Australian Capital Territory')
        }
    ];

    return (
        <section className="pt-7 container">
            <div className="flex lg:space-x-4 lg:max-w-[810px] items-center max-lg:grid max-lg:grid-cols-2 max-lg:gap-y-8 gap-6">
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
                    <option value="Western Australia">Western Australia</option>
                    <option value="Northern Territory">Northern Territory</option>
                    <option value="South Australia">South Australia</option>
                    <option value="Queensland">Queensland</option>
                    <option value="New South Wales">New South Wales</option>
                    <option value="Victoria">Victoria</option>
                    <option value="Tasmania">Tasmania</option>
                    <option value="Australian Capital Territory">
                        Australian Capital Territory
                    </option>
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

            <div className="">
                {renderContent()}
                <div className="flex items-center justify-center w-full">
                    <div className="flex items-center my-10 mx-20 text-2xl border-[#D0D5DD] rounded-xl">
                        <button
                            className={`bg-primary text-white mr-10 rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === 1 && 'bg-status-violet'}`}
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <FaChevronLeft />
                        </button>

                        {tasksData && Array.from({ length: Math.ceil(tasksData.content.length / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                            <button
                                key={number}
                                className={`bg-primary text-white rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === number && 'bg-status-violet'}`}
                                onClick={() => paginate(number)}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            className={`bg-primary text-white ml-10 rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === Math.ceil(tasksData?.content?.length! / itemsPerPage) && 'bg-status-violet'}`}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(tasksData?.content?.length! / itemsPerPage)}
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