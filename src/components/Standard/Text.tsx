import { twMerge } from "tailwind-merge";
import Title from "./Title";
import Button from "@/components/Standard/Button";

export type TextProps = {
  text: string;
  className?: string;
  // title?: string;
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
      {/* {props.title && <Title text={props.title} order={2} />} */}
      <div
        className={twMerge(
          `w-full font-space pb-2 prose prose-md prose-h2:text-3xl prose-li:m-1 prose-h3:text-lg prose-h4:text-base prose-p:m-0 prose-ul:m-0 prose-headings:font-rodetta prose-headings:font-bold prose-headings:m-0`,
          props.className
        )}
        dangerouslySetInnerHTML={{ __html: props.text || "" }}
      ></div>
      {props.showButton && (
        <Button
          url={props.buttonRef || ""}
          text={props.buttonText || ""}
          className="ml-3"
        ></Button>
      )}
    </div>
  );
}
