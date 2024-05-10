import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import NotFound from "@/app/[...page]/not-found";
import MainWrapper from "@/components/layouts/MainWrapper";
import Banner from "@/components/molecules/banner/Banner";
import { loadComponents } from "./componentsConfig";
import type { Metadata } from "next";

interface MyPageProps {
  params: {
    page: string[];
  };
  searchParams: Record<string, string>;
}

const apiKey = "87f7e6ddda884039ad862d083035a471";

// Generate metadata for the homepage by fetching the homepage entry
export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: {
      fields: "data.title,data.description", // Specificeer welke velden je wilt ophalen
    },
    query: {
      "data.title.$eq": "Home", // Zorg dat de query correct is geformatteerd
    },
  });

  return {
    title: content?.data?.title + " - Judith van Dorp" || "Home",
    description: content?.data?.description || "Homepage",
    // image: content?.data?.bannerImage,
    openGraph: {
      type: "website",
      url: "https://judithvandorp.com",
      title: content?.data?.title + " - Judith van Dorp" || "Home",
      description: content?.data?.description || "Homepage",
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
