import "./globals.css";

import classNames from "classnames";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import pokedex from "./pokedex.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokédex",
  description: "Search for Pokémon using the PokéAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          "min-h-screen w-full min-w-[320px] bg-gradient-to-br from-yellow-400 to-yellow-500"
        )}
      >
        <div className="flex flex-col">
          <div className="flex justify-center bg-gradient-to-bl from-blue-700 to-blue-800 p-4 sm:justify-start md:px-12 md:py-6">
            <Link
              href="/"
              className="flex -translate-x-10 items-center gap-4 sm:translate-x-0 sm:gap-8"
            >
              <Image
                priority
                width={632}
                height={505}
                src={pokedex}
                alt="Pokédex"
                placeholder="blur"
                className="h-full w-36"
              />
              <h1 className="letter text-4xl font-light text-white sm:text-5xl">
                Pokédex
              </h1>
            </Link>
          </div>
          <div className="relative flex-grow p-2 sm:p-4 md:p-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
