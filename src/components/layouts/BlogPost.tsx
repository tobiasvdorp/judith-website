import Title from "../Standard/Title";
import { RenderBuilderContent } from "../builder";
import MainWrapper from "./MainWrapper";
import Text from "../Standard/Text";
import Image from "next/image";
import { BuilderContent } from "@builder.io/sdk";

type BlogPostProps = {
  mainImage: string;
  title: string;
  date: string;
  shortText: string;
  children: React.ReactNode;
};
export default function BlogPost(props: BlogPostProps) {
  return (
    <div className="prose prose-md prose-h2:text-xl prose-li:m-1 prose-h3:text-lg prose-h4:text-base prose-p:m-0 prose-ul:m-0 prose-headings:font-rodetta prose-headings:font-bold prose-headings:m-0">
      <MainWrapper className="max-w-[850px] gap-5">
        <div className="w-full relative h-96">
          <Image
            src={props.mainImage}
            alt="alt"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <div className="">
          <Title order={1} text={props.title} className="pt-4" />
          <Text text={props.date} className="italic" />
        </div>
        <Text text={props.shortText} className="font-semibold text-lg" />
        {props.children}
      </MainWrapper>
    </div>
  );
}
