import type { ReactNode } from 'react';
import { business } from '../content/business';
import { BlueprintKeystone, PlatformTicket } from './art/motifs';
import { TrussDivider } from './art/truss-divider';
import { HeroPosterImage } from './hero-poster-image';
import { GoogleMap } from './google-map';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Children = { children: ReactNode };

/* ==================== 1. HOME HERO ==================== */

function HeroRoot({ imageAlt, children }: { imageAlt: string; children: ReactNode }) {
  return (
    <section className="hero-poster bg-paper-grain">
      {/* Desktop: full-bleed poster behind the copy. Smaller screens: copy first, poster below. */}
      <div className="hero-poster__art">
        <HeroPosterImage alt={imageAlt} />
      </div>
      <div className="hero-poster__copy wrap">{children}</div>
    </section>
  );
}

function HeroGrid({ children }: Children) {
  return <div className="flex max-w-[40rem] flex-col gap-6">{children}</div>;
}

function HeroHeading({ kicker, children }: { kicker?: string; children: ReactNode }) {
  return (
    <div>
      {kicker ? (
        <p className="hero-kicker mb-4 sm:mb-5">
          <span aria-hidden="true" className="hero-kicker__ring" />
          {kicker}
        </p>
      ) : null}
      <h1 className="hero-headline text-ink">{children}</h1>
    </div>
  );
}

function HeroBody({ children }: Children) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function HeroIntroduction({ children }: Children) {
  return <p className="max-w-[34rem] text-[1.03rem] leading-relaxed text-muted sm:text-[1.1rem]">{children}</p>;
}

function HeroActions({ children }: Children) {
  return <div className="flex flex-wrap items-center gap-3 pt-1">{children}</div>;
}

function HeroPrimary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="button">
      {children}
    </SiteLink>
  );
}

function HeroSecondary({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink href={href} className="button button-secondary">
      {children}
    </SiteLink>
  );
}

function HeroStatus() {
  return (
    <div className="pt-0.5">
      <OpenBadge hours={business.hours} variant="enamel" />
    </div>
  );
}

export const Hero = Object.assign(HeroRoot, {
  Grid: HeroGrid,
  Heading: HeroHeading,
  Body: HeroBody,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  Primary: HeroPrimary,
  Secondary: HeroSecondary,
  Status: HeroStatus,
});

/* ==================== 3. TWO-BANK DIPTYCH ==================== */

function DiptychRoot({ eyebrow, heading, children }: { eyebrow: string; heading: string; children: ReactNode }) {
  return (
    <section className="bg-paper-grain py-14 sm:py-20">
      <div className="wrap">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-2.5 text-[clamp(2rem,4.5vw,3.1rem)] font-extrabold text-ink">
            {heading}
          </h2>
        </div>
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
          {children}
        </div>
      </div>
    </section>
  );
}

function DiptychCandidateBank({
  title,
  ctaLabel,
  children,
}: {
  title: string;
  ctaLabel: string;
  children: ReactNode;
}) {
  return (
    <div className="rivet-frame flex flex-col justify-between p-6 sm:p-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="rounded bg-primary px-2.5 py-1 font-mono text-xs font-bold tracking-[0.14em] text-on-primary uppercase">
            Left bank · Candidates
          </span>
          <PlatformTicket compact />
        </div>
        <h3 className="mt-6 text-2xl font-extrabold text-ink sm:text-[1.7rem]">{title}</h3>
        <ul className="mt-5 space-y-3 text-ink">{children}</ul>
      </div>
      <div className="mt-8 pt-4 border-t border-dashed border-rule">
        <SiteLink href="/candidates/" className="button">
          {ctaLabel} →
        </SiteLink>
      </div>
    </div>
  );
}

function DiptychDivider() {
  return (
    <>
      <div className="hidden lg:flex">
        <TrussDivider variant="vertical" />
      </div>
      <div className="lg:hidden">
        <TrussDivider variant="thin" />
      </div>
    </>
  );
}

function DiptychEmployerBank({
  title,
  ctaLabel,
  children,
}: {
  title: string;
  ctaLabel: string;
  children: ReactNode;
}) {
  return (
    <div className="rivet-frame bg-blueprint-grid flex flex-col justify-between p-6 sm:p-8">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="rounded bg-enamel-plate px-2.5 py-1 font-mono text-xs font-bold tracking-[0.14em] text-[#FBF9F3] uppercase">
            Right bank · Employers
          </span>
          <BlueprintKeystone compact />
        </div>
        <h3 className="mt-6 text-2xl font-extrabold text-ink sm:text-[1.7rem]">{title}</h3>
        <ul className="mt-5 space-y-3 text-ink">{children}</ul>
      </div>
      <div className="mt-8 pt-4 border-t border-dashed border-rule">
        <SiteLink href="/employers/" className="button-enamel">
          {ctaLabel} →
        </SiteLink>
      </div>
    </div>
  );
}

function DiptychPoint({ children }: Children) {
  return (
    <li className="flex items-start gap-3 text-[1.02rem] leading-snug">
      <span
        aria-hidden="true"
        className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-flap ring-2 ring-ink"
      />
      <span>{children}</span>
    </li>
  );
}

