"use client";

import { Task } from "@/types/services/tasks";
import { createSlice } from "@reduxjs/toolkit";

interface ExploreSliceTypes {
    categories: CategoryType[];
    isFiltering: boolean;
    filteredData: Task[];
    isFilteringLoading: boolean;
    totalPages: number;
    filterParams: string;
    filterCurrentPage: number;
}

const initialState: ExploreSliceTypes = {
    categories: [],
    isFiltering: false,
    filteredData: [],
    isFilteringLoading: false,
    totalPages: 0,
    filterParams: "",
    filterCurrentPage: 0,
};

export const exploreSlice = createSlice({
    name: "explore",
    initialState,
    reducers: {
        updateCategories: (state, action) => {
            const categories = action.payload;
            return { ...state, categories };
        },
        // working
        filterExploreTasks: (state, action) => {
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
    filterExploreTasks,
    setFilterLoadingState,
    setFilterCurrentPage,
    setFilterParams,
} = exploreSlice.actions;

export default exploreSlice.reducer;
