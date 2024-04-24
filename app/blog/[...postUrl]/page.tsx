import { Builder, builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import MainWrapper from "@/components/layouts/MainWrapper";
import { BlogPost } from "../page";
import Image from "next/image";
import { BuilderContent } from "@builder.io/react";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    postUrl: string;
  };
}

export async function generateStaticParams() {
  const articles = await builder.getAll("blogpost", {});

  return articles.map((article) => ({
    params: {
      postUrl: article?.data?.url,
    },
  }));
}

type BlogPostFull = BlogPost & {
  data: {
    date: string;
    content: BuilderContent;
    tags: string[];
  };
};

export default async function BlogArticle(props: PageProps) {
  const content: BlogPostFull = await builder
    .get("blogpost", {
      prerender: false,
      // Include references, like the `author` ref
      options: { includeRefs: true },
      query: {
        // Get the specific article by handle
        "data.url": props?.params?.postUrl?.toString(),
      },
    })
    .toPromise();

  console.log(content);

  const formattedDate = new Date(content.data.date).toLocaleDateString(
    "Nl-nl",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <>
      <div className="prose prose-headings:font-rodetta prose-headings:font-bold text-neutral-content">
        <MainWrapper className="max-w-[850px] gap-5">
          <div className="w-full relative h-96">
            <Image
              src={content.data.mainImage}
              alt="alt"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="">
            <Title order={1} text={content.data.title} />
            <Text text={formattedDate} className="italic" />
          </div>
          <Text
            text={content.data.shortText}
            className="font-semibold text-lg "
          />

          <RenderBuilderContent content={content} model="blogpost" />
        </MainWrapper>
      </div>
    </>
  );
}
