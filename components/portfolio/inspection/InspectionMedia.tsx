"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PartGraphic } from "./partShapes";
import type { Camera } from "./inspectionData";

/**
 * Base media layer for a camera tile.
 * - `camera.image` set  → real screenshot via next/image (fill / object-contain).
 *   On load error it falls back to the SVG so the layout never breaks.
 * - `camera.image` unset → coded SVG part (no image request is made).
 * Overlays (scan / defect / status) are layered on top by the card.
 */
export function InspectionMedia({
  camera,
  index,
  dim,
}: {
  camera: Camera;
  index: number;
  dim: boolean;
}) {
  const [failed, setFailed] = useState(false);

  // Industrial-camera grade: slightly darker, higher contrast, lower saturation.
  const industrial = "[filter:contrast(1.14)_brightness(0.84)_saturate(0.78)]";

  if (camera.image && !failed) {
    return (
      <Image
        src={camera.image}
        alt={`${camera.id} ${camera.label} inspection image`}
        fill
        sizes="(max-width: 767px) 45vw, (max-width: 1199px) 22vw, 16vw"
        className={cn(
          "object-contain transition-opacity duration-300",
          industrial,
          dim && "opacity-35",
        )}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        "h-full w-full transition-opacity duration-300",
        industrial,
        dim && "opacity-35",
      )}
    >
      <PartGraphic part={camera.part} uid={index} />
    </svg>
  );
}
