import { getCompany } from "@/services/apis/server";
import { DetailCompanyType } from "@/types/employee/company";
import { CompanyLayout } from "./_components";

const CompanyPage = async ({ params }: { params: { slug: string } }) => {
  const res = await getCompany(params.slug);
  if (!res.ok)
    return <div className="container h-screen py-10">Company unavailable</div>;
  return <CompanyLayout data={res.data as DetailCompanyType} />;
};

export default CompanyPage;
