import SectionTitle from "@/components/ui/SectionTitle";
import type { SectionCardProps } from "@/components/molecules/what-i-do/SectionCard";
import Text from "@/components/Standard/Text";
import { FaProjectDiagram, FaHandsHelping } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import Button from "@/components/Standard/Button";
import Title from "@/components/Standard/Title";
type WhatIDoProps = {
  title: string;
  description?: string;
  sectionCards: SectionCardProps[];
};

export default function WhatIDo(props: WhatIDoProps) {
  return (
    <>
      <div className="py-36">
        <SectionTitle title={props.title} />
        {props.description && (
          <div className="w-full text-center max-w-80 mx-auto">
            <Text text={props.description} className="text-center max-w-96" />
          </div>
        )}
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-2 gap-y-10 w-full items-start justify-items-center h-fit">
            {props.sectionCards &&
              props.sectionCards.map((sectionCard, index) => (
                // <SectionCard
                //   key={index}
                //   {...sectionCard}
                //   className={`${index === props.sectionCards.length - 1 && ""}`}
                // />

                <div
                  className=" bg-neutral-light w-full h-full relative rounded-xl p-6 border box-shadow-md max-w-lg flex items-center flex-col justify-between gap-3"
                  key={index}
                >
                  <div className="w-full flex justify-center">
                    {
                      {
                        Projecten: <FaProjectDiagram className="text-4xl " />,
                        Coaching: <FaHandsHelping className="text-4xl" />,
                        Buitenavonturen: <FaMountainSun className="text-4xl" />,
                      }[sectionCard.title]
                    }
                  </div>
                  {/* Line */}
                  <Title
                    className="text-xl border-t-4 w-fit border-primary"
                    text={sectionCard.title}
                    order={3}
                  ></Title>
                  <p className="text-neutral-500 text-sm max-w-full mb-auto pb-3">
                    {sectionCard.description}
                  </p>
                  {/* <CardItem translateZ="100" className="w-full h-full mt-4">
                        <Image
                          src={sectionCard.imageSrc}
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem> */}

                  <Button
                    text="Meer informatie"
                    url={sectionCard.buttonRef}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-fit text-nowrap "
                  ></Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
