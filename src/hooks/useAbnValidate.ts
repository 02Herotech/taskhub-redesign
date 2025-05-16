import { useState, useEffect } from "react";
import axios from "axios";

type Props = {
  /**ABN Input */
  abnInput: string | null | undefined;

  /**Function to set ABN error from react hook form */
  setAbnError: (error: string) => void;
};

function useAbnValidate({ abnInput, setAbnError }: Props) {
  const [isValidABN, setIsValidABN] = useState<boolean>(false);

  useEffect(() => {
    const validateABN = async () => {
      if (abnInput) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/validate-abn/${abnInput}`;
          const response = await axios.get(url);
          if (response?.data) {
            setIsValidABN(true);
            setAbnError("");
          }
        } catch (error: any) {
          console.error("Error validating ABN: ", error);
          const status: "BAD_REQUEST" | "CONFLICT" =
            error.response?.data.status;
          setIsValidABN(false);
          if (status == "BAD_REQUEST") {
            return setAbnError("Please enter a valid 11-digit ABN.");
          }
          if (status == "CONFLICT") {
            return setAbnError("ABN number is already in use");
          }
          setAbnError("Error occured while validating ABN");
        }
      } else {
        setIsValidABN(false);
        setAbnError("");
      }
    };
    const debounceValidation = setTimeout(() => {
      validateABN();
    }, 500);

    return () => clearTimeout(debounceValidation);
  }, [abnInput]);

  return isValidABN;
}

export default useAbnValidate;
