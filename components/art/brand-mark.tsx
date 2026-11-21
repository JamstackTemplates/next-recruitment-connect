/** Arched Warren-truss "B" emblem + Bridgework Recruitment wordmark. */
export function BrandMark({
  inverted = false,
  compact = false,
}: {
  inverted?: boolean;
  compact?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={compact ? 34 : 40}
        height={compact ? 34 : 40}
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="64"
          height="64"
          rx="10"
          fill="var(--flap)"
          stroke={inverted ? '#0A0D0C' : 'var(--ink)'}
          strokeWidth="3"
        />
        <path
          d="M16 14v36h18c9 0 14-4.5 14-10.5 0-4.2-2.8-7.4-7-8.8 3.2-1.4 5.2-4.2 5.2-7.8 0-5.4-4.6-8.9-12.5-8.9H16Z"
          fill="var(--primary)"
          stroke="#1B211E"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M23 20.5h9.2c4 0 6.3 1.4 6.3 4.2s-2.3 4.3-6.3 4.3H23v-8.5Zm0 14.5h10.5c4.5 0 7 1.7 7 4.8s-2.5 4.7-7 4.7H23V35Z"
          fill="var(--flap)"
          stroke="#1B211E"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M16 25l7-4.5M16 39l7-4M16 32h24"
          stroke="var(--flap)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="9.5" cy="9.5" r="1.8" fill="#1B211E" />
        <circle cx="54.5" cy="9.5" r="1.8" fill="#1B211E" />
        <circle cx="9.5" cy="54.5" r="1.8" fill="#1B211E" />
        <circle cx="54.5" cy="54.5" r="1.8" fill="#1B211E" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.28rem] font-extrabold tracking-tight ${
            inverted ? 'text-on-board' : 'text-ink'
          }`}
        >
          Bridgework
        </span>
        <span
          className={`mt-0.5 font-mono text-[0.63rem] font-bold tracking-[0.2em] uppercase ${
            inverted ? 'text-flap' : 'text-muted'
          }`}
        >
          Recruitment
        </span>
      </span>
    </span>
  );
}
