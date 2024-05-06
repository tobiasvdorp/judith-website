import SectionTitle from "@/components/ui/SectionTitle";
import SectionCard, {
  SectionCardProps,
} from "../molecules/what-i-do/SectionCard";
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
            <Text text={props.description} className="text-center max-w-96" />
          </div>
        )}
        <div className="grid md:grid-cols-3 grid-cols-2 justify-items-center gap-5 pt-2">
          {props.sectionCards.map((sectionCard, index) => (
            <SectionCard key={index} {...sectionCard} />
          ))}
        </div>
      </div>
    </>
  );
}