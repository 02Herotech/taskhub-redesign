import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { setAuthStatus } from "@/store/Features/authStatus";
import { RootState } from "@/store";

const authInstance = axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**Re-usable hook that returns authenticated axios instance */
function useAxios() {
  const timeoutPopup = useSelector((state: RootState) => state.timeoutPopup);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestInterceptor = authInstance.interceptors.request.use(
      async (request) => {
        const session = await getSession();
        if (!session) {
          dispatch(setAuthStatus(true));
          throw new Error("No session available");
        }
        const accessToken = session.user.accessToken;
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        return request;
      },
    );

    const responseInterceptor = authInstance.interceptors.response.use(
      async (response) => response,
      async (error: AxiosError<{ error: string; message: string }>) => {
        if (error.response?.status == 401) {
          dispatch(setAuthStatus(true));
        }
        return Promise.reject(error);
      },
    );

    return () => {
      authInstance.interceptors.request.eject(requestInterceptor);
      authInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [timeoutPopup]);

  return authInstance;
}

export default useAxios;
