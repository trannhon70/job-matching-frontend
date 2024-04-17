export interface UserProfileInterviewType {
  id: number;
  title: string;
  date: Date;
  hour: string;
  minute: string;
  periodTime: string;
  timeZone: number;
  roomId: string;
  status: boolean;
  user: User;
  job: Job;
  isActivate: boolean;
}

export interface Job {
  id: number;
  jobTitle: string;
  summary: null;
  number: string;
  insurance: null;
  skillAbilities: string;
  specificDuties: string;
  duty: string;
  startDate: Date;
  salary: string;
  positionName: string;
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
  slug: null;
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
  email: string;
  phone: string;
  isVerifyEmail: boolean;
  emailVerifyCode: string;
  createdAt: Date;
}
