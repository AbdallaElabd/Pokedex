"use client";

import Image from "next/image";

import sadPikachu from "./sad-pikachu.png";

export default function Error() {
  return (
    <div className="flex flex-col items-center gap-7 py-8 text-center text-slate-800">
      <Image src={sadPikachu} width={256} height={256} alt="Not found" />
      <span className="font-sans  text-2xl font-light">Pokemon not found</span>
    </div>
  );
}
