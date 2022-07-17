/* eslint-disable react/jsx-props-no-spreading */
import { ImgHTMLAttributes, useEffect, useState } from "react";

import { StyledImage } from "./styled";

export function LazyImage({
  src,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [asyncStatus, setAsyncStatus] = useState<
    "pending" | "success" | "failed"
  >("pending");
  useEffect(() => {
    if (!src) return;
    const image = new Image();
    image.src = src;
    image.onload = () => setAsyncStatus("success");
    image.onerror = () => setAsyncStatus("failed");
  }, [src]);

  return (
    <StyledImage
      isLoading={asyncStatus === "pending"}
      isError={asyncStatus === "failed"}
      src={src}
      {...rest}
    />
  );
}
