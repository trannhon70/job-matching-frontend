"use client";

import avatar from "@/assets/images/default-avatar-employee.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MenuPopover } from ".";
import { Button } from "../ui/button";
import { MenuPopover as MenuPopoverEmployer } from "./employer/MenuPopover";

const AuthBox = () => {
  const session = useSession();
  if (session?.data?.user.data)
    return (
      <div className="ml-auto ">
        <Menubar className="border-none">
          <MenubarMenu>
            <MenubarTrigger className="flex cursor-pointer items-center gap-2 ">
              <Avatar>
                <Image
                  src={
                    session?.data?.user.data.infoUser.avatarUrl ??
                    session?.data?.user.data.infoUser.company?.fileLogo ??
                    avatar
                  }
                  alt="ava"
                  fill
                  className="object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-medium">
                {session?.data?.user.data.infoUser.email}
              </p>
            </MenubarTrigger>
            <MenubarContent>
              {session?.data?.user.data.infoUser.roles[0].roleName ===
              "EMPLOYEE" ? (
                <MenuPopover />
              ) : (
                <MenuPopoverEmployer />
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    );
  // return <MenuPopover />;
  return (
    <div className="ml-auto flex gap-2">
      <Button asChild variant={"outline"}>
        <Link href="/register">Register</Link>
      </Button>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};

export default AuthBox;
