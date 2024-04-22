import { twMerge } from "tailwind-merge";
import Title from "./Title";
import CustomLink from "./CustomLink";

type TextProps = {
  text: string;
  className?: string;
  title?: string;
} & (ShowButton | NoButton);

type ShowButton = {
  showButton: true;
  buttonText: string;
  buttonRef: string;
};
type NoButton = {
  showButton: false;
};

export default function Text(props: TextProps) {
  return (
    <div className="">
      {props.title && <Title text={props.title} order={2} />}
      <p className={twMerge(`font-space pb-2`, props.className)}>
        {props.text}
      </p>
      {props.showButton && (
        <CustomLink href={props.buttonRef} linkType="button" className="ml-3">
          {props.buttonText}
        </CustomLink>
      )}
    </div>
  );
}
