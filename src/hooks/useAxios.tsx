import axios from "axios";
import { useDispatch } from "react-redux";
import { getSession, signOut } from "next-auth/react";
import { useEffect } from "react";

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
      //Attach header to request and test if result comes back successfully
      console.log("Session in axios' re-usable hook interceptor", session);
      return request;
    });

    authInstance.interceptors.response.use(
      async (response) => response,
      async (error) => {
        return Promise.reject(error);
      },
    );
  }, []);

  return authInstance;
}

export default useAxios;
