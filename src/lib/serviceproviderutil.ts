import axios from "axios";

export const fetchServiceProviderUserData = async (selectedCode: string) => {
  try {
    const fetchPostalCodeData = async () => {
      try {
        const response = await axios.get(
          `https://smp.jacinthsolutions.com.au/api/v1/util/locations/search?postcode=${selectedCode}`,
        );
        //  setPostalCodeData(response.data as PostalCodeData[]);
      } catch (error) {
        throw error;
        //  setPostalCodeData([]);
      }
    };
    //  if (selectedCode.length > 0) {
    //    fetchPostalCodeData();
    //  }
  } catch (error) {
    throw error;
  }
};
