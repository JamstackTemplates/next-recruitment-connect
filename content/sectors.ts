/** Bespoke inline SVG artwork key for each sector desk. */
export type SectorIcon = 'cog' | 'ledger' | 'terminal' | 'crane-hook' | 'pallet' | 'lamp';

/** One specialist recruitment desk at Bridgework. */
export interface Sector {
  /** URL-safe unique identifier used in anchor links and filter hashes. */
  id: string;
  /** Full sector name shown in headings, copy and schema.org knowsAbout. */
  name: string;
  /** Uppercase enamel platform sign label (14 characters or fewer). */
  signLabel: string;
  /** One-sentence overview of what the desk covers. */
  summary: string;
  /** Typical roles recruited on this desk. */
  typicalRoles: readonly string[];
  /** One-line description of the employers this desk works with. */
  clients: string;
  /** Team member ID in content/team.ts who leads this desk. */
  leadId: string;
  /** Unique icon key rendered on platform signs and role filter chips. */
  icon: SectorIcon;
}

export const sectors: readonly Sector[] = [
  {
    id: 'engineering',
    name: 'Engineering & manufacturing',
    signLabel: 'ENGINEERING',
    summary:
      'Hands-on maintenance, design and production roles across West Yorkshire workshops, factories and plant rooms.',
    typicalRoles: [
      'Design engineers',
      'Maintenance technicians',
      'CNC machinists',
      'Production managers',
      'Quality engineers',
    ],
    clients:
      'Precision engineering, food and drink manufacturing and packaging firms between Bradford and Wakefield',
    leadId: 'amara-okafor',
    icon: 'cog',
  },
  {
    id: 'finance',
    name: 'Finance & accounting',
    signLabel: 'FINANCE',
    summary:
      'Qualified, part-qualified and interim finance people who keep growing Yorkshire businesses steady and well reported.',
    typicalRoles: [
      'Management accountants',
      'Financial controllers',
      'Credit controllers',
      'Payroll specialists',
      'Interim FDs',
    ],
    clients:
      'Owner-managed businesses, private-equity-backed groups and Leeds professional-services firms',
    leadId: 'tom-haigh',
    icon: 'ledger',
  },
  {
    id: 'technology',
    name: 'Technology & data',
    signLabel: 'TECH & DATA',
    summary:
      'Permanent engineers and outside-IR35 contractors for product teams, data platforms and in-house IT across Leeds and remote UK.',
    typicalRoles: [
      'Software developers',
      'Data engineers',
      'IT support leads',
      'BI analysts',
      'Infrastructure engineers',
    ],
    clients: 'Leeds digital agencies, fintechs, health-tech firms and in-house IT teams',
    leadId: 'nadia-hussain',
    icon: 'terminal',
  },
  {
    id: 'construction',
    name: 'Construction & property',
    signLabel: 'CONSTRUCTION',
    summary:
      'Site leadership, commercial surveying and property operations for residential and commercial builds across York and Leeds.',
    typicalRoles: [
      'Site managers',
      'Quantity surveyors',
      'Estimators',
      'Building surveyors',
      'Property managers',
    ],
    clients:
      'Regional housebuilders, fit-out contractors and property management firms across York and Leeds',
    leadId: 'gareth-lumb',
    icon: 'crane-hook',
  },
  {
    id: 'logistics',
    name: 'Logistics & supply chain',
    signLabel: 'LOGISTICS',
    summary:
      'Transport planning, warehouse leadership and supply chain staff along the M62 and M1 distribution corridor.',
    typicalRoles: [
      'Transport planners',
      'Warehouse managers',
      'Team leaders',
      'Buyers',
      'Supply chain analysts',
    ],
    clients: 'Distribution centres along the M62 and M1 corridor, 3PLs and wholesale suppliers',
    leadId: 'joanna-reilly',
    icon: 'pallet',
  },
  {
    id: 'business-support',
    name: 'Office & business support',
    signLabel: 'OFFICE',
    summary:
      'Full-time, part-time and bilingual operations staff who keep central Leeds offices and customer teams running cleanly.',
    typicalRoles: [
      'Office managers',
      'PAs',
      'Customer service advisors',
      'HR administrators',
      'Bilingual staff',
    ],
    clients: 'Head offices, contact centres and professional firms in central Leeds',
    leadId: 'sam-whitaker',
    icon: 'lamp',
  },
];

export function sectorById(id: string): Sector | undefined {
  return sectors.find((sector) => sector.id === id);
}
