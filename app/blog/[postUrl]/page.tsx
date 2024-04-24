import React from "react";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import Head from "next/head";

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    postUrl: string;
  };
}

export default async function BlogArticle(props: PageProps) {
  console.log(props.params.postUrl);
  const content = await builder
    .get("blogpost", {
      prerender: false,
      // Include references, like the `author` ref
      options: { includeRefs: true },
      query: {
        // Get the specific article by handle
        "data.handle": props?.params?.postUrl?.toString(),
      },
    })
    .toPromise();

  console.log(content);
  return (
    <>
      <Head>
        {/* Render meta tags from custom field */}
        <title>{content?.data.title}</title>
        <meta name="description" content={content?.data.blurb} />
        <meta name="og:image" content={content?.data.image} />
      </Head>
      <div>
        <div>{content?.data.comtent.toString()}</div>
        {/* Render the Builder drag/droped content */}
        <RenderBuilderContent content={content} model="blog-article" />
      </div>
    </>
  );
}
