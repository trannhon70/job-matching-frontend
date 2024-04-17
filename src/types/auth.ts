export interface Auth {
  token: string;
  refreshToken: string;
  infoUser: InfoUser;
}

export interface InfoUser {
  id: number;
  firstName: string;
  lastName: null;
  email: string;
  phone: string;
  name: string;
  isVerifyEmail: boolean;
  createdAt: Date;
  roles: Role[];
  isActive?: boolean;
  isCompany?: boolean;
  level: { levelName: string }[];
  company?: Company;
  avatarUrl: string;
  isOne: boolean;
}

export interface Role {
  id: number;
  roleName: string;
}
export interface LoginType {
  email: string;
  password: string;
}
export interface RegisterEmployeeType {
  email: string;
  password: string;
  code: string;
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

export type LoginGoogleType = {
  googleId: string;
  firstName: string;
  avatarUrl: string;
  email: string;
};
