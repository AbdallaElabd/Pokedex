/* eslint-disable react/jsx-props-no-spreading */
import { ImgHTMLAttributes, useEffect, useState } from "react";

import { Placeholder, StyledImage } from "./styled";

export function LazyImage({
  src,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!src) return;
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
    image.onerror = () => setError(true);
  }, [src]);
  if (!src || !loaded) return <Placeholder noImage={!src || error} {...rest} />;
  return <StyledImage src={src} {...rest} />;
}
