import avatar from "@/assets/images/default-avatar-company.png";
import { Button } from "@/components/ui/button";
import { JobPostingType } from "@/types/employer/job-posting";
import { Factory, Globe, MapPin, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface Props {
  data: JobPostingType;
}

export const CompanyInfo: React.FC<Props> = ({ data }) => {
  const { company } = data;
  const companyInformation = useMemo(
    () => [
      {
        title: "Industry",
        content: company?.industry?.industryName,
        icon: <Factory size={20} />,
      },
      {
        title: "Address",
        content: company.address,
        icon: <MapPin size={20} />,
      },
      { title: "Website", content: company.webPage, icon: <Globe size={20} /> },
      {
        title: "Introduction",
        content: company.information,
        icon: <MessageSquare size={20} />,
      },
    ],
    [company],
  );

  return (
    <div className="w-full lg:w-1/3 ">
      <div className="w-full bg-white p-6">
        <div className=" flex gap-4">
          <div>
            <Link href={`/company/${company.slug}`}>
              <div className="relative h-20 w-20 min-w-[5rem] border">
                <Image
                  src={company?.fileLogo ?? avatar}
                  alt="logo"
                  fill
                  objectFit="cover"
                />
              </div>
            </Link>
            <Button className="mt-2" asChild>
              <Link href={`/company/${company.slug}`}>Jobs list</Link>
            </Button>
          </div>

          <Link href={`/company/${company.slug}`}>
            <h2 className="font-semibold">{company.companyName}</h2>
          </Link>
        </div>
        <div className="mt-4 flex w-full flex-col gap-4">
          {companyInformation.slice(0, 3).map((i) => (
            <div
              key={i.title}
              className="flex w-full flex-col gap-2 md:flex-row"
            >
              <div className="flex w-full gap-1 text-gray-500 md:w-[30%] md:min-w-[30%]">
                {i.icon}
                {i.title}:
              </div>
              <p>{i.content}</p>
            </div>
          ))}
          {companyInformation.slice(3, 4).map((i) => (
            <div
              key={i.title}
              className="flex w-full flex-col gap-2 md:flex-col"
            >
              <div className="flex w-full gap-1 text-gray-500 md:w-[30%] md:min-w-[30%]">
                {i.icon}
                {i.title}:
              </div>
              <div dangerouslySetInnerHTML={{ __html: i.content }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
