import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import Loading from "@/shared/loading";
import Listing from "../Listing";


interface SearchResultProps {
    isLoading: any
    filterData: any
    profileImages: any
    imgErrMsg: any
    firstName: any
    lastName: any

}

const SearchResult = ({
    isLoading,
    filterData,
    profileImages,
    imgErrMsg,
    firstName,
    lastName
}: SearchResultProps) => {


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const totalPages = Math.ceil(filterData.length / itemsPerPage);

    const firstIndex = (currentPage - 1) * itemsPerPage;
    const lastIndex = firstIndex + itemsPerPage;

    const currentData = filterData.slice(firstIndex, lastIndex);
    console.log("currentData", currentData)


    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };




    return (
        <div>
            {
                isLoading ?

                    <Loading />
                    :

                    <div>
                        {
                            filterData.length ?
                                <div className=" mb-20">
                                    <Listing data={currentData} profileImages={profileImages} imgErrMsg={imgErrMsg} firstName={firstName} lastName={lastName} />

                                    <div className="flex w-full justify-center items-center space-x-7 mt-10">
                                        <button
                                            className="p-2 rounded-md bg-status-lightViolet hover:bg-primary disabled:opacity-50 disabled:bg-status-lightViolet"
                                            onClick={handlePreviousPage}
                                            disabled={currentPage === 1}
                                        >
                                            <IoIosArrowBack />
                                        </button>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                                key={index + 1}
                                                className={`py-[6px] px-3 rounded-md ${currentPage === index + 1 ? 'bg-primary text-white' : 'border border-black  hover:bg-status-lightViolet'} text-[11px] font-bold`}
                                                onClick={() => handlePageClick(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                        <button
                                            className="p-2 rounded-md bg-status-lightViolet hover:bg-primary disabled:opacity-50 disabled:bg-status-lightViolet"
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            <IoIosArrowForward />
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="h-[200px] w-full text-[25px] font-bold text-gray-400 flex items-center ">
                                    <p>Nothing found</p>
                                </div>
                        }
                    </div>



            }
        </div>
    );
}

export default SearchResult;