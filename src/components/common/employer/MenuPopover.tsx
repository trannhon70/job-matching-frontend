"use client";

import { MenubarItem } from "@/components/ui/menubar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const MenuPopover = () => {
  return (
    <>
      <MenubarItem className="flex cursor-pointer gap-4" asChild>
        <Link href={"/employer/setting"}> Admin dashboard </Link>
      </MenubarItem>
      <MenubarItem
        className="flex cursor-pointer gap-4"
        onClick={() => {
          signOut({ callbackUrl: "/", redirect: true });
        }}
      >
        <LogOut size={20} />
        Log out
      </MenubarItem>
    </>
  );
};
