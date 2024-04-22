import { TextProps } from "../Standard/Text";
import Text from "../Standard/Text";
import Image from "next/legacy/image";
type WhoIAmProps = {
  image: string;
  className?: string;
  buttonRef: string;
  buttonText: string;
} & TextProps;

export default function WhoIAm(props: WhoIAmProps) {
  return (
    <>
      <div className=" flex flex-col sm:flex-row gap-5 max-w-[700px] self-center items-center justify-center h-fit">
        <Image
          src={props.image}
          alt={"profielfoto"}
          width={160}
          height={200}
          sizes="(max-width: 640px) 160px, 160px"
        />

        <Text
          text={props.text}
          title={props.title}
          showButton={true}
          buttonRef={props.buttonRef}
          buttonText={props.buttonText}
        />
      </div>
    </>
  );
}
