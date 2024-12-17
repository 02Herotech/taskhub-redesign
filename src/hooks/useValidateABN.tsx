import { useState, useEffect, SetStateAction } from "react";
import axios from "axios";

type Props = {
  watchABN: string | null | undefined;
  token: string | undefined;
  userDetails: any;
  setErr: (value: SetStateAction<string>) => void;
};

function useValidateABN(
  watchABN: string | null | undefined,
  token: string | undefined,
  userDetails: DefaultUserDetailsType,
  setErr: (value: SetStateAction<string>) => void,
) {
  const [isValidABN, setIsValidABN] = useState<boolean>(false);

  useEffect(() => {
    const validateABN = async () => {
      if (!token) return;
      if (userDetails.abn) {
        setIsValidABN(true);
        return;
      }
      if (watchABN) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/service_provider/abn/validate/${watchABN}`;
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          if (response.data) {
            setIsValidABN(true);
          }
        } catch (error: any) {
          console.error("Error validating ABN: ", error);
          const status: "BAD_REQUEST" | "CONFLICT" = error.response.data.status;
          setIsValidABN(false);
          if (status == "BAD_REQUEST") {
            return setErr("Please enter a valid 11-digit ABN.");
          }
          if (status == "CONFLICT") {
            return setErr("ABN number is already in use");
          }
          setErr("Error occured while validating ABN");
        }
      } else {
        setIsValidABN(false);
      }
    };
    const debounceValidation = setTimeout(() => {
      validateABN();
    }, 500);

    return () => clearTimeout(debounceValidation);
  }, [watchABN, token, userDetails]);

  return isValidABN;
}

export default useValidateABN;
