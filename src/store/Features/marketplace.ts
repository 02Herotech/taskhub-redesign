"use client";

import { createSlice } from "@reduxjs/toolkit";

interface MarketSliceTypes {
  currentFilterStatus: {
    category: string;
    subCategory: SubCategoryType;
    location: string;
    pricing: { minPrice: number; maxPrice: number };
    type: string;
    others: string;
  };
  search: {
    isSearching: boolean;
    searchData: string;
  };
  categories: CategoryType[];
  listing: ListingDataType[];
  isFiltering: boolean;
  filteredData: ListingDataType[];
  isFilteringLoading: boolean;
}

const initialState: MarketSliceTypes = {
  currentFilterStatus: {
    category: "",
    subCategory: { id: 0, name: "" },
    location: "",
    pricing: { minPrice: 5, maxPrice: 1000 },
    type: "",
    others: "",
  },
  search: {
    isSearching: false,
    searchData: "",
  },
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
      if (section === "search") {
        return {
          ...state,
          search: { isSearching: true, searchData: value },
          filteredData: data,
          isFiltering: true,
        };
      }
      if (section === "category") {
        return {
          ...state,
          filteredData: data,
        };
      }
      let prevFilter = state.filteredData || [];
      let newFilter = [];
      if (!prevFilter.length) {
        return { ...state, filteredData: data };
      }
      switch (section) {
        case "category":
          newFilter = data;
          break;
        case "subCategory":
          if (data.length > 0) {
            newFilter = prevFilter.filter(
              (item, index) =>
                item.subCategory.name === data[index].subCategory.name,
            );
            break;
          }
          newFilter = [];
          break;
        case "location":
          newFilter = prevFilter.filter(
            (item) => item.suburb === value || item.state === value,
          );
          break;
        case "price":
          if (value) {
            newFilter = prevFilter.filter(
              (item) =>
                item.planOnePrice >= value.minPrice &&
                item.planOnePrice <= value.maxPrice,
            );
          }
          break;
        case "available":
          if (value === "available") {
            prevFilter = state.listing;
            break;
          }
          prevFilter = [];
          break;
        default:
          newFilter = prevFilter;
          break;
      }
      return { ...state, isFiltering: true, filteredData: newFilter };
    },
    resetFilter: (state, action) => {
      return {
        ...state,
        isFiltering: false,
        search: { isSearching: false, searchData: "" },
        filteredData: [],
        currentFilterStatus: {
          category: "",
          subCategory: { id: 0, name: "" },
          location: "",
          pricing: { minPrice: 5, maxPrice: 1000 },
          type: "",
          others: "",
        },
      };
    },
    tempUpdateFilterData: (state, action) => {
      const { section, value } = action.payload;
      const prevFilter = state.listing;
      let newFilter = [];
      // if (!prevFilter.length) {
      //   return { ...state, filteredData: listing };
      // }
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
        case "type":
          newFilter = prevFilter.filter((item) => item.taskType === value);
          break;
        case "pricing":
          newFilter = prevFilter.filter((item) => {
            if (item.planOnePrice) {
              return (
                item.planOnePrice >= value.minPrice &&
                item.planOnePrice <= value.maxPrice
              );
            }
            return;
          });
          break;
        default:
          newFilter = prevFilter;
          break;
      }
      return { ...state, filteredData: newFilter };
    },
    updateSearchListing: (state, action) => {
      const searchData = action.payload;
      return { ...state, search: { isSearching: true, searchData } };
    },
  },
});

export const {
  updateFilterStatus,
  updateCategories,
  updateListingArray,
  updateFilterData,
  resetFilter,
  tempUpdateFilterData,
  updateSearchListing,
} = marketSlice.actions;

export default marketSlice.reducer;
