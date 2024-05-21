import NotFound from "@/app/[...page]/not-found";
import { loadComponents } from "@/app/componentsConfig";
import MainWrapper from "@/components/layouts/MainWrapper";
import {
  Content,
  fetchEntries,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import { Metadata } from "next";

type PageProps = {
  params: {
    itemUrl: string[];
  };
  searchParams: Record<string, string>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = props;
  const pageUrl = "/" + params?.itemUrl?.join("/") || "";

  const content = await fetchOneEntry({
    model: "page",
    apiKey: "87f7e6ddda884039ad862d083035a471",
    options: {
      fields: "data.title,data.description",
    },
    userAttributes: { urlPath: pageUrl },
  });

  return {
    title: content?.data?.title || "Activiteit" + " - Judith van Dorp",
    description: content?.data?.description || "Activiteit",
    // image: content?.data?.bannerImage,
    openGraph: {
      type: "website",
      url: "https://judithvandorp.com",
      title: content?.data?.title || "Activiteit" + " - Judith van Dorp",
      description: content?.data?.description || "Activiteit",
      // image: content?.data?.metaImage,
    },
  };
}
export async function generateStaticParams() {
  const items = await fetchEntries({
    model: "agenda-item",
    apiKey: "87f7e6ddda884039ad862d083035a471",
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
    apiKey: "87f7e6ddda884039ad862d083035a471",
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { itemUrl },
    query: {
      "data.url": itemUrl,
    },
  });
  console.log(content);

  if (!content) {
    return NotFound();
  }

  return (
    <div>
      <MainWrapper>
        <Content
          content={content}
          model="agenda-item"
          apiKey={"87f7e6ddda884039ad862d083035a471"}
          customComponents={customComponents}
        />
      </MainWrapper>
    </div>
  );
}
export const revalidate = 1;
