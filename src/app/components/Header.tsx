import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <header className=" z-50 mx-auto max-w-7xl sticky top-4">
      <nav>
        <ul>
          <li>
            <Link
              href="/"
              aria-label="Home Page"
              className="block bg-gradient-to-tr hover:bg-gradient-to-tl from-pink-500 via-teal-500 to-indigo-600 duration-500 bg-clip-text text-2xl font-bold uppercase text-transparent md-text-4xl opacity-1"
            >
              {settings.data.name}
            </Link>
          </li>
          <div className="flex flex-row-reverse gap-5 w-[30w] -mt-7">
            {settings.data.nav_item.map(
              ({ link, label }, index) => (
                console.log(link, label),
                (
                  <li key={index}>
                    <PrismicNextLink field={link} key={label}>
                      {label}
                    </PrismicNextLink>
                  </li>
                )
              )
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}
