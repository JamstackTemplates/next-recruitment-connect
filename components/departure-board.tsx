import type { Role } from '../content/roles';
import { sectorById } from '../content/sectors';
import { teamMemberById } from '../content/team';
import {
  formatBoardPay,
  formatPay,
  formatRoleRef,
  formatUkDate,
} from '../lib/roles';
import { StationClock } from './art/motifs';
import { SiteLink } from './site-link';

const CONTRACT_LABEL: Record<Role['contract'], string> = {
  permanent: 'PERM',
  contract: 'CONTRACT',
  temporary: 'TEMP',
};

const WORK_MODE_LABEL: Record<Role['workMode'], string> = {
  'on-site': 'On-site',
  hybrid: 'Hybrid',
  remote: 'Remote',
};

const STATUS_LABEL: Record<Role['status'], string> = {
  open: 'OPEN',
  interviewing: 'INTERVIEWING',
  filled: 'FILLED',
};

const STATUS_CLASS: Record<Role['status'], string> = {
  open: 'flap-tile-open',
  interviewing: 'flap-tile-interviewing',
  filled: 'flap-tile-filled',
};

/** Spells text one flap per character. Screen readers get the plain text once. */
export function FlapChars({
  text,
  className = '',
  tileClassName = '',
  delay = 0,
  step = 22,
}: {
  text: string;
  className?: string;
  tileClassName?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <span className={`flap-chars ${className}`}>
      <span className="sr-only">{text}</span>
      {Array.from(text).map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          data-space={char === ' ' ? '' : undefined}
          className={`flap-tile ${tileClassName}`}
          style={{ '--flap-delay': `${delay + index * step}ms` } as React.CSSProperties}
        >
          {char === ' ' ? '\u00a0' : char}
        </span>
      ))}
    </span>
  );
}

const BOARD_COLUMNS =
  'lg:grid-cols-[7.6rem_minmax(0,2.3fr)_minmax(0,0.9fr)_5.6rem_minmax(0,1.2fr)_8.2rem_1.8rem]';

/**
 * Signature split-flap departure board.
 * Renders complete, readable, expandable (<details>) static HTML without JS.
 * When `flipKey` increments on client mount/filter, CSS triggers staggered flap-flip keyframes
 * strictly inside @media (prefers-reduced-motion: no-preference).
 */
