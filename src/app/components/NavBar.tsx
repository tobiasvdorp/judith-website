"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import CustomLink from "@/app/components/standard/CustomLink";

import { Menu, X } from "lucide-react";

type NavLink = {
  url: string;
  label: string;
};

type NavContent = {
  links: NavLink[];
  logoSrc: string;
};

const NavLinks = ({
  links,
  pathname,
}: {
  links: NavLink[];
  pathname: string;
}) => (
  <>
    {links.map(({ url, label }, index) => (
      <li key={index} className="md:p-0 p-4">
        <Link
          key={index}
          href={url}
          className={`${pathname === url ? "text-red-700" : "text-black"}`}
        >
          {label}
        </Link>
      </li>
    ))}
  </>
);

export default function Navbar({ links, logoSrc }: NavContent) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const sidebar = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <nav className="py-2 bg-neutral shadow-md px-4 fixed w-screen z-10 h-[69px] list-none	">
      {/* Desktop navbar */}
      <div className="w-full h-full justify-between items-center max-w-screen-lg mx-auto hidden md:flex">
        <Link href="/" className="h-full w-20 relative">
          <Image src={logoSrc} alt="logo" layout="fill" objectFit="contain" />
        </Link>
        <ul className="flex justify-between lg:max-w-[575px] md:max-w-[490px] w-full">
          <NavLinks links={links} pathname={pathname} />
        </ul>
        <div className="flex items-center gap-2">
          <CustomLink linkType="button" href="/contact">
            Contact
          </CustomLink>
        </div>
      </div>
      {/* Mobile navbar */}
      <div className="flex justify-between items-center w-full h-full md:hidden">
        <Link href="/" className="h-full w-20 relative">
          <Image src={logoSrc} alt="logo" layout="fill" objectFit="contain" />
        </Link>
        {isOpen ? (
          <X
            size="24"
            className="text-black"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <Menu
            size="24"
            className="text-black"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="h-screen w-screen"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-[69px] right-0 w-full max-w-80 h-full bg-neutral z-50 shadow-lg md:hidden"
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              exit="closed"
              variants={sidebar}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col p-6 md:p-8 divide-y">
                <NavLinks links={links} pathname={pathname} />
                <div className="flex items-center gap-2 pt-4">
                  <CustomLink linkType="button" href="/contact">
                    Contact
                  </CustomLink>
                </div>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
