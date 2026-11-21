import type { SectorIcon } from '../../content/sectors';

/**
 * Six bespoke 1.5px-stroke railway-poster icons for Bridgework's sector desks.
 * Usable at 24px in filter chips and 36-48px on vitreous-enamel platform signs.
 */
export function SectorIconArt({
  icon,
  size = 24,
  className = '',
}: {
  icon: SectorIcon;
  size?: number;
  className?: string;
}) {
  const shared = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    'aria-hidden': true as const,
    className: `shrink-0 ${className}`,
  };

  switch (icon) {
    case 'cog':
      return (
        <svg {...shared}>
          {/* Screen-print offset accent fill */}
          <circle cx="15" cy="17" r="6" fill="var(--flap)" fillOpacity="0.35" />
          {/* Cog wheel */}
          <path
            d="M14 6.5v2.2a7.5 7.5 0 0 1 2.8 1.15l1.6-1.55 2.1 2.1-1.55 1.6a7.5 7.5 0 0 1 1.15 2.8h2.2v3h-2.2a7.5 7.5 0 0 1-1.15 2.8l1.55 1.6-2.1 2.1-1.6-1.55a7.5 7.5 0 0 1-2.8 1.15V26h-3v-2.2a7.5 7.5 0 0 1-2.8-1.15l-1.6 1.55-2.1-2.1 1.55-1.6A7.5 7.5 0 0 1 5.9 17.7H3.7v-3h2.2a7.5 7.5 0 0 1 1.15-2.8L5.5 10.3l2.1-2.1 1.6 1.55A7.5 7.5 0 0 1 12 8.7V6.5h2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="13" cy="16.2" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          {/* Caliper jaws on right */}
          <path
            d="M24 5v18m0-15h4m-4 4h2.5m-2.5 4h2.5m-2.5 4h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'ledger':
      return (
        <svg {...shared}>
          <rect x="6" y="7" width="10" height="19" rx="1" fill="var(--flap)" fillOpacity="0.28" />
          <path
            d="M4.5 6.5h10a2.5 2.5 0 0 1 2.5 2.5v16.5a2 2 0 0 0-2-2H4.5V6.5Zm23 0h-8.5A2.5 2.5 0 0 0 16.5 9v16.5a2 2 0 0 1 2-2h9V6.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 11h5.5M7.5 15h5.5M7.5 19h4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Tick column */}
          <path
            d="m19.5 11.5 1.6 1.6 3.2-3.4m-4.8 7.3 1.6 1.6 3.2-3.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'terminal':
      return (
        <svg {...shared}>
          <rect x="5.5" y="7.5" width="22" height="15" rx="2" fill="var(--flap)" fillOpacity="0.24" />
          <rect
            x="4"
            y="6"
            width="24"
            height="17"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M4 10.5h24M11 26.5h10M16 23v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="m10 14.5 3.2 2.4L10 19.3M16.5 19.3h5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'crane-hook':
      return (
        <svg {...shared}>
          <rect x="11.5" y="10.5" width="10" height="7" rx="1.5" fill="var(--flap)" fillOpacity="0.32" />
          {/* Hoist cables */}
          <path d="M13 3.5v6.5M19 3.5v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          {/* Pulley block */}
          <rect
            x="10"
            y="10"
            width="12"
            height="7"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="13.5" r="1.4" fill="currentColor" />
          {/* Hook */}
          <path
            d="M16 17v3a3.6 3.6 0 1 1-3.6 3.6c0-1.1.5-2 1.2-2.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'pallet':
      return (
        <svg {...shared}>
          <rect x="6.5" y="14.5" width="9" height="8" fill="var(--flap)" fillOpacity="0.28" />
          <rect x="16.5" y="6.5" width="9" height="8" fill="var(--flap)" fillOpacity="0.28" />
          {/* Stacked boxes */}
          <rect x="5.5" y="13.5" width="10" height="8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="15.5" y="13.5" width="11" height="8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="10.5" y="5.5" width="11" height="8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M16 5.5v3M10.5 13.5v3M21 13.5v3" stroke="currentColor" strokeWidth="1.4" />
          {/* Wooden pallet base */}
          <path
            d="M3.5 22h25v2.5h-25V22Zm2.5 2.5v3m10-3v3m10-3v3M3.5 27.5h25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'lamp':
      return (
        <svg {...shared}>
          <path d="M15.5 12.5 22 6.5l4.5 5-7 3.5Z" fill="var(--flap)" fillOpacity="0.38" />
          {/* Desk lamp arm and shade */}
          <path
            d="M9 26h13M13 26l-3.5-8.5 7.5-7.5M16 8.5l5.5-4L26 9l-5 4.5-5-5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Light cone & notepad */}
          <path d="M23.5 13.5 25.5 16M20.5 15.5l1 2.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <rect
            x="17"
            y="20.5"
            width="10.5"
            height="5.5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}
