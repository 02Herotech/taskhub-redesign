/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/shared/loading";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import SingleListingCard from "../marketplace/SingleListingCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  filterMarketPlace,
  setFilterLoadingState,
  setFilterParams,
  resetFilter,
} from "@/store/Features/marketplace";

interface CategoryListingProps {
  category: string;
}

const CategoryListing: React.FC<CategoryListingProps> = ({ category }) => {
  const { categories, isFiltering, filteredData, totalPages, filterParams } =
    useSelector((state: RootState) => state.market);

  const [isLoading, setIsLoading] = useState(true);
  const [allListsting, setallListsting] = useState<ListingDataType[]>([]);
  const [displayListing, setDisplayListing] = useState<ListingDataType[]>([]);

  const [ErrorMsg, setErrorMsg] = useState("");
  const [page, setPage] = useState({ totalPages: 1, currentPage: 0 });
  const [buttonNumbers, setButtonNumbers] = useState<number[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showCategory, setShowCategory] = useState(false);
  const dispatch = useDispatch();

  console.log(isLoading);

  const handleFetchCategory = async (currentPage: number) => {
    if (isFiltering) return;
    const categoryId = categories.find(
      (item) => item.categoryName === category,
    );
    setIsLoading(true);
    try {
      if (!category) return;
      let url: string, content;
      if (category === "All") {
        url = `${process.env.NEXT_PUBLIC_API_URL}/listing/all-active-listings?pageNumber=${currentPage}&size=12`;
      } else if (categoryId) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/listing/filter-listings?category=${categoryId.categoryName}`;
      }
      const { data } = await axios.get(url as string);
      content = data.content;
      if (url) {
        setallListsting(content);
        setDisplayListing(content);
      }
      dispatch(
        filterMarketPlace({ data: data.content, totalPages: data.totalPages }),
      );
      dispatch(setFilterParams(`?category=${category}`));
      setIsLoading(false);
    } catch (error) {
      setErrorMsg("Error searching listing");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage((prev) => ({ ...prev, totalPages: totalPages }));
  }, [totalPages]);

  const getButtonNumbers = () => {
    const half = Math.floor(5 / 2);
    let start = Math.max(page.currentPage - half, 1);
    let end = start + 4;
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
      if (displayListing.length > 0) {
        setDisplayListing((prev) => [...prev.slice(0, 4)]);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [allListsting]);

  const emptyCategoryMessages = [
    "Be the first to shine! List your service now and be discovered.",
    "No listings yet? That's your cue! be the first and set the trend.",
    "Nothing here...yet! This could be YOUR space to shine. Get listed today!.",
    "This space is waiting for you! Add your listing and grow your business today.",
    "Big moves start small! Add your service now and get noticed.",
    "Nothing here...yet! Your perfect opportunity to grab attention. List your service now!",
    "Oops, looks like no listings yet! Why not be the trendsetter? Post your service now!",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * emptyCategoryMessages.length);
        } while (newIndex === currentMessageIndex);
        return newIndex;
      });
    }, 120000);

    return () => clearInterval(intervalId);
  }, [currentMessageIndex]);

  const handleFilterByCategory = async (currentPage: number) => {
    const categoryId = categories.find(
      (item) => item.categoryName === category,
    );
    dispatch(setFilterLoadingState(true));
    try {
      let url: string;
      if (category === "All") {
        url = `${process.env.NEXT_PUBLIC_API_URL}/listing/all-active-listings?pageNumber=${currentPage}&size=12`;
      } else if (categoryId) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/listing/filter-listings?category=${categoryId.categoryName}`;
      }
      const { data } = await axios.get(url);
      setallListsting(data.content as ListingDataType[]);
      dispatch(
        filterMarketPlace({ data: data.content, totalPages: data.totalPages }),
      );
      dispatch(setFilterParams(`?category=${category}`));
    } catch (error: any) {
      console.error(error.response.message || error);
    } finally {
      dispatch(setFilterLoadingState(false));
    }
  };

  useEffect(() => {
    handleFetchCategory(page.currentPage);
  }, [category, page.currentPage]);

  useEffect(() => {
    if (category == "All") {
      setShowCategory(true);
      return;
    }
    if (displayListing.length > 4) {
      setShowCategory(true);
    }
  }, [displayListing]);
  return (
    <>
      {showCategory && (
        <div className="h-full w-full py-4 ">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex w-full items-center justify-between gap-4">
              <h1 className="text-xl font-bold text-violet-darkHover md:text-2xl">
                {/* {!isFiltering
                  ? category
                  : filteredData.length > 0
                    ? filteredData[0].category.categoryName
                    : ""} */}
                {category}
              </h1>
              {(isFiltering
                ? filteredData.length > 3
                : displayListing.length > 3) && (
                <button
                  className="flex items-center gap-2 border-b-2 border-violet-normal text-sm font-bold  text-violet-normal"
                  onClick={() => {
                    if (isFiltering) {
                      dispatch(resetFilter());
                    } else {
                      handleFilterByCategory(page.currentPage);
                    }
                  }}
                >
                  <span className="whitespace-nowrap">
                    {isFiltering ? "View Less" : "View More"}
                  </span>
                  <span>
                    <FaArrowUp
                      className={`size-3  ${isFiltering ? "rotate-90" : "rotate-45"} `}
                    />
                  </span>
                </button>
              )}
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
            // <Loading />
            <p>HI Loader </p>
          ) : isFiltering ? (
            !ErrorMsg && filteredData.length === 0 ? (
              <div className="flex min-h-40 flex-col items-center justify-center gap-4 py-10">
                <Image
                  src={"/assets/images/marketplace/cuate.svg"}
                  alt="void"
                  width={200}
                  height={200}
                />
                <p className="text-lg text-violet-normal">
                  {/* Display shuffled message */}
                  {emptyCategoryMessages[currentMessageIndex]}{" "}
                </p>
              </div>
            ) : (
              <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {filteredData.map((item, index) => {
                  return (
                    <SingleListingCard
                      key={index}
                      singleListing={item}
                      listingId={item.id}
                      posterId={item?.serviceProvider?.id}
                      businessName={item.listingTitle}
                      displayImage={item.businessPictures[0]}
                      pricing={item.planOnePrice ?? 0}
                      fullName={item?.serviceProvider?.user?.fullName}
                      profileImage={item?.serviceProvider?.user?.profileImage}
                      review={item.reviews}
                    />
                  );
                })}
              </div>
            )
          ) : displayListing.length === 0 && !ErrorMsg ? (
            <div className="flex min-h-40 flex-col items-center justify-center gap-4 py-10">
              <Image
                src={"/assets/images/marketplace/cuate.svg"}
                alt="void"
                width={200}
                height={200}
              />
              <p className="text-lg text-violet-normal">
                {/* Display shuffled message */}
                {emptyCategoryMessages[currentMessageIndex]}{" "}
              </p>
            </div>
          ) : (
            <div className="my-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {displayListing.map((item, index) => {
                return (
                  <SingleListingCard
                    key={index}
                    singleListing={item}
                    listingId={item.id}
                    posterId={item?.serviceProvider?.id}
                    businessName={item.listingTitle}
                    displayImage={item.businessPictures[0]}
                    pricing={item.planOnePrice ?? 0}
                    fullName={item?.serviceProvider?.user?.fullName}
                    profileImage={item?.serviceProvider?.user?.profileImage}
                    review={item.reviews}
                  />
                );
              })}
            </div>
          )}
          {isFiltering && page.totalPages > 1 && (
            <div className="my-10 flex w-full items-center justify-center space-x-2">
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
      )}
    </>
  );
};

export default CategoryListing;
