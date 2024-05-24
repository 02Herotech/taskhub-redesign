import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import {
  tempUpdateFilterData,
  updateFilterData,
} from "@/store/Features/marketplace";
import { BsTriangle, BsTriangleFill } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import {
  fetchAllMarketplaseCategories,
  fetchMarketplaceSubCategoryById,
} from "@/lib/marketplace";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  updateCategories,
  updateFilterStatus,
} from "@/store/Features/marketplace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactSlider from "react-slider";

const locationData = [
  "Western Australia",
  "Northern Territory",
  "South Australia",
  "Queensland",
  "New South Wales",
  "Victoria",
  "Tasmania",
  "Australian Capital Territory",
];

interface props {
  categoryHeader: any;
}

const MarketPlaceFilter = ({ categoryHeader }: props) => {
  const dispatch = useDispatch();
  const {
    currentFilterStatus: { category, subCategory, location, pricing, search },
    categories,
    filteredData,
    isFiltering,
  } = useSelector((state: RootState) => state.market);

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    isOpened: false,
    category: "",
  });

  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleShowDropdown("search");
  };

  const handleReload = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoryData: CategoryType[] =
        await fetchAllMarketplaseCategories();
      dispatch(updateCategories(categoryData));
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleFilerByPricing = (title: string) => {
    handleShowDropdown(title);
  };
  const handleCanelFilterByPricing = (title: string) => {
    handleShowDropdown(title);
    dispatch(
      updateFilterStatus({
        title: "pricing",
        value: {
          minPrice: 5,
          maxPrice: 1000,
        },
      }),
    );
    dispatch(
      tempUpdateFilterData({
        section: "pricing",
        value: { minPrice: pricing.minPrice, maxPrice: pricing.maxPrice },
      }),
    );
  };

  const handleFetchSubCategory = async (
    id: number,
    category: string,
    title: string,
  ) => {
    dispatch(updateFilterStatus({ title, value: category }));
    const subcategoryData: SubCategoryType[] =
      await fetchMarketplaceSubCategoryById(id);
    setSubCategories(subcategoryData);
    handleShowDropdown(title);
    // ----------------
    // filter by category
    const url =
      "https://smp.jacinthsolutions.com.au/api/v1/listing/listing-by-category/1?pageNumber=0";

    // const { data } = await axios.get(url);
    // dispatch(updateFilterData({ data, section: "category", value: category }));
    dispatch(tempUpdateFilterData({ section: "category", value: category }));
  };

  const handleFilterDataBySubcategory = async (
    id: number,
    subCategory: { id: number; name: string },
    title: string,
  ) => {
    dispatch(updateFilterStatus({ title, value: subCategory }));
    handleShowDropdown(title);
    // ----------------
    // const url =
    //   "https://smp.jacinthsolutions.com.au/api/v1/listing/listing-by-sub-category/" +
    //   subCategory.id;
    // const { data } = await axios.get(url);
    // dispatch(
    //   updateFilterData({ data, section: "subCategory", value: category }),
    // );
    dispatch(
      tempUpdateFilterData({ section: "subCategory", value: subCategory }),
    );
  };

  const handleFilterbyLocation = (location: string, title: string) => {
    dispatch(updateFilterStatus({ title, value: location }));
    handleShowDropdown(title);
    dispatch(tempUpdateFilterData({ section: "location", value: location }));
  };

  const handleShowDropdown = (category: string) => {
    if (isDropdownOpen.category === category && isDropdownOpen.isOpened) {
      setIsDropdownOpen((prev) => ({ ...prev, isOpened: false, category }));
    } else {
      setIsDropdownOpen((prev) => ({ ...prev, isOpened: true, category }));
    }
  };

  return (
    <div className="my-12 flex flex-col space-y-16">
      <div className=" flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-violet-darkHover md:text-3xl">
            Our Various Category
          </h1>
          <p className="cursor-pointer text-base font-[400] text-violet-darkHover md:text-lg">
            Find the help you need on Taskhub
          </p>
        </div>

        <div className="flex justify-center lg:hidden">
          <select
            name="filterBy"
            id="filterBy"
            className="w-[180px] rounded-3xl border-[1.5px] border-[#381F8C] bg-[#F1F1F2] px-8 py-4 text-center text-[16px] font-[700] text-[#381F8C] focus:outline-none"
          >
            <option value="" className="rounded-3xl">
              Filter By
            </option>
          </select>
        </div>

        <div className="hidden lg:block">
          <div className="flex space-x-2 text-xs lg:space-x-6 ">
            <button
              className="cursor-pointer rounded-3xl bg-violet-normal px-4 py-2 text-base  font-bold text-white"
              onClick={handleReload}
            >
              All
            </button>

            {/* -------------------------------- */}
            {/* Category */}
            <div className="relative">
              <button
                className=" flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                onClick={() => handleShowDropdown("category")}
              >
                {category === "" ? "Category" : category}
                <span>
                  <BsTriangleFill
                    fill="rgb(56 31 140)"
                    className="size-2 rotate-[60deg] text-violet-normal"
                  />
                </span>
              </button>
              <div
                className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "category" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
              >
                {categories.map((item) => (
                  <button
                    className="whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                    key={item.id}
                    onClick={() =>
                      handleFetchSubCategory(
                        item.id,
                        item.categoryName,
                        "category",
                      )
                    }
                  >
                    {item.categoryName}
                  </button>
                ))}
              </div>
            </div>

            {/* ----------------------------------- */}
            {/* SubCategory */}
            <div className="relative">
              <button
                className=" flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                onClick={() => handleShowDropdown("sub-category")}
              >
                {subCategory.name === "" ? "Subcategory" : subCategory.name}

                <span>
                  <BsTriangleFill
                    fill="rgb(56 31 140)"
                    className="size-2 rotate-[60deg] text-violet-normal"
                  />
                </span>
              </button>
              <div
                className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "sub-category" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
              >
                {category === "" ? (
                  <p className="cursor-default whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal">
                    Select A Category
                  </p>
                ) : (
                  subCategories.map((item) => (
                    <button
                      key={item.id}
                      className="whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                      onClick={() =>
                        handleFilterDataBySubcategory(
                          item.id,
                          { id: item.id, name: item.name },
                          "subCategory",
                        )
                      }
                    >
                      {item.name}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* -------------------------------- */}
            {/* location */}
            <div className="relative">
              <button
                className=" flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                onClick={() => handleShowDropdown("location")}
              >
                {location === "" ? "Location" : location}
                <span>
                  <BsTriangleFill
                    fill="rgb(56 31 140)"
                    className="size-2 rotate-[60deg] text-violet-normal"
                  />
                </span>
              </button>
              <div
                className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "location" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
              >
                {locationData.map((item, index) => (
                  <button
                    className="whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                    key={index}
                    onClick={() => handleFilterbyLocation(item, "location")}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {/* ----------------------------------------- */}
            {/* Pricing */}
            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                onClick={() => handleShowDropdown("pricing")}
              >
                Pricing
                <span>
                  <BsTriangleFill
                    fill="rgb(56 31 140)"
                    className="size-2 rotate-[60deg] text-violet-normal"
                  />
                </span>
              </button>
              <div
                className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "pricing" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
              >
                <div className="space-y-4 p-4">
                  <div className="min-w-64 p-4">
                    <div className="mb-6 text-center text-2xl font-bold text-violet-normal">
                      ${pricing.minPrice} - ${pricing.maxPrice}
                    </div>
                    <ReactSlider
                      className="relative h-2 w-full rounded-md bg-[#FE9B07]"
                      thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                      trackClassName="top-1/2 bg-[#FE9B07]"
                      value={[pricing.minPrice, pricing.maxPrice]}
                      min={5}
                      max={1000}
                      step={5}
                      onChange={(newValues: number[]) =>
                        dispatch(
                          updateFilterStatus({
                            title: "pricing",
                            value: {
                              minPrice: newValues[0],
                              maxPrice: newValues[1],
                            },
                          }),
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center gap-4 ">
                    <button
                      onClick={() => handleFilerByPricing("pricing")}
                      className=" rounded-full  bg-violet-normal px-4 py-2 text-left text-sm text-white transition-opacity duration-300 hover:opacity-90 "
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => handleCanelFilterByPricing("pricing")}
                      className=" rounded-full  bg-violet-light px-4 py-2 text-left text-sm text-violet-normal transition-all duration-300  hover:bg-violet-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 flex w-full flex-col space-y-10 lg:flex-row lg:items-center  lg:justify-between">
        <div className="flex w-[350px] flex-col space-y-2 md:w-full lg:w-full">
          <h1 className="text-xl font-bold text-violet-dark md:text-3xl">
            {categoryHeader ? categoryHeader : "Get a Specialist Directly"}
          </h1>
          <p className="text-base font-[400] text-violet-darkHover md:text-lg">
            {categoryHeader
              ? `Here are few of our ${categoryHeader}`
              : "Browse through our various services"}
          </p>
        </div>

        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex w-full items-center justify-center lg:justify-end "
        >
          <div className="flex w-full items-center rounded-xl border-[1.5px] border-[#C1BADB] px-3 md:w-[400px]">
            <FiSearch size={15} className="text-[#C1BADB]" />

            <input
              type="text"
              value={search}
              className=" w-full px-2 py-4 text-[16px] focus:border-white focus:outline-none  "
              onChange={(event) =>
                dispatch(
                  updateFilterStatus({
                    title: "search",
                    value: event.target.value,
                  }),
                )
              }
              placeholder="Search"
            />

            {/* {search && (
              <IoClose
                size={15}
                className=" text-grey6 cursor-pointer hover:text-[#C1BADB] "
                onClick={handleClearSearch}
              />
            )} */}
          </div>

          <button
            type="submit"
            className="ml-2 rounded-xl bg-primary px-5 py-5 text-[12px] text-white hover:bg-status-darkViolet focus:outline-none"
          >
            <FiSearch size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarketPlaceFilter;
