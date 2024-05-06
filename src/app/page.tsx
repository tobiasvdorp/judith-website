import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";

interface MyPageProps {
  params: {
    page: string[];
  };
  searchParams: Record<string, string>;
}

const apiKey = "87f7e6ddda884039ad862d083035a471";

export default async function Page(props: MyPageProps) {
  const urlPath = "/" + (props.params?.page?.join("/") || "");

  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  return <Content content={content} model="page" apiKey={apiKey} />;
}
export const revalidate = 1;
