"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MarketSliceTypes {
  categories: CategoryType[];
  listing: ListingDataType[];
  isFiltering: boolean;
  filteredData: ListingDataType[];
  isFilteringLoading: boolean;
}

const initialState: MarketSliceTypes = {
  categories: [],
  listing: [],
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
    updateListingArray: (state, action) => {
      const listing = action.payload;
      return { ...state, listing };
    },
    resetFilter: (state, action) => {
      return {
        ...state,
        isFiltering: false,
        search: { isSearching: false, searchData: "" },
        filteredData: [],
      };
    },
    updateSearchListing: (state, action) => {
      const searchData = action.payload;
      return {
        ...state,
        // search: { isSearching: true, searchData }
      };
    },
  },
});

export const {
  updateCategories,
  updateListingArray,
  resetFilter,
  updateSearchListing,
  filterMarketPlace,
  setFilterLoadingState,
} = marketSlice.actions;

export default marketSlice.reducer;
