"use client";

import Image from "next/image";
import { useState } from "react";

interface MarketImageProps {
  src: string | null;
  alt: string;
}

export default function MarketImage({ src, alt }: MarketImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-poly-blue/20 to-purple-500/20 flex items-center justify-center shrink-0 border border-white/[0.06]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-poly-text-tertiary"
        >
          <path
            d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/[0.06] relative">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 64px, 80px"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
