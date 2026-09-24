"use client";

import { useId } from "react";

type StudyArtworkProps = {
  variant?: number;
  phase?: number;
  className?: string;
};

const palettes = [
  { paper: "#e5d0a7", main: "#bc4d29", ink: "#262b28", pale: "#eddfc3", shade: "#995132" },
  { paper: "#e5e1d6", main: "#89959a", ink: "#2d3b3f", pale: "#f4f0e6", shade: "#65767e" },
  { paper: "#efd9ca", main: "#dc785e", ink: "#243443", pale: "#f4e8db", shade: "#b9574d" },
  { paper: "#d7cddc", main: "#9a7ab7", ink: "#333039", pale: "#e7deeb", shade: "#725985" },
  { paper: "#d8d7bf", main: "#8d9e71", ink: "#334632", pale: "#e7e6d4", shade: "#647947" },
];

/** Vector composition studies stand in for the owner's final project assets. */
export default function StudyArtwork({ variant = 0, phase = 2, className = "" }: StudyArtworkProps) {
  const uid = useId().replace(/:/g, "");
  const index = ((variant % palettes.length) + palettes.length) % palettes.length;
  const palette = palettes[index];
  const wireframe = phase <= 0;
  const tonal = phase === 1;
  const ink = wireframe ? "#4b4d43" : palette.ink;
  const fill = (color: string) => ({
    fill: wireframe ? "none" : color,
    stroke: wireframe ? ink : "none",
    strokeWidth: wireframe ? 1.5 : undefined,
  });
  const main = tonal ? palette.shade : palette.main;
  const dark = tonal ? palette.main : palette.ink;
  const patternId = `study-grain-${uid}`;
  const cropId = `study-crop-${uid}`;
  const bandId = `study-bands-${uid}`;

  return (
    <svg
      viewBox="0 0 700 800"
      className={className}
      role="img"
      aria-label={`Abstract composition study ${index + 1}, ${wireframe ? "structural drawing" : tonal ? "color exploration" : "final composition"}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={patternId} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.55" fill={palette.ink} opacity="0.12" />
          <circle cx="4.5" cy="5" r="0.4" fill={palette.pale} opacity="0.35" />
        </pattern>
        <pattern id={bandId} width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 0V16" stroke={palette.pale} strokeWidth="1.2" opacity="0.55" />
        </pattern>
        <clipPath id={cropId}>
          <rect x="0" y="0" width="700" height="800" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${cropId})`}>
        <rect width="700" height="800" fill={wireframe ? "#efede4" : palette.paper} />
        {index === 0 && (
          <g>
            <circle cx="505" cy="190" r="103" {...fill(main)} />
            <path d="M80 625V308a177 177 0 0 1 354 0v317Z" {...fill(dark)} />
            <path d="M156 625V319a101 101 0 0 1 202 0v306Z" {...fill(palette.paper)} />
            <path d="M0 672 700 469V800H0Z" {...fill(main)} />
            <path d="m358 625 76-47 266 76v146H358Z" {...fill(palette.shade)} />
            <path d="m156 625 202-65v65L0 752V680Z" {...fill(palette.pale)} />
            {!wireframe && <path d="M80 625V308a177 177 0 0 1 354 0v317Z" fill={`url(#${bandId})`} opacity="0.22" />}
          </g>
        )}
        {index === 1 && (
          <g>
            <path d="M-95 235a345 345 0 0 1 690 0v115H-95Z" {...fill(main)} />
            <circle cx="250" cy="235" r="174" {...fill(palette.paper)} />
            <path d="M380 800V280a95 95 0 0 1 190 0v520Z" {...fill(dark)} />
            <path d="M429 800V287a46 46 0 0 1 92 0v513Z" {...fill(palette.pale)} />
            <path d="M0 600 700 388V522L0 734Z" {...fill(palette.pale)} />
            <path d="M0 600 700 388v35L0 635Z" {...fill(palette.shade)} />
            <circle cx="126" cy="511" r="60" {...fill(dark)} />
            <path d="m-40 776 740-228" fill="none" stroke={ink} strokeWidth={wireframe ? 1.5 : 2} />
          </g>
        )}
        {index === 2 && (
          <g>
            <rect x="69" y="94" width="562" height="602" rx="281" {...fill(main)} />
            <circle cx="350" cy="337" r="208" {...fill(dark)} />
            <circle cx="350" cy="337" r="144" {...fill(palette.pale)} />
            <circle cx="350" cy="337" r="82" {...fill(main)} />
            <path d="M-90 772 657 198l133 173L44 945Z" {...fill(palette.paper)} />
            <path d="m69 745 558-428 36 47-558 428Z" {...fill(palette.shade)} />
            <path d="M84 754 631 334" fill="none" stroke={ink} strokeWidth={wireframe ? 1.5 : 3} />
            <circle cx="562" cy="650" r="40" {...fill(dark)} />
          </g>
        )}
        {index === 3 && (
          <g>
            <circle cx="350" cy="378" r="267" {...fill(main)} />
            <path d="M84 800V374a266 266 0 0 1 266-266v692Z" {...fill(dark)} />
            <path d="M156 800V374a194 194 0 0 1 194-194v620Z" {...fill(main)} />
            <path d="M228 800V374a122 122 0 0 1 122-122v548Z" {...fill(palette.paper)} />
            <path d="M350 377h267a267 267 0 0 1-267 267Z" {...fill(palette.shade)} />
            <path d="M350 449h184a195 195 0 0 1-184 123Z" {...fill(palette.pale)} />
            <circle cx="474" cy="250" r="38" {...fill(palette.pale)} />
            <path d="M0 729h700v71H0Z" {...fill(dark)} />
          </g>
        )}
        {index === 4 && (
          <g>
            <circle cx="350" cy="332" r="253" {...fill(palette.pale)} />
            <path d="M-31 728 350 106l382 622Z" {...fill(main)} />
            <path d="M123 728 350 358l227 370Z" {...fill(palette.paper)} />
            <path d="M350 106v622h382Z" {...fill(palette.shade)} />
            <path d="M350 358v370h227Z" {...fill(dark)} />
            <circle cx="166" cy="209" r="56" {...fill(dark)} />
            <path d="m0 561 700 134v105H0Z" {...fill(dark)} />
            <path d="m0 618 700 134v48H0Z" {...fill(main)} />
            <path d="M0 570 700 704" fill="none" stroke={wireframe ? ink : palette.pale} strokeWidth="1.5" />
          </g>
        )}
        {wireframe && (
          <g stroke={ink} strokeWidth="0.75" opacity="0.35" fill="none" strokeDasharray="4 7">
            <path d="M350 25V775M25 400H675" />
            <rect x="40" y="40" width="620" height="720" />
            <circle cx="350" cy="400" r="280" />
          </g>
        )}
        {!wireframe && <rect width="700" height="800" fill={`url(#${patternId})`} />}
        <g fill={ink} fontFamily="Arial, sans-serif" fontSize="9" letterSpacing="1.9">
          <text x="34" y="35">FORM — SPACE — FEELING</text>
          <text x="666" y="35" textAnchor="end">0{index + 1}</text>
        </g>
      </g>
    </svg>
  );
}
