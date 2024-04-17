export type UpdateUserInformationBody = {
  firstName: string;
  lastName: string;
  phone: string;
  streetName: string;
  postalCode: number;
  city: number;
  countrys: number;
};

export type AddEducationBody = {
  levelSchools: number;
  majors: string;
  schoolNames: string;
  countrys: number;
  city: number;
  monthStartEdu: number;
  monthEndEdu: number;
  yearEndEdu: number;
  yearStartEdu: number;
};

export type AddSkillBody = {
  skillName: string;
  rate: number;
  description: string;
};

export type AddExpBody = {
  address: string;
  monthStart: number;
  monthEnd: number;
  yearEnd: number;
  yearStart: number;
  description: string;
  companyNames: string;
  positionNames: string;
  provinceNames: number;
  countrys: number;
};

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isVerifyEmail: boolean;
  emailVerifyCode: string;
  createdAt: Date;
  openToWork: boolean;
  postalCode: number;
  resume: string;
  streetName: string;
  avatarUrl: string;
  country: Country;
  province: Province;
}

export interface Certificate {
  id: number;
  nameFile: string;
  file: string;
  link: string;
  monthStartCer: string;
  monthEndCer: string;
  yearStartCer: string;
  yearEndCer: string;
}

export interface Country {
  id: number;
  countryName: string;
  code: null;
}

export interface Province {
  id: number;
  provinceName: string;
}

export interface UserSchool {
  id: number;
  monthStartEdu: number;
  monthEndEdu: number;
  yearStartEdu: number;
  yearEndEdu: number;
  schoolName: null;
  majorName: null;
  country: Country;
  province: Province;
  levelSchool: LevelSchool;
  major: Major;
  school: School;
}

export interface LevelSchool {
  id: number;
  levelName: string;
}

export interface Major {
  id: number;
  majorName: string;
}

export interface School {
  id: number;
  schoolName: string;
}

export interface UserTechnical {
  id: number;
  skillName: string;
  rate: number;
  description: string;
  technical: {
    id: number;
    technicalName: string;
  };
}

export interface Experience {
  id: number;
  monthStart: number;
  monthEnd: number;
  yearStart: number;
  yearEnd: number;
  description: string;
  address: string;
  companyName: string;
  positionName: null;
  provinceName: null;
  company: { id: number; companyName: string };
  position: { id: number };
  province: Province;
  country: Country;
}

export type SendQuestionBody = {
  title: string;
  question: string;
  mail: string;
  categoryId: number;
  userId?: number;
};

export interface QuestionType {
  id: number;
  question: string;
  mail: string;
  status: boolean;
  date: string;
  category: Category;
}

export interface Category {
  categoryName: string;
}

export interface CreateReviewCompanyBodyType {
  content: string;
  companyId: number;
}

export interface SendMessageEmployee {
  conversationId: string;
  content: string;
}
