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
    <div>
      <MainWrapper className="gap-3 items-start max-w-[850px]">
        <Title text={content.data?.title || ""} order={1} />
        <div className="prose prose-md prose-h2:text-xl prose-li:m-1 prose-h3:text-lg prose-h4:text-base prose-p:m-0 prose-ul:m-0 prose-headings:font-rodetta prose-headings:font-bold prose-headings:m-0">
          <Content
            content={content}
            model="agenda-item"
            apiKey={apiKey}
            customComponents={customComponents}
          />
        </div>
      </MainWrapper>
    </div>
  );
}
export const revalidate = 1;
