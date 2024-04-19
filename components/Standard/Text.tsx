import { twMerge } from "tailwind-merge";

type TextProps = {
  text: string;
  className?: string;
};

export default function Text({ text, className }: TextProps) {
  return (
    <>
      <p className={twMerge(`font-space`, className)}>{text}</p>
    </>
  );
}
