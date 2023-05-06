import { Link } from '@tanstack/router';
import { PropsWithChildren } from 'react';

import logo from './header-logo.png';

export function Page({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-full flex-col">
      <Link
        to="/"
        className="flex justify-center bg-gradient-to-bl from-blue-700 to-blue-800 p-4 sm:justify-start md:p-8"
      >
        <div className="flex -translate-x-10 items-center gap-2 sm:translate-x-0 sm:gap-4">
          <img src={logo} alt="Pokédex" className="h-full w-36" />
          <h1 className="text-4xl font-extralight text-white sm:text-5xl">
            Pokédex
          </h1>
        </div>
      </Link>
      <div className="flex-grow bg-gradient-to-br from-yellow-400 to-yellow-500 p-2 sm:p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
