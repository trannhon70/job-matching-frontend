import { globalVariable } from "@/config/variables";
import { getCookie } from "@/utils/cookie";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: globalVariable.API_URL,
});

export const axiosAuth = axios.create({
  baseURL: globalVariable.API_URL,
});

export const authAxios = axios.create({
  baseURL: globalVariable.API_URL,
});

authAxios.interceptors.request.use(function (config) {
  const accessToken = getCookie("token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
