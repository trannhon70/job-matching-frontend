"use client";

import avatar from "@/assets/images/default-avatar-company.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MenuPopover } from ".";

const AuthBox = () => {
  const session = useSession();
  return (
    <div className="ml-auto ">
      <Menubar className="border-none bg-transparent">
        <MenubarMenu>
          <MenubarTrigger className="flex cursor-pointer items-center gap-2">
            <Avatar>
              <Image
                src={
                  session.data?.user.data.infoUser.company?.fileLogo ??
                  session.data?.user.data.infoUser.avatarUrl ??
                  avatar
                }
                alt="ava"
                fill
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium">
              {session.data?.user.data.infoUser.email}
            </p>
          </MenubarTrigger>
          <MenubarContent>
            <MenuPopover />
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default AuthBox;
