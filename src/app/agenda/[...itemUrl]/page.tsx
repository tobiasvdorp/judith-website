import NotFound from "@/app/[...page]/not-found";
import { loadComponents } from "@/app/componentsConfig";
import MainWrapper from "@/components/layouts/MainWrapper";
import {
  Content,
  fetchEntries,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";

type PageProps = {
  params: {
    itemUrl: string[];
  };
  searchParams: Record<string, string>;
};

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

  if (!content) {
    return NotFound();
  }

  return (
    <div>
      <h1 className="pt-40">{content?.data?.title}</h1>
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
