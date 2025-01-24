import axios, { AxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";
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
      await signOut();
      redirect("/home");
    }
  },
);

export default instance;
