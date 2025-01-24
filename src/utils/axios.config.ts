import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

const instance = axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  const accessToken = session.user.accessToken;
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});

instance.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError<{ error: string; message: string }>) => {
    if (error.response?.status == 401) {
      console.log("Server session expired");
    }
    console.log("Error from interceptor: ", error.response?.data);
  },
);

export default instance;
