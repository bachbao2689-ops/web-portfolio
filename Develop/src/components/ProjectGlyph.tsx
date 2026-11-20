type ProjectGlyphProps = {
  variant?: number;
  className?: string;
};

/** A temporary visual signature; each project can replace this with its own mark. */
export default function ProjectGlyph({ variant = 0, className = "" }: ProjectGlyphProps) {
  const mark = ((variant % 5) + 5) % 5;

  return (
    <svg
      viewBox="0 0 240 240"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {mark === 0 && (
        <g>
          {Array.from({ length: 12 }, (_, index) => (
            <rect
              key={index}
              x="102"
              y="11"
              width="36"
              height="72"
              rx="18"
              transform={`rotate(${index * 30} 120 120)`}
            />
          ))}
          <circle cx="120" cy="120" r="23" />
        </g>
      )}
      {mark === 1 && (
        <g fill="none" stroke="currentColor" strokeWidth="15">
          <ellipse cx="120" cy="120" rx="105" ry="41" />
          <ellipse cx="120" cy="120" rx="105" ry="41" transform="rotate(60 120 120)" />
          <ellipse cx="120" cy="120" rx="105" ry="41" transform="rotate(120 120 120)" />
          <circle cx="120" cy="120" r="13" fill="currentColor" stroke="none" />
        </g>
      )}
      {mark === 2 && (
        <path d="M120 9 140 71 190 31 178 94 232 108 178 132 208 190 149 164 120 232 96 170 32 208 64 147 9 120 71 98 31 48 96 69Z" />
      )}
      {mark === 3 && (
        <g>
          {Array.from({ length: 25 }, (_, index) => {
            const column = index % 5;
            const row = Math.floor(index / 5);
            const edge = column === 0 || column === 4 || row === 0 || row === 4;
            const corner = (column === 0 || column === 4) && (row === 0 || row === 4);
            if (corner || (column === 2 && row === 2)) return null;
            return (
              <rect
                key={index}
                x={15 + column * 43}
                y={15 + row * 43}
                width="38"
                height="38"
                rx={edge ? 19 : 5}
              />
            );
          })}
        </g>
      )}
      {mark === 4 && (
        <g>
          {Array.from({ length: 8 }, (_, index) => (
            <path
              key={index}
              d="M120 120 127 11A109 109 0 0 1 192 38L151 106Z"
              transform={`rotate(${index * 45} 120 120)`}
            />
          ))}
          <circle cx="120" cy="120" r="28" />
        </g>
      )}
    </svg>
  );
}
