import { FiSearch } from "react-icons/fi";
import axios from "axios";
import {
  filterMarketPlace,
  resetFilter,
  setFilterLoadingState,
  setFilterParams,
} from "@/store/Features/marketplace";
import { BsTriangleFill, BsX } from "react-icons/bs";
import { FormEvent, useEffect, useState } from "react";
import { fetchAllMarketplaseCategories } from "@/lib/marketplace";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updateCategories } from "@/store/Features/marketplace";
import ReactSlider from "react-slider";
import { GiSettingsKnobs } from "react-icons/gi";
import MobileFilterModal from "../MobileFilterModal";
import { truncateText } from "@/utils/marketplace";
import { locationData, typeData } from "@/data/marketplace/data";

const MarketPlaceFilter = () => {
  const dispatch = useDispatch();
  const { categories, isFiltering } = useSelector(
    (state: RootState) => state.market,
  );
  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    isOpened: false,
    category: "",
  });
  const [filterDataStructure, setfilterDataStructure] =
    useState<FilterDataStructureTypes>({
      category: "",
      location: "",
      typeOfService: "",
      typeOfServiceDisplay: "",
      minPrice: 5,
      maxPrice: 1000,
    });

  const [isMounted, setIsMounted] = useState(false);
  const [searchInputData, setSearchInputData] = useState("");

  const [isMobileFilterModalShown, setIsMobileFilterModalShown] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const categoryData: CategoryType[] =
        await fetchAllMarketplaseCategories();
      dispatch(updateCategories(categoryData));
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const filtered = categories.filter((category) =>
        category.categoryName
          .toLowerCase()
          .includes(categorySearchQuery.toLowerCase()),
      );
      setFilteredCategories(filtered);
    }
  }, [categorySearchQuery, categories]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isFiltering]);

  // done and working
  const handleShowDropdown = (category: string) => {
    if (isDropdownOpen.category === category && isDropdownOpen.isOpened) {
      setIsDropdownOpen((prev) => ({ ...prev, isOpened: false, category }));
    } else {
      setIsDropdownOpen((prev) => ({ ...prev, isOpened: true, category }));
    }
  };

  //  handled and working
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(setFilterLoadingState(true));
      const url =
        `${process.env.NEXT_PUBLIC_API_URL}/listing/text/0?text=` +
        searchInputData;
      const { data } = await axios.get(url);
      dispatch(setFilterParams(`?text=${searchInputData}`));
      dispatch(
        filterMarketPlace({ data: data.content, totalPages: data.totalPages }),
      );
    } catch (error: any) {
      console.log(error.response?.data || error);
    } finally {
      dispatch(setFilterLoadingState(false));
    }
  };

  const handleFilter = async () => {
    try {
      dispatch(setFilterLoadingState(true));
      const { category, location, typeOfService, minPrice, maxPrice } =
        filterDataStructure;
      let url = `${process.env.NEXT_PUBLIC_API_URL}/listing/filter-listings/0?`;
      const params = [];

      if (category) {
        params.push(`category=${category}`);
      }
      if (location) {
        params.push(`location=${location}`);
      }
      if (typeOfService) {
        params.push(`typeOfService=${typeOfService}`);
      }
      if (minPrice > 5) {
        params.push(`minPrice=${minPrice}`);
      }
      if (maxPrice < 1000) {
        params.push(`maxPrice=${maxPrice}`);
      }
      if (params.length > 0) {
        url += params.join("&");
      }
      const response = await axios.get(url);
      dispatch(
        filterMarketPlace({
          data: response.data.content,
          totalPages: response.data.totalPages,
        }),
      );
      dispatch(setFilterParams(`?${params.join("&")}`));
    } catch (error: any) {
      console.error(error.response.data || error);
    } finally {
      dispatch(setFilterLoadingState(false));
    }
  };

  const handleResetFilters = () => {
    setfilterDataStructure({
      category: "",
      location: "",
      typeOfService: "",
      minPrice: 5,
      maxPrice: 1000,
      typeOfServiceDisplay: "",
    });
    dispatch(resetFilter());
  };

  useEffect(() => {
    if (isMounted) {
      if (
        filterDataStructure.category ||
        filterDataStructure.location ||
        filterDataStructure.typeOfService ||
        filterDataStructure.typeOfServiceDisplay ||
        filterDataStructure.minPrice !== 5 ||
        filterDataStructure.maxPrice !== 1000
      ) {
        handleFilter();
      } else {
        dispatch(resetFilter());
      }
    } else {
      setIsMounted(true);
    }
    // eslint-disable-next-line
  }, [filterDataStructure]);

  return (
    <div className=" flex flex-col space-y-4 pt-5 lg:space-y-8 lg:py-10">
      <div className=" flex flex-col space-y-8">
        {!isFiltering && (
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl font-bold text-violet-darkHover md:text-3xl">
              Our Various Categories
            </h1>
            <p className="cursor-pointer text-base font-[400] text-violet-darkHover md:text-lg">
              Find the help you need on Oloja
            </p>
          </div>
        )}

        <div className="relative flex justify-center md:hidden ">
          <MobileFilterModal
            isMobileFilterModalShown={isMobileFilterModalShown}
            setIsMobileFilterModalShown={setIsMobileFilterModalShown}
            setfilterDataStructure={setfilterDataStructure}
            filterDataStructure={filterDataStructure}
            // handleResetFilters={handleResetFilters}
          />
          <div className="flex gap-4">
            <button
              className={`flex  items-center justify-center gap-3 rounded-full border border-violet-normal bg-violet-light px-6 py-2 font-bold text-violet-normal ${isFiltering ? "w-auto" : "w-full min-w-72"}`}
              onClick={() => setIsMobileFilterModalShown(true)}
            >
              <span>
                <GiSettingsKnobs />
              </span>
              Filter By
            </button>
            {isFiltering && (
              <button
                className="min-w-40 flex-grow cursor-pointer rounded-3xl bg-orange-normal px-4 py-2 text-base font-bold text-white"
                onClick={handleResetFilters}
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        <section className="flex flex-col gap-5">
          <div className={`max-md:hidden  ${isFiltering ? "order-2" : ""} `}>
            <div className="flex flex-wrap gap-4 space-x-2 text-xs lg:space-x-6 ">
              <button
                className="cursor-pointer rounded-3xl bg-violet-normal px-4 py-2 text-base  font-bold text-white"
                onClick={() => {
                  handleResetFilters();
                }}
              >
                All
              </button>
              {/* -------------------------------- */}
              {/* Category */}
              <div className="relative">
                {filterDataStructure.category !== "" && (
                  <button
                    className="pointer-events-auto absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white"
                    onClick={() => {
                      setfilterDataStructure((prev) => ({
                        ...prev,
                        category: "",
                      }));
                    }}
                  >
                    <BsX />
                  </button>
                )}
                <button
                  className="flex items-center gap-2 rounded-3xl border border-violet-normal bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200"
                  onClick={() => handleShowDropdown("category")}
                >
                  <div
                    className={`fixed left-0 top-0 h-screen w-screen ${
                      isDropdownOpen.isOpened &&
                      isDropdownOpen.category === "category"
                        ? "block"
                        : "hidden"
                    }`}
                    onClick={() => handleShowDropdown("category")}
                  />
                  {filterDataStructure.category === ""
                    ? "Category"
                    : truncateText(filterDataStructure.category, 12)}
                  <span>
                    <BsTriangleFill
                      fill="rgb(56 31 140)"
                      className="size-2 rotate-[60deg] text-violet-normal"
                    />
                  </span>
                </button>
                <div
                  className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-[700px] flex-col rounded-md bg-violet-50 transition-all duration-300 ${
                    isDropdownOpen.category === "category" &&
                    isDropdownOpen.isOpened
                      ? "max-h-[500px] overflow-y-auto border border-slate-200"
                      : "max-h-0 overflow-hidden"
                  }`}
                >
                  {/* Category Search Input */}
                  <div className="sticky top-0 z-10 bg-violet-50 p-2">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={categorySearchQuery}
                        onChange={(e) => setCategorySearchQuery(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full rounded-md border border-violet-200 p-4 text-violet-normal placeholder-violet-300 placeholder:text-lg focus:border-violet-normal focus:outline-none"
                      />
                      <FiSearch className="absolute right-3 top-1/2 size-6 -translate-y-1/2 text-violet-300" />
                    </div>
                  </div>

                  {/* Filtered Categories */}
                  <div className="grid grid-cols-2 gap-2 py-4">
                    {filteredCategories.map((item) => (
                      <button
                        className="relative z-10 whitespace-nowrap rounded-md px-6 py-3 text-left text-base font-medium text-violet-normal transition-colors duration-300 hover:text-tc-orange"
                        key={item.id}
                        onClick={() => {
                          handleShowDropdown("category");
                          setfilterDataStructure((prev) => ({
                            ...prev,
                            category: item.categoryName,
                          }));
                          setCategorySearchQuery("");
                        }}
                      >
                        {item.categoryName}
                      </button>
                    ))}
                  </div>

                  {/* No Results Message */}
                  {filteredCategories.length === 0 && (
                    <div className="px-8 py-4 text-center text-violet-normal">
                      No categories found
                    </div>
                  )}
                </div>
              </div>
              {/* -------------------------------- */}
              {/* location */}
              <div className="relative">
                {filterDataStructure.location !== "" && (
                  <button
                    className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white"
                    onClick={() =>
                      setfilterDataStructure((prev) => ({
                        ...prev,
                        location: "",
                      }))
                    }
                  >
                    <BsX />
                  </button>
                )}
                <button
                  className=" flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                  onClick={() => handleShowDropdown("location")}
                >
                  <div
                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen.isOpened && isDropdownOpen.category === "location" ? "block" : "hidden"} `}
                    onClick={() => handleShowDropdown("location")}
                  ></div>
                  {filterDataStructure.location === ""
                    ? "Location"
                    : truncateText(filterDataStructure.location, 12)}
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
                      className="z-10 whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                      key={index}
                      onClick={() => {
                        handleShowDropdown("location");
                        setfilterDataStructure((prev) => ({
                          ...prev,
                          location: item,
                        }));
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              {/* Type of service */}
              <div className="relative">
                {filterDataStructure.typeOfService !== "" && (
                  <button
                    className="pointer-events-auto absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white "
                    onClick={() => {
                      setfilterDataStructure((prev) => ({
                        ...prev,
                        typeOfService: "",
                        typeOfServiceDisplay: "",
                      }));
                    }}
                  >
                    <BsX />
                  </button>
                )}
                <button
                  className=" flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                  onClick={() => handleShowDropdown("type")}
                >
                  <div
                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen.isOpened && isDropdownOpen.category === "type" ? "block" : "hidden"} `}
                    onClick={() => handleShowDropdown("type")}
                  ></div>
                  {filterDataStructure.typeOfServiceDisplay === ""
                    ? "Type of service"
                    : truncateText(
                        filterDataStructure.typeOfServiceDisplay,
                        12,
                      )}
                  <span>
                    <BsTriangleFill
                      fill="rgb(56 31 140)"
                      className="size-2 rotate-[60deg] text-violet-normal"
                    />
                  </span>
                </button>
                <div
                  className={`small-scrollbar absolute top-[calc(100%+1rem)] flex max-h-0 min-w-full flex-col rounded-md bg-violet-50 transition-all duration-300 ${isDropdownOpen.category === "type" && isDropdownOpen.isOpened ? "max-h-64 overflow-y-auto border border-slate-200 " : "max-h-0  overflow-hidden "} `}
                >
                  {typeData.map((item, index) => (
                    <button
                      className="z-10 whitespace-nowrap px-8 py-3 text-left text-base text-violet-normal transition-colors duration-300 hover:bg-violet-100 "
                      key={index}
                      onClick={() => {
                        handleShowDropdown("type");
                        setfilterDataStructure((prev) => ({
                          ...prev,
                          typeOfService: item.value,
                          typeOfServiceDisplay: item.label,
                        }));
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* ----------------------------------------- */}
              {/* Pricing */}
              <div className="relative">
                {(filterDataStructure.minPrice !== 5 ||
                  filterDataStructure.maxPrice !== 1000) && (
                  <button
                    className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-violet-normal text-white"
                    onClick={() =>
                      setfilterDataStructure((prev) => ({
                        ...prev,
                        minPrice: 5,
                        maxPrice: 1000,
                      }))
                    }
                  >
                    <BsX />
                  </button>
                )}
                <button
                  className="flex items-center gap-2 rounded-3xl border border-violet-normal  bg-violet-light px-4 py-2 text-base font-bold text-violet-normal transition-colors duration-300 hover:bg-violet-200 "
                  onClick={() => handleShowDropdown("pricing")}
                >
                  <div
                    className={`fixed left-0 top-0 h-screen w-screen ${isDropdownOpen.isOpened && isDropdownOpen.category === "pricing" ? "block" : "hidden"} `}
                    onClick={() => handleShowDropdown("pricing")}
                  ></div>
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
                        ${filterDataStructure.minPrice} - $
                        {filterDataStructure.maxPrice}
                      </div>
                      <ReactSlider
                        className="relative h-2 w-full rounded-md bg-[#FE9B07]"
                        thumbClassName="absolute h-6 w-6 bg-[#FE9B07] rounded-full cursor-grab transform -translate-y-1/2 top-1/2"
                        trackClassName="top-1/2 bg-[#FE9B07]"
                        value={[
                          filterDataStructure.minPrice,
                          filterDataStructure.maxPrice,
                        ]}
                        min={5}
                        max={1000}
                        step={5}
                        onChange={(newValues: number[]) => {
                          setfilterDataStructure((prev) => ({
                            ...prev,
                            minPrice: newValues[0],
                            maxPrice: newValues[1],
                          }));
                        }}
                      />
                    </div>
                    <input
                      type="number"
                      className="my-1 w-full rounded-full border border-orange-normal p-3 text-center outline-none "
                      max={99999}
                      min={5}
                      onChange={(event) =>
                        setfilterDataStructure((prev) => ({
                          ...prev,
                          minPrice: Number(event.target.value),
                          maxPrice: Number(event.target.value),
                        }))
                      }
                    />
                    <div className="flex items-center gap-4 ">
                      <button
                        onClick={() => handleShowDropdown("pricing")}
                        className=" rounded-full  bg-violet-normal px-4 py-2 text-left text-sm text-white transition-opacity duration-300 hover:opacity-90 "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="min-w-40 cursor-pointer rounded-3xl bg-orange-normal px-4 py-2 text-base  font-bold text-white"
                onClick={handleResetFilters}
              >
                Reset filters
              </button>
            </div>
          </div>

          {/* Search form */}
          <div
            className={`flex justify-between gap-4 py-4 max-md:flex-col md:gap-8  lg:items-center   ${isFiltering ? "lg:order-1" : ""} `}
          >
            <div className="">
              <h1 className="text-xl font-bold text-violet-dark md:text-3xl">
                Get a Specialist Directly
              </h1>
              <p className="text-base font-[400] text-violet-darkHover md:text-lg">
                Browse through our various services
              </p>
            </div>

            <form
              onSubmit={(event) => handleSubmit(event)}
              className="flex w-full items-center gap-2  lg:max-w-sm"
            >
              <div className="w-full">
                <input
                  type="text"
                  value={searchInputData}
                  onChange={(event) => setSearchInputData(event.target.value)}
                  className="w-full rounded-xl border border-violet-normal px-4 py-3   text-lg text-slate-500 shadow  placeholder-shown:border-slate-300 placeholder-shown:outline-none focus:outline-none "
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
