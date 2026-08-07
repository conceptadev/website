"use client";

import { useId, useState } from "react";
import type { CSSProperties } from "react";
import { NARROW_CAPTURE_QUERY, type Example } from "./content";

/* Both halves are real captures of the same class string: a browser rendering
   Tailwind on the left, Flutter rendering mix_tailwinds on the right. Narrow
   screens get the phone-width capture, because the desktop one shrinks past
   legibility and the comparison stops meaning anything.

   Built on a native range input so pointer, touch, and keyboard all work
   without reimplementing any of them, and screen readers announce a slider. */
export function ComparisonSeam({ example }: { example: Example }) {
  const [position, setPosition] = useState(52);
  const labelId = useId();

  const frameStyle = {
    "--mtw-ratio": example.ratio,
    "--mtw-ratio-sm": example.ratioSm,
  } as CSSProperties;

  return (
    <figure className="mtw-seam" style={frameStyle}>
      <picture>
        <source
          media={NARROW_CAPTURE_QUERY}
          srcSet={`/mix-tailwinds/${example.slug}-tailwind-sm.png`}
        />
        <img
          className="mtw-seam-layer"
          src={`/mix-tailwinds/${example.slug}-tailwind.png`}
          alt={`${example.title} rendered in a browser with Tailwind CSS`}
          draggable={false}
        />
      </picture>

      <picture className="mtw-seam-clip" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
        <source
          media={NARROW_CAPTURE_QUERY}
          srcSet={`/mix-tailwinds/${example.slug}-flutter-sm.png`}
        />
        <img
          className="mtw-seam-layer"
          src={`/mix-tailwinds/${example.slug}-flutter.png`}
          alt={`${example.title} rendered by Flutter with mix_tailwinds`}
          draggable={false}
        />
      </picture>

      <span className="mtw-seam-tag mtw-seam-tag-left" aria-hidden="true">
        Browser
      </span>
      <span className="mtw-seam-tag mtw-seam-tag-right" aria-hidden="true">
        Flutter
      </span>

      <span
        className="mtw-seam-line"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className="mtw-seam-grip">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9.5 8 6 12l3.5 4M14.5 8l3.5 4-3.5 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>

      <label className="mtw-sr" htmlFor={labelId} id={`${labelId}-l`}>
        Reveal the Flutter rendering of {example.title}
      </label>
      <input
        id={labelId}
        className="mtw-seam-input"
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={position}
        aria-labelledby={`${labelId}-l`}
        aria-valuetext={`Flutter revealed from ${Math.round(position)} percent`}
        onChange={(event) => setPosition(Number(event.target.value))}
      />
    </figure>
  );
}
