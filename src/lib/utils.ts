import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function returnMetadata(title: string, description: string) {
  return {
    title: title + " - Judith van Dorp",
    description: description,
    openGraph: {
      type: "website",
      url: "https://judithvandorp.com",
      title: title + " - Judith van Dorp",
      description: description,
    },
  };
}
