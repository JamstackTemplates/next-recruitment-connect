/**
 * Collection of bespoke inline SVG motifs for Bridgework Recruitment:
 * - PlatformTicket (Edmondson card ticket: "LEEDS -> NEXT ROLE")
 * - BlueprintKeystone (rolled blueprint section + brick arch + yellow keystone)
 * - NamePlate (cast-iron oval maker's plate with rivets & monogram)
 * - BridgeOutArt (404 broken Warren truss + signal lamp + diversion sign)
 * - ContactBridgeArt (small truss bridge ending in an envelope)
 * - StationClock (decorative static clock for departure board header)
 */

export function PlatformTicket({
  tilted = false,
  compact = false,
  className = '',
}: {
  tilted?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 164"
      className={`block h-auto w-full ${compact ? 'max-w-[230px]' : 'max-w-[330px]'} ${
        tilted ? 'rotate-[4deg]' : ''
      } ${className}`}
      role="img"
      aria-label="Edmondson-style card ticket stamped LEEDS to NEXT ROLE, zero candidate fees."
    >
      {/* Offset screen-print shadow */}
      <rect x="10" y="12" width="302" height="144" rx="8" fill="var(--primary)" fillOpacity="0.32" />
      {/* Card ticket body */}
      <rect x="4" y="6" width="302" height="144" rx="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
      {/* Top green Edmondson stripe */}
      <path d="M4 14a8 8 0 0 1 8-8h286a8 8 0 0 1 8 8v28H4V14Z" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2.4" />
      {/* Bottom yellow stripe */}
      <path d="M4 126h302v16a8 8 0 0 1-8 8H12a8 8 0 0 1-8-8v-16Z" fill="var(--flap)" stroke="var(--ink)" strokeWidth="2.4" />
      {/* Punched notch / ticket hole */}
      <circle cx="276" cy="84" r="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.2" />
      {/* Vertical perforation line */}
      <line x1="242" y1="42" x2="242" y2="126" stroke="var(--ink)" strokeWidth="1.6" strokeDasharray="5 4" />
      {/* Top header lettering */}
      <text x="20" y="29" fill="#FFFFFF" fontSize="11.5" fontWeight="700" letterSpacing="2" style={{ fontFamily: 'var(--font-mono)' }}>
        BRIDGEWORK · PLATFORM TICKET
      </text>
      {/* Route text */}
      <text x="20" y="75" fill="var(--ink)" fontSize="22" fontWeight="800" style={{ fontFamily: 'var(--font-display)' }}>
        LEEDS → NEXT ROLE
      </text>
      <text x="20" y="102" fill="var(--muted)" fontSize="11.5" fontWeight="700" letterSpacing="1.2" style={{ fontFamily: 'var(--font-mono)' }}>
        NO CANDIDATE FEES · EVER
      </text>
      {/* Serial & fare stamp */}
      <text x="20" y="142" fill="#141917" fontSize="11" fontWeight="800" letterSpacing="1.6" style={{ fontFamily: 'var(--font-mono)' }}>
        CLASS: NAMED CONSULTANT
      </text>
      <text x="292" y="142" textAnchor="end" fill="#141917" fontSize="11" fontWeight="800" style={{ fontFamily: 'var(--font-mono)' }}>
        £0.00
      </text>
    </svg>
  );
}

