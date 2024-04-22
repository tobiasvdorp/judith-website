import Link from "next/link";
import { twMerge } from "tailwind-merge";
type LinkProps = {
  href: string;
  linkType: "button" | "text";
  className?: string;
  children: React.ReactNode;
};

export default function CustomLink({
  href,
  linkType,
  className,
  children,
}: LinkProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        `${
          linkType === "button" &&
          "bg-primary hover:bg-primary-dark rounded-md duration-200 px-8 py-2 w-fit flex items-center justify-center text-black"
        }`,
        className
      )}
    >
      {children}
    </Link>
  );
}
