import Link from "next/link";

type NavItemType = {
  title: string;
  href: string;
};

export const navItems = [
  {
    title: "Jobs",
    href: "/job",
  },
  {
    title: "Introduction",
    href: "/introduction",
  },
];

export const Navbar = () => {
  return (
    <nav className="flex gap-10">
      {navItems.map((i) => (
        <NavItem key={i.title} href={i.href} title={i.title} />
      ))}
    </nav>
  );
};

const NavItem: React.FC<NavItemType> = ({ title, href }) => {
  return (
    <Link className="font-semibold text-gray-600" href={href}>
      {title}
    </Link>
  );
};
