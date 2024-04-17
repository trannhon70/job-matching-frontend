import avatar from "@/assets/images/default-avatar-company.png";
import cover from "@/assets/images/default-cover-company.png";
import { DetailCompanyType } from "@/types/employee/company";
import { Building2, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: DetailCompanyType;
}

export const Profile: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative mt-4 aspect-[0.8] w-full overflow-hidden bg-white shadow-md md:aspect-[2] lg:aspect-[4]">
      <Image src={cover} alt="avatar" fill className="object-cover" />
      <div className="absolute bottom-0 left-0 flex h-3/5 w-full flex-col items-center bg-gradient-to-r  from-indigo-900 to-indigo-300/50 lg:h-2/5 lg:flex-row lg:items-stretch lg:px-20">
        <div className="relative h-[7rem] min-h-[7rem] w-[7rem] min-w-[7rem] -translate-y-1/2 overflow-hidden rounded-full bg-gray-100/20 lg:h-52 lg:w-52">
          <Image
            src={data.fileLogo ?? avatar}
            // src={avatar}
            alt="avatar"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="mx-6 mt-4 flex flex-1 -translate-y-[3.5rem] flex-col justify-center gap-4 text-white lg:ml-12 lg:mt-0 lg:-translate-y-0">
          <h2 className="text-center text-2xl font-bold lg:text-start">
            {data.companyName}
          </h2>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
            <div className="flex items-center gap-4">
              <Globe size={25} />
              <Link className="flex-1" href={data.webPage}>
                {data.webPage}
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Building2 size={25} />
              <p className="flex-1">{data.employee}+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
