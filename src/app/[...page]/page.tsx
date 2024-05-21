import {
  Content,
  fetchEntries,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import NotFound from "../not-found";
import MainWrapper from "@/components/layouts/MainWrapper";
import Banner from "@/components/molecules/banner/Banner";
import { loadComponents } from "../componentsConfig";
import { Metadata } from "next";
import { PageProps } from "@/types/page";
import { returnMetadata } from "@/lib/utils";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";

export async function generateStaticParams() {
  const pages = await fetchEntries({
    model: "page",
    apiKey,
    fields: "data.url",
  });

  // Generate the paths for the static pages
  const paths = pages
    .map((page) => {
      const urlSegments = page?.data?.url.split("/").filter(Boolean); // Remove empty strings, useful for the homepage
      if (urlSegments.length === 0) {
        // This is the root URL, so return null
        return null;
      }
      return {
        page: urlSegments,
      };
    })
    .filter(Boolean); //  Remove null values
  return paths;
}

// Generate metadata for the homepage by fetching the homepage entry
export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = props;
  const pageUrl = "/" + params?.page?.join("/") || "";

  const content = await fetchOneEntry({
    model: "page",
    apiKey,
    options: {
      fields: "data.title,data.description",
    },
    userAttributes: { urlPath: pageUrl },
  });

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

export default async function Page(props: PageProps) {
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
