import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**Re-usable hook that returns authenticated axios instance */
function useAxios() {
  return instance;
}

export default useAxios;
