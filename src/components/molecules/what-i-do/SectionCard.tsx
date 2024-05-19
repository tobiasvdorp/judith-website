import Image from "next/legacy/image";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";

import { twMerge } from "tailwind-merge";
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
      <div
        className={twMerge(
          `p-1 overflow-hidden rounded-xl h-fit w-full flex flex-col bg-neutral drop-shadow-md border-2 shadow-neutral-dark border-neutral-dark`,
          props.className
        )}
      >
        <div className="h-44 relative">
          <Image
            src={props.imageSrc}
            alt={props.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-xl"
            sizes="400px"
          />
        </div>
        <div className="flex flex-col gap-2 p-3">
          <Title text={props.title} order={3} />
          <div className="h-fit last-card-text">
            <Text text={props.description} />
          </div>
          <Button
            url={props.buttonRef}
            className="w-full"
            text="Meer bekijken"
          ></Button>
        </div>
      </div>
    </>
  );
}
