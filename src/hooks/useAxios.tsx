import React from "react";
import axios from "axios";

const instance = axios.create({
  timeout: 20000,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**Re-usable authenticated instance for axios */
function useAxios() {
  return <div>useAxios</div>;
}

export default useAxios;
