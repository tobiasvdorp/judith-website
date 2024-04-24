import React from "react";
import { builder } from "@builder.io/sdk";
import MainWrapper from "@/components/layouts/MainWrapper";
import Link from "next/link";

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export type BlogPost = {
  id: string;

  data: {
    mainImage: string;
    shortText: string;
    url: string;
    title: string;
  };
};

export default async function Page(props: PageProps) {
  const blogposts = (await builder.getAll("blogpost", {
    fields: "id,data.title,data.shortText,data.url",
  })) as BlogPost[];

  console.log(blogposts);
  return (
    <MainWrapper>
      <div>
        {blogposts.map((blogpost: BlogPost) => (
          <Link href={`/blog/${blogpost?.data?.url}`} key={blogpost.id}>
            <h2>{blogpost.data.title}</h2>
          </Link>
        ))}
      </div>
    </MainWrapper>
  );
}
