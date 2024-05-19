import Link from "next/link";
import { twMerge } from "tailwind-merge";
type LinkProps = {
  text: string;
  url: string;
  className?: string;
};

export default function Button(props: LinkProps) {
  return (
    <Link
      href={props.url || "/"}
      className={twMerge(
        "bg-primary hover:bg-primary-dark rounded-md duration-200 px-8 py-2 w-fit flex items-center justify-center text-black button",
        props.className
      )}
    >
      {props.text}
    </Link>
  );
}
