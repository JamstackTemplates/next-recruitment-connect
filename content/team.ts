/** One named consultant on the Bridgework team. */
export interface TeamMember {
  /** URL-safe unique identifier used for anchor links (/team/#<id>) and role consultantId references. */
  id: string;
  /** Consultant full name. */
  name: string;
  /** Job title at Bridgework. */
  role: string;
  /** Sector IDs in content/sectors.ts covered by this consultant. */
  sectorIds: readonly string[];
  /** Year joined Bridgework (2014 to current year). */
  joinedYear: number;
  /** Two capital letters cast onto the consultant's oval name plate. */
  monogram: string;
  /** Two-sentence biography grounded in their Yorkshire sector background. */
  bio: string;
  /** One-line prompt for what candidates or employers can ask this consultant. */
  askMeAbout: string;
}

export const FOUNDED_YEAR = 2014;

export const team: readonly TeamMember[] = [
  {
    id: 'amara-okafor',
    name: 'Amara Okafor',
    role: 'Founder & Managing Director',
    sectorIds: ['engineering'],
    joinedYear: 2014,
    monogram: 'AO',
    bio: 'Amara spent nine years as a production engineer in Wakefield before founding Bridgework in 2014 to recruit the way she had wanted to be recruited. She still runs the engineering desk and visits every new client\u2019s shop floor before taking a brief.',
    askMeAbout:
      'Engineering salaries across West Yorkshire, and moving from the shop floor into management.',
  },
  {
    id: 'tom-haigh',
    name: 'Tom Haigh',
    role: 'Senior Consultant, Finance',
    sectorIds: ['finance'],
    joinedYear: 2016,
    monogram: 'TH',
    bio: 'Tom trained in audit in Leeds city centre before switching to recruitment, so he reads a finance structure as readily as a CV. He works with owner-managed firms and PE-backed groups from Harrogate to Sheffield on both permanent hires and interim cover.',
    askMeAbout: 'Part-qualified to qualified, and when interim work beats a permanent move.',
  },
  {
    id: 'nadia-hussain',
    name: 'Nadia Hussain',
    role: 'Principal Consultant, Technology',
    sectorIds: ['technology'],
    joinedYear: 2018,
    monogram: 'NH',
    bio: 'Nadia has recruited software and data teams in Leeds for eight years, covering everything from three-person health-tech startups to established financial platforms. She talks plainly about tech stacks, team maturity and whether a contract genuinely sits outside IR35.',
    askMeAbout: 'Contract day rates, IR35 status and the Leeds data scene.',
  },
  {
    id: 'gareth-lumb',
    name: 'Gareth Lumb',
    role: 'Consultant, Construction & Property',
    sectorIds: ['construction'],
    joinedYear: 2019,
    monogram: 'GL',
    bio: 'Gareth worked as an assistant quantity surveyor in York before joining Bridgework to build the construction and property desk. He knows the regional housebuilders and fit-out contractors personally and keeps morning calls early enough to fit around site hours.',
    askMeAbout: 'Site management careers and the move from contractor to client side.',
  },
  {
    id: 'joanna-reilly',
    name: 'Joanna Reilly',
    role: 'Consultant, Logistics',
    sectorIds: ['logistics'],
    joinedYear: 2021,
    monogram: 'JR',
    bio: 'Joanna previously managed shift planning for a Normanton distribution hub, giving her first-hand knowledge of transport offices and multi-shift warehouses. She handles both permanent operations hires and weekly-paid temporary teams along the M62 corridor.',
    askMeAbout: 'Shift patterns, temp-to-perm and warehouse leadership roles.',
  },
  {
    id: 'sam-whitaker',
    name: 'Sam Whitaker',
    role: 'Consultant, Office & Business Support',
    sectorIds: ['business-support'],
    joinedYear: 2022,
    monogram: 'SW',
    bio: 'Sam ran office operations for a Leeds chambers before moving into recruitment, specialising in dependable business support and multilingual customer service hires. They are particularly keen on clear part-time briefs and fair routes back into work after a career break.',
    askMeAbout: 'Returning to work, part-time office roles and bilingual positions.',
  },
];

export function teamMemberById(id: string): TeamMember | undefined {
  return team.find((member) => member.id === id);
}
