import type { ReactNode } from 'react';
import { PlatformTicket } from './art/motifs';
import { SiteLink } from './site-link';

type Children = { children: ReactNode };

/* ==================== TICKET STUBS (CANDIDATES PROMISES) ==================== */

function TicketStubsRoot({ eyebrow, heading, children }: { eyebrow: string; heading: string; children: ReactNode }) {
  return (
    <section className="bg-paper-grain py-14 sm:py-20">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2.5 text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold text-ink">{heading}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
      </div>
    </section>
  );
}

function TicketStub({
  serial,
  title,
  stagger = false,
  children,
}: {
  serial: string;
  title: string;
  stagger?: boolean;
  children: ReactNode;
}) {
  return (
    <article
      className={`ticket-stub flex flex-col justify-between overflow-hidden ${
        stagger ? 'lg:translate-y-4' : ''
      }`}
    >
      <div className="flex items-center justify-between bg-primary px-4 py-2 font-mono text-[0.72rem] font-bold tracking-[0.14em] text-on-primary uppercase">
        <span>PROMISE {serial}</span>
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-flap" />
      </div>
      <div className="flex-1 p-5">
        <h3 className="text-lg font-extrabold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{children}</p>
      </div>
      <div className="ticket-stub-perforation flex items-center justify-between bg-paper/70 px-4 py-2 font-mono text-[0.68rem] font-bold tracking-[0.12em] text-muted uppercase">
        <span>BRIDGEWORK · LEEDS</span>
        <span>VALID ALWAYS</span>
      </div>
    </article>
  );
}

export const TicketStubs = Object.assign(TicketStubsRoot, { Stub: TicketStub });

/* ==================== PUNCHED CHECKLIST TICKET ==================== */

export function ChecklistTicket({
  eyebrow,
  heading,
  badge,
  items,
  note,
  variant = 'candidate',
}: {
  eyebrow: string;
  heading: string;
  badge?: string;
  items: readonly string[];
  note?: string;
  variant?: 'candidate' | 'employer';
}) {
  const headerTone =
    variant === 'candidate'
      ? 'bg-primary text-on-primary'
      : 'bg-enamel-plate text-[#FBF9F3]';

  return (
    <div className="ticket-stub overflow-hidden">
      <div className={`flex items-center justify-between px-5 py-3 ${headerTone}`}>
        <span className="font-mono text-xs font-bold tracking-[0.14em] uppercase">{eyebrow}</span>
        {badge ? (
          <span className="rounded bg-flap px-2 py-0.5 font-mono text-[0.68rem] font-extrabold text-[#141917] uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <h2 className="text-xl font-extrabold text-ink sm:text-2xl">{heading}</h2>
        <ul className="mt-4 space-y-2.5 text-[0.97rem] text-ink">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-ink bg-paper"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {note ? (
          <p className="mt-5 rounded-ui border border-dashed border-ink/50 bg-paper px-4 py-3 text-sm font-medium text-ink">
            {note}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ==================== FAQ ACCORDION (NATIVE DETAILS, NO HEADINGS IN SUMMARY) ==================== */

function FaqRoot({ eyebrow, heading, id, children }: { eyebrow: string; heading: string; id: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="bg-paper-grain py-14 sm:py-20">
      <div className="wrap max-w-4xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-2.5 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-ink">
          {heading}
        </h2>
        <div className="rivet-frame mt-8 px-5 py-2 sm:px-8">{children}</div>
      </div>
    </section>
  );
}

function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="faq-item smooth-details">
      <summary>{question}</summary>
      <div className="pb-5 pl-7 text-muted">{children}</div>
    </details>
  );
}

export const FaqAccordion = Object.assign(FaqRoot, { Item: FaqItem });

/* ==================== CLOSING ENAMEL CALLOUT BAND ==================== */

export function EnamelCalloutBand({
  eyebrow,
  heading,
  ctaHref,
  ctaLabel,
  showTicket = false,
  children,
}: {
  eyebrow: string;
  heading: string;
  ctaHref: string;
  ctaLabel: string;
  showTicket?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="py-12 sm:py-16">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-[0.65rem] border-[3px] border-[#FBF9F3] bg-enamel-plate px-6 py-8 text-[#FBF9F3] shadow-[0_0_0_2.5px_var(--ink),0_10px_28px_rgba(10,13,12,0.28)] sm:px-10 sm:py-10">
          <span aria-hidden="true" className="absolute top-3 left-3 h-2.5 w-2.5 rounded-full bg-flap" />
          <span aria-hidden="true" className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-flap" />
          <span aria-hidden="true" className="absolute bottom-3 left-3 h-2.5 w-2.5 rounded-full bg-flap" />
          <span aria-hidden="true" className="absolute right-3 bottom-3 h-2.5 w-2.5 rounded-full bg-flap" />

          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className={showTicket ? 'lg:col-span-7' : 'lg:col-span-8'}>
              <p className="font-mono text-xs font-bold tracking-[0.16em] text-flap uppercase">
                {eyebrow}
              </p>
              <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold text-[#FBF9F3]">
                {heading}
              </h2>
              <div className="mt-3 max-w-2xl text-[#DDE8F5]">{children}</div>
              <div className="mt-6">
                <SiteLink href={ctaHref} className="button-flap">
                  {ctaLabel} →
                </SiteLink>
              </div>
            </div>
            {showTicket ? (
              <div className="lg:col-span-5 lg:justify-self-end">
                <PlatformTicket compact tilted />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== BRICK QUOTE BAND (EMPLOYERS) ==================== */

export function QuoteBand({
  quote,
  attribution,
  ctaHref,
  ctaLabel,
  checklist,
}: {
  quote: string;
  attribution: string;
  ctaHref: string;
  ctaLabel: string;
  checklist: ReactNode;
}) {
  return (
    <section className="bg-brick-band border-t-2 border-ink py-14 sm:py-20">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">{checklist}</div>
        <div className="flex flex-col justify-between gap-6 lg:col-span-6 lg:pt-4">
          <figure className="rounded-ui border-2 border-[#FBF9F3]/40 bg-board/40 p-6 sm:p-8">
            <blockquote className="font-display text-[clamp(1.85rem,3.6vw,2.75rem)] leading-[1.1] font-extrabold text-[#FBF9F3]">
              “{quote}”
            </blockquote>
            <figcaption className="mt-4 font-mono text-xs font-bold tracking-[0.12em] text-flap uppercase">
              — {attribution}
            </figcaption>
          </figure>
          <div>
            <SiteLink href={ctaHref} className="button-flap">
              {ctaLabel} →
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
