import Image from "next/legacy/image";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import CustomLink from "../../Standard/CustomLink";
import { twMerge } from "tailwind-merge";

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
          `overflow-hidden rounded-xl h-fit w-full flex flex-col bg-neutral drop-shadow-md border-2 shadow-neutral-dark border-neutral-dark`,
          props.className
        )}
      >
        <div className="h-44 w-full relative">
          <Image
            src={props.imageSrc}
            alt={props.title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2 p-3">
          <Title text={props.title} order={3} />
          <div className="h-fit last-card-text">
            <Text text={props.description} />
          </div>
          <CustomLink
            href={props.buttonRef}
            linkType="button"
            className="w-full"
          >
            Meer bekijken
          </CustomLink>
        </div>
      </div>
    </>
  );
}
