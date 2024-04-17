"use client";

import avatar from "@/assets/images/default-avatar-employee.png";
import logo from "@/assets/logos/job-matching-logo.svg";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useBoolean } from "usehooks-ts";
import { MenuPopover } from ".";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";

export const MobileNav = () => {
  const { value, setTrue, setFalse } = useBoolean(false);

  return (
    <>
      <Sheet open={value} modal>
        <Button onClick={setTrue} variant={"ghost"} type="button">
          <Menu />
        </Button>
        <SheetContent className="w-[22rem] bg-gray-100">
          <Button
            variant={"ghost"}
            onClick={setFalse}
            className="absolute right-4 top-4 !h-fit rounded-sm !p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <X className="h-5 w-5" />
          </Button>
          <Link href="/">
            <Image
              className="mr-20"
              src={logo}
              alt="logo"
              width={220}
              height={220}
            />
          </Link>
          <Nav closeMenu={setFalse} />
        </SheetContent>
      </Sheet>
    </>
  );
};

const Nav = ({ closeMenu }: { closeMenu: () => void }) => {
  const session = useSession();
  if (session.data?.user.data.infoUser)
    return (
      <>
        <div className="mb-4 mt-6 flex items-center gap-4 rounded-md bg-white px-6 py-4">
          <Avatar>
            <Image src={avatar} alt="ava" fill className="object-cover" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-medium">{session.data.user.data.infoUser.email}</p>
        </div>
        <MenuPopover closeMenu={closeMenu} isMobile />
      </>
    );
  return (
    <div className="ml-auto mt-6 flex gap-2 ">
      <Button asChild variant={"outline"}>
        <Link href="/register">Register</Link>
      </Button>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};
