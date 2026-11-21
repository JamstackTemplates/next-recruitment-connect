/**
 * April 2026 UK National Living Wage rate in GBP per hour.
 * Review each April when statutory rates change.
 */
export const NATIONAL_LIVING_WAGE_GBP = 12.71;

export type WorkMode = 'on-site' | 'hybrid' | 'remote';
export type ContractType = 'permanent' | 'contract' | 'temporary';
export type HoursType = 'full-time' | 'part-time';
export type PayBasis = 'salary' | 'day-rate' | 'hourly';
export type RoleStatus = 'open' | 'interviewing' | 'filled';

export interface RolePay {
  /** Must match contract: permanent -> salary, contract -> day-rate, temporary -> hourly. */
  basis: PayBasis;
  /** Minimum pay in GBP (whole pounds for salary/day-rate, up to 2 decimals for hourly). */
  min: number;
  /** Maximum pay in GBP (min <= max; equal values display as a single figure). */
  max: number;
}

/** One current or recently filled role on the Bridgework departure board. */
export interface Role {
  /** Lowercase unique reference matching /^bw-\d{4}$/ (displayed uppercase, e.g. BW-2041). */
  id: string;
  /** Role title shown on the board and ticket detail. */
  title: string;
  /** Sector ID referencing content/sectors.ts. */
  sectorId: string;
  /** Yorkshire town/city or "Remote (UK)". */
  location: string;
  /** Attendance pattern. */
  workMode: WorkMode;
  /** Engagement type. */
  contract: ContractType;
  /** Working hours pattern; part-time salaried roles display "pro rata". */
  hours: HoursType;
  /** Structured GBP pay band. */
  pay: RolePay;
  /** ISO date (YYYY-MM-DD) the role was posted; must not be after rolesUpdated. */
  posted: string;
  /** Current recruitment stage: open, interviewing or filled. */
  status: RoleStatus;
  /** Consultant ID referencing content/team.ts; must cover sectorId. */
  consultantId: string;
  /** One or two concrete sentences describing the role and employer context. */
  summary: string;
  /** Exactly three concise highlights printed on the expanded role ticket. */
  highlights: readonly [string, string, string];
}

/** ISO date the roles board was last reviewed and updated. */
export const rolesUpdated = '2026-11-18';

