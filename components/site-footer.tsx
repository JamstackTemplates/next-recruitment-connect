import { business } from '../content/business';
import { BrandMark } from './art/brand-mark';
import { TrussDivider } from './art/truss-divider';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

const FOOTER_NAV = [
  { href: '/', label: 'Home' },
  { href: '/roles/', label: 'Current roles' },
  { href: '/sectors/', label: 'Six sector desks' },
  { href: '/candidates/', label: 'Candidates' },
  { href: '/employers/', label: 'Employers' },
  { href: '/team/', label: 'The team' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="board-band mt-0">
      <TrussDivider variant="deep" />

      <div className="wrap py-12 sm:py-16">
        <div className="grid gap-10 border-b border-[#2A332F] pb-10 md:grid-cols-12">
          {/* Column 1: Brand & Navigation */}
          <div className="md:col-span-4">
            <SiteLink href="/" className="inline-block no-underline hover:no-underline">
              <BrandMark inverted />
            </SiteLink>
            <p className="mt-4 max-w-xs text-sm text-on-board-muted">
              Independent recruitment consultancy at Granary Wharf, Leeds — six sector desks across
              West and North Yorkshire.
            </p>
            <nav aria-label="Footer" className="mt-6">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {FOOTER_NAV.map((item) => (
                  <li key={item.href}>
                    <SiteLink
                      href={item.href}
                      className="font-medium text-on-board hover:text-flap hover:underline"
                    >
                      {item.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 2: Station Information / Contact */}
          <div className="md:col-span-4">
            <p className="eyebrow eyebrow-board">Station desk · Granary Wharf</p>
            <address className="mt-4 space-y-2 text-sm not-italic text-on-board">
              <p>
                {business.address.lines.map((line, index) => (
                  <span key={line} className="block">
                    {line}
                    {index < business.address.lines.length - 1 ? '' : ''}
                  </span>
                ))}
              </p>
              <p className="pt-2">
                <a
                  href={`mailto:${business.email}`}
                  className="font-mono text-flap underline decoration-flap/60 hover:decoration-flap"
                >
                  {business.email}
                </a>
              </p>
              <p>
                <a
                  href={telHref}
                  className="font-mono text-on-board underline decoration-on-board-muted hover:text-flap"
                >
                  {business.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Column 3: Office hours */}
          <div className="md:col-span-4">
            <p className="eyebrow eyebrow-board">Office hours</p>
            <dl className="mt-4 space-y-1.5 font-mono text-xs tracking-wide text-on-board">
              <div className="flex justify-between gap-4 border-b border-[#222B27] pb-1.5">
                <dt className="text-on-board-muted">MON – FRI</dt>
                <dd className="font-bold text-flap">08:30 – 17:30</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-[#222B27] pb-1.5">
                <dt className="text-on-board-muted">SAT – SUN</dt>
                <dd className="text-on-board-muted">CLOSED</dd>
              </div>
            </dl>
            <p className="mt-3 text-sm text-on-board-muted">{business.hoursNote}</p>
            <TimeZoneNote className="text-on-board-muted" />
          </div>
        </div>

        {/* Regulatory legal line & sample disclaimer in small mono */}
        <div className="mt-8 grid gap-4 font-mono text-[0.74rem] leading-relaxed text-on-board-muted lg:grid-cols-12 lg:items-end">
          <div className="space-y-2 lg:col-span-9">
            <p className="text-on-board/90">{business.legalLine}</p>
            <p>{business.sampleDisclaimer}</p>
          </div>
          <div className="lg:col-span-3 lg:text-right">
            <span title="Made with love by jamstacks.net">
              Built with{' '}
              <a
                className="text-flap underline decoration-flap/60 hover:decoration-flap"
                href="https://jamstacks.net"
              >
                jamstacks.net
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
