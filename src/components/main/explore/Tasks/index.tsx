"use client"

import { useState } from "react";
import TaskCard from "../TaskCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

type TaskCardProps = {
    title: string;
    price: number;
    location: string;
    date: string;
    time: string;
    availabiliy: string;
    offers: number;
    image: string;
};

const tasksData: TaskCardProps[] = [
    {
        title: 'Plumber Needed',
        price: 200,
        location: 'Western Australia',
        date: 'On Sat, June 8th',
        time: '10:00 AM - 12:00 PM',
        availabiliy: 'Available',
        offers: 5,
        image: '/assets/images/logo.png'
    },
    {
        title: 'Electrician',
        price: 150,
        location: 'Northern Territory',
        date: 'On Sat, June 8th',
        time: '10:00 AM - 12:00 PM',
        availabiliy: 'Available',
        offers: 5,
        image: '/assets/images/logo.png'
    },
    {
        title: 'Plumber',
        price: 200,
        location: 'Western Australia',
        date: 'On Sat, June 8th',
        time: '10:00 AM - 12:00 PM',
        availabiliy: 'Available',
        offers: 5,
        image: '/assets/images/logo.png'
    },
    {
        title: 'Electrician Needed',
        price: 150,
        location: 'Northern Territory',
        date: 'On Sat, June 8th',
        time: '10:00 AM - 12:00 PM',
        availabiliy: 'Available',
        offers: 5,
        image: '/assets/images/logo.png'
    },
    {
        title: 'Plumber Needed',
        price: 200,
        location: 'Western Australia',
        date: 'On Sat, June 8th',
        time: '10:00 AM - 12:00 PM',
        availabiliy: 'Available',
        offers: 5,
        image: '/assets/images/logo.png'
    },
    {
        title: 'Electrician Needed',
        price: 150,
        location: 'Northern Territory',
        date: 'On Sat, June 8th',
        time: '10:00 AM - 12:00 PM',
        availabiliy: 'Available',
        offers: 5,
        image: '/assets/images/logo.png'
    }
]

const Tasks = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        location: '',
        typeOfService: '',
        pricong: '',
        others: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Generate an array of page numbers between the first and last page
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(tasksData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleFilterChange = (filterName: string, value: string) => {
        setSelectedFilters({
            ...selectedFilters,
            [filterName]: value
        });
    }

    const renderContent = () => {
        // Calculate the index of the first job to display on the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        // Slice the jobs array to get only the jobs for the current page
        const currentPageTasks = tasksData.slice(startIndex, startIndex + itemsPerPage);

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-14">
                {currentPageTasks.map((task, index) => (
                    <TaskCard {...task} key={index} />
                ))}
            </div>
        );
    };

    return (
        <div className="pt-7 container">
            <form onSubmit={handleSubmit} className="flex lg:space-x-4 items-center max-lg:grid max-lg:grid-cols-2 max-lg:gap-y-8 gap-6">
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
                <select id="typeOfService" name="typeOfService" onChange={(e) => handleFilterChange('typeOfService', e.target.value)} className="w-full border-2 border-primary text-primary font-semibold py-2 px-4 rounded-full">
                    <option value="">Type of service</option>

                </select>
                <select id="pricong" name="pricong" onChange={(e) => handleFilterChange('pricong', e.target.value)} className="w-full border-2 border-primary text-primary font-semibold py-2 px-4 rounded-full">
                    <option value="">Pricing</option>

                </select>
                <select id="others" name="others" onChange={(e) => handleFilterChange('others', e.target.value)} className="w-full border-2 border-primary text-primary font-semibold py-2 px-4 rounded-full">
                    <option value="">
                        Others
                    </option>
                </select>
            </form>
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

                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => paginate(number)}
                                className={`text-primary border mx-1 font-bold rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === number ? 'bg-primary text-white' : ''}`}
                            >
                                {number}
                            </button>
                        ))}

                        <button
                            className={`bg-primary text-white ml-10 rounded max-lg:text-xs lg:rounded-[10px] h-[21px] w-[21px] lg:h-[39px] lg:w-[39px] flex items-center justify-center ${currentPage === Math.ceil(tasksData.length / itemsPerPage) && 'bg-status-violet'}`}
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(tasksData.length / itemsPerPage)}
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Tasks