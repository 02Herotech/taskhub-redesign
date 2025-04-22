"use client";
import { usePathname } from "next/navigation";
import { useGetCategoriesQuery } from "@/services/listings";
import MarketPlaceFilter from "../MarketPlaceFilter";
import { useSearchParams } from "next/navigation";
import {
  useGetServicesByFiltersQuery,
  useGetAllServicesQuery,
} from "@/services/listings";
import Category from "../Category";

function Page() {
  const isMarketPlacePage = usePathname() == "/marketplace_";
  const searchParams = useSearchParams();
  const category = searchParams.get("selected");
  const { data: categories } = useGetCategoriesQuery();
  const isAllCategory = category === "All";

  const {
    data: allServices,
    isLoading: isFetchingAllServices,
    error: allServicesError,
  } = useGetAllServicesQuery(
    { pageNumber: 0, size: 12 },
    { skip: category !== "All" },
  );

  const {
    data: filteredServices,
    isLoading,
    error: filteredServicesError,
  } = useGetServicesByFiltersQuery(
    { pageNumber: 0, size: 12, category },
    { skip: category === "All" },
  );
  return (
    <div
      className={`mx-auto flex max-w-screen-xl flex-col px-6 md:px-16 ${!isMarketPlacePage ? "pt-16 " : "lg:pt-32"}`}
    >
      <MarketPlaceFilter categories={categories} />

      <Category
        category={category}
        isLoading={isAllCategory ? isFetchingAllServices : isLoading}
        error={isAllCategory ? allServicesError : filteredServicesError}
        data={isAllCategory ? allServices : filteredServices}
      />
    </div>
  );
}

export default Page;
