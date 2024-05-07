import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
// import { loadComponents } from "./componentsConfig";
import { loadComponents } from "./componentsConfig";
import Image from "next/legacy/image";

interface MyPageProps {
  params: {
    page: string[];
  };
  searchParams: Record<string, string>;
}

const apiKey = "87f7e6ddda884039ad862d083035a471";

export default async function Page(props: MyPageProps) {
  const customComponents = await loadComponents();

  const urlPath = "/" + (props.params?.page?.join("/") || "");

  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  return (
    <>
      <Content
        content={content}
        model="page"
        apiKey={apiKey}
        customComponents={customComponents}
      />
    </>
  );
}
export const revalidate = 1;
