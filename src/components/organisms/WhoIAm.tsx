import { TextProps } from "../Standard/Text";
import Text from "../Standard/Text";
import Image from "next/legacy/image";
type WhoIAmProps = {
  image: string;
  className?: string;
  text: string;
  buttonRef: string;
  buttonText: string;
} & TextProps;

export default function WhoIAm(props: WhoIAmProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-y-8 gap-x-6 self-center items-center justify-center h-fit pb-14">
        <div className=" relative w-full sm:w-80 h-60 max-w-64">
          <Image
            src={props.image}
            alt={"profielfoto"}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <Text
          text={props.text}
          showButton={true}
          buttonRef={props.buttonRef}
          buttonText={props.buttonText}
          className="leading-loose"
        />
      </div>
    </>
  );
}
