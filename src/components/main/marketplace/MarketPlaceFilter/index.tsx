import { FiSearch } from "react-icons/fi";
import axios from "axios";
import {
  resetFilter,
  tempUpdateFilterData,
  updateFilterData,
} from "@/store/Features/marketplace";
import { BsTriangleFill } from "react-icons/bs";
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
  updateSearchListing,
} from "@/store/Features/marketplace";
import ReactSlider from "react-slider";
import { GiSettingsKnobs } from "react-icons/gi";
import MobileFilterModal from "../MobileFilterModal";

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

const MarketPlaceFilter = () => {
  const dispatch = useDispatch();
  const {
    currentFilterStatus: { category, subCategory, location, pricing },
    categories,
    search: { searchData },
    isFiltering,
    search: { isSearching },
  } = useSelector((state: RootState) => state.market);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    isOpened: false,
    category: "",
  });

  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);
  const [categoryHeader, setCategoryHeader] = useState("");
  const [isMobileFilterModalShown, setIsMobileFilterModalShown] =
    useState(false);

  // done and working
  useEffect(() => {
    const fetchData = async () => {
      const categoryData: CategoryType[] =
        await fetchAllMarketplaseCategories();
      dispatch(updateCategories(categoryData));
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Filter by category done and working
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

    // filter by category
    const url =
      "https://smp.jacinthsolutions.com.au/api/v1/listing/listing-by-category/" +
      id +
      "?pageNumber=0";
    const { data } = await axios.get(url);
    dispatch(
      updateFilterData({
        data: data.content,
        section: "subCategory",
        value: category,
      }),
    );
  };

  // Filter working
  const handleFilterDataBySubcategory = async (
    id: number,
    subCategory: { id: number; name: string },
    title: string,
  ) => {
    dispatch(updateFilterStatus({ title, value: subCategory }));
    handleShowDropdown(title);
    // ----------------
    const url =
      "https://smp.jacinthsolutions.com.au/api/v1/listing/listing-by-sub-category/" +
      subCategory.id +
      "?pageNumber=0";
    const { data } = await axios.get(url);
    dispatch(
      updateFilterData({
        data: data.content,
        section: "subCategory",
        value: category,
      }),
    );
  };

  // done and working
  const handleShowDropdown = (category: string) => {
    if (isDropdownOpen.category === category && isDropdownOpen.isOpened) {
      setIsDropdownOpen((prev) => ({ ...prev, isOpened: false, category }));
    } else {
      setIsDropdownOpen((prev) => ({ ...prev, isOpened: true, category }));
    }
  };

  // pending,
  const handleFilterByPricing = async () => {
    const { minPrice, maxPrice } = pricing;
    console.log(minPrice, maxPrice);
    const url =
      "https://smp.jacinthsolutions.com.au/api/v1/listing/price/0?minPrice=" +
      minPrice +
      "&maxPrice=" +
      maxPrice;
    const { data } = await axios.get(url);
    const content = data.content;
    console.log(content);
    dispatch(
      updateFilterData({
        data: content,
        section: "pricing",
        value: { minPrice, maxPrice },
      }),
    );
    handleShowDropdown("pricing");
  };

  // working well
  const handleCanelFilterByPricing = async (title: string) => {
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
  };

  const handleFilterbyLocation = (location: string, title: string) => {
    dispatch(updateFilterStatus({ title, value: location }));
    handleShowDropdown(title);
    dispatch(tempUpdateFilterData({ section: "location", value: location }));
  };
  // handled and working
  const handleFilterBySearch = async (searchData: string) => {
    dispatch(updateSearchListing(searchData));
    const url =
      "https://smp.jacinthsolutions.com.au/api/v1/listing/text/0?text=" +
      searchData;
    const { data } = await axios.get(url);
    dispatch(
      updateFilterData({
        data: data.content,
        section: "search",
        value: searchData,
      }),
    );
  };
  //  handled and working
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchText = searchData;
    const url =
      "https://smp.jacinthsolutions.com.au/api/v1/listing/text/0?text=" +
      searchText;
    const { data } = await axios.get(url);
    dispatch(
      updateFilterData({
        data: data.content,
        section: "search",
        value: searchData,
      }),
    );
  };

  return (
    <div className=" flex flex-col space-y-4 pt-5 lg:space-y-8 lg:py-10">
      <div className=" flex flex-col space-y-8">
        {!isFiltering && !isSearching && (
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-violet-darkHover md:text-3xl">
              Our Various Category
            </h1>
            <p className="cursor-pointer text-base font-[400] text-violet-darkHover md:text-lg">
              Find the help you need on Taskhub
            </p>
          </div>
        )}

        <div className="relative flex justify-center md:hidden ">
          <MobileFilterModal
            isMobileFilterModalShown={isMobileFilterModalShown}
            setIsMobileFilterModalShown={setIsMobileFilterModalShown}
          />
          <button
            className="flex w-full items-center justify-center gap-3 rounded-full border border-violet-normal bg-violet-light px-6 py-2 font-bold  text-violet-normal"
            onClick={() => setIsMobileFilterModalShown(true)}
          >
            <span>
              <GiSettingsKnobs />
            </span>
            Filter By
          </button>
        </div>

        <section className="flex flex-col gap-5">
          <div
            className={` max-md:hidden  ${isFiltering || isSearching ? "order-2" : ""} `}
          >
            <div className="flex space-x-2 text-xs lg:space-x-6 ">
              <button
                className="cursor-pointer rounded-3xl bg-violet-normal px-4 py-2 text-base  font-bold text-white"
                onClick={() => dispatch(resetFilter(""))}
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
              <div className="relative z-20">
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
                  className={`small-scrollbar absolute top-[calc(100%+1rem)] z-50 flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "pricing" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
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
                        onClick={() => handleFilterByPricing()}
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

          {/* Search form */}
          <div
            className={`flex justify-between gap-4 py-4 max-md:flex-col md:gap-8  lg:items-center   ${isFiltering || isSearching ? "order-1" : ""} `}
          >
            <div className="">
              <h1 className="text-xl font-bold text-violet-dark md:text-3xl">
                Get a Specialist Directly
              </h1>
              <p className="text-base font-[400] text-violet-darkHover md:text-lg">
                {categoryHeader
                  ? `Here are few of our ${categoryHeader}`
                  : "Browse through our various services"}
              </p>
            </div>

            <form
              onSubmit={(event) => handleSubmit(event)}
              className="flex w-full items-center gap-2  lg:max-w-sm"
            >
              <div className="w-full">
                <input
                  type="text"
                  value={searchData}
                  className="w-full rounded-xl border border-violet-normal px-4 py-3   text-lg text-slate-500 shadow  placeholder-shown:border-slate-300 placeholder-shown:outline-none focus:outline-none "
                  onChange={(event) => handleFilterBySearch(event.target.value)}
                  placeholder="Search"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-primary p-3 text-[12px] text-white hover:bg-status-darkViolet focus:outline-none"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketPlaceFilter;
