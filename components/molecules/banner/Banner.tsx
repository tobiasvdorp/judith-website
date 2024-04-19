import Image from "next/image";
import Link from "next/link";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import React from "react";
import Parallax from "./Parallax";
type BannerProps =
  | {
      bannerType: "links";
      items: BannerItem[];
      imageUrl: string;
      alt: string;
      title: string;
    }
  | {
      bannerType: "description";
      description: string;
      imageUrl: string;
      alt: string;
      title: string;
    };

type BannerItem = {
  title: string;
  url: string;
};

export default function Banner(props: BannerProps) {
  return (
    <>
      <header className="h-screen w-screen flex items-center justify-center">
        <Image src={props.imageUrl} alt={props.alt} fill objectFit="cover" />
        <Parallax>
          <div className="md:px-10 px-3">
            <Title
              text={props.title}
              order={1}
              className="sm:text-7xl text-6xl drop-shadow-md text-center"
            />
            <div className="flex gap-x-3 gap-7-0 justify-center max-w-full flex-wrap">
              {/* If the type is links, show links */}
              {props.bannerType === "links" &&
                props.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    {/* If its the first or last one, show emoji */}
                    {(index === 0 || props.items.length) && (
                      <div className="relative">🌿</div>
                    )}

                    <Link href={item.url} className="drop-shadow-md">
                      {item.title}
                    </Link>
                    {/* Show emoji if its the last one */}
                    {index === props.items.length - 1 && (
                      <div className="relative">🌿</div>
                    )}
                  </div>
                ))}
              {/* If the type is description, show description */}
              {props.bannerType === "description" && (
                <Text className="text-3xl" text={props.description}></Text>
              )}
            </div>
          </div>
        </Parallax>
      </header>
    </>
  );
}
