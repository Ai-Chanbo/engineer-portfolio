import { renderOgImage, ogSize, ogContentType, ogAlt } from "@/lib/ogImage";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = ogAlt;

export default function Image() {
  return renderOgImage();
}
