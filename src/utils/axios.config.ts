import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default instance;
