import NotFound from "@/app/not-found";
import { loadComponents } from "@/app/componentsConfig";
import MainWrapper from "@/components/layouts/MainWrapper";
import { returnMetadata } from "@/lib/utils";
import Image from "next/image";
import {
  Content,
  fetchEntries,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import { Metadata } from "next";
import Title from "@/components/Standard/Title";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";

type PageProps = {
  params: {
    itemUrl: string[];
  };
  searchParams: Record<string, string>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = props;
  const pageUrl = props.params.itemUrl.join("/");

  const content = await fetchOneEntry({
    model: "agenda-item",
    apiKey,
    options: {
      fields: "data.title,data.shortText,data.tags,data.mainImage",
    },
    query: {
      "data.url": pageUrl,
    },
  });

  if (!content) {
    return returnMetadata(
      "Pagina niet gevonden",
      "Het lijkt erop dat deze pagina niet bestaat."
    ) as Metadata;
  } else {
    return returnMetadata(
      content.data?.title ?? "",
      content.data?.shortText ?? "",
      content.data?.tags,
      content.data?.mainImage || ""
    ) as Metadata;
  }
}
export async function generateStaticParams() {
  const items = await fetchEntries({
    model: "agenda-item",
    apiKey,
    options: {
      limit: 100,
    },
    fields: "data.url",
  });

  return items.map((item) => ({
    itemUrl: item?.data?.url.split("/"),
  }));
}

export default async function Page(props: PageProps) {
  const customComponents = await loadComponents();
  const itemUrl = props.params.itemUrl.join("/");

  const content = await fetchOneEntry({
    model: "agenda-item",
    apiKey,
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { itemUrl },
    query: {
      "data.url": itemUrl,
    },
  });

  if (!content) {
    return NotFound();
  }

  return (
    <MainWrapper className="max-w-[750px] ">
      <div className="w-full flex items-center justify-center flex-col">
        {/* <div> */}
        <div className="w-full relative h-96">
          <Image
            src={content.data?.mainImage}
            alt="alt"
            layout="fill"
            objectFit="cover"
            priority={true}
            sizes={`(max-width: 850px) 90vw, 800px`}
          />
        </div>
        <Title
          text={content.data?.title || ""}
          order={1}
          className="text-left w-full pt-3"
        />

        <div className="w-full">
          <Content
            content={content}
            model="agenda-item"
            apiKey={apiKey}
            customComponents={customComponents}
          />
        </div>
      </div>
      {/* </div> */}
    </MainWrapper>
  );
}
export const revalidate = 1;
