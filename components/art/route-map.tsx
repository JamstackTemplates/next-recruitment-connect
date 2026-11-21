'use client';

import { useEffect, useRef, useState } from 'react';

export interface RouteStop {
  label: string;
  detail?: string;
}

const DEFAULT_CANDIDATE_STOPS: readonly RouteStop[] = [
  { label: 'Register' },
  { label: 'Talk it through' },
  { label: 'Introductions' },
  { label: 'Interview' },
  { label: 'Offer & start' },
];

const DEFAULT_EMPLOYER_STOPS: readonly RouteStop[] = [
  { label: 'Brief' },
  { label: 'Shortlist' },
  { label: 'Interviews' },
  { label: 'Offer' },
  { label: '12-week check-in' },
];

/**
 * Reusable transit-style route map showing Candidate (girder green) and Employer (enamel blue)
 * branches with interchange rings, converging on the lamp-yellow "Start" interchange.
 * Static HTML is always visible; scroll-reveal draw-in enhances when JS runs and motion is allowed.
 */
export function RouteMap({
  mode = 'both',
  candidateStops = DEFAULT_CANDIDATE_STOPS,
  employerStops = DEFAULT_EMPLOYER_STOPS,
  orientation = 'horizontal',
}: {
  mode?: 'both' | 'candidates' | 'employers';
  candidateStops?: readonly RouteStop[];
  employerStops?: readonly RouteStop[];
  orientation?: 'horizontal' | 'vertical';
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealClass = armed
    ? visible
      ? 'route-map-armed route-map-visible'
      : 'route-map-armed'
    : '';

  if (mode !== 'both') {
    const isCandidate = mode === 'candidates';
    const stops = isCandidate ? candidateStops : employerStops;
    const lineColor = isCandidate ? 'var(--primary)' : 'var(--enamel-ink)';
    const badgeBg = isCandidate ? 'bg-primary text-on-primary' : 'bg-enamel-plate text-[#FBF9F3]';
    const branchLabel = isCandidate ? 'Candidate line' : 'Employer line';

    if (orientation === 'vertical') {
      return (
        <div ref={containerRef} className={`relative ${revealClass}`}>
          <p className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.14em] uppercase">
            <span className={`rounded px-2 py-0.5 ${badgeBg}`}>{branchLabel}</span>
            <span className="text-muted">{stops.length} stops to start</span>
          </p>
          <ol className="relative space-y-6 pl-10">
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[15px] w-1.5 rounded-full"
              style={{ backgroundColor: lineColor }}
            />
            {stops.map((stop, idx) => {
              const isFinal = idx === stops.length - 1;
              return (
                <li key={stop.label} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute top-1 -left-10 flex h-8 w-8 items-center justify-center rounded-full border-[3px] font-mono text-xs font-extrabold ${
                      isFinal
                        ? 'border-ink bg-flap text-[#141917]'
                        : 'bg-surface text-ink'
                    }`}
                    style={!isFinal ? { borderColor: lineColor } : undefined}
                  >
                    {idx + 1}
                  </span>
                  <div className="rounded-ui border border-rule bg-surface p-4 sm:p-5">
                    <h3 className="font-display text-lg font-bold text-ink">{stop.label}</h3>
                    {stop.detail ? <p className="mt-1.5 text-muted">{stop.detail}</p> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      );
    }

    /* Horizontal single-branch transit line (e.g. Employers page) */
    return (
      <div ref={containerRef} className={revealClass}>
        <div className="mb-4 flex items-center gap-3">
          <span className={`rounded px-2.5 py-1 font-mono text-xs font-bold tracking-[0.12em] uppercase ${badgeBg}`}>
            {branchLabel}
          </span>
          <span className="font-mono text-xs tracking-wider text-muted uppercase">
            Granary Wharf interchange
          </span>
        </div>
        <div className="relative">
          {/* Desktop connecting transit track */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-4 right-8 left-8 hidden h-6 w-[calc(100%-4rem)] md:block"
          >
            <line
              x1="0"
              y1="16"
              x2="1000"
              y2="16"
              stroke={lineColor}
              strokeWidth="6"
              strokeLinecap="round"
              className="route-line-draw"
            />
          </svg>
          <ol className="grid gap-4 md:grid-cols-5">
            {stops.map((stop, idx) => {
              const isFinal = idx === stops.length - 1;
              return (
                <li key={stop.label} className="relative flex flex-row items-start gap-3 md:flex-col md:items-start">
                  <span
                    aria-hidden="true"
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3.5px] font-mono text-xs font-extrabold ${
                      isFinal
                        ? 'border-ink bg-flap text-[#141917]'
                        : 'bg-surface text-ink'
                    }`}
                    style={!isFinal ? { borderColor: lineColor } : undefined}
                  >
                    0{idx + 1}
                  </span>
                  <div className="pt-1 md:pt-2">
                    <p className="font-display text-base font-bold text-ink">{stop.label}</p>
                    {stop.detail ? <p className="mt-1 text-sm text-muted">{stop.detail}</p> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }

  /* Both branches forked diagram (Home: horizontal on desktop, vertical stacked on mobile) */
  return (
    <div ref={containerRef} className={`w-full ${revealClass}`}>
      {/* Desktop horizontal forked transit diagram */}
      <div className="hidden lg:block">
        <svg
          viewBox="0 0 1120 270"
          className="h-auto w-full"
          role="img"
          aria-label="Route map of how Bridgework works: a candidate branch in green (Register, Talk it through, Introductions, Interview, Offer and start) and an employer branch in enamel blue (Brief, Shortlist, Interviews, Offer, 12-week check-in) joining at the Start interchange."
        >
          {/* Candidate green branch */}
          <path
            d="M 60 135 C 125 135, 135 66, 200 66 H 820 C 905 66, 920 135, 995 135 H 1065"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="7"
            strokeLinecap="round"
            className="route-line-draw"
          />
          {/* Employer enamel-blue branch */}
          <path
            d="M 60 135 C 125 135, 135 204, 200 204 H 820 C 905 204, 920 135, 995 135 H 1065"
            fill="none"
            stroke="var(--enamel)"
            strokeWidth="7"
            strokeLinecap="round"
            className="route-line-draw"
          />

          {/* Left entry node ("Enquiry") */}
          <circle cx="60" cy="135" r="14" fill="var(--surface)" stroke="var(--ink)" strokeWidth="4" />
          <circle cx="60" cy="135" r="5" fill="var(--flap)" />
          <text x="60" y="172" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="700" style={{ fontFamily: 'var(--font-mono)' }}>
            ENQUIRY
          </text>

          {/* Candidate stops */}
          {candidateStops.map((stop, i) => {
            const x = 225 + i * 150;
            return (
              <g key={stop.label}>
                <circle cx={x} cy="66" r="11" fill="var(--surface)" stroke="var(--primary)" strokeWidth="4" />
                <text x={x} y="34" textAnchor="middle" fill="var(--ink)" fontSize="14.5" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
                  {stop.label}
                </text>
              </g>
            );
          })}

          {/* Employer stops */}
          {employerStops.map((stop, i) => {
            const x = 225 + i * 150;
            return (
              <g key={stop.label}>
                <circle cx={x} cy="204" r="11" fill="var(--surface)" stroke="var(--enamel)" strokeWidth="4" />
                <text x={x} y="242" textAnchor="middle" fill="var(--ink)" fontSize="14.5" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
                  {stop.label}
                </text>
              </g>
            );
          })}

          {/* Branch line badges */}
          <rect x="200" y="92" width="128" height="22" rx="4" fill="var(--primary)" />
          <text x="264" y="107" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700" letterSpacing="1.2" style={{ fontFamily: 'var(--font-mono)' }}>
            CANDIDATES
          </text>
          <rect x="200" y="156" width="128" height="22" rx="4" fill="var(--enamel-plate)" />
          <text x="264" y="171" textAnchor="middle" fill="#FBF9F3" fontSize="11" fontWeight="700" letterSpacing="1.2" style={{ fontFamily: 'var(--font-mono)' }}>
            EMPLOYERS
          </text>

          {/* Right "Start" interchange ring */}
          <circle cx="1015" cy="135" r="22" fill="var(--flap)" stroke="var(--ink)" strokeWidth="4" />
          <circle cx="1015" cy="135" r="9" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
          <text x="1015" y="180" textAnchor="middle" fill="var(--ink)" fontSize="14" fontWeight="800" letterSpacing="1.5" style={{ fontFamily: 'var(--font-mono)' }}>
            START
          </text>
        </svg>
      </div>

      {/* Mobile / tablet vertical forked map */}
      <div className="grid gap-8 sm:grid-cols-2 lg:hidden">
        <div>
          <span className="inline-block rounded bg-primary px-2.5 py-1 font-mono text-xs font-bold tracking-[0.12em] uppercase text-on-primary">
            Candidate line
          </span>
          <ol className="relative mt-4 space-y-3.5 pl-8">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-1 rounded bg-primary" />
            {candidateStops.map((stop, idx) => (
              <li key={stop.label} className="relative font-display font-bold text-ink">
                <span
                  aria-hidden="true"
                  className="absolute top-0.5 -left-8 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-primary bg-surface font-mono text-[0.68rem] font-bold"
                >
                  {idx + 1}
                </span>
                {stop.label}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <span className="inline-block rounded bg-enamel-plate px-2.5 py-1 font-mono text-xs font-bold tracking-[0.12em] uppercase text-[#FBF9F3]">
            Employer line
          </span>
          <ol className="relative mt-4 space-y-3.5 pl-8">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-1 rounded bg-enamel" />
            {employerStops.map((stop, idx) => (
              <li key={stop.label} className="relative font-display font-bold text-ink">
                <span
                  aria-hidden="true"
                  className="absolute top-0.5 -left-8 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-enamel bg-surface font-mono text-[0.68rem] font-bold"
                >
                  {idx + 1}
                </span>
                {stop.label}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex items-center gap-3 rounded-ui border-2 border-ink bg-flap/20 p-3.5 sm:col-span-2">
          <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] border-ink bg-flap">
            <span className="h-2.5 w-2.5 rounded-full bg-ink" />
          </span>
          <p className="font-mono text-xs font-bold tracking-[0.12em] uppercase text-ink">
            Start interchange — both sides meet on day one, with a 12-week follow-up.
          </p>
        </div>
      </div>
    </div>
  );
}
