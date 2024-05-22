import axios from "axios";

export const fetchListingById = async (id: string, token: string) => {
  try {
    // const url = process.env.NEXTAUTH_URL + "/api/v1/listing/by-id/" + id;
    const url = "https://smp.jacinthsolutions.com.au/api/v1/listing/1";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};