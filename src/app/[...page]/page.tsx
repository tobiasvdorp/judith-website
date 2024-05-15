import {
  Content,
  fetchEntries,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import NotFound from "./not-found";
import MainWrapper from "@/components/layouts/MainWrapper";
import Banner from "@/components/molecules/banner/Banner";
import { loadComponents } from "../componentsConfig";
import { Metadata } from "next";

interface MyPageProps {
  params: {
    page: string[];
  };
  searchParams: Record<string, string>;
}

const apiKey = "87f7e6ddda884039ad862d083035a471";

// Generate metadata for the homepage by fetching the homepage entry
export async function generateMetadata(props: MyPageProps): Promise<Metadata> {
  const { params } = props;
  const pageUrl = "/" + params?.page?.join("/") || "";
  console.log(pageUrl);
  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: {
      fields: "data.title,data.description", // Specificeer welke velden je wilt ophalen
    },
    userAttributes: { urlPath: pageUrl },
  });

  console.log(content);
  return {
    title: content?.data?.title + " - Judith van Dorp" || "Pagina",
    description: content?.data?.description || "Pagina",
    // image: content?.data?.bannerImage,
    openGraph: {
      type: "website",
      url: "https://judithvandorp.com",
      title: content?.data?.title + " - Judith van Dorp" || "Pagina",
      description: content?.data?.description || "Pagina",
      // image: content?.data?.metaImage,
    },
  };
}

export default async function Page(props: MyPageProps) {
  const customComponents = await loadComponents();
  const urlPath = "/" + (props.params?.page?.join("/") || "");

  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { urlPath },
  });

  if (!content) {
    return NotFound();
  }

  return (
    <>
      <Banner
        imageUrl={content.data?.bannerImage}
        title={content.data?.bannerTitle}
        description={content.data?.bannerDescription}
      />
      <MainWrapper>
        <Content
          content={content}
          model="page"
          apiKey={apiKey}
          customComponents={customComponents}
        />
      </MainWrapper>
    </>
  );
}
export const revalidate = 1;
