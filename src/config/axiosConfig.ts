import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337",
  // timeout: 1000,
});

export default axiosInstance;
