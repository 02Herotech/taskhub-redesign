import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";

type Props = {
  watchABN: string | null | undefined;
  token: string | undefined;
  userDetails: any;
  setErr: (value: SetStateAction<string>) => void;
};

function useValidateTFN(
  watchABN: string | null | undefined,
  token: string | undefined,
  userDetails: DefaultUserDetailsType,
  setErr: (value: SetStateAction<string>) => void,
) {
  const [isValidTFN, setIsValidTFN] = useState<boolean>(false);

  useEffect(() => {
    const validateTFN = async () => {
      if (!token) return;
      if (userDetails.abn) {
        setIsValidTFN(true);
        return;
      }
      if (watchABN) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/service_provider/validate-tfn/${watchABN}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.data) {
            setIsValidTFN(true);
          }
        } catch (error: any) {
          console.error("Error validating TFN: ", error);
          const status: "BAD_REQUEST" | "CONFLICT" = error.response.data.status;
          setIsValidTFN(false);
          if (status == "BAD_REQUEST") {
            return setErr("Please enter a valid 9-digit TFN.");
          }
          if (status == "CONFLICT") {
            return setErr("TFN number is already in use");
          }
          setErr("Error occured while validating TFN");
        }
      } else {
        setIsValidTFN(false);
      }
    };
    const debounceValidation = setTimeout(() => {
      validateTFN();
    }, 500);

    return () => clearTimeout(debounceValidation);
  }, [watchABN, token, userDetails]);

  return isValidTFN;
}

export default useValidateTFN;
