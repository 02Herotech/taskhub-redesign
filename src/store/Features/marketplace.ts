"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MarketSliceTypes {
  currentFilterStatus: {
    category: string;
    subCategory: string;
    location: string;
    pricing: number;
  };
  categories: CategoryType[];
  listing: ListingDataType[];
}

const initialState: MarketSliceTypes = {
  currentFilterStatus: {
    category: "",
    subCategory: "",
    location: "",
    pricing: 0,
  },
  categories: [],
  listing: [],
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    updateFilterStatus: (state, action) => {
      const { title, value } = action.payload;
      return {
        ...state,
        currentFilterStatus: { ...state.currentFilterStatus, [title]: value },
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
