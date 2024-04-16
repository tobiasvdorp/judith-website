"use client";
import { Builder } from "@builder.io/react";
import Image from "next/image";
import Button from "../Standard/Button";
import ModeToggle from "../ThemeSwitcher";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, motion } from "framer-motion";

type NavbarProps = {
  items: Item[];
  logoSrc: string;
  themeSwitcher: boolean;
};

type Item = {
  label: string;
  href: string;
};

export default function Navbar({ items, logoSrc, themeSwitcher }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sidebar = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <nav className="py-2 bg-neutral shadow-md px-4 fixed w-screen z-10 h-[69px]">
      {/* Desktop navbar */}
      <div className="w-full justify-between items-center max-w-screen-lg mx-auto hidden md:flex">
        <Image
          src={logoSrc}
          alt="logo"
          width={40}
          height={40}
          priority={true}
        />
        <div className="flex justify-between max-w-[550px] w-full  ">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-gray-800 hover:text-blue-500"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button text="Contact" />
          {themeSwitcher && <ModeToggle />}
        </div>
      </div>
      {/* Mobile navbar */}
      <div className="flex justify-between items-center w-full md:hidden ">
        <Image
          src={logoSrc}
          alt="logo"
          width={40}
          height={40}
          priority={true}
        />
        <Menu
          className="text-gray-800"
          size={30}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="h-screen w-screen"
              onClick={() => setIsOpen(false)}
            ></div>
            <motion.div
              className="fixed top-16 right-0 w-64 h-full bg-neutral z-50 shadow-lg"
              initial="closed"
              animate={isOpen ? "open" : "closed"}
              exit="closed"
              variants={sidebar}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col gap-6 p-4">
                {items.map((item, index) => (
                  <motion.li
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + index / 10,
                    }}
                    key={index}
                  >
                    <Link key={index} href={item.href} className="text-black ">
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <div className="flex items-center gap-2">
                  {" "}
                  <Button text="Contact" buttonType="text" />
                  {themeSwitcher && <ModeToggle />}
                </div>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
