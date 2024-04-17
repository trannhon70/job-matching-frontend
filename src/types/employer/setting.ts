export type CreateMasterApprovalRequestType = {
  companyName: string;
  phone: string;
  businessLicense: string;
  file: File;
};

export type UpdateMasterType = {
  phone: string;
  name: string;
};

export type InviteEmployerType = {
  email: string;
  level: number[];
};

export type CreateInterviewBodyType = {
  title?: string;
  date?: string;
  hour?: string;
  minute?: string;
  periodTime?: string;
  roomId?: string;
  userId?: number;
  jobId?: number;
  timeZone?: number;
  status?: string;
  endDate?: Date;
};

export type CreateNoteBody = {
  content: string;
  createdAt: string;
  applyId?: number;
};

export type SendMessageType = {
  conversationId: string;
  content: string;
};

export type UpdateEmployerStatusType = {
  status: number;
};

export type UpdateJobPostingStatusType = {
  status: number;
  listId: number[];
};

export interface CreateJobPostingType {
  jobTitle: string;
  summary: string;
  positionName?: string;
  number: string;
  skillAbilities: string;
  specificDuties: string;
  duty: string;
  startDate: string;
  salary: string;
  insurance: string;
  hour: string;
  accommodation: string;
  visa: string;
  vacation: string;
  benefit: string;
  periodStart: string;
  periodEnd: string;
  dateRecruitment: string;
  document: string;
  process: string;
  officer: string;
  other: string;
  countryId: number;
  languages: number;
  positions?: number;
}

export interface CompanyInformationType {
  id: number;
  email: string;
  companyName: string;
  foundation: string;
  employee: string;
  fileLogo: string;
  information: string;
  address: string;
  history: string;
  slug: string;
  webPage: string;
  industry: Industry;
  employer: Employer[];
  country: Country;
}

export interface Country {
  id: number;
  countryName: string;
  code: string;
}

export interface Employer {
  name: string;
}

export interface Industry {
  id: number;
  industryName: string;
}
