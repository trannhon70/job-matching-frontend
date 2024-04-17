export type DetailCompanyType = {
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
  industry: { id: number; industryName: string };
  review: ReviewType[];
  employer: { name: string }[];
};

export type ReviewType = {
  id: number;
  content: string;
  createdAt: string;
  user: UserType;
};

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};
