import { useEffect, useState } from "react";
import axios from "axios";

export type SurburbInfo = {
  name: string;
  postcode: number;
  state: {
    name: string;
    abbreviation: string;
  };
  locality: string | null;
  latitude: number;
  longitude: number;
};

function useSuburbData(searchValue: string, currentSuburb: SurburbInfo | null) {
  const [suburbList, setSuburbList] = useState<SurburbInfo[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuburbData = async () => {
      if (!searchValue || searchValue?.trim().length < 1 || currentSuburb) {
        setError("");
        setSuburbList([]);
        setIsLoading(false);
        return;
      }
      try {
        if (suburbList.length < 1) setIsLoading(true);
        const { data } = await axios.get<SurburbInfo[]>(
          process.env.NEXT_PUBLIC_API_URL +
            "/util/locations?suburb=" +
            searchValue,
        );
        setIsLoading(false);
        setSuburbList(data);
        setError("");
      } catch (error) {
        console.error("Suburb list fetch error: ", error);
        setIsLoading(false);
        if (searchValue) {
          setError("Error occured while fetching data");
        }
        setSuburbList([]);
      }
    };

    const debounceFetchSuburb = setTimeout(() => {
      fetchSuburbData();
    }, 500);

    return () => clearTimeout(debounceFetchSuburb);
  }, [searchValue]);

  // const Suburbs = () => <div></div>;

  return { suburbList, setSuburbList, error, isLoading };
}

export default useSuburbData;
