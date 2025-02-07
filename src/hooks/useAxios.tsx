import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { removeUserProfile } from "@/store/Features/userProfile";
import { setAuthStatus } from "@/store/Features/authStatus";

const authInstance = axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**Re-usable hook that returns authenticated axios instance */
function useAxios() {
  const dispatch = useDispatch();
  useEffect(() => {
    authInstance.interceptors.request.use(async (request) => {
      const session = await getSession();
      if (!session) {
        dispatch(removeUserProfile());
        dispatch(setAuthStatus(true));
        return Promise.reject({ message: "No session available" });
      }
      const accessToken = session.user.accessToken;
      request.headers["Authorization"] = `Bearer ${accessToken}`;
      return request;
    });

    authInstance.interceptors.response.use(
      async (response) => response,
      async (error: AxiosError<{ error: string; message: string }>) => {
        if (error.response?.status == 401) {
          dispatch(removeUserProfile());
          dispatch(setAuthStatus(true));
        }
        return Promise.reject(error);
      },
    );
  }, []);

  return authInstance;
}

export default useAxios;
