"use client";

import { useEffect, useState } from "react";

export function FoodImage({
  src,
  fallbackSrc,
  alt,
  className,
  priority = false,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  const [activeSrc, setActiveSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setActiveSrc(src);
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        aria-label={alt}
        className={`${className} grid place-items-center overflow-hidden bg-gradient-to-br from-cream via-white to-gold/35 ring-1 ring-maroon/10`}
      >
        <div className="relative grid h-16 w-16 place-items-center rounded-full bg-white shadow-sm ring-4 ring-gold/50">
          <div className="h-9 w-9 rounded-full border-4 border-maroon/85 bg-cream" />
          <div className="absolute -right-1 top-2 h-11 w-1.5 rounded-full bg-maroon/80" />
          <div className="absolute -right-3 top-3 h-5 w-1 rounded-full bg-maroon/80" />
          <div className="absolute -right-5 top-3 h-5 w-1 rounded-full bg-maroon/80" />
        </div>
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      onError={() => {
        if (fallbackSrc && activeSrc !== fallbackSrc) {
          setActiveSrc(fallbackSrc);
          return;
        }

        setFailed(true);
      }}
      className={className}
    />
  );
}
