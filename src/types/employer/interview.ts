export interface InterviewItemType {
  estimateDate: Date;
  estimateHour: string;
  estimateMinute: string;
  estimatePeriodTime: string;
  endDate: Date;
  endHour: string;
  endMinute: string;
  endPeriodTime: string;
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
}

export interface Job {
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
