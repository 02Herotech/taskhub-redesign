import axios from "axios";

export const fetchAllMarketplaseCategories = async () => {
  try {
    const url =
      `${process.env.NEXT_PUBLIC_API_URL}/util/all-categories`;
    const response = await axios.get(url);
    const data: CategoryType[] = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchMarketplaceSubCategoryById = async (id: number) => {
  try {
    const url =
      `${process.env.NEXT_PUBLIC_API_URL}/util/all-sub-categories-by-categoryId/` +
      id;
    const response = await axios.get(url);
    const data: SubCategoryType[] = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async (
  category: string | number,
  page: number,
) => {
  try {
    let url;
    if (category === "All") {
      url =
        `${process.env.NEXT_PUBLIC_API_URL}/listing/all-active-listings/` +
        page;
    } else {
      url =
        `${process.env.NEXT_PUBLIC_API_URL}/listing/listing-by-category/` +
        category +
        "?pageNumber= " +
        page;
    }
    const { data } = await axios.get(url);
    return data.content;
  } catch (error) {
    throw error;
  }
};
