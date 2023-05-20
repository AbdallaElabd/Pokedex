import pokeball from "./pokeball.png";
// import { useEffect, useState } from "react";

// import { pokemonCache } from "@/api/cache";

import classNames from "classnames";

interface SpinnerProps {
  className?: string;
}

import Image from "next/image";

export function Spinner({ className }: SpinnerProps) {
  // const [loaded, setLoaded] = useState<number | null>(null);
  // const [total, setTotal] = useState<number | null>(null);

  // useEffect(() => {
  //   const unsubscribe = pokemonCache.addEventListener((state) => {
  //     setLoaded(state.loaded);
  //     setTotal(state.total);
  //   });
  //   return () => unsubscribe();
  // }, []);

  return (
    <div className="column flex flex-col items-center gap-8 p-24">
      <Image
        width={300}
        height={300}
        className={classNames("h-36 w-36 animate-bounce", className)}
        src={pokeball}
        alt="Loading"
      />

      <div className="flex flex-col gap-1 font-mono text-2xl">
        <span>Loading Pokédex...</span>
        {/* {total !== null && <span>{`Loaded ${loaded}/${total} pokémon`}</span>} */}
      </div>
    </div>
  );
}
