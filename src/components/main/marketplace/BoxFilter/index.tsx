"use client";

import {
  filterMarketPlace,
  setFilterLoadingState,
  setFilterParams,
} from "@/store/Features/marketplace";
import axios from "axios";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";

interface BoxFilterProper {
  category: string;
  id: number;
  Icon: IconType;
}

const BoxFilter: React.FC<BoxFilterProper> = ({ category, Icon, id }) => {
  const dispatch = useDispatch();

  const handleFilterByCategory = async () => {
    dispatch(setFilterLoadingState(true));
    try {
      const url =
        `${process.env.NEXT_PUBLIC_API_URL}/listing/filter-listings/0?category=` +
        category;
      const { data } = await axios.get(url);
      dispatch(
        filterMarketPlace({ data: data.content, totalPages: data.totalPages }),
      );
      dispatch(setFilterParams(`?category=${category}`));
    } catch (error: any) {
      console.log(error.response.message || error);
    } finally {
      dispatch(setFilterLoadingState(false));
    }
  };

  return (
    <div
      onClick={handleFilterByCategory}
      className="flex flex-col gap-3 rounded-lg bg-[#E58C06] px-4 py-2 text-white shadow-md  transition-colors duration-300 hover:bg-orange-400 md:px-8 md:py-4"
    >
      <Icon size={15} className="size-4 lg:size-6" />
      <p className="text-left text-[13px] font-bold md:text-[18px]">
        {category}
      </p>
    </div>
  );
};

export default BoxFilter;
