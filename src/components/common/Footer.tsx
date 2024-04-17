import logo from "@/assets/logos/job-matching-logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FooterNav } from ".";

const navItems = [
  {
    title: "Contents",
    href: "",
  },
  {
    title: "Contact Us",
    href: "",
  },
];

const policyItems = [
  {
    title: "Privacy Policy",
    href: "",
  },
  {
    title: "Terms of Service",
    href: "",
  },
];

export const Footer = () => {
  return (
    <footer className="flex min-h-[15rem] w-full items-center justify-center bg-[#79adc5] py-8 text-white">
      <div className="container flex flex-col">
        {/* <div className="w-fit bg-white p-3"> */}
        <Link href="/">
          <Image src={logo} alt="logo" width={220} height={220} />
        </Link>
        {/* </div> */}

        <div className="my-12 flex w-full flex-col justify-between gap-4 lg:flex-row lg:gap-0">
          <FooterNav items={navItems} />
          <FooterNav items={policyItems} type="secondary" />
        </div>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end lg:gap-0">
          <div>
            <p>133, Magokseo-ro, Gangseo-gu, Seoul, Republic of Korea 177018</p>
            <p>+82 1877 8061</p>
            <Link href="">info@travellearner.com</Link>
          </div>
          <p>Copyright 2023 Englishwing Corp.</p>
        </div>
      </div>
    </footer>
  );
};
