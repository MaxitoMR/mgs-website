/**
 * Tiny water droplet SVG used as eyebrow accent across sections.
 * Replaces the plain horizontal dash line for a janitorial/clean theme.
 */
export function DropletAccent({
  color = "#69AF23",
  size = 14,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block mr-2 align-middle ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0C19 10.5 12 2 12 2Z"
        fill={color}
        fillOpacity={0.8}
      />
      {/* Small highlight reflection */}
      <ellipse cx="9.5" cy="14" rx="1.5" ry="2" fill="white" fillOpacity={0.35} />
    </svg>
  );
}

/**
 * Water ripple background pattern — concentric rings at low opacity.
 * Used behind stats or as a subtle section texture.
 */
export function RipplePattern({
  color = "#69AF23",
  opacity = 0.04,
  className = "",
}: {
  color?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Center ripple */}
      {[1, 2, 3, 4, 5].map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full"
          style={{
            width: `${ring * 20}%`,
            height: `${ring * 20}%`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            border: `1px solid ${color}`,
            opacity: opacity / ring,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Leaf vein pattern — thin diagonal lines like leaf structure.
 * Used as background texture on green sections.
 */
export function LeafVeinPattern({
  opacity = 0.06,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(135deg, rgba(255,255,255,${opacity}) 1px, transparent 1px),
          linear-gradient(45deg, rgba(255,255,255,${opacity * 0.5}) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 60px 60px',
        backgroundPosition: '0 0, 20px 20px',
      }}
    />
  );
}
