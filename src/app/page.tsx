import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import NotFound from "@/app/not-found";
import MainWrapper from "@/components/layouts/MainWrapper";
import Banner from "@/components/molecules/banner/Banner";
import { loadComponents } from "@/app/componentsConfig";
import type { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";
import { PageProps } from "@/types/page";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";

// Generate metadata for the homepage by fetching the homepage entry
export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: {
      fields: "data.title,data.description",
    },
    // query: {
    //   "data.url": "/",
    // },
  });

  // If the homepage doesn't exist, return a 404 page
  if (!content) {
    return returnMetadata(
      "Pagina niet gevonden",
      "Het lijkt erop dat deze pagina niet bestaat."
    );
  } else {
    return returnMetadata(
      content.data?.title ?? "",
      content.data?.description ?? ""
    );
  }
}

export default async function HomePage(props: PageProps) {
  const customComponents = await loadComponents();
  const urlPath = "/" + (props.params?.page?.join("/") || "");

  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: getBuilderSearchParams({}),
    userAttributes: { urlPath },
    // query: {
    //   "data.url": "/",
    // },
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
