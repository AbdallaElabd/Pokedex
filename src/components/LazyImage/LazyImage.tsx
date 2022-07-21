import { useEffect, useState } from "react";

import { Container, Shimmer, StyledImage } from "./styled";

interface LazyImageProps {
  image: string | undefined;
  className?: string;
}

export function LazyImage({ image, className }: LazyImageProps) {
  const [status, setStatus] = useState<AsyncStatus>(image ? "pending" : "idle");

  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    img.onload = () => setStatus("succeeded");
    img.onerror = () => setStatus("failed");
  }, [image]);

  return (
    <Container className={className} isLoading={status === "pending"}>
      <Shimmer isShown={status === "pending"} />
      {status !== "pending" && <StyledImage image={image} status={status} />}
    </Container>
  );
}
