import axios from "axios";

export const fetchAllMarketplaseCategories = async () => {
  try {
    const url =
      "https://api.oloja.com.au/api/v1/util/all-categories";
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
      "https://api.oloja.com.au/api/v1/util/all-sub-categories-by-categoryId/" +
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
        "https://api.oloja.com.au/api/v1/listing/all-active-listings/" +
        page;
    } else {
      url =
        "https://api.oloja.com.au/api/v1/listing/listing-by-category/" +
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
