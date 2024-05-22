import axios from "axios";

export const fetchAllMarketplaseCategories = async () => {
  try {
    const url =
      "https://smp.jacinthsolutions.com.au/api/v1/util/all-categories";
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
      "https://smp.jacinthsolutions.com.au/api/v1/util/all-sub-categories-by-categoryId/" +
      id;
    const response = await axios.get(url);
    const data: SubCategoryType[] = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};
