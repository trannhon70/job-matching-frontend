"use client";

import {
  ClipboardEdit,
  Loader2,
  LogOut,
  MessageSquareMore,
  MessagesSquare,
  ScrollText,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import { MenubarItem, MenubarSeparator } from "../ui/menubar";

interface MenuPopoverProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

export const MenuPopover: React.FC<MenuPopoverProps> = ({
  isMobile = false,
  closeMenu,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const itemList = useMemo(
    () => [
      {
        title: "My profile",
        href: "/user/my-profile",
        icon: <ClipboardEdit size={20} />,
      },
      { title: "1:1 Q&A", href: "/qna", icon: <MessagesSquare size={20} /> },
      { title: "Setting", href: "/user/setting", icon: <Settings size={20} /> },
      {
        title: "Subscription list",
        href: "/user/subscription",
        icon: <ScrollText size={20} />,
      },
      {
        title: "Contact",
        href: "/contact",
        icon: <MessageSquareMore size={20} />,
      },
    ],
    [],
  );

  const handleLogOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/", redirect: true });
    setIsLoading(false);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        {itemList.map((i, index) => (
          <Link
            onClick={closeMenu}
            key={i.title}
            className="flex cursor-pointer gap-4 rounded-md bg-white px-6 py-4 font-medium shadow-sm"
            href={i.href}
          >
            {i?.icon}
            {i.title}
          </Link>
        ))}
        <div
          onClick={handleLogOut}
          className="flex cursor-pointer gap-4 rounded-md bg-white px-6 py-4 font-medium shadow-sm"
        >
          <LogOut size={20} />
          Log out
        </div>
      </div>
    );
  }

  return (
    <>
      {itemList.map((i) => (
        <Fragment key={i.title}>
          <MenubarItem asChild className="flex cursor-pointer gap-4">
            <Link href={i.href}>
              {i?.icon}
              {i.title}
            </Link>
          </MenubarItem>
          <MenubarSeparator />
        </Fragment>
      ))}
      <MenubarItem
        disabled={isLoading}
        className="flex cursor-pointer gap-4"
        onClick={handleLogOut}
      >
        <LogOut size={20} />
        Log out
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      </MenubarItem>
    </>
  );
};
