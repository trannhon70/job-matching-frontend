import logo from "@/assets/logos/job-matching-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from ".";
import AuthBox from "./AuthBox";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 hidden h-16 border-b bg-white lg:block">
      <div className="container flex h-full items-center">
        <Link href="/">
          <Image
            className="mr-20"
            src={logo}
            alt="logo"
            width={200}
            height={200}
          />
        </Link>
        <Navbar />
        <AuthBox />
      </div>
    </header>
  );
};
