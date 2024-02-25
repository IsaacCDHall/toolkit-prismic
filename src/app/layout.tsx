import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import clsx from "clsx";

const sen = Sen({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Showcase",
  description: "Isaac Hall's Prismic Project Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-stone-900 text-stone-100">
      <body className={clsx(sen.className, "relative min-h-screen")}>
        <Header />
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        {/* <div className="h-[100vh]"></div> */}
      </body>
    </html>
  );
}
