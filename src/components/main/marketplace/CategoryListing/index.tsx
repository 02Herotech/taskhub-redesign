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
} from "@/store/Features/marketplace";

interface CategoryListingProps {
  category: string;
}

const CategoryListing: React.FC<CategoryListingProps> = ({ category }) => {
  const { categories, isFiltering, filteredData, totalPages, filterParams } =
    useSelector((state: RootState) => state.market);

  const [isLoading, setIsLoading] = useState(true);
  const [allListsting, setallListsting] = useState<ListingDataType[]>([]);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [isViewMore, setIsViewMore] = useState({ state: false });
  const [displayListing, setDisplayListing] = useState<ListingDataType[]>([]);
  const [page, setPage] = useState({ totalPages: 1, currentPage: 0 });
  const [buttonNumbers, setButtonNumbers] = useState<number[]>([]);

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
          "https://api.oloja.com.au/api/v1/listing/all-active-listings/" +
          currentPage;
      } else if (categoryId) {
        url =
          "https://api.oloja.com.au/api/v1/listing/filter-listings/" +
          currentPage +
          "?category=" +
          categoryId.categoryName;
      }
      const { data } = await axios.get(url as string);
      content = data.content;
      setPage((prev) => ({ ...prev, totalPages: data.totalPages }));
      if (url) {
        setallListsting(content);
        setDisplayListing(content);
      }
    } catch (error) {
      setErrorMsg("Error searching listing");
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
          "https://api.oloja.com.au/api/v1/listing/text/" +
          page.currentPage +
          filterParams;
      } else {
        url =
          "https://api.oloja.com.au/api/v1/listing/filter-listings/" +
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
      if (displayListing.length > 0) {
        setDisplayListing((prev) => [...prev.slice(0, 4)]);
      }
      if (isViewMore.state) {
        setDisplayListing(allListsting);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [allListsting, isViewMore]);

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
          {(isFiltering
            ? filteredData.length > 3
            : displayListing.length > 3) && (
              <button
                className="flex items-center gap-2 border-b-2 border-violet-normal text-sm font-bold  text-violet-normal"
                onClick={() =>
                  setIsViewMore((prev) => ({ ...prev, state: !prev.state }))
                }
              >
                <span className="whitespace-nowrap">
                  {isViewMore.state ? "View Less" : "View More"}
                </span>
                <span>
                  <FaArrowUp
                    className={`size-3  ${isViewMore.state ? "rotate-90" : "rotate-45"} `}
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
              No Listing Available at the moment
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
                />
              );
            })}
          </div>
        )
      ) : displayListing.length === 0 && !ErrorMsg ? (
        <div className="flex min-h-40 flex-col items-center justify-center gap-4">
          <Image
            src={"/assets/images/marketplace/undraw_void_-3-ggu.svg"}
            alt="void"
            width={200}
            height={200}
          />
          <p className="text-lg text-violet-normal">
            No Listing Available at the moment
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
              />
            );
          })}
        </div>
      )}
      {isViewMore.state && page.totalPages > 1 && (
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

export default CategoryListing;
