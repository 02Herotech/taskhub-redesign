"use client";
import {
  useGetServicesByFiltersQuery,
  useGetAllServicesQuery,
} from "@/services/listings";
import Category from "./Category";

type Props = { category: string };

function CategoryData({ category }: Props) {
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

  const isAllCategory = category === "All";
  return (
    <Category
      category={category}
      isLoading={isAllCategory ? isFetchingAllServices : isLoading}
      error={isAllCategory ? allServicesError : filteredServicesError}
      data={isAllCategory ? allServices : filteredServices}
    />
  );
}

export default CategoryData;
