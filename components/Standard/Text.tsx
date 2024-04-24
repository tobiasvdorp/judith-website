import { twMerge } from "tailwind-merge";
import Title from "./Title";
import CustomLink from "./CustomLink";

export type TextProps = {
  text: string;
  className?: string;
  title?: string;
} & (ShowButton | NoButton);

type ShowButton = {
  showButton?: true;
  buttonText: string;
  buttonRef: string;
};
type NoButton = {
  showButton?: false | undefined;
};

export default function Text(props: TextProps) {
  return (
    <div className="">
      {props.title && <Title text={props.title} order={2} />}
      <div
        className={twMerge(`font-space pb-2  `, props.className)}
        dangerouslySetInnerHTML={{ __html: props.text }}
      ></div>
      {props.showButton && (
        <CustomLink href={props.buttonRef} linkType="button" className="ml-3">
          {props.buttonText}
        </CustomLink>
      )}
    </div>
  );
}
