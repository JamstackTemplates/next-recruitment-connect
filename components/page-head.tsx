import type { ReactNode } from 'react';
import { TrussDivider } from './art/truss-divider';

/**
 * Bespoke Bridgework page head with surface themes matching the route:
 * - paper: concrete-grain wharf paper
 * - brick: running-bond Yorkshire brick band (Roles)
 * - blueprint: architectural 8px blueprint grid (Employers)
 */
export function PageHead({
  eyebrow,
  title,
  children,
  aside,
  variant = 'paper',
  id,
  bottom,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  variant?: 'paper' | 'brick' | 'blueprint';
  id?: string;
  bottom?: ReactNode;
}) {
  const bg =
    variant === 'brick'
      ? 'bg-brick-band'
      : variant === 'blueprint'
        ? 'bg-paper bg-blueprint-grid'
        : 'bg-paper-grain';

  const isBrick = variant === 'brick';

  return (
    <header className={`${bg} border-b border-rule/70`}>
      <div className="wrap py-12 sm:py-16">
        <div className={aside ? 'grid items-center gap-8 lg:grid-cols-12' : ''}>
          <div className={aside ? 'lg:col-span-7' : ''}>
            <p className={`eyebrow ${isBrick ? 'eyebrow-brick' : ''}`}>{eyebrow}</p>
            <h1
              id={id}
              className={`mt-3 max-w-[18ch] text-[clamp(2.35rem,5.5vw,4.1rem)] font-extrabold ${
                isBrick ? 'text-on-brick' : 'text-ink'
              }`}
            >
              {title}
            </h1>
            {children ? (
              <div
                className={`mt-4 max-w-(--measure) text-[clamp(1.04rem,1.5vw,1.18rem)] ${
                  isBrick ? 'text-on-brick-muted' : 'text-muted'
                }`}
              >
                {children}
              </div>
            ) : null}
          </div>
          {aside ? <div className="lg:col-span-5 lg:justify-self-end">{aside}</div> : null}
        </div>
        {bottom ? <div className="mt-10">{bottom}</div> : null}
      </div>
      <TrussDivider variant="thin" />
    </header>
  );
}
