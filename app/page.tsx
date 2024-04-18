import React from "react";
import { builder } from "@builder.io/sdk";
import Head from "next/head";
import { RenderBuilderContent } from "@/components/builder";

// Replace with your Public API Key
builder.init("87f7e6ddda884039ad862d083035a471");

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const homepageContent = await builder
    .get("homepage", {
      prerender: false,
    })
    .toPromise();

  return (
    <>
      <Head>
        <title>{homepageContent?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <RenderBuilderContent model="homepage" content={homepageContent} />
    </>
  );
}
