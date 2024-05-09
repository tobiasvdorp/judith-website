import Link from "next/link";
import { twMerge } from "tailwind-merge";
type LinkProps = {
  text: string;
  url: string;
  className?: string;
};

export default function Button({ text, url, className }: LinkProps) {
  return (
    <Link
      href={url || ""}
      className={twMerge(
        "bg-primary hover:bg-primary-dark rounded-md duration-200 px-8 py-2 w-fit flex items-center justify-center text-black button",
        className
      )}
    >
      {text}
    </Link>
  );
}
