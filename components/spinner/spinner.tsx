"use client";

import pokeball from "./pokeball.png";

import classNames from "classnames";

interface SpinnerProps {
  className?: string;
  text: string;
}

import Image from "next/image";

export function Spinner({ className, text }: SpinnerProps) {
  return (
    <div className="column flex flex-col items-center gap-8 p-24 text-slate-800">
      <Image
        width={300}
        height={300}
        className={classNames("h-36 w-36 animate-bounce", className)}
        src={pokeball}
        alt="Loading"
      />

      <div className="flex flex-col gap-1 font-mono text-2xl">
        <span>{text}</span>
      </div>
    </div>
  );
}
