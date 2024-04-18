import { twMerge } from "tailwind-merge";

type TitleProps = {
  text: string;
  order: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};
// A function that returns a heading element with the given text and order
export default function Title({ text, order, className }: TitleProps) {
  const Tag = `h${order}` as keyof JSX.IntrinsicElements;

  const defaultTextSize =
    order === 1
      ? `text-4xl`
      : order === 2
      ? `text-3xl`
      : order === 3
      ? `text-2xl`
      : order === 4
      ? `text-xl`
      : order === 5
      ? `text-lg`
      : `text-base`;

  return (
    <Tag className={twMerge(`font-rodetta`, defaultTextSize, className)}>
      {text}
    </Tag>
  );
}
