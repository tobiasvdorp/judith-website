import Image from "next/legacy/image";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import Button from "@/components/Standard/Button";

export type SectionCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  buttonRef: string;
  className?: string;
};

export default function SectionCard(props: SectionCardProps) {
  return (
    <>
      {/* <div
        className={twMerge(
          `overflow-hidden rounded-xl h-[400px] w-full flex flex-col bg-neutral drop-shadow-md border-2 shadow-neutral-dark border-neutral-dark`,
          props.className
        )}
      >
        <div className="h-80 relative">
          <Title
            text={props.title}
            order={3}
            className="absolute p-2 z-10 text-center w-full text-xl text-black bg-primary opacity-100 bottom-0"
          />

          <Image
            src={props.imageSrc}
            alt={props.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className=""
            sizes="400px"
          />
        </div>
        <div className="flex flex-col gap-2 p-3 rounded-xl">
          <div className="h-fit last-card-text">
            <Text text={props.description} />
          </div>
           <Button
            url={props.buttonRef}
            className="w-full"
            text="Meer bekijken"
          ></Button> 
        </div>
      </div> */}

      <div className="flex flex-row overflow-visible drop-shadow-md w-full h-fit bg-neutral rounded-md py-5 px-4 relative border-2 border-neutral-dark">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden drop-shadow-lg ">
            <Image
              src={props.imageSrc}
              alt={props.title}
              objectFit="cover"
              layout="fill"
              sizes="400px"
              className="left-10 "
            />
          </div>
        </div>
        <div className="pl-48">
          <Title text={props.title} order={3} className="" />
          <Text text={props.description} />
          <div className="w-full justify-end flex">
            <Button
              url={props.buttonRef}
              text="Meer informatie"
              className=""
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
}
