import { twMerge } from "tailwind-merge";
import Title from "./Title";
import Button from "@/components/Standard/Button";

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
        className={twMerge(
          `font-space pb-2 [&_a]:underline] `,
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
