import axios from "axios";
// import { getServerSession, get } from "next-auth";
import { getSession } from "next-auth/react";

const instance = axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use(async (request) => {
  const session = await getSession();
  console.log("Session from interceptor: ", session);
  return request;
});

instance.interceptors.response.use(async (response) => {
  return response;
});

export default instance;
