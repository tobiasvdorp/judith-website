import React from "react";
import { builder } from "@builder.io/sdk";
import { Link } from "lucide-react";
import Image from "next/legacy/image";

// Replace with your Public API Key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

const ARTICLES_PER_PAGE = 30;

export default async function Blog(props: PageProps) {
  // Get the page number from the path or query parameter
  // In this example we are hardcoding it as 1
  const pageNumber = 1;
  const articles = await builder.getAll("blogpost", {
    // Include references, like the `author` ref
    options: { includeRefs: true },
    // For performance, don't pull the `blocks` (the full blog entry content)
    // when listing out all blog articles
    // omit: "data.blocks",
    // limit: articlesPerPage,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.name}</h2>

          <p>{article.data?.content}</p>
        </div>
      ))}
    </div>
  );
}
