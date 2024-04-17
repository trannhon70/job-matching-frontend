import { FormatResponseJobList } from "@/types";
import {
  ApplyJobBody,
  JobType,
  SaveJobBody,
  UpdateOpenToWorkType,
} from "@/types/employee/job";
import {
  AddEducationBody,
  AddExpBody,
  AddSkillBody,
  CreateReviewCompanyBodyType,
  SendMessageEmployee,
  SendQuestionBody,
  UpdateUserInformationBody,
} from "@/types/employee/user";
import useAxiosAuth from "../common/useAxiosAuth";

const useEmployeeApi = () => {
  const axiosAuth = useAxiosAuth();

  const updateOpenToWork = (body: UpdateOpenToWorkType) => {
    return axiosAuth.put("/user/info/updateWork", body);
  };

  const saveJob = (body: SaveJobBody) => {
    return axiosAuth.post("/job/subject", body);
  };

  const applyJob = (body: ApplyJobBody) => {
    return axiosAuth.post("/job/apply", body);
  };

  const getJobByCompany = (id: number, params?: object) => {
    return axiosAuth.get<FormatResponseJobList<JobType[]>>(
      `job/getJobByCompany/${id}/listJob`,
      { params },
    );
  };

  const updatePersonalInformation = (body: UpdateUserInformationBody) => {
    return axiosAuth.patch(`/user/info`, body);
  };

  const addEducation = (body: AddEducationBody) => {
    return axiosAuth.post(`/user/info/education`, body);
  };

  const updateEducation = (id: number, body: AddEducationBody) => {
    return axiosAuth.patch(`/user/info/education/${id}`, body);
  };

  const deleteEducation = (id: number) => {
    return axiosAuth.delete(`/user/info/education/${id}`);
  };

  const addSkill = (body: AddSkillBody) => {
    return axiosAuth.post(`/user/skill`, body);
  };

  const updateSkill = (id: number, body: AddSkillBody) => {
    return axiosAuth.patch(`/user/skill/${id}`, body);
  };

  const deleteSkill = (id: number) => {
    return axiosAuth.delete(`/user/skill/${id}`);
  };

  const addCertificate = (body: FormData) => {
    return axiosAuth.post(`/user/info/certificate`, body);
  };

  const updateCertificate = (id: number, body: FormData) => {
    return axiosAuth.patch(`/user/info/certificate/${id}`, body);
  };

  const deleteCertificate = (id: number) => {
    return axiosAuth.delete(`/user/info/certificate/${id}`);
  };

  const addExp = (body: AddExpBody) => {
    return axiosAuth.post(`/user/exp`, body);
  };

  const updateExp = (id: number, body: AddExpBody) => {
    return axiosAuth.patch(`/user/exp/update/${id}`, body);
  };

  const deleteExp = (id: number) => {
    return axiosAuth.delete(`/user/exp/delete/${id}`);
  };

  const getUserProfileInformation = () => {
    return axiosAuth.get(`/user/getInfoUser`);
  };

  const getUserProfileEducation = () => {
    return axiosAuth.get(`/user/getEduOfUser`);
  };

  const getUserProfileSkills = () => {
    return axiosAuth.get(`/user/getSkillUser`);
  };

  const getUserProfileCertificate = () => {
    return axiosAuth.get(`/user/getCertificateUser`);
  };

  const getUserProfileExp = () => {
    return axiosAuth.get(`/user/getExpUser`);
  };

  const uploadAvatar = (body: FormData) => {
    return axiosAuth.put(`/user/uploadAvatar`, body);
  };

  const uploadResume = (body: FormData) => {
    return axiosAuth.put(`/user/uploadResume`, body);
  };

  const getUserProfileListApply = () => {
    return axiosAuth.get(`/job/apply/employee`);
  };

  const getUserProfileListSaved = () => {
    return axiosAuth.get(`/job/subject/filter`);
  };

  const getUserProfileListInterview = () => {
    return axiosAuth.get(`/job/filterInterview/employee`);
  };

  const sendQuestion = (body: SendQuestionBody) => {
    return axiosAuth.post(`/auth/question`, body);
  };

  const getQuestionsList = () => {
    return axiosAuth.get(`/user/getQuestion/employee`);
  };

  const sendCodeResetPassword = (body: { email: string }) => {
    return axiosAuth.post(`/auth/sendCodeResetPass`, body);
  };

  const resetPassword = (body: { password: string; code: string }) => {
    return axiosAuth.post(`/auth/reset-password`, body);
  };

  const getCountJobUserProfile = () => {
    return axiosAuth.get(`/user/getSubscription/employee`);
  };

  const getListApplyAndSave = () => {
    return axiosAuth.get(`/user/getListApplyAndSave/employee`);
  };

  const createReviewCompany = (body: CreateReviewCompanyBodyType) => {
    return axiosAuth.post(`/user/writingReview`, body);
  };
  const getConversationList = () => {
    return axiosAuth.get(`/job/chat/getConversation/employee`);
  };

  const getDetailConversation = (conversationId: string) => {
    return axiosAuth.get(`/job/chat/employee/${conversationId}`);
  };

  const sendMessageEmployee = (body: SendMessageEmployee) => {
    return axiosAuth.post(`/job/chat/chatEmployee`, body);
  };

  return {
    getListApplyAndSave,
    getDetailConversation,
    getConversationList,
    getJobByCompany,
    getCountJobUserProfile,
    getQuestionsList,
    getUserProfileListApply,
    getUserProfileListSaved,
    getUserProfileListInterview,
    getUserProfileInformation,
    getUserProfileExp,
    getUserProfileCertificate,
    getUserProfileSkills,
    getUserProfileEducation,
    addCertificate,
    addExp,
    addEducation,
    addSkill,
    applyJob,
    updateOpenToWork,
    updateCertificate,
    updateSkill,
    updateEducation,
    updateExp,
    updatePersonalInformation,
    deleteCertificate,
    deleteSkill,
    deleteExp,
    deleteEducation,
    saveJob,
    uploadAvatar,
    uploadResume,
    sendQuestion,
    sendCodeResetPassword,
    resetPassword,
    createReviewCompany,
    sendMessageEmployee,
  };
};

export default useEmployeeApi;
