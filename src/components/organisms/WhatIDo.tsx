import SectionTitle from "@/components/ui/SectionTitle";
import type { SectionCardProps } from "../molecules/what-i-do/SectionCard";
import Text from "@/components/Standard/Text";
import { FaProjectDiagram, FaHandsHelping } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import Button from "../Standard/Button";
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
          <div className="flex flex-col lg:flex-row gap-2 gap-y-6 w-full  items-center justify-center ">
            {props.sectionCards &&
              props.sectionCards.map((sectionCard, index) => (
                // <SectionCard
                //   key={index}
                //   {...sectionCard}
                //   className={`${index === props.sectionCards.length - 1 && ""}`}
                // />

                <div
                  className=" bg-neutral-light w-full lg:h-64 relative rounded-xl p-6 border box-shadow-md max-w-xl"
                  key={index}
                >
                  <div className="text-xl font-rodetta text-neutral-600 flex items-center gap-4">
                    <div className="w-5">
                      {
                        {
                          Projecten: <FaProjectDiagram />,
                          Coaching: <FaHandsHelping />,
                          Buitenavonturen: <FaMountainSun />,
                        }[sectionCard.title]
                      }
                    </div>
                    {sectionCard.title}
                  </div>
                  <div className="text-neutral-500 text-sm max-w-full mb-auto">
                    {sectionCard.description}
                  </div>
                  {/* <CardItem translateZ="100" className="w-full h-full mt-4">
                        <Image
                          src={sectionCard.imageSrc}
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem> */}
                  <div className="flex lg:justify-between justify-end items-center w-full pt-2 lg:pb-0">
                    <Button
                      text="Meer informatie"
                      url={sectionCard.buttonRef}
                      className="lg:absolute lg:-bottom-5 lg:left-1/2 lg:-translate-x-1/2 w-fit text-nowrap "
                    ></Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
