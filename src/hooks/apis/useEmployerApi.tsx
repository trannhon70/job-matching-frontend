import {
  CreateInterviewBodyType,
  CreateJobPostingType,
  CreateNoteBody,
  InviteEmployerType,
  SendMessageType,
  UpdateEmployerStatusType,
  UpdateJobPostingStatusType,
  UpdateMasterType,
} from "@/types/employer/setting";
import { format } from "date-fns";
import useAxiosAuth from "../common/useAxiosAuth";

const useEmployerApi = () => {
  const axiosAuth = useAxiosAuth();

  const getCompanyControlEmployer = () => {
    return axiosAuth.get("/employer/filter");
  };

  const getCompanyEmployerInformation = () => {
    return axiosAuth.get("/employer/getCompanyEmployer");
  };

  const getInterviewList = (params?: object) => {
    return axiosAuth.get("/job/filterInterview", { params });
  };

  const getApplicant = (params?: object) => {
    return axiosAuth.get("/job/apply/filter/employer", { params });
  };

  const getJobPosting = (params?: object) => {
    return axiosAuth.get("/job/filter", { params });
  };

  const getDetailJobBySlug = (slug: string) => {
    return axiosAuth.get(`/job/getDetail/${slug}`);
  };

  const getStatisticDetailJob = (params?: object) => {
    return axiosAuth.get(`/job/employer/filterStatis`, { params });
  };

  const createJobPosting = (body: CreateJobPostingType) => {
    return axiosAuth.post("/job/create", body);
  };

  const updateMasterApprovalRequest = (body: FormData) => {
    return axiosAuth.patch("/employer/updateCompanyOfMaster", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const updateMaster = (body: UpdateMasterType) => {
    return axiosAuth.patch("/employer/updateMaster", body);
  };

  const updateInviteEmployer = (id: number, body: { level: number[] }) => {
    return axiosAuth.patch(`/employer/updateEmployer/${id}`, body);
  };

  const updateJobPostingStatus = (body: UpdateJobPostingStatusType) => {
    return axiosAuth.put(`/job/updateStatus`, body);
  };

  const updateEmployerStatus = (
    userId: number,
    body: UpdateEmployerStatusType,
  ) => {
    return axiosAuth.put(`/employer/status/${userId}`, body);
  };

  const updateJobPosting = (jobId: number, body: CreateJobPostingType) => {
    return axiosAuth.patch(`/job/update/${jobId}`, body);
  };

  const updateCompanyInformation = (body: FormData) => {
    return axiosAuth.patch("/company/update", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const inviteEmployer = (body: InviteEmployerType) => {
    return axiosAuth.post("/employer/invite", body);
  };

  const createInterview = (body: CreateInterviewBodyType) => {
    return axiosAuth.post("/job/createInterview", body);
  };

  const getListNoteByApplicant = (id: string) => {
    return axiosAuth.get(`/job/apply/getNote/${id}`);
  };

  const createNote = (body: CreateNoteBody) => {
    return axiosAuth.post(`/job/apply/createNoteApply`, body);
  };

  const updateNote = (id: string, body: CreateNoteBody) => {
    return axiosAuth.patch(`/job/apply/updateNoteApply/${id}`, body);
  };

  const updateApplicantStatus = (id: string, body: { status: string }) => {
    return axiosAuth.patch(`/job/apply/updateStatusApply/${id}`, body);
  };

  const updateInterview = (id: number, body: CreateInterviewBodyType) => {
    return axiosAuth.patch(`/job/updateInterview/${id}`, body);
  };

  const getConversationList = () => {
    return axiosAuth.get(`job/chat/getConversation/employer`);
  };

  const getDetailConversation = (conversationId: string) => {
    return axiosAuth.get(`job/chat/${conversationId}`);
  };

  const createConversation = (body: { applyId: number }) => {
    return axiosAuth.post(`job/chat/addConversationEmployer`, body);
  };

  const sendMessage = (body: SendMessageType) => {
    return axiosAuth.post(`job/chat/chatEmployer`, body);
  };

  const deleteInterview = (id: number) => {
    return axiosAuth.delete(`job/delete/interview/${id}`);
  };

  const deleteInviteEmployer = (id: number) => {
    return axiosAuth.delete(`employer/deleteEmployer/${id}`);
  };

  const getInterviewRoom = (interviewId: number, roomId: string) => {
    const dataToSend = {
      timestamp: Date.now(),
      timezoneOffset: new Date().getTimezoneOffset(),
    };
    const currentDate = new Date();

    const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm");
    return axiosAuth.get(
      `job/getRoom/${interviewId}/${roomId}/${formattedDate}`,
      {
        headers: {
          "x-timezone-offset": dataToSend.timezoneOffset,
        },
      },
    );
  };

  const uploadAvatar = (body: FormData) => {
    return axiosAuth.post(`company/updloadFilelogo`, body);
  };

  return {
    getInterviewRoom,
    getConversationList,
    getDetailConversation,
    getInterviewList,
    getCompanyEmployerInformation,
    getListNoteByApplicant,
    getJobPosting,
    getApplicant,
    getDetailJobBySlug,
    getStatisticDetailJob,
    getCompanyControlEmployer,
    createJobPosting,
    createInterview,
    createNote,
    createConversation,
    updateJobPosting,
    updateMasterApprovalRequest,
    updateJobPostingStatus,
    updateMaster,
    updateCompanyInformation,
    updateEmployerStatus,
    updateInterview,
    updateApplicantStatus,
    updateNote,
    uploadAvatar,
    updateInviteEmployer,
    inviteEmployer,
    sendMessage,
    deleteInterview,
    deleteInviteEmployer,
  };
};

export default useEmployerApi;
