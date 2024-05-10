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
    fields: "id,data.title,data.shortText,data.url,data.mainImage,data.date",
  });

  if (!blogPosts) {
    return <>Geen posts gevonden.</>;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center ">
        {blogPosts.map((post) => (
          <div key={post.id} className="w-full">
            <Link
              href={`/blog/${post.data?.url}`}
              className=" group overflow-hidden w-full flex flex-col items-center rounded-lg shadow hover:bg-neutral-dark card bg-neutral drop-shadow-sm hover:scale-[1.01] duration-75 hover:border-gray-300 border-2 shadow-neutral-dark border-neutral-dark"
            >
              <div className="relative h-64 w-full group-hover:bg-primary">
                <Image
                  src={post.data?.mainImage}
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-90 duration-200"
                />
              </div>

              <div className="flex flex-col justify-between self-start p-4  duration-200 leading-normal relative w-full">
                <div className="absolute top-0 right-2 opacity-55 ">
                  {post.data?.date}
                </div>
                <h2 className="font-rodetta text-xl font-bold group-hover:pl-2 duration-100">
                  {post.data?.title}
                </h2>
                <p className="text-base group-hover:pl-3 duration-200">
                  {post.data?.shortText}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
