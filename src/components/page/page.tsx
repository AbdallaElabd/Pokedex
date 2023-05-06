import { Link } from '@tanstack/router';
import { PropsWithChildren } from 'react';

import logo from './header-logo.png';

export function Page({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-full flex-col">
      <Link
        to="/"
        className="flex items-center justify-center gap-4 bg-gradient-to-bl from-blue-700 to-blue-800 p-4 sm:justify-start md:p-8"
      >
        <img src={logo} alt="Pokédex" className="h-full w-36" />
        <h1 className="text-5xl font-extralight text-white">Pokédex</h1>
      </Link>
      <div className="flex-grow bg-gradient-to-br from-yellow-400 to-yellow-500 p-2 sm:p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
