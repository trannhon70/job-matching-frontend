import { FormatResponseJobList } from "@/types";
import { JobType } from "@/types/employee/job";
import { axiosClient } from ".";

export const getJobsList = (params?: object) => {
  return axiosClient.get<FormatResponseJobList<JobType[]>>(
    "/job/filter/employee",
    {
      params,
    },
  );
};

export const getDetailJobBySlug = (slug: string) => {
  return axiosClient.get(`/job/getDetail/${slug}`);
};

export const getEmployeeProfileById = (id: string) => {
  return axiosClient.get(`/user/getAllInfo/${id}`);
};
