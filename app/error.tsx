"use client";

import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Error() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </h1>
      <span className="text-xl font-medium">
        An error occurred. Please try again later.
      </span>
    </div>
  );
}
