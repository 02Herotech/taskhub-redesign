"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MarketSliceTypes {
  categories: CategoryType[];
  isFiltering: boolean;
  filteredData: ListingDataType[];
  isFilteringLoading: boolean;
}

const initialState: MarketSliceTypes = {
  categories: [],
  isFiltering: false,
  filteredData: [],
  isFilteringLoading: false,
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      const categories = action.payload;
      return { ...state, categories };
    },
    // working
    filterMarketPlace: (state, action) => {
      const data = action.payload;
      return { ...state, filteredData: data };
    },
    setFilterLoadingState: (state, action) => {
      const loading = action.payload;
      return {
        ...state,
        isFilteringLoading: loading,
        isFiltering: true,
      };
    },
    resetFilter: (state) => {
      return {
        ...state,
        isFiltering: false,
        search: { isSearching: false, searchData: "" },
        filteredData: [],
      };
    },
  },
});

export const {
  updateCategories,
  resetFilter,
  filterMarketPlace,
  setFilterLoadingState,
} = marketSlice.actions;

export default marketSlice.reducer;
