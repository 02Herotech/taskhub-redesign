"use client";

import {
  updateFilterData,
  updateFilterStatus,
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
    dispatch(updateFilterStatus({ title: "category", value: category }));

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

  return (
    <button
      onClick={handleFilterByCategory}
      className="flex flex-col gap-3 rounded-lg bg-[#E58C06] px-4 py-2 text-white shadow-md  transition-colors duration-300 hover:bg-orange-400 md:px-8 md:py-4"
    >
      <Icon size={15} className="size-4 lg:size-6" />
      <p className="text-[13px] font-bold md:text-[18px]">{category}</p>
    </button>
  );
};

export default BoxFilter;
