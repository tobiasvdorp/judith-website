import SectionTitle from "@/components/ui/SectionTitle";
import SectionCard, { SectionCardProps } from "./SectionCard";
import Text from "@/components/Standard/Text";

type WhatIDoProps = {
  title: string;
  description?: string;
  sectionCards: SectionCardProps[];
};

export default function WhatIDo(props: WhatIDoProps) {
  return (
    <>
      <div className="">
        <SectionTitle title={props.title} />
        {props.description && (
          <div className="w-full flex justify-center">
            <Text
              text={props.description}
              showButton={false}
              className="text-center max-w-96"
            />
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-5">
          {props.sectionCards.map((sectionCard, index) => (
            <SectionCard key={index} {...sectionCard} />
          ))}
        </div>
      </div>
    </>
  );
}
