import { CountryResponse } from "@/types/country";
import { axiosClient } from ".";

export const getCountry = (params?: object) => {
  return axiosClient.get<CountryResponse[]>("/country/filterCountry", {
    params,
  });
};

export const getIndustry = (params?: object) => {
  return axiosClient.get("/industry", {
    params,
  });
};

export const getCity = (params?: object) => {
  return axiosClient.get("/country/province", {
    params,
  });
};

export const getPosition = (params?: object) => {
  return axiosClient.get("/position/filter", {
    params,
  });
};

export const getLanguage = (params?: object) => {
  return axiosClient.get("/language", {
    params,
  });
};

export const getSchool = (params?: object) => {
  return axiosClient.get("/school/filter", {
    params,
  });
};

export const getMajor = (params?: object) => {
  return axiosClient.get("/school/major/filter", {
    params,
  });
};

export const getSkill = (params?: object) => {
  return axiosClient.get("/technical/getall", {
    params,
  });
};

export const getCompanySelect = (params?: object) => {
  return axiosClient.get("/company/filter", {
    params,
  });
};
