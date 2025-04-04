import { twMerge } from "tailwind-merge";
import Title from "@/components/Standard/Title";

type SectionTitleProps = {
  title: string;
  className?: string;
};

export default function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <>
      <div
        className={twMerge(
          "w-full flex flex-row justify-center items-center pb-4",
          className
        )}
      >
        {/* Line */}
        {/* <hr className="w-full text-center border border-black opacity-30" /> */}
        {/* Title */}
        <div className="w-fit text-nowrap px-3 md:px-8 text-center">
          <Title order={2} text={title} />
        </div>
        {/* Line */}
        {/* <hr className="w-full text-center border border-black opacity-30" /> */}
      </div>
    </>
  );
}
