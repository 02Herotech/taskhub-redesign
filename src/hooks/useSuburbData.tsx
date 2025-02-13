import axios from "axios";
import { useEffect, useState } from "react";

type SurburbInfo = {
  name: string;
  postcode: number;
  state: {
    name: string;
    abbreviation: string;
  };
  locality: string;
  latitude: number;
  longitude: number;
};

function useSuburbData(searchValue: string) {
  const [suburbList, setSuburbList] = useState<SurburbInfo[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuburbData = async () => {
      if (searchValue.length < 2) return;
      try {
        if (suburbList.length < 1) setIsLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const { data } = await axios.get<SurburbInfo[]>(
          baseUrl + "/util/locations/search?postcode=" + searchValue,
        );
        setIsLoading(false);
        setSuburbList(data);
        setError("");
      } catch (error) {
        console.error("Suburb list fetch error: ", error);
        setIsLoading(false);
        setError("Error occured while fetching data");
        setSuburbList([]);
      }
    };

    const debounceFetchSuburb = setTimeout(() => {
      fetchSuburbData();
    }, 500);

    return () => clearTimeout(debounceFetchSuburb);
  }, [searchValue]);

  return { suburbList, error, isLoading };
}

export default useSuburbData;
