import { cn } from "@/lib/utils";
import Link from "next/link";

type FooterNavType = {
  title: string;
  href: string;
  type?: "secondary";
};

interface FooterNavProps {
  items: FooterNavType[];
  classNames?: string;
  type?: "secondary";
}

export const FooterNav: React.FC<FooterNavProps> = ({ items, type }) => {
  return (
    <nav className="flex gap-10">
      {items.map((i) => (
        <NavItem type={type} key={i.title} href={i.href} title={i.title} />
      ))}
    </nav>
  );
};

const NavItem: React.FC<FooterNavType> = ({ title, href, type }) => {
  return (
    <Link
      className={cn(
        " text-white",
        type === "secondary" ? "text-lg font-medium" : "text-xl font-bold",
      )}
      href={href}
    >
      {title}
    </Link>
  );
};
