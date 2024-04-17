import avatar from "@/assets/images/default-avatar-employee.png";
import cover from "@/assets/images/default-cover-employee.png";
import { UserProfile as UserProfileType } from "@/types/employee/user";
import Image from "next/image";
import { UploadAvatarModal } from ".";

interface Props {
  data: UserProfileType | null;
}

export const UserProfile: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-white shadow-md md:aspect-[2.5]">
      <Image src={cover} alt="avatar" fill className="object-cover" />
      <div className="absolute bottom-0 left-0 flex h-3/5 w-full flex-col items-center bg-gradient-to-r  from-indigo-900 to-indigo-300/50 lg:h-2/5 lg:flex-row lg:items-stretch lg:px-20">
        <div className="group relative h-[7rem] min-h-[7rem] w-[7rem] min-w-[7rem] -translate-y-1/2 overflow-hidden rounded-full bg-blue-200 lg:h-52 lg:w-52">
          <Image
            src={data?.avatarUrl ?? avatar}
            alt="avatar"
            fill
            className="object-cover object-top"
          />
          <UploadAvatarModal />
        </div>
        <div className="mx-6 mt-4 flex flex-1 -translate-y-[3.5rem] flex-col justify-center gap-4 text-white lg:ml-12 lg:mt-0 lg:-translate-y-0">
          <h2 className="text-center text-2xl font-bold lg:text-start">
            {data?.firstName} {data?.lastName}
          </h2>
          {/* <div className="flex gap-2">
            <Button>Download PDF profile</Button>
            <Button>Share profile</Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
