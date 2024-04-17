import { LoginGoogleType, LoginType, RegisterEmployeeType } from "@/types";
import { axiosClient } from "./axios";

export const loginApi = (body: LoginType) => {
  return axiosClient.post("/auth/login", body);
};

export const employerLoginApi = (body: LoginType) => {
  return axiosClient.post("/auth/loginEmployer", body);
};

export const registerEmployeeApi = (body: RegisterEmployeeType) => {
  return axiosClient.post("/auth/register", body);
};

export const registerEmployerApi = (body: RegisterEmployeeType) => {
  return axiosClient.post("/auth/registerEmployer", body);
};

export const sendVerifyCodeApi = (body: { email: string }) => {
  return axiosClient.post("/auth/send-code", body);
};

export const employerSendVerifyCodeApi = (body: { email: string }) => {
  return axiosClient.post("/auth/send-mail-employer-register", body);
};

export const loginWithGoogle = (body: LoginGoogleType) => {
  return axiosClient.post("/auth/loginGoogle", body);
};