export function BlueprintKeystone({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 340 190"
      className={`block h-auto w-full ${compact ? 'max-w-[235px]' : 'max-w-[340px]'} ${className}`}
      role="img"
      aria-label="Architectural blueprint drawing of a brick arch with a lamp-yellow keystone."
    >
      <defs>
        <pattern id="bp-mini-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0v12" fill="none" stroke="#FBF9F3" strokeOpacity="0.16" strokeWidth="0.8" />
        </pattern>
      </defs>
      {/* Rolled blueprint sheet */}
      <rect x="26" y="14" width="296" height="156" rx="6" fill="var(--enamel-plate)" stroke="var(--ink)" strokeWidth="2.4" />
      <rect x="26" y="14" width="296" height="156" rx="6" fill="url(#bp-mini-grid)" />
      {/* Rolled cylinder edge on left */}
      <rect x="10" y="10" width="26" height="164" rx="12" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
      <ellipse cx="23" cy="22" rx="7" ry="4" fill="var(--enamel-plate)" stroke="var(--ink)" strokeWidth="1.8" />
      <ellipse cx="23" cy="162" rx="7" ry="4" fill="var(--rule)" stroke="var(--ink)" strokeWidth="1.8" />

      {/* Technical dimension lines */}
      <g stroke="#D8E6F7" strokeWidth="1.2" opacity="0.78">
        <line x1="66" y1="36" x2="294" y2="36" />
        <line x1="66" y1="31" x2="66" y2="41" />
        <line x1="294" y1="31" x2="294" y2="41" />
        <line x1="294" y1="54" x2="294" y2="148" />
      </g>
      <text x="180" y="31" textAnchor="middle" fill="#D8E6F7" fontSize="9.5" letterSpacing="1.8" style={{ fontFamily: 'var(--font-mono)' }}>
        SPAN · 11 DAYS TO SHORTLIST
      </text>

      {/* Brick arch with lamp-yellow keystone */}
      <path
        d="M84 150V106a96 96 0 0 1 192 0v44h-38v-42a58 58 0 0 0-116 0v42H84Z"
        fill="var(--brick)"
        stroke="#FBF9F3"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Voussoir joint lines */}
      <g stroke="#FBF9F3" strokeWidth="1.4" opacity="0.85">
        <line x1="84" y1="126" x2="122" y2="126" />
        <line x1="238" y1="126" x2="276" y2="126" />
        <line x1="94" y1="84" x2="128" y2="96" />
        <line x1="266" y1="84" x2="232" y2="96" />
        <line x1="122" y1="56" x2="146" y2="78" />
        <line x1="238" y1="56" x2="214" y2="78" />
      </g>
      {/* Lamp-yellow keystone at apex */}
      <polygon
        points="164,46 196,46 190,82 170,82"
        fill="var(--flap)"
        stroke="#141917"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="180" cy="64" r="3.2" fill="#141917" />
      {/* Spec stamp */}
      <text x="180" y="136" textAnchor="middle" fill="#FBF9F3" fontSize="11" fontWeight="700" letterSpacing="1.6" style={{ fontFamily: 'var(--font-mono)' }}>
        SPEC · 16% / 12-WK REBATE
      </text>
    </svg>
  );
}

