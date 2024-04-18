import Link from "next/link";
import { twMerge } from "tailwind-merge";
type LinkProps = {
  href: string;
  linkType: "button" | "text";
  children: React.ReactNode;
};

export default function CustomLink({ href, linkType, children }: LinkProps) {
  return (
    <Link
      href={href}
      className={twMerge(`${linkType === "button" && "button"}`)}
    >
      {children}
    </Link>
  );
}
