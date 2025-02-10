import { AxiosError, AxiosInstance } from "axios";
import instance from "./axios.config";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

/**Authenticated instance of axios interceptor with logout function when session doesn't exists or token expire*/
let authInstance: AxiosInstance = instance;

instance.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  const accessToken = session?.user.accessToken;
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

instance.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError<{ error: string; message: string }>) => {
    if (error.response?.status == 401) {
      await signOut();
      redirect("/home");
    }
    Promise.reject(error);
  },
);

export { instance };
