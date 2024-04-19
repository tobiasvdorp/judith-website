import Image from "next/image";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import Button from "../Standard/Button";
import CustomLink from "../Standard/CustomLink";

type SectionCard = {
  imageSrc: string;
  title: string;
  description: string;
  buttonRef: string;
};

export default function SectionCard({
  imageSrc,
  title,
  description,
  buttonRef,
}: SectionCard) {
  return (
    <>
      <div className=" overflow-hidden rounded-xl h-fit flex flex-col w-80 max-w-full bg-neutral drop-shadow-md border-2 shadow-neutral-dark border-neutral-dark">
        <div className="h-44 w-full relative">
          <Image
            src={imageSrc}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-xl"
          />{" "}
        </div>
        <div className="flex flex-col gap-2 p-3">
          <Title text={title} order={3} />
          <Text text={description} />
          <CustomLink href={buttonRef} linkType="button">
            Meer bekijken
          </CustomLink>
        </div>
      </div>
    </>
  );
}
