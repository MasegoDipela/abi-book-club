"use client";

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import MyThemeContext from "@/store/ThemeContext";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkTheme } = useContext(MyThemeContext);
  const { userId } = useAuth();
  const [dark, setdark] = useState(isDarkTheme);
  useEffect(() => {
    setdark(!dark);
  }, [isDarkTheme]);

  return (
    <section className="no-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-red-800"}`}
            >
              {dark ? (
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={link.dimgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
              )}
              <p className="text-black dark:text-light-1 max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />

              <p className="text-black dark:text-light-2 max-lg:hidden">
                Logout
              </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

export default LeftSidebar;
