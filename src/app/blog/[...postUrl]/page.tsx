import { loadComponents } from "@/app/componentsConfig";
import MainWrapper from "@/components/layouts/MainWrapper";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import Image from "next/legacy/image";
import {
  Content,
  fetchEntries,
  fetchOneEntry,
  getBuilderSearchParams,
} from "@builder.io/sdk-react-nextjs";
import NotFound from "@/app/not-found";
import { Metadata } from "next";
import { returnMetadata } from "@/lib/utils";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";

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

type PageProps = {
  params: {
    postUrl: string[];
  };
  searchParams: Record<string, string>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = props;
  const pageUrl = params?.postUrl?.join("/") || "";

  const content = await fetchOneEntry({
    model: "blogpost",
    apiKey,
    options: {
      fields: "data.title,data.shortText,data.tags,data.mainImage",
    },
    userAttributes: { pageUrl },
    query: {
      "data.url": pageUrl,
    },
  });

  // If the post doesn't exist, return a 404 page
  if (!content) {
    return returnMetadata(
      "Pagina niet gevonden",
      "Het lijkt erop dat deze pagina niet bestaat."
    ) as Metadata;
  } else {
    return returnMetadata(
      content.data?.title || "", // Title
      content.data?.shortText || "", // Description
      content.data?.tags, // Keywords
      content.data?.mainImage || "" // Image URL
    ) as Metadata;
  }
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
        <MainWrapper className="max-w-[750px] gap-2">
          <article className="w-full">
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
                className="pt-3"
              />
              <time dateTime={content.data?.date}>
                <Text text={content.data?.date} className="italic" />
              </time>
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
          </article>
        </MainWrapper>
      </div>
    </>
  );
}

export const revalidate = 1;
