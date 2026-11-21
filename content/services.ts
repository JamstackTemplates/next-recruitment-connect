/** One recruitment service model offered to employers. */
export interface EmployerService {
  /** Stable URL-safe identifier. */
  id: string;
  /** Specification sheet callout number (01, 02, 03). */
  code: string;
  /** Service name. */
  name: string;
  /** One-sentence description of when this service fits best. */
  bestFor: string;
  /** Three concise steps describing how the service works. */
  howItWorks: readonly [string, string, string];
  /** Transparent headline fee and billing detail. */
  fee: {
    label: string;
    detail: string;
  };
}

/** One band in Bridgework's 12-week permanent placement rebate schedule. */
export interface RebateTier {
  /** Period after start date. */
  window: string;
  /** Percentage of the placement fee rebated. */
  rebate: string;
  /** Practical explanation. */
  note: string;
}

export const services: readonly EmployerService[] = [
  {
    id: 'permanent',
    code: '01',
    name: 'Permanent (contingency)',
    bestFor: 'Most salaried roles up to \u00a370,000 across our six Yorkshire desks.',
    howItWorks: [
      'We take a thorough brief on site or over a call and agree a realistic salary band.',
      'We deliver a tight shortlist of 3\u20135 interviewed candidates in a median of 11 days.',
      'We manage interviews, feedback, offer and notice period through to week 12.',
    ],
    fee: {
      label: '16% of first-year base salary',
      detail:
        'Invoiced on the candidate\u2019s start date, with no fee if nobody starts. A sliding rebate applies if they leave within 12 weeks.',
    },
  },
  {
    id: 'retained',
    code: '02',
    name: 'Retained search',
    bestFor: 'Senior, specialist or confidential roles above \u00a370,000.',
    howItWorks: [
      'Dedicated market mapping across target Yorkshire and UK firms, approaching passive candidates discreetly.',
      'Weekly written progress notes with full market feedback on pay, availability and objections.',
      'Structured competency longlist, shortlist interviews and thorough referencing before offer.',
    ],
    fee: {
      label: '24% of first-year base salary',
      detail: 'Paid in three equal stages: at brief, at shortlist and on start.',
    },
  },
  {
    id: 'contract-temporary',
    code: '03',
    name: 'Contract & temporary',
    bestFor: 'Cover, projects, seasonal peaks and interim leadership.',
    howItWorks: [
      'Same-day check against vetted contractors and weekly-paid temporary workers already known to our desks.',
      'Right-to-work, compliance and IR35 status checks handled before day one.',
      'Simple online timesheets and weekly payroll run in-house by Bridgework.',
    ],
    fee: {
      label: 'Charge rate quoted per role',
      detail:
        'One weekly invoice. Temporary rates include holiday pay, employer\u2019s National Insurance and pension contributions.',
    },
  },
];

export const rebateSchedule: readonly RebateTier[] = [
  {
    window: 'Weeks 1\u20134',
    rebate: '100% rebate',
    note: 'Full fee credited or refunded if the placement ends within the first four weeks.',
  },
  {
    window: 'Weeks 5\u20138',
    rebate: '50% rebate',
    note: 'Half of the placement fee credited or refunded during the second month.',
  },
  {
    window: 'Weeks 9\u201312',
    rebate: '25% rebate',
    note: 'Quarter of the placement fee credited or refunded up to the 12-week mark.',
  },
];

export const vatNote = 'All fees exclude VAT at 20%.';
