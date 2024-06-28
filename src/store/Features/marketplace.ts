"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MarketSliceTypes {
  categories: CategoryType[];
  isFiltering: boolean;
  filteredData: ListingDataType[];
  isFilteringLoading: boolean;
  totalPages: number;
  filterParams: string;
  filterCurrentPage: number;
}

const initialState: MarketSliceTypes = {
  categories: [],
  isFiltering: false,
  filteredData: [],
  isFilteringLoading: false,
  totalPages: 0,
  filterParams: "",
  filterCurrentPage: 0,
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
      const { data, totalPages } = action.payload;
      return { ...state, filteredData: data, totalPages };
    },
    setFilterLoadingState: (state, action) => {
      const loading = action.payload;
      return {
        ...state,
        isFilteringLoading: loading,
        isFiltering: true,
      };
    },
    setFilterParams: (state, action) => {
      return { ...state, filterParams: action.payload };
    },
    setFilterCurrentPage: (state, action) => {
      return { ...state, filterCurrentPage: action.payload };
    },
    resetFilter: (state) => {
      const categories = state.categories;
      return {
        ...initialState,
        categories,
      };
    },
  },
});

export const {
  updateCategories,
  resetFilter,
  filterMarketPlace,
  setFilterLoadingState,
  setFilterCurrentPage,
  setFilterParams,
} = marketSlice.actions;

export default marketSlice.reducer;
