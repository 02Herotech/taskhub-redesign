import { useState, useEffect, SetStateAction } from "react";
import { instance as authInstance } from "@/utils/axiosInterceptor.config";

type Props = {
  watchABN: string | null | undefined;
  token: string | undefined;
  userDetails: any;
  setErr: (value: SetStateAction<string>) => void;
};

function useValidateTFN(
  watchABN: string | null | undefined,
  userDetails: DefaultUserDetailsType,
  setErr: (value: SetStateAction<string>) => void,
) {
  const [isValidTFN, setIsValidTFN] = useState<boolean>(false);

  useEffect(() => {
    const validateTFN = async () => {
      if (userDetails.tfn) {
        setIsValidTFN(true);
        return;
      }
      if (watchABN) {
        try {
          const url = `service_provider/validate-tfn/${watchABN}`;
          const response = await authInstance.get(url);
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
  }, [watchABN, userDetails]);

  return isValidTFN;
}

export default useValidateTFN;
