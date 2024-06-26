"use client";
import Image from "next/legacy/image";
import Title from "@/components/Standard/Title";
import Text from "@/components/Standard/Text";
import React from "react";
import Parallax from "./Parallax";
import Arrow from "./Arrow";
type BannerProps = {
  imageUrl: string;
  title: string;
  description?: string;
};

export default function Banner(props: BannerProps) {
  return (
    <>
      {/* Container */}
      <header className="h-screen w-screen flex items-center justify-center bg-neutral-dark relative">
        {/* Background image */}
        <Image
          src={props.imageUrl}
          alt="banner"
          layout="fill"
          objectFit="cover"
          priority
          sizes="(max-width: 650px) 500px, 100vw"
        />
        <Arrow />

        <Parallax>
          <div className="md:px-10 px-3">
            <Title
              text={props.title}
              order={1}
              className="sm:text-7xl text-6xl drop-shadow-text text-center text-neutral opacity-100"
            />
            <div className="flex gap-x-3 gap-7-0 justify-center max-w-full flex-wrap">
              {props.description && (
                <Text
                  text={props.description}
                  className="text-lg drop-shadow-text text-white text-center"
                />
              )}
            </div>
          </div>
        </Parallax>
      </header>
    </>
  );
}
