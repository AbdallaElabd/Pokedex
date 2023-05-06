import { PropsWithChildren } from 'react';

import logo from './header-logo.png';

export function Page({ children }: PropsWithChildren) {
  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-center gap-4 p-4 sm:justify-start md:p-8">
        <img src={logo} alt="Pokédex" className="h-full w-36" />
        <h1 className="text-5xl font-extralight">Pokédex</h1>
      </div>
      <div className="flex-grow bg-slate-300 p-4 md:p-8">{children}</div>
    </div>
  );
}