export function NamePlate({
  monogram,
  name,
  subtitle,
  compact = false,
}: {
  monogram: string;
  name: string;
  subtitle: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`group relative inline-flex items-center gap-3 rounded-full border-2 border-ink bg-board px-4 text-on-board shadow-[0_3px_0_var(--rule)] transition-transform ${
        compact ? 'py-2' : 'py-2.5 pr-5'
      }`}
    >
      {/* Left & right cast-iron mounting rivets */}
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-rivet ring-1 ring-flap/60" />
      {/* Raised brass/lamp-yellow monogram medallion */}
      <span
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-full border-2 border-flap bg-primary font-display font-extrabold text-on-primary ${
          compact ? 'h-9 w-9 text-sm' : 'h-11 w-11 text-base'
        }`}
      >
        {monogram}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-display text-[0.98rem] font-bold text-on-board group-hover:text-flap">
          {name}
        </span>
        <span className="block truncate font-mono text-[0.68rem] tracking-[0.09em] uppercase text-flap/90">
          {subtitle}
        </span>
      </span>
      <span aria-hidden="true" className="ml-auto h-2 w-2 shrink-0 rounded-full bg-rivet ring-1 ring-flap/60" />
    </div>
  );
}

/**
 * Oval cast-iron maker's plate, bolted under a girder: raised rim, two fixing bolts, a brass
 * monogram boss, the name in display type and the desk and year in tracked mono.
 */
export function MakersPlate({
  monogram,
  name,
  desk,
  since,
}: {
  monogram: string;
  name: string;
  desk: string;
  since: number;
}) {
  return (
    <span className="makers-plate">
      <span aria-hidden="true" className="makers-plate__bolt makers-plate__bolt--left" />
      <span aria-hidden="true" className="makers-plate__bolt makers-plate__bolt--right" />
      <span aria-hidden="true" className="makers-plate__boss">
        {monogram}
      </span>
      <span className="makers-plate__name">{name}</span>
      <span className="makers-plate__desk">{desk}</span>
      <span className="makers-plate__since">Since {since}</span>
    </span>
  );
}

export function BridgeOutArt() {
  return (
    <svg
      viewBox="0 0 640 270"
      className="mx-auto block h-auto w-full max-w-[600px]"
      role="img"
      aria-label="Illustration of a green riveted truss bridge with its middle span missing above the river, a glowing yellow signal lamp on the left pier, and a blue enamel Diversion sign."
    >
      <defs>
        <pattern id="out-water" width="12" height="10" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill="var(--water-dot)" fillOpacity="0.34" />
          <circle cx="9" cy="8" r="1.1" fill="var(--water-dot)" fillOpacity="0.25" />
        </pattern>
      </defs>

      {/* River below */}
      <rect x="0" y="198" width="640" height="72" rx="8" fill="var(--water-fill)" />
      <rect x="0" y="198" width="640" height="72" rx="8" fill="url(#out-water)" />
      <line x1="255" y1="226" x2="380" y2="226" stroke="var(--flap)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      <line x1="278" y1="240" x2="352" y2="240" stroke="var(--flap)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

      {/* Left intact bridge span */}
      <rect x="20" y="162" width="198" height="20" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2.4" />
      <path d="M24 162 L72 96 H204 L228 136" fill="none" stroke="var(--primary)" strokeWidth="10" strokeLinejoin="round" />
      <path d="M24 162 L72 96 H204 L228 136" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M72 96 L112 162 L152 96 L192 162 L214 128" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      {/* Broken girder ends */}
      <path d="M218 162 l14 6 l-10 8 l8 6" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
      {/* Left stone pier */}
      <rect x="44" y="182" width="38" height="84" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" />

      {/* Glowing lamp-yellow warning signal post on left span */}
      <line x1="184" y1="162" x2="184" y2="54" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="168" y="42" width="32" height="44" rx="6" fill="var(--board)" stroke="var(--ink)" strokeWidth="2.2" />
      <circle cx="184" cy="56" r="7" fill="var(--brick)" stroke="var(--ink)" strokeWidth="1.4" />
      <circle cx="184" cy="74" r="8" fill="var(--flap)" stroke="var(--ink)" strokeWidth="1.4" />
      {/* Lamp rays */}
      <g stroke="var(--flap)" strokeWidth="2.2" strokeLinecap="round">
        <line x1="208" y1="74" x2="222" y2="74" />
        <line x1="204" y1="62" x2="216" y2="55" />
        <line x1="204" y1="86" x2="216" y2="93" />
      </g>

      {/* Right intact bridge span */}
      <rect x="422" y="162" width="198" height="20" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2.4" />
      <path d="M412 136 L436 96 H568 L616 162" fill="none" stroke="var(--primary)" strokeWidth="10" strokeLinejoin="round" />
      <path d="M412 136 L436 96 H568 L616 162" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M426 128 L448 162 L488 96 L528 162 L568 96" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <rect x="558" y="182" width="38" height="84" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" />

      {/* Enamel DIVERSION sign over the gap */}
      <g transform="translate(248, 72)">
        <rect width="144" height="50" rx="8" fill="var(--enamel-plate)" stroke="#FBF9F3" strokeWidth="2.4" />
        <circle cx="10" cy="10" r="2" fill="var(--flap)" />
        <circle cx="134" cy="10" r="2" fill="var(--flap)" />
        <circle cx="10" cy="40" r="2" fill="var(--flap)" />
        <circle cx="134" cy="40" r="2" fill="var(--flap)" />
        <text x="72" y="24" textAnchor="middle" fill="var(--flap)" fontSize="11" fontWeight="800" letterSpacing="2" style={{ fontFamily: 'var(--font-mono)' }}>
          DIVERSION
        </text>
        <text x="72" y="40" textAnchor="middle" fill="#FBF9F3" fontSize="11.5" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
          ← TO CURRENT ROLES
        </text>
      </g>
    </svg>
  );
}

export function ContactBridgeArt() {
  return (
    <svg
      viewBox="0 0 360 116"
      className="block h-auto w-full max-w-[330px]"
      role="img"
      aria-label="Small arched truss bridge carrying a yellow route line straight into an enquiry envelope."
    >
      {/* Arched small footbridge */}
      <path d="M16 84 L58 34 H206 L248 84" fill="none" stroke="var(--primary)" strokeWidth="9" strokeLinejoin="round" />
      <path d="M16 84 L58 34 H206 L248 84" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M58 34 L94 84 L132 34 L170 84 L206 34" fill="none" stroke="var(--ink)" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="10" y="80" width="244" height="14" rx="2" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2" />
      {/* Route line leading to envelope */}
      <path d="M18 87 H282" stroke="var(--flap)" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="24" cy="87" r="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.2" />
      {/* Envelope interchange at end of route */}
      <g transform="translate(274, 52)">
        <rect width="74" height="52" rx="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.4" />
        <path d="M4 6 L37 32 L70 6" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="37" cy="30" r="6" fill="var(--flap)" stroke="var(--ink)" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

/** Decorative station clock for the departure board header (static hands at 10:10; no live time). */
export function StationClock() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" aria-hidden="true" className="shrink-0">
      <circle cx="18" cy="18" r="16" fill="#FBF9F3" stroke="var(--flap)" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="13.5" fill="none" stroke="#141917" strokeWidth="1.2" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="18"
          y1="5.5"
          x2="18"
          y2={deg % 90 === 0 ? '8.5' : '7.2'}
          stroke="#141917"
          strokeWidth={deg % 90 === 0 ? '1.8' : '1'}
          transform={`rotate(${deg} 18 18)`}
        />
      ))}
      <line x1="18" y1="18" x2="12.5" y2="13" stroke="#141917" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="18" y1="18" x2="25" y2="12.5" stroke="#141917" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="18" cy="18" r="2" fill="#9C4A2F" />
    </svg>
  );
}
