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
          isFiltering: true,
        },
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
  },
});

export const { updateFilterStatus, updateCategories, updateListingArray } =
  marketSlice.actions;

export default marketSlice.reducer;
