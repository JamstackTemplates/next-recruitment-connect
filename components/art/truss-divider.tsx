/** Repeating riveted Warren-truss divider band (thin, deep, or vertical pillar). */
export function TrussDivider({
  variant = 'thin',
  className = '',
}: {
  variant?: 'thin' | 'deep' | 'vertical';
  className?: string;
}) {
  if (variant === 'vertical') {
    return (
      <div
        aria-hidden="true"
        className={`relative flex items-stretch justify-center ${className}`}
      >
        <svg
          className="h-full w-9 text-primary"
          viewBox="0 0 36 320"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="truss-vert" width="36" height="40" patternUnits="userSpaceOnUse">
              <rect width="36" height="40" fill="var(--truss-fill)" fillOpacity="0.16" />
              <line x1="3" y1="0" x2="3" y2="40" stroke="var(--truss-fill)" strokeWidth="4" />
              <line x1="33" y1="0" x2="33" y2="40" stroke="var(--truss-fill)" strokeWidth="4" />
              <path
                d="M3 0 L33 20 L3 40"
                fill="none"
                stroke="var(--truss-fill)"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <line x1="3" y1="20" x2="33" y2="20" stroke="var(--truss-stroke)" strokeWidth="1.5" />
              <circle cx="3" cy="10" r="1.5" fill="var(--rivet)" />
              <circle cx="33" cy="10" r="1.5" fill="var(--rivet)" />
              <circle cx="3" cy="30" r="1.5" fill="var(--rivet)" />
              <circle cx="33" cy="30" r="1.5" fill="var(--rivet)" />
            </pattern>
          </defs>
          <rect width="36" height="320" fill="url(#truss-vert)" />
        </svg>
      </div>
    );
  }

  const height = variant === 'deep' ? 38 : 16;
  const patternId = variant === 'deep' ? 'warren-deep' : 'warren-thin';
  const tileW = variant === 'deep' ? 64 : 36;

  return (
    <div aria-hidden="true" className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        width="100%"
        height={height}
        className="block w-full"
        preserveAspectRatio="none"
      >
        <defs>
          {variant === 'deep' ? (
            <pattern id={patternId} width={tileW} height={height} patternUnits="userSpaceOnUse">
              <rect width={tileW} height={height} fill="var(--truss-fill)" />
              <rect width={tileW} height="5" y="0" fill="var(--truss-stroke)" fillOpacity="0.4" />
              <rect width={tileW} height="5" y={height - 5} fill="var(--truss-stroke)" fillOpacity="0.4" />
              <path
                d={`M0 ${height - 5} L${tileW / 2} 5 L${tileW} ${height - 5}`}
                fill="none"
                stroke="var(--paper)"
                strokeOpacity="0.22"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d={`M0 ${height - 5} L${tileW / 2} 5 L${tileW} ${height - 5}`}
                fill="none"
                stroke="#101513"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <line x1={tileW / 2} y1="5" x2={tileW / 2} y2={height - 5} stroke="#101513" strokeWidth="1.5" />
              {/* Rivets along top and bottom flanges */}
              <circle cx="8" cy="2.5" r="1.3" fill="var(--flap)" />
              <circle cx="24" cy="2.5" r="1.3" fill="var(--flap)" />
              <circle cx="40" cy="2.5" r="1.3" fill="var(--flap)" />
              <circle cx="56" cy="2.5" r="1.3" fill="var(--flap)" />
              <circle cx="8" cy={height - 2.5} r="1.3" fill="var(--rivet)" />
              <circle cx="24" cy={height - 2.5} r="1.3" fill="var(--rivet)" />
              <circle cx="40" cy={height - 2.5} r="1.3" fill="var(--rivet)" />
              <circle cx="56" cy={height - 2.5} r="1.3" fill="var(--rivet)" />
            </pattern>
          ) : (
            <pattern id={patternId} width={tileW} height={height} patternUnits="userSpaceOnUse">
              <rect width={tileW} height={height} fill="var(--truss-fill)" />
              <line x1="0" y1="1.5" x2={tileW} y2="1.5" stroke="#101513" strokeWidth="1.5" />
              <line x1="0" y1={height - 1.5} x2={tileW} y2={height - 1.5} stroke="#101513" strokeWidth="1.5" />
              <path
                d={`M0 ${height - 2} L${tileW / 2} 2 L${tileW} ${height - 2}`}
                fill="none"
                stroke="var(--flap)"
                strokeOpacity="0.65"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="6" cy={height / 2} r="1.1" fill="var(--flap)" />
              <circle cx={tileW - 6} cy={height / 2} r="1.1" fill="var(--flap)" />
            </pattern>
          )}
        </defs>
        <rect width="100%" height={height} fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
