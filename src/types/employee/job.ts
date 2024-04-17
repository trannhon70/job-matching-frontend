import { CountryResponse } from "../country";

export interface JobResponse {
  totalPage: number;
  data: JobType[];
  totalItem: number;
  code: number;
}

export interface JobType {
  currency: string;
  id: number;
  jobTitle: string;
  summary: null | string;
  number: null | string;
  insurance: null | string;
  skillAbilities: string;
  specificDuties: string;
  duty: string;
  startDate: Date;
  salary: string;
  positionName: null | string;
  hour: string;
  accommodation: string;
  visa: string;
  vacation: string;
  benefit: string;
  jobType: string;
  dateRecruitment: Date;
  document: string;
  periodStart: string;
  periodEnd: string;
  process: string;
  officer: string;
  other: string;
  status: number;
  isDelete: boolean;
  slug: null | string;
  country: CountryResponse;
  position: Position;
  company: Company;
  apply: any;
  totalSave: number;
  totalClick: number;
  isActivate: boolean;
}

export interface Position {
  id: number;
  positionName: string;
}

export interface Company {
  id: number;
  companyName: string;
  foundation: string | null;
  fileLogo: null | string;
  information: string | null;
  address: string | null;
  history: string | null;
  webPage: string | null;
  employee: null | string;
}

export type SaveJobBody = {
  idJob: number;
  status: number;
};

export type ApplyJobBody = {
  jobId: number;
};

export type UpdateOpenToWorkType = {
  openToWork: string;
};
