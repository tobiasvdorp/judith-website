import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function returnMetadata(
  title: string,
  description: string,
  keywords?: string[],
  imageUrl?: string
) {
  return {
    title: title + " - Judith van Dorp",
    description: description,
    keywords: keywords || "",
    author: "Judith van Dorp",
    creator: "Judith van Dorp",
    publisher: "Judith van Dorp",
    openGraph: {
      type: "website",
      url: "https://judithvandorp.com",
      title: title + " - Judith van Dorp",
      description: description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}
