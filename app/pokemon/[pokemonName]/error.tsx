"use client";

import sadPikachu from "./sad-pikachu.png";

import Image from "next/image";

export default function Error() {
  return (
    <div className="flex flex-col items-center gap-2 gap-7 py-8 text-center text-slate-800">
      <Image src={sadPikachu} width={256} height={256} alt="Not found" />
      <span className="font-sans  text-2xl font-light">Pokemon not found</span>
    </div>
  );
}
