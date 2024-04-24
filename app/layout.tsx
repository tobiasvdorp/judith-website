import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar/NavBar";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { builder } from "@builder.io/sdk";
import { SpeedInsights } from "@vercel/speed-insights/next";
const space = Space_Grotesk({
  weight: ["400"],
  variable: "--font-space",
  subsets: ["latin"],
});

const rodetta = localFont({
  src: "../public/fonts/rodetta.woff",
  variable: "--font-rodetta",
  display: "swap",
});

export const metadata: Metadata = {
  // title: "Create Next App",
  // description: "Generated by create next app",
};
builder.init("87f7e6ddda884039ad862d083035a471");

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navContent = await builder.getAll("navigation-links", {
    prerender: false,
  });

  return (
    <html lang="en">
      <body
        className={`${space.variable} ${rodetta.variable} font-space bg-neutral`}
      >
        {" "}
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <Navbar
          links={navContent[0]?.data?.links ?? []}
          logoSrc={navContent[0]?.data?.logo ?? ""}
          // showThemeToggler={navContent[0]?.data.showThemeToggler}
        />
        {children}
        {/* </ThemeProvider> */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
