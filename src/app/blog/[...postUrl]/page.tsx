import { loadComponents } from "@/app/componentsConfig";
import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";

// type MyPageProps = {
//   params: {
//     postUrl: string[];
//   };
//   searchParams: Record<string, string>;
//   title: string;
// };

const apiKey = "87f7e6ddda884039ad862d083035a471";

export default async function Page(props: any) {
  const customComponents = await loadComponents();

  const urlPath = "/" + (props.params?.postUrl?.join("/") || "");

  const content = await fetchOneEntry({
    model: "blogpost",
    apiKey,
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  return (
    <>
      <h1>{content?.data?.title}</h1>
      <Content
        content={content}
        model="blogpost"
        apiKey={apiKey}
        customComponents={customComponents}
      />
    </>
  );
}
export const revalidate = 1;
