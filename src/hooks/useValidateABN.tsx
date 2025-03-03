import { useState, useEffect, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

type Props = {
  watchABN: string | null | undefined;
  token: string | undefined;
  userDetails: any;
  setErr: (value: SetStateAction<string>) => void;
};

function useValidateABN(
  watchABN: string | null | undefined,
  userDetails: DefaultUserDetailsType,
) {
  const [isValidABN, setIsValidABN] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const session = useSession();
  const token = session?.data?.user.accessToken;

  useEffect(() => {
    const validateABN = async () => {
      if (!token) return;
      if (userDetails.abn) {
        setIsValidABN(true);
        return;
      }
      if (watchABN) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/service_provider/validate-abn/${watchABN}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          if (response?.data) {
            setIsValidABN(true);
            setError("");
          }
        } catch (error: any) {
          console.error("Error validating ABN: ", error);
          const status: "BAD_REQUEST" | "CONFLICT" = error.response.data.status;
          setIsValidABN(false);
          if (status == "BAD_REQUEST") {
            return setError("Please enter a valid 11-digit ABN.");
          }
          if (status == "CONFLICT") {
            return setError("ABN number is already in use");
          }
          setError("Error occured while validating ABN");
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

  return { isValidABN, error };
}

export default useValidateABN;
