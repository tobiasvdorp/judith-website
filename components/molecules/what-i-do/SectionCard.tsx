import Image from "next/legacy/image";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import CustomLink from "../../Standard/CustomLink";

export type SectionCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  buttonRef: string;
};

export default function SectionCard(props: SectionCardProps) {
  return (
    <>
      <div className=" overflow-hidden rounded-xl h-fit flex flex-col w-80 max-w-full bg-neutral drop-shadow-md border-2 shadow-neutral-dark border-neutral-dark">
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
          <Text text={props.description} />
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
