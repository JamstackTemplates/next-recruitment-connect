import type { OpeningHours } from '../lib/hours.ts';

/** Core public details for Bridgework Recruitment. Shared across pages, metadata and schema.org JSON-LD. */
export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page and metadata fallbacks. */
  tagline: string;
  /** Plain-text introduction used on Home and as fallback meta description. */
  introduction: string;
  /** Public contact email address, always shown on Contact and in the footer. */
  email: string;
  /** Public telephone number (Ofcom drama range for this sample). */
  phone: string;
  /** Street and city lines for display and PostalAddress schema. */
  address: {
    lines: readonly string[];
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  /** Public landmark query passed to Google Maps embeds and links. */
  mapQuery: string;
  /** Short walking and cycling directions from Leeds station. */
  directions: string;
  /** Seven weekly opening-hours records in Europe/London (same-day intervals only). */
  hours: readonly OpeningHours[];
  /** Human-readable static summary shown before client hydration or without JavaScript. */
  hoursSummary: string;
  /** Additional note about arranged calls (not part of live open/closed hours). */
  hoursNote: string;
  /** Yorkshire regions served, reused in schema.org areaServed. */
  areaServed: readonly string[];
  /** Enquiry page copy and guidance; the hosted form supports name, email and message only. */
  enquiries: {
    title: string;
    introduction: string;
    confirmationNote: string;
    /** Guidance for candidates writing a message (not extra form fields). */
    candidateChecklist: readonly string[];
    /** Notice about not pasting CVs into the hosted form. */
    candidateCvNote: string;
    /** Guidance for employers writing a hiring brief (not extra form fields). */
    employerChecklist: readonly string[];
  };
  /** Required UK recruitment regulatory wording shown in the footer and on Contact. */
  legalLine: string;
  /** Sample template notice shown in the footer. */
  sampleDisclaimer: string;
}

export const business: Business = {
  name: 'Bridgework Recruitment',
  tagline: 'Good people, good work, one crossing.',
  introduction:
    'Bridgework is a Leeds recruitment consultancy with six sector desks and a named consultant behind every role. Whether you are looking for your next job or need someone to start next month, we know both sides of the river.',
  email: 'hello@bridgework.example',
  phone: '0113 496 0574',
  address: {
    lines: ['Third floor, Arches Yard', 'Granary Wharf', 'Leeds LS1'],
    street: 'Third floor, Arches Yard, Granary Wharf',
    locality: 'Leeds',
    region: 'West Yorkshire',
    postalCode: 'LS1',
    country: 'GB',
  },
  mapQuery: 'Granary Wharf, Leeds',
  directions:
    'Two minutes from Leeds station\u2019s south entrance, across the footbridge over the Aire. Cycle racks are in the yard.',
  hours: [
    { day: 'Monday', opens: '08:30', closes: '17:30' },
    { day: 'Tuesday', opens: '08:30', closes: '17:30' },
    { day: 'Wednesday', opens: '08:30', closes: '17:30' },
    { day: 'Thursday', opens: '08:30', closes: '17:30' },
    { day: 'Friday', opens: '08:30', closes: '17:30' },
    { day: 'Saturday' },
    { day: 'Sunday' },
  ],
  hoursSummary: 'Office hours: Mon\u2013Fri 08:30\u201317:30',
  hoursNote: 'Evening calls by arrangement.',
  areaServed: ['West Yorkshire', 'North Yorkshire'],
  enquiries: {
    title: 'Start a conversation.',
    introduction:
      'Tell us which side of the bridge you are on, and a consultant from the right desk will reply by email, usually within one working day.',
    confirmationNote:
      'Sending this starts a conversation. A consultant will reply to confirm next steps.',
    candidateChecklist: [
      'The role reference if there is one (for example BW-2041)',
      'Your sector and the kind of role you want next',
      'Where you can travel to and whether you need hybrid or remote working',
      'Your notice period or earliest start date',
      'Your salary band or day/hourly rate expectations',
    ],
    candidateCvNote:
      'Please don\u2019t paste your CV or personal documents into the message. Your consultant will reply with how to send it.',
    employerChecklist: [
      'Your company name and workplace location',
      'The job title and the main day-to-day responsibilities',
      'The salary band or contract/temporary rate',
      'Whether the role is permanent, contract or temporary',
      'When you need someone to start and who will run interviews',
    ],
  },
  legalLine:
    'Bridgework Recruitment acts as an employment agency for permanent recruitment and as an employment business for temporary and contract workers. We never charge candidates a fee for finding them work.',
  sampleDisclaimer:
    'Bridgework Recruitment is a fictitious business created as a Jamstacks template. Roles, people and figures are illustrative.',
};
