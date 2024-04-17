import logo from "@/assets/logos/job-matching-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from ".";

export const MobileHeader = () => {
  return (
    <div className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white px-4 shadow-sm md:px-10 lg:hidden">
      <Link href="/">
        <Image
          className="mr-20"
          src={logo}
          alt="logo"
          width={220}
          height={220}
        />
      </Link>
      <MobileNav />
    </div>
  );
};
