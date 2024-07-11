"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/shared/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
    filterMarketPlace,
    setFilterLoadingState,
} from "@/store/Features/marketplace";
import TaskCard from "../TaskCard";
import { Task } from "@/types/services/tasks";
import { useSession } from "next-auth/react";

interface ExploreCategoryLisingProps {
    category: string;
}

const ExploreCategoryLising: React.FC<ExploreCategoryLisingProps> = ({ category }) => {
    const { categories, isFiltering, filteredData, totalPages, filterParams } = useSelector((state: RootState) => state.explore);

    const [isLoading, setIsLoading] = useState(true);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [ErrorMsg, setErrorMsg] = useState("");
    const [displayTasks, setDisplayTasks] = useState<Task[]>([]);
    const [page, setPage] = useState({ totalPages: 1, currentPage: 0 });
    const [buttonNumbers, setButtonNumbers] = useState<number[]>([]);
    const session = useSession()
    const token = session.data?.user.accessToken

    const dispatch = useDispatch();

    const handleFetchCategory = async (currentPage: number) => {
        const categoryId = categories.find(
            (item) => item.categoryName === category,
        );
        setIsLoading(true);
        try {
            if (!category) {
                return;
            }
            let url, content;
            if (category === "All") {
                url =
                    "https://smp.jacinthsolutions.com.au/api/v1/task/all-active-tasks/" +
                    currentPage;
            } else if (categoryId) {
                url =
                    "https://smp.jacinthsolutions.com.au/api/v1/task/filter-tasks/" +
                    currentPage +
                    "?category=" +
                    categoryId.categoryName;
            }
            const { data } = await axios.get(url as string, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            content = data.content;
            setPage((prev) => ({ ...prev, totalPages: data.totalPages }));
            if (url) {
                setAllTasks(content);
                setDisplayTasks(content);
            }
        } catch (error) {
            setErrorMsg("Error searching Task");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePaginateFiltering = async () => {
        try {
            setIsLoading(true);
            dispatch(setFilterLoadingState(true));
            let url = "";
            if (filterParams.includes("?text=")) {
                url =
                    "https://smp.jacinthsolutions.com.au/api/v1/task/text/" +
                    page.currentPage +
                    filterParams;
            } else {
                url =
                    "https://smp.jacinthsolutions.com.au/api/v1/task/filter-tasks/" +
                    page.currentPage +
                    filterParams;
            }
            // const { data } = await axios.get(url);
            // dispatch(
            //   filterMarketPlace({
            //     data: data.content,
            //     totalPages: data.totalPages,
            //   }),
            // );
        } catch (error: any) {
            console.log(error.response?.data || error);
        } finally {
            setIsLoading(false);
            dispatch(setFilterLoadingState(false));
        }
    };

    useEffect(() => {
        if (isFiltering) {
            handlePaginateFiltering();
        } else {
            handleFetchCategory(page.currentPage);
        }
        // eslint-disable-next-line
    }, [category, page.currentPage]);

    useEffect(() => {
        setPage((prev) => ({ ...prev, totalPages: totalPages }));
    }, [totalPages]);

    const getButtonNumbers = () => {
        const half = Math.floor(5 / 2);
        let start = Math.max(page.currentPage - half, 1);
        let end = start + 4;
        // Adjust start and end if they exceed boundaries
        if (end > page.totalPages) {
            end = page.totalPages;
            start = Math.max(end - 4, 1);
        }
        if (start < 0) {
            start == 0;
        }
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        return numbers;
    };

    useEffect(() => {
        setButtonNumbers(getButtonNumbers());
    }, [page]);

    useEffect(() => {
        const fetchData = async () => {
            if (displayTasks.length > 0) {
                setDisplayTasks(allTasks);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [allTasks]);

    return (
        <div className="h-full w-full py-4 ">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex w-full items-center justify-between gap-4">
                    <h1 className=" text-xl font-bold text-violet-darkHover md:text-2xl">
                        {!isFiltering
                            ? category
                            : filteredData.length > 0
                                ? filteredData[0].category.categoryName
                                : ""}
                    </h1>
                </div>
            </div>

            {ErrorMsg && (
                <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 md:h-[100px]">
                    <p className="sm:text[13px] text-center font-semibold text-red-500 md:text-[16px]">
                        Kindly check your connection
                    </p>
                </div>
            )}

            {isLoading ? (
                <Loading />
            ) : isFiltering ? (
                !ErrorMsg && filteredData.length === 0 ? (
                    <div className="flex min-h-40 flex-col items-center justify-center gap-4">
                        <Image
                            src={"/assets/images/marketplace/undraw_void_-3-ggu.svg"}
                            alt="void"
                            width={200}
                            height={200}
                        />
                        <p className="text-lg text-violet-normal">
                            No Task Available at the moment
                        </p>
                    </div>
                ) : (
                    <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredData.map((item, index) => {
                            return (
                                <TaskCard
                                    key={index}
                                    task={item}
                                />
                            );
                        })}
                    </div>
                )
            ) : displayTasks.length === 0 && !ErrorMsg ? (
                <div className="flex min-h-40 flex-col items-center justify-center gap-4">
                    <Image
                        src={"/assets/images/marketplace/undraw_void_-3-ggu.svg"}
                        alt="void"
                        width={200}
                        height={200}
                    />
                    <p className="text-lg text-violet-normal">
                        No Task Available at the moment
                    </p>
                </div>
            ) : (
                <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {displayTasks.map((item, index) => {
                        return (
                            <TaskCard
                                key={index}
                                task={item}
                            />
                        );
                    })}
                </div>
            )}
            {page.totalPages > 1 && (
                <div className="mt-10 flex w-full items-center justify-center space-x-2">
                    <button
                        className="rounded-md bg-status-lightViolet p-2 transition-all duration-300 hover:bg-primary hover:text-white disabled:bg-status-lightViolet disabled:opacity-50 disabled:hover:bg-transparent"
                        disabled={page.currentPage === 0}
                        onClick={() =>
                            setPage((prev) => ({
                                ...prev,
                                currentPage: prev.currentPage - 1,
                            }))
                        }
                    >
                        <IoIosArrowBack />
                    </button>
                    {buttonNumbers.map((item) => (
                        <button
                            key={item}
                            className={` ${item === page.currentPage + 1 ? " bg-violet-normal  text-white" : ""} rounded-md px-3.5 py-1 hover:bg-violet-200 `}
                            onClick={() =>
                                setPage((prev) => ({
                                    ...prev,
                                    currentPage: item - 1,
                                }))
                            }
                        >
                            {item}
                        </button>
                    ))}

                    <button
                        className="rounded-md bg-status-lightViolet p-2 hover:bg-primary disabled:bg-status-lightViolet disabled:opacity-50 disabled:hover:bg-transparent"
                        // onClick={handleNextPage}
                        disabled={page.currentPage + 1 === page.totalPages}
                        onClick={() =>
                            setPage((prev) => ({
                                ...prev,
                                currentPage: prev.currentPage + 1,
                            }))
                        }
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ExploreCategoryLising;
