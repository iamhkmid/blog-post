import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menu = [
  { label: "Home", pathname: "/" },
  { label: "User", pathname: "/user" },
];

const Navbar = () => {
  const pathname = usePathname();

  const menuStyle = (path: string) =>
    pathname === path
      ? "font-bold text-blue-600"
      : "font-semibold text-slate-600";

  return (
    <nav className="fixed left-0 top-[10px] z-50 flex h-[70px] w-full items-center justify-center px-2 md:px-4">
      <div className="flex h-full w-full gap-5 rounded-lg bg-white px-5 shadow-md md:w-[720px]">
        <div className="flex h-full items-center">
          <h1 className="rounded-md bg-blue-500 px-2 py-1 text-base font-bold text-white md:text-lg">
            Blog-Post
          </h1>
        </div>
        <div className="flex items-center gap-5 pr-5">
          {menu.map((item) => (
            <Link key={item.pathname} href={item.pathname}>
              <p className={`text-[17px] ${menuStyle(item.pathname)}`}>
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
