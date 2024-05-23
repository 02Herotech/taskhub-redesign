"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MarketSliceTypes {
  currentFilterStatus: {
    category: string;
    subCategory: string;
    location: string;
    pricing: { minPrice: number; maxPrice: number };
    search: string;
  };
  categories: CategoryType[];
  listing: ListingDataType2[];
  isFiltering: boolean;
  filteredData: ListingDataType2[];
}

const initialState: MarketSliceTypes = {
  currentFilterStatus: {
    category: "",
    subCategory: "",
    location: "",
    pricing: { minPrice: 5, maxPrice: 1000 },
    search: "",
  },
  categories: [],
  listing: [],
  isFiltering: false,
  filteredData: [],
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    updateFilterStatus: (state, action) => {
      const { title, value } = action.payload;
      return {
        ...state,
        currentFilterStatus: {
          ...state.currentFilterStatus,
          [title]: value,
        },
        isFiltering: true,
      };
    },
    updateCategories: (state, action) => {
      const categories = action.payload;
      return { ...state, categories };
    },
    updateListingArray: (state, action) => {
      const listing = action.payload;
      return { ...state, listing };
    },
    updateFilterData: (state, action) => {
      const { data, section, value } = action.payload;
      const prevFilter = state.filteredData || [];
      let newFilter = [];

      if (!prevFilter.length) {
        return { ...state, filteredData: data };
      }
      switch (section) {
        case "category":
          newFilter = prevFilter.filter(
            (item) => item.category.categoryName === value,
          );
          break;
        case "subCategory":
          newFilter = prevFilter.filter(
            (item) => item.subCategory.name === value,
          );
          break;
        case "location":
          newFilter = prevFilter.filter(
            (item) => item.suburb === value || item.state === value,
          );
          break;
        // case "price":
        //   newFilter = prevFilter.filter(
        //     (item) =>
        //       item.price >= value.minPrice && item.price <= value.maxPrice,
        //   );
        //   break;
        default:
          newFilter = prevFilter;
          break;
      }
      return { ...state, filteredData: newFilter };
    },
  },
});

export const {
  updateFilterStatus,
  updateCategories,
  updateListingArray,
  updateFilterData,
} = marketSlice.actions;

export default marketSlice.reducer;
