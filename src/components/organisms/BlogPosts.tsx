import { fetchEntries } from "@builder.io/sdk-react-nextjs";
import Link from "next/link";
import Image from "next/image";

type BlogPostProps = {
  title: string;
  shortText: string;
  imageUrl: string;
  url: string;
};

const apiKey = "87f7e6ddda884039ad862d083035a471";

export default async function BlogPosts() {
  const blogPosts = await fetchEntries({
    model: "blogpost",
    apiKey,
    options: {
      limit: 100,
    },
    fields: "id,data.title,data.shortText,data.url,data.mainImage",
  });
  console.log(blogPosts);
  if (!blogPosts) {
    return <>Geen posts gevonden.</>;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
        {blogPosts.map((post) => (
          <div key={post.id} className="w-full">
            <Link
              href={`/blog/${post.data?.url}`}
              className="overflow-hidden w-full flex flex-col items-center bg-neutral border border-gray-200 rounded-lg shadow hover:bg-neutral-dark card"
            >
              <div className="relative h-64 w-full ">
                <Image
                  src={post.data?.mainImage}
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col justify-between self-start px-4 py-3 leading-normal">
                <h2 className="font-rodetta text-xl font-bold">
                  {post.data?.title}
                </h2>
                <p className="text-base">{post.data?.shortText}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
