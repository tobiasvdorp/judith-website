import { fetchEntries } from "@builder.io/sdk-react-nextjs";
import { get } from "http";
import Link from "next/link";

type BlogPost = {
  id: string;
  data: {
    mainImage: string;
    shortText: string;
    url: string;
    title: string;
  };
};

type BlogPostsProps = {
  blogposts: BlogPost[];
  title: string;
  shortText: string;
};
export default async function BlogPosts(props: BlogPostsProps) {
  // const blogposts = (await builder.getAll("blogpost", {
  //   fields: "id,data.title,data.shortText,data.url",
  // })) as BlogPost[];

  const blogposts = (await fetchEntries({
    model: "blogpost",
    apiKey: "87f7e6ddda884039ad862d083035a471",
  })) as BlogPost[];

  return (
    <>
      <h1>{props.title}</h1>
      <div>
        {blogposts.map((blogpost: BlogPost) => (
          <Link href={`/blog/${blogpost?.data?.url}`} key={blogpost.id}>
            <h2>{blogpost.data.title}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
