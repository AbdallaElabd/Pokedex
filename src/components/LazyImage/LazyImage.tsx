import { ImgHTMLAttributes, useEffect, useState } from "react";

import { StyledImage } from "./styled";

export function LazyImage({
  src,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [status, setStatus] = useState<AsyncStatus>("idle");

  useEffect(() => {
    if (!src) return;
    const image = new Image();
    image.src = src;
    setStatus("pending");
    image.onload = () => setStatus("succeeded");
    image.onerror = () => setStatus("failed");
  }, [src]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledImage status={status} image={src} {...rest} />;
}