export function DepartureBoard({
  roles,
  heading = 'DEPARTURES',
  headingId,
  headingLevel = 'h2',
  sublabel,
  flipping = false,
  footer,
}: {
  roles: readonly Role[];
  heading?: string;
  /** Lets a page section use the board title as its own heading. */
  headingId?: string;
  headingLevel?: 'h2' | 'h3';
  sublabel?: string;
  flipping?: boolean;
  footer?: React.ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <div className="board-interactive-view rivet-frame-board overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.45)]">
      {/* Riveted dark steel header bar with station clock */}
      <div className={`board-header flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2A332F] bg-[#0F1412] px-4 py-4 sm:px-6 sm:py-5 ${flipping ? 'board-flipping' : ''}`}>
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <StationClock />
          <div className="min-w-0">
            <Heading id={headingId} className="m-0 font-mono leading-none tracking-normal">
              <FlapChars text={heading} className="flap-title" step={30} />
            </Heading>
            {sublabel ? (
              <p className="mt-2 font-mono text-[0.72rem] tracking-[0.1em] text-on-board-muted uppercase">
                {sublabel}
              </p>
            ) : null}
          </div>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[0.7rem] tracking-[0.14em] text-on-board-muted uppercase sm:flex">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-flap" />
          <span>Select any row for ticket details</span>
        </div>
      </div>

      {/* Desktop column header rail */}
      <div
        aria-hidden="true"
        className={`hidden ${BOARD_COLUMNS} items-center gap-3 border-b border-[#252E2A] bg-[#0C100E] px-4 py-2 font-mono text-[0.68rem] font-bold tracking-[0.15em] text-on-board-muted uppercase lg:grid`}
      >
        <span>REF</span>
        <span>ROLE</span>
        <span>LOCATION</span>
        <span>TYPE</span>
        <span>PAY</span>
        <span>STATUS</span>
        <span />
      </div>

      {/* Role rows */}
      <div className={flipping ? 'board-flipping' : ''}>
        {roles.map((role, index) => {
          const refCode = formatRoleRef(role.id);
          const sector = sectorById(role.sectorId);
          const consultant = teamMemberById(role.consultantId);
          const boardPay = formatBoardPay(role.pay, role.hours);
          const fullPay = formatPay(role.pay, role.hours);
          const baseDelay = Math.min(index * 45, 360);

          return (
            <details
              key={role.id}
              data-status={role.status}
              className="board-row-details smooth-details"
            >
              <summary className="board-row-summary">
                <div className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 ${BOARD_COLUMNS}`}>
                  {/* Mobile Line 1: Ref + Title + Status; Desktop Col 1 & 2 */}
                  <div className="flex flex-wrap items-center gap-2 lg:contents">
                    <FlapChars text={refCode} className="text-[0.8rem]" delay={baseDelay} step={18} />

                    <div className="min-w-0">
                      <span
                        className="flap-tile flap-tile-ink max-w-full text-[0.8rem] sm:text-[0.84rem]"
                        style={{ '--flap-delay': `${baseDelay + 25}ms` } as React.CSSProperties}
                      >
                        <span className="min-w-0">{role.title}</span>
                      </span>
                    </div>
                  </div>

                  {/* Mobile Chevron placed top right; Desktop Col 7 */}
                  <span
                    aria-hidden="true"
                    className="board-row-chevron justify-self-end lg:order-last"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M4 2.5 8 6 4 9.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  {/* Mobile Line 2: Location · Type · Pay · Status; Desktop Cols 3-6 */}
                  <div className="col-span-2 flex flex-wrap items-center gap-2 lg:contents">
                    <span
                      className="flap-tile flap-tile-muted text-[0.74rem]"
                      style={{ '--flap-delay': `${baseDelay + 50}ms` } as React.CSSProperties}
                    >
                      {role.location}
                    </span>

                    <span
                      className="flap-tile flap-tile-muted text-[0.72rem]"
                      style={{ '--flap-delay': `${baseDelay + 75}ms` } as React.CSSProperties}
                    >
                      {CONTRACT_LABEL[role.contract]}
                    </span>

                    <span
                      className="flap-tile text-[0.74rem]"
                      style={{ '--flap-delay': `${baseDelay + 100}ms` } as React.CSSProperties}
                    >
                      {boardPay}
                    </span>

                    <span
                      className={`flap-tile text-[0.7rem] ${STATUS_CLASS[role.status]}`}
                      style={{ '--flap-delay': `${baseDelay + 125}ms` } as React.CSSProperties}
                    >
                      {STATUS_LABEL[role.status]}
                    </span>
                  </div>
                </div>
              </summary>

              {/* Expanded printed ticket panel */}
              <div className="role-ticket p-5 sm:p-6">
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold tracking-wider uppercase text-muted">
                      <span className="rounded bg-board px-2 py-0.5 text-flap">{refCode}</span>
                      {sector ? <span>{sector.name}</span> : null}
                      <span>·</span>
                      <span>{WORK_MODE_LABEL[role.workMode]}</span>
                      <span>·</span>
                      <span>{role.hours === 'part-time' ? 'Part-time' : 'Full-time'}</span>
                      <span>·</span>
                      <span>Posted {formatUkDate(role.posted)}</span>
                    </div>

                    <p className="mt-3 text-base font-medium text-ink">{role.summary}</p>

                    <ul className="mt-4 space-y-2 text-sm text-ink">
                      {role.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary ring-2 ring-flap/70"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col justify-between gap-4 border-t border-dashed border-rule pt-4 lg:col-span-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
                    <div className="space-y-2.5 text-sm">
                      <div>
                        <p className="font-mono text-[0.7rem] font-bold tracking-[0.12em] text-muted uppercase">
                          Pay band
                        </p>
                        <p className="font-mono text-base font-bold text-ink">{fullPay}</p>
                      </div>

                      {consultant ? (
                        <div>
                          <p className="font-mono text-[0.7rem] font-bold tracking-[0.12em] text-muted uppercase">
                            Desk consultant
                          </p>
                          <p className="mt-0.5">
                            <SiteLink
                              href={`/team/#${consultant.id}`}
                              className="text-link font-semibold"
                            >
                              {consultant.name}
                            </SiteLink>
                            <span className="block text-xs text-muted">{consultant.role}</span>
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <SiteLink href="/contact/" className="button w-full justify-center text-sm">
                        Enquire about {refCode} →
                      </SiteLink>
                      <p className="mt-2 font-mono text-[0.72rem] text-muted">
                        Quote the reference in your message.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          );
        })}
      </div>

      {footer ? (
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#2A332F] bg-[#0F1412] px-4 py-4 sm:px-6">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
