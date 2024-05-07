import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar/NavBar";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fetchOneEntry } from "@builder.io/sdk-react-nextjs";
import "./globals.css";

const space = Space_Grotesk({
  weight: ["400"],
  variable: "--font-space",
  subsets: ["latin"],
});

const rodetta = localFont({
  src: "../../public/fonts/rodetta.woff",
  variable: "--font-rodetta",
  display: "swap",
});

export const metadata: Metadata = {
  // title: "Create Next App",
  // description: "Generated by create next app",
};
const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY || "";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navContent = await fetchOneEntry({
    apiKey,
    model: "navigation-links",
  });

  return (
    <html lang="en">
      <body
        className={`${space.variable} ${rodetta.variable} font-space bg-neutral`}
      >
        <Navbar
          links={navContent?.data?.links ?? []}
          logoSrc={navContent?.data?.logo ?? ""}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
