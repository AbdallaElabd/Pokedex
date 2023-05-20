"use client";

import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner text="Loading Pokédex..." />
    </div>
  );
}