export const Diptych = Object.assign(DiptychRoot, {
  CandidateBank: DiptychCandidateBank,
  Divider: DiptychDivider,
  EmployerBank: DiptychEmployerBank,
  Point: DiptychPoint,
});

/* ==================== 5. BY THE NUMBERS ==================== */

function NumbersRoot({ eyebrow, heading, note, children }: { eyebrow: string; heading: string; note?: string; children: ReactNode }) {
  return (
    <section className="bg-paper-grain py-14 sm:py-20">
      <div className="wrap">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-2 text-[clamp(2rem,4.5vw,3.1rem)] font-extrabold text-ink">{heading}</h2>
          </div>
          {note ? <p className="max-w-sm text-sm text-muted">{note}</p> : null}
        </div>
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-12">{children}</div>
      </div>
    </section>
  );
}

function NumberTile({
  figure,
  wide = false,
  children,
}: {
  figure: string;
  wide?: boolean;
  children: ReactNode;
}) {
  // "11 days" sets the unit smaller so the numeral keeps its scale.
  const [value, ...rest] = figure.split(' ');
  const unit = rest.join(' ');
  return (
    <div className={`number-girder ${wide ? 'md:col-span-7' : 'md:col-span-5'}`}>
      {/* Faint Warren truss behind the numeral, like a figure stencilled on a girder */}
      <svg
        aria-hidden="true"
        viewBox="0 0 360 120"
        className="pointer-events-none absolute inset-x-0 top-5 h-[clamp(5rem,11vw,8.5rem)] w-full opacity-[0.11]"
        preserveAspectRatio="none"
      >
        <path
          d="M0 110 L60 10 L120 110 L180 10 L240 110 L300 10 L360 110"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="9"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <line x1="0" y1="110" x2="360" y2="110" stroke="var(--primary)" strokeWidth="6" vectorEffect="non-scaling-stroke" />
      </svg>
      <p className="number-girder__figure">
        {value}
        {unit ? <span className="number-girder__unit"> {unit}</span> : null}
      </p>
      <p className="relative mt-3 max-w-md text-base font-medium text-ink">{children}</p>
    </div>
  );
}

export const NumbersBand = Object.assign(NumbersRoot, { Tile: NumberTile });

/* ==================== 8. FIND US AT GRANARY WHARF ==================== */

export type WalkStop = { name: string; detail: string };

/** Station-style walking strip: three stops on a lamp-yellow line, the last one an interchange. */
function WalkingRoute({ label, stops }: { label: string; stops: readonly WalkStop[] }) {
  return (
    <div className="walk-route">
      <p className="walk-route__label">{label}</p>
      <ol className="walk-route__line">
        {stops.map((stop, index) => (
          <li key={stop.name} className="walk-route__stop" data-last={index === stops.length - 1 ? '' : undefined}>
            <span aria-hidden="true" className="walk-route__ring" />
            <span className="walk-route__name">{stop.name}</span>
            <span className="walk-route__detail">{stop.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FindUsBand({
  eyebrow,
  heading,
  ctaLabel,
  walkLabel,
  walkStops,
  children,
}: {
  eyebrow: string;
  heading: string;
  ctaLabel: string;
  walkLabel: string;
  walkStops: readonly WalkStop[];
  children?: ReactNode;
}) {
  return (
    <section className="board-band border-t-2 border-ink py-14 sm:py-20">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow eyebrow-board">{eyebrow}</p>
          <h2 className="mt-2.5 text-[clamp(2rem,4vw,3rem)] font-extrabold text-balance text-on-board">
            {heading}
          </h2>
          {children ? <div className="mt-4 text-on-board-muted">{children}</div> : null}

          <div className="mt-6 space-y-5 rounded-ui border border-[#2C3631] bg-[#0F1412] p-5">
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.14em] text-flap uppercase">
                Address
              </p>
              <p className="mt-1.5 text-on-board">
                {business.address.lines.join(', ')}
              </p>
              <p className="mt-2 text-sm text-on-board-muted">{business.directions}</p>
            </div>

            <div className="border-t border-[#242D29] pt-4">
              <p className="font-mono text-xs font-bold tracking-[0.14em] text-flap uppercase">
                Office hours
              </p>
              <p className="mt-1.5 font-mono text-sm text-on-board">
                Monday–Friday 08:30–17:30 · Saturday & Sunday closed
              </p>
              <p className="mt-1 text-sm text-on-board-muted">{business.hoursNote}</p>
              <TimeZoneNote className="text-on-board-muted" />
              <div className="mt-3">
                <OpenBadge hours={business.hours} variant="board" />
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <SiteLink href="/roles/" className="button-flap">
              {ctaLabel} →
            </SiteLink>
            <SiteLink href="/contact/" className="button">
              Start a conversation
            </SiteLink>
          </div>
        </div>

        <div className="space-y-5 lg:col-span-7">
          <WalkingRoute label={walkLabel} stops={walkStops} />
          <div className="rivet-frame-board overflow-hidden p-2">
            <GoogleMap
              address={business.mapQuery}
              title="Map showing Granary Wharf, Leeds"
              className="overflow-hidden rounded-[0.2rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