export const roles: readonly Role[] = [
  {
    id: 'bw-2050',
    title: 'Transport Planner',
    sectorId: 'logistics',
    location: 'Normanton',
    workMode: 'on-site',
    contract: 'permanent',
    hours: 'full-time',
    pay: { basis: 'salary', min: 32000, max: 35000 },
    posted: '2026-11-18',
    status: 'open',
    consultantId: 'joanna-reilly',
    summary:
      'Route and schedule a 38-vehicle general haulage fleet out of a modern Normanton depot, balancing timed retail drops across the North.',
    highlights: [
      'Monday to Friday days, 07:30 to 16:30, no weekend rota',
      'Uses Mandata TMS; full handover with the outbound planner',
      'Free parking on site, five minutes from J31 of the M62',
    ],
  },
  {
    id: 'bw-2049',
    title: 'Senior .NET Developer',
    sectorId: 'technology',
    location: 'Remote (UK)',
    workMode: 'remote',
    contract: 'contract',
    hours: 'full-time',
    pay: { basis: 'day-rate', min: 500, max: 575 },
    posted: '2026-11-17',
    status: 'open',
    consultantId: 'nadia-hussain',
    summary:
      'Six-month contract helping a Leeds health-tech platform migrate legacy billing services to .NET 9 and Azure Service Bus.',
    highlights: [
      'Assessed outside IR35 with SDS ready to review',
      'Fully remote UK with optional quarterly meetups in Leeds',
      'Direct brief with the Principal Engineer; one-stage technical interview',
    ],
  },
  {
    id: 'bw-2048',
    title: 'Bilingual Customer Service Advisor (German)',
    sectorId: 'business-support',
    location: 'Leeds',
    workMode: 'hybrid',
    contract: 'temporary',
    hours: 'full-time',
    pay: { basis: 'hourly', min: 14.5, max: 14.5 },
    posted: '2026-11-14',
    status: 'open',
    consultantId: 'sam-whitaker',
    summary:
      'Support DACH trade accounts for a Leeds manufacturing exporter by email and phone during a three-month winter order peak.',
    highlights: [
      'Weekly pay through Bridgework with holiday pay accrued',
      'Three days near Leeds station, two days from home after training',
      'Genuine chance of a permanent transfer in the spring',
    ],
  },
  {
    id: 'bw-2047',
    title: 'Interim Financial Controller',
    sectorId: 'finance',
    location: 'Harrogate',
    workMode: 'hybrid',
    contract: 'contract',
    hours: 'full-time',
    pay: { basis: 'day-rate', min: 450, max: 525 },
    posted: '2026-11-12',
    status: 'open',
    consultantId: 'tom-haigh',
    summary:
      'Four-month interim post leading a five-person finance team through year-end audit and a Sage Intacct chart-of-accounts tidy-up.',
    highlights: [
      'ACA, ACCA or CIMA qualified with manufacturing or group audit experience',
      'Three days a week in central Harrogate, two days remote',
      'Immediate or short-notice start; reports straight to the MD',
    ],
  },
  {
    id: 'bw-2045',
    title: 'Data Engineer',
    sectorId: 'technology',
    location: 'Leeds',
    workMode: 'hybrid',
    contract: 'permanent',
    hours: 'full-time',
    pay: { basis: 'salary', min: 55000, max: 65000 },
    posted: '2026-11-07',
    status: 'open',
    consultantId: 'nadia-hussain',
    summary:
      'Build reliable Python, dbt and Snowflake pipelines for a growing 90-person Leeds fintech, partnering directly with product and risk analysts.',
    highlights: [
      'Two days a week at the Holbeck office, flexible core hours',
      '8% employer pension and \u00a31,500 annual training budget',
      'Clean greenfield warehouse with strong automated testing',
    ],
  },
  {
    id: 'bw-2044',
    title: 'Maintenance Technician (Days)',
    sectorId: 'engineering',
    location: 'Bradford',
    workMode: 'on-site',
    contract: 'permanent',
    hours: 'full-time',
    pay: { basis: 'salary', min: 36000, max: 39500 },
    posted: '2026-11-05',
    status: 'open',
    consultantId: 'amara-okafor',
    summary:
      'Keep high-speed carton and labelling lines running smoothly on a straight days shift at an established Bradford packaging plant.',
    highlights: [
      'Multi-skilled electrical bias (18th Edition) with PLC fault-finding',
      'Monday to Friday 08:00 to 16:30, no night shifts',
      'Overtime paid at 1.5x plus tool allowance and clean workshop',
    ],
  },
  {
    id: 'bw-2043',
    title: 'Warehouse Team Leader',
    sectorId: 'logistics',
    location: 'Wakefield',
    workMode: 'on-site',
    contract: 'temporary',
    hours: 'full-time',
    pay: { basis: 'hourly', min: 15.2, max: 16.4 },
    posted: '2026-11-03',
    status: 'open',
    consultantId: 'joanna-reilly',
    summary:
      'Supervise a 14-person goods-in and dispatch crew at a Wakefield wholesale distribution centre on a 12-week temp-to-perm assignment.',
    highlights: [
      'Counterbalance FLT licence required; reach truck a bonus',
      'Rotating earlies (06:00\u201314:00) and lates (14:00\u201322:00)',
      'Weekly pay with permanent offer reviewed at week 12',
    ],
  },
  {
    id: 'bw-2041',
    title: 'Senior Mechanical Design Engineer',
    sectorId: 'engineering',
    location: 'Wakefield',
    workMode: 'hybrid',
    contract: 'permanent',
    hours: 'full-time',
    pay: { basis: 'salary', min: 48000, max: 55000 },
    posted: '2026-10-29',
    status: 'open',
    consultantId: 'amara-okafor',
    summary:
      'Lead mechanical design on bespoke conveyor and handling systems for a family-owned Wakefield engineering firm, from concept to sign-off.',
    highlights: [
      'SolidWorks and design-for-manufacture experience',
      'Two days a week from home after probation',
      'Chartership supported and funded',
    ],
  },
  {
    id: 'bw-2040',
    title: 'Office Manager',
    sectorId: 'business-support',
    location: 'Leeds',
    workMode: 'on-site',
    contract: 'permanent',
    hours: 'part-time',
    pay: { basis: 'salary', min: 34000, max: 37000 },
    posted: '2026-10-24',
    status: 'filled',
    consultantId: 'sam-whitaker',
    summary:
      'Run facilities, supplier contracts and front-of-house coordination for a 45-person Leeds architectural practice over four days a week.',
    highlights: [
      '30 hours per week across four days, school-hours friendly',
      'Central Park Square office, five minutes from Leeds station',
      'Filled via Bridgework; register with Sam for similar part-time roles',
    ],
  },
  {
    id: 'bw-2038',
    title: 'Management Accountant',
    sectorId: 'finance',
    location: 'Leeds',
    workMode: 'hybrid',
    contract: 'permanent',
    hours: 'full-time',
    pay: { basis: 'salary', min: 42000, max: 47000 },
    posted: '2026-10-20',
    status: 'interviewing',
    consultantId: 'tom-haigh',
    summary:
      'Own monthly management accounts, project margins and cash-flow forecasting for a multi-site Leeds civil engineering group.',
    highlights: [
      'Finalist or newly qualified CIMA/ACCA with full study support if finishing',
      'Three days at the south Leeds office, two days at home',
      'First-stage interviews underway; still welcoming expressions of interest',
    ],
  },
  {
    id: 'bw-2036',
    title: 'Site Manager (Residential)',
    sectorId: 'construction',
    location: 'York',
    workMode: 'on-site',
    contract: 'permanent',
    hours: 'full-time',
    pay: { basis: 'salary', min: 52000, max: 58000 },
    posted: '2026-10-15',
    status: 'open',
    consultantId: 'gareth-lumb',
    summary:
      'Take charge of a 62-plot traditional brick-and-block housing development on the eastern edge of York for a quality-focused regional builder.',
    highlights: [
      'SMSTS, CSCS Black Card and First Aid at Work required',
      'Car allowance (\u00a35,500) plus realistic build-quality bonus',
      'Next three Yorkshire sites already consented within 25 miles',
    ],
  },
];
