import SectionTitle from "@/components/ui/SectionTitle";
import SectionCard, {
  SectionCardProps,
} from "../molecules/what-i-do/SectionCard";
import Text from "@/components/Standard/Text";
import MainWrapper from "../layouts/MainWrapper";

type WhatIDoProps = {
  title: string;
  description?: string;
  sectionCards: SectionCardProps[];
};

export default function WhatIDo(props: WhatIDoProps) {
  return (
    <>
      <div className="p-4">
        <SectionTitle title={props.title} />
        {props.description && (
          <div className="w-full text-center max-w-80 mx-auto">
            <Text text={props.description} className="text-center max-w-96" />
          </div>
        )}
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-3 ">
            {props.sectionCards &&
              props.sectionCards.map((sectionCard, index) => (
                <SectionCard
                  key={index}
                  {...sectionCard}
                  className={`${index === props.sectionCards.length - 1 && "sm:col-span-2 lg:col-span-1 last-card"}`}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
