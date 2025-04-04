import { fetchEntries } from "@builder.io/sdk-react-nextjs";
import Link from "next/link";
import Image from "next/legacy/image";

export default async function BlogPosts() {
  const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";
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
              className="h-[400px] sm:h-96 group overflow-hidden w-full flex flex-col items-center rounded-lg shadow hover:bg-neutral-dark card bg-neutral-light drop-shadow-sm hover:scale-[1.01] duration-75 hover:border-gray-300 border-2 shadow-neutral-dark border-neutral-dark"
            >
              <div className="relative h-full w-full group-hover:bg-primary">
                <Image
                  src={post.data?.mainImage}
                  alt="alt"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-70 duration-200"
                  sizes="(max-width: 768px) 90vw, (min-width: 768px) 45vw, (min-width: 1100px) 500px"
                />
              </div>

              <div className="flex flex-col justify-between self-start p-4  duration-200 leading-normal relative w-full h-fit">
                <div className="absolute -top-2 group-hover:-top-4 right-2 px-2 bg-neutral-light rounded-xl group-hover:bg-neutral-dark duration-75 ">
                  {post.data?.date}
                </div>
                <h2 className="font-rodetta text-xl font-bold  duration-100">
                  {post.data?.title}
                </h2>
                <p className="text-base duration-200">{post.data?.shortText}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
