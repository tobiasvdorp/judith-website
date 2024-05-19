import { loadComponents } from "@/app/componentsConfig";
import MainWrapper from "@/components/layouts/MainWrapper";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import Image from "next/image";
import {
  Content,
  fetchEntries,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import NotFound from "@/app/[...page]/not-found";
import { Metadata } from "next";

const apiKey = "87f7e6ddda884039ad862d083035a471";

// Generate the static paths for the posts
export async function generateStaticParams() {
  const posts = await fetchEntries({
    model: "blogpost",
    apiKey,
    options: {
      limit: 100,
    },
    fields: "data.url",
  });

  return posts.map((post) => ({
    postUrl: post?.data?.url.split("/"),
  }));
}

// The props for the page
type PageProps = {
  params: {
    postUrl: string[];
  };
  searchParams: Record<string, string>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = props;
  const pageUrl = "/" + params?.postUrl?.join("/") || "";
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

export default async function Page(props: PageProps) {
  const customComponents = await loadComponents();

  // Get the post URL from the URL path
  const postUrl = props.params.postUrl.join("/");

  // Fetch the content for the post
  const content = await fetchOneEntry({
    model: "blogpost",
    apiKey,
    options: getBuilderSearchParams(props.searchParams),
    userAttributes: { postUrl },
    query: {
      "data.url": postUrl,
    },
  });

  // If the post doesn't exist, return a 404 page
  if (!content) {
    return NotFound();
  }

  // Render the post
  return (
    <>
      <div className="prose prose-md prose-h2:text-xl prose-li:m-1 prose-h3:text-lg prose-h4:text-base prose-p:m-0 prose-ul:m-0 prose-headings:font-rodetta prose-headings:font-bold prose-headings:m-0">
        <MainWrapper className="max-w-[850px] gap-2">
          <div className="w-full relative h-96">
            <Image
              src={content.data?.mainImage}
              alt="alt"
              layout="fill"
              objectFit="cover"
              priority={true}
              sizes={`(max-width: 850px) 90vw, 800px`}
            />
          </div>
          <div className="">
            <Title
              order={1}
              text={content.data?.title || ""}
              className="pt-6"
            />
            <Text text={content.data?.date} className="italic" />
          </div>
          <Text
            text={content.data?.shortText}
            className="font-semibold text-lg"
          />
          <Content
            content={content}
            model="blogpost"
            apiKey={apiKey}
            customComponents={customComponents}
          />
        </MainWrapper>
      </div>
    </>
  );
}

export const revalidate = 1;
