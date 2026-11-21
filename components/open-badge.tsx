'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

const STATIC_FALLBACK = 'Office hours: Mon\u2013Fri 08:30\u201317:30';

/**
 * Live office-hours status chip. Static/no-JS output stays neutral
 * ("Office hours: Mon–Fri 08:30–17:30"); browser refreshes every minute in site.timeZone.
 */
export function OpenBadge({
  hours,
  variant = 'enamel',
  className = '',
}: {
  hours: readonly OpeningHours[];
  variant?: 'enamel' | 'board' | 'surface';
  className?: string;
}) {
  const [label, setLabel] = useState(STATIC_FALLBACK);

  useEffect(() => {
    const update = () => {
      const next = openingLabel(hours, site.timeZone);
      setLabel(next === 'See opening hours' ? STATIC_FALLBACK : next);
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');
  const isClosed = label.startsWith('Closed');

  const tone =
    variant === 'enamel'
      ? 'border-2 border-[#FBF9F3] bg-enamel-plate text-[#FBF9F3] shadow-[0_0_0_1.5px_var(--ink)]'
      : variant === 'board'
        ? 'border border-[#334039] bg-[#1A221E] text-on-board'
        : 'border border-rule bg-surface text-ink';

  const dotColor = isOpen
    ? 'bg-flap shadow-[0_0_0_2px_rgba(233,180,37,0.35)]'
    : isClosed
      ? 'bg-brick'
      : 'bg-flap/80';

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[0.74rem] font-bold tracking-[0.07em] uppercase ${tone} ${className}`}
    >
      <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotColor}`} />
      <span>{label}</span>
    </span>
  );
}
