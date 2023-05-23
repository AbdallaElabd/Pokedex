import * as blurhash from "blurhash";
import { createCanvas, Image, loadImage } from "canvas";

export const getImageInfo = async (imageUrl: string) => {
  const getImageData = (image: Image) => {
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  };

  const image = await loadImage(imageUrl);
  console.log(" image = ", image.width, image.height);
  const imageData = getImageData(image);
  const blurDataURL = blurhash.encode(
    imageData.data,
    imageData.width,
    imageData.height,
    4,
    4
  );

  return {
    blurDataURL,
    width: image.width,
    height: image.height,
  };
};
