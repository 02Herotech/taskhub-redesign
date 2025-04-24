"use client";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/services/listings";
import MarketPlaceFilter from "../MarketPlaceFilter";
import { useSearchParams } from "next/navigation";
import {
  useGetServicesByFiltersQuery,
  useGetAllServicesQuery,
} from "@/services/listings";
import Category from "../Category";

const initialFilterData = {
  category: "",
  location: "",
  typeOfService: "",
  typeOfServiceDisplay: "",
  minPrice: 5,
  maxPrice: 1000,
};

function Page() {
  const searchParams = useSearchParams();
  let category = searchParams.get("selected");

  if (!category) category = "All";

  const [filterData, setFilterData] =
    useState<FilterDataStructure>(initialFilterData);

  const resetFilters = () => setFilterData(initialFilterData);

  const { data: categories } = useGetCategoriesQuery();
  const isAllCategory = category === "All";
  const [page, setPage] = useState(0);

  const {
    data: allServices,
    isLoading: isLoadingAllServices,
    error: allServicesError,
  } = useGetAllServicesQuery(
    { pageNumber: page, size: 12 },
    { skip: category !== "All" },
  );

  const { location, typeOfService } = filterData;

  const {
    data: filteredServices,
    isLoading,
    error: filteredServicesError,
  } = useGetServicesByFiltersQuery(
    { pageNumber: page, size: 12, category, location, typeOfService },
    { skip: category === "All" },
  );

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col px-6 pt-10 md:px-16">
      <MarketPlaceFilter
        filterDataStructure={filterData}
        setFilterDataStructure={setFilterData}
        resetFilters={resetFilters}
        categories={categories}
      />

      <Category
        setPage={setPage}
        category={category}
        isLoading={isAllCategory ? isLoadingAllServices : isLoading}
        error={isAllCategory ? allServicesError : filteredServicesError}
        data={isAllCategory ? allServices : filteredServices}
      />
    </div>
  );
}

export default Page;
