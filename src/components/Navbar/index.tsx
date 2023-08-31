import * as Separator from "@radix-ui/react-separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menu = [
  { label: "Home", pathname: "/" },
  { label: "User", pathname: "/user" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-[10px] z-50 flex h-[70px] w-full items-center justify-center px-2 md:px-4">
      <div className="flex h-full w-full gap-3 rounded-lg bg-white px-5 py-[10px] shadow-md md:w-[720px] md:gap-5">
        <div className="flex h-full items-center">
          <h1 className="rounded-md bg-blue-500 px-2 py-1 text-sm w-max font-bold text-white md:text-lg">
            Blog-Post
          </h1>
        </div>
        <Separator.Root className="mx-[2px] h-full w-[2px] bg-slate-300 md:mx-[10px]" />
        <div className="flex items-center gap-3 pr-5 md:gap-5">
          {menu.map((item) => (
            <Link key={item.pathname} href={item.pathname} className="relative">
              <div
                className={`relative z-10 flex items-center justify-center rounded-[20px] px-[10px] py-[2px] text-[16px] text-sm font-bold md:text-base ${
                  pathname === item.pathname
                    ? "bg-blue-100 text-blue-500"
                    : "text-slate-600"
                } transition-colors duration-300 ease-in-out`}
              >
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
