import logo from "@/assets/logos/job-matching-logo.svg";
import Image from "next/image";
import AuthBox from "./AuthBox";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center bg-[#79adc5] px-4 text-white">
      <Image src={logo} alt="logo" width={200} height={200} />
      <AuthBox />
    </header>
  );
};
