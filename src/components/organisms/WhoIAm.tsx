import { TextProps } from "../Standard/Text";
import Text from "../Standard/Text";
import Image from "next/legacy/image";
type WhoIAmProps = {
  image: string;
  className?: string;
  text: string;
  title?: string;
  buttonRef: string;
  buttonText: string;
} & TextProps;

export default function WhoIAm(props: WhoIAmProps) {
  return (
    <>
      <div className=" flex flex-col sm:flex-row gap-10 max-w-[800px] self-center items-center justify-center h-fit pb-14">
        <div className="sm:w-full sm:h-52 sm:min-w-40 relative w-52 h-60 ">
          <Image
            src={props.image}
            alt={"profielfoto"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Text
          text={props.text}
          title={props.title}
          showButton={true}
          buttonRef={props.buttonRef}
          buttonText={props.buttonText}
          className="leading-loose"
        />
      </div>
    </>
  );
}
