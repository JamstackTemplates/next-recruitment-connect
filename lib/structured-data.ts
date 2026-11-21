import { business } from '../content/business.ts';
import { sectors } from '../content/sectors.ts';
import { team } from '../content/team.ts';
import { absoluteUrl } from './paths.ts';

/**
 * EmploymentAgency JSON-LD derived from content/business.ts, content/sectors.ts and content/team.ts.
 * Deliberately omits JobPosting markup because sample roles are anonymised and have no direct apply flow.
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openDays = business.hours.filter((entry) => entry.opens && entry.closes);

  return {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: [...business.areaServed],
    knowsAbout: sectors.map((sector) => sector.name),
    openingHoursSpecification: openDays.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    })),
    employee: team.map((member) => ({
      '@type': 'Person',
      name: member.name,
      jobTitle: member.role,
    })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
