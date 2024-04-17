export interface ApplicantType {
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
  dateRecruitment: Date;
  document: string;
  periodStart: Date;
  periodEnd: Date;
  process: string;
  officer: string;
  other: string;
  status: number;
  isDelete: boolean;
  slug: null | string;
  company: Company;
}

export interface Company {
  id: number;
  companyName: string;
  foundation: string;
  fileLogo: string;
  information: string;
  address: string;
  history: string;
  webPage: string;
  employee: string;
}

export interface ApplicantResType {
  id: number;
  status: string;
  user: User;
  job: Job;
  date: string;
}

export interface Job {
  id: number;
  jobTitle: string;
  company: Company;
}

export interface Company {
  id: number;
  companyName: string;
  foundation: string;
  employee: string;
  fileLogo: string;
  information: string;
  address: string;
  history: string;
  slug: string;
  webPage: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: null | string;
  email: string;
}

export type ApplicantStatusType = {
  interview: number;
  hired: number;
  refuse: number;
};

export interface ApplicantNoteType {
  id: number;
  status: string;
  note: Note[];
}

export interface Note {
  id: number;
  createdAt: Date;
  content: string;
}
