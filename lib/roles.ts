import {
  NATIONAL_LIVING_WAGE_GBP,
  type ContractType,
  type HoursType,
  type PayBasis,
  type Role,
  type RolePay,
} from '../content/roles.ts';
import type { Sector } from '../content/sectors.ts';
import type { TeamMember } from '../content/team.ts';
import { FOUNDED_YEAR } from '../content/team.ts';
import type { EmployerService, RebateTier } from '../content/services.ts';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ROLE_ID = /^bw-\d{4}$/;
const MONOGRAM = /^[A-Z]{2}$/;

const CONTRACT_PAY_BASIS: Record<ContractType, PayBasis> = {
  permanent: 'salary',
  contract: 'day-rate',
  temporary: 'hourly',
};

const VALID_CONTRACTS: ReadonlySet<string> = new Set(['permanent', 'contract', 'temporary']);

export function formatRoleRef(id: string): string {
  return id.toUpperCase();
}

function formatWholePounds(amount: number): string {
  return `\u00a3${amount.toLocaleString('en-GB')}`;
}

function formatHourlyPounds(amount: number): string {
  return `\u00a3${amount.toFixed(2)}`;
}

/**
 * Format a structured GBP pay band consistently across boards, tickets and tests.
 * Examples: "£48,000–£55,000", "£450–£525 per day", "£14.50 per hour", "£34,000–£37,000 pro rata".
 */
export function formatPay(pay: RolePay, hours: HoursType = 'full-time'): string {
  const single = pay.min === pay.max;
  if (pay.basis === 'salary') {
    const base = single
      ? formatWholePounds(pay.min)
      : `${formatWholePounds(pay.min)}\u2013${formatWholePounds(pay.max)}`;
    return hours === 'part-time' ? `${base} pro rata` : base;
  }
  if (pay.basis === 'day-rate') {
    const base = single
      ? formatWholePounds(pay.min)
      : `${formatWholePounds(pay.min)}\u2013${formatWholePounds(pay.max)}`;
    return `${base} per day`;
  }
  const base = single
    ? formatHourlyPounds(pay.min)
    : `${formatHourlyPounds(pay.min)}\u2013${formatHourlyPounds(pay.max)}`;
  return `${base} per hour`;
}

/** Compact pay label for the split-flap departure board. */
export function formatBoardPay(pay: RolePay, hours: HoursType = 'full-time'): string {
  const single = pay.min === pay.max;
  if (pay.basis === 'salary') {
    const base = single
      ? formatWholePounds(pay.min)
      : `${formatWholePounds(pay.min)}\u2013${formatWholePounds(pay.max)}`;
    return hours === 'part-time' ? `${base} PRO RATA` : base;
  }
  if (pay.basis === 'day-rate') {
    const base = single
      ? formatWholePounds(pay.min)
      : `${formatWholePounds(pay.min)}\u2013${formatWholePounds(pay.max)}`;
    return `${base}/DAY`;
  }
  const base = single
    ? formatHourlyPounds(pay.min)
    : `${formatHourlyPounds(pay.min)}\u2013${formatHourlyPounds(pay.max)}`;
  return `${base}/HR`;
}

/** Format an ISO date (YYYY-MM-DD) as a crisp UK date such as "18 Nov 2026". */
export function formatUkDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function compareNewestFirst(a: Role, b: Role): number {
  if (a.posted !== b.posted) return b.posted.localeCompare(a.posted);
  return b.id.localeCompare(a.id);
}

/** Board ordering: open and interviewing first (newest first), filled roles last (newest first). */
export function sortRolesForBoard(list: readonly Role[]): Role[] {
  return [...list].sort((a, b) => {
    const aFilled = a.status === 'filled' ? 1 : 0;
    const bFilled = b.status === 'filled' ? 1 : 0;
    if (aFilled !== bFilled) return aFilled - bFilled;
    return compareNewestFirst(a, b);
  });
}

/** Home departure board: newest open roles only (excludes interviewing and filled). */
export function homeOpenRoles(list: readonly Role[], limit = 5): Role[] {
  return list
    .filter((role) => role.status === 'open')
    .sort(compareNewestFirst)
    .slice(0, limit);
}

export function countOpenRoles(list: readonly Role[]): number {
  return list.filter((role) => role.status === 'open').length;
}

export function countOpenRolesBySector(list: readonly Role[], sectorId: string): number {
  return list.filter((role) => role.status === 'open' && role.sectorId === sectorId).length;
}

export function countOpenRolesByConsultant(list: readonly Role[], consultantId: string): number {
  return list.filter((role) => role.status === 'open' && role.consultantId === consultantId).length;
}

export interface RoleFilter {
  sector: string;
  contract: ContractType | '';
}

/** Filter roles using AND logic across sector and contract type. */
export function filterRoles(list: readonly Role[], filter: RoleFilter): Role[] {
  return list.filter((role) => {
    if (filter.sector && role.sectorId !== filter.sector) return false;
    if (filter.contract && role.contract !== filter.contract) return false;
    return true;
  });
}

/** Parse #sector=...&contract=... safely, ignoring unknown or invalid values. */
export function parseRoleFilterHash(hash: string, validSectorIds: readonly string[]): RoleFilter {
  const clean = hash.replace(/^#/, '').trim();
  if (!clean) return { sector: '', contract: '' };
  const params = new URLSearchParams(clean);
  const sectorSet = new Set(validSectorIds);
  const rawSector = params.get('sector')?.trim() ?? '';
  const rawContract = params.get('contract')?.trim() ?? '';
  return {
    sector: sectorSet.has(rawSector) ? rawSector : '',
    contract: VALID_CONTRACTS.has(rawContract) ? (rawContract as ContractType) : '',
  };
}

export function buildRoleFilterHash(filter: RoleFilter): string {
  const params = new URLSearchParams();
  if (filter.sector) params.set('sector', filter.sector);
  if (filter.contract) params.set('contract', filter.contract);
  const query = params.toString();
  return query ? `#${query}` : '';
}

function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function hasAtMostTwoDecimals(value: number): boolean {
  return Number.isFinite(value) && Number(value.toFixed(2)) === value;
}

export function validateSectors(
  sectorList: readonly Sector[],
  teamList: readonly TeamMember[],
): void {
  const seenIds = new Set<string>();
  const seenIcons = new Set<string>();
  const teamById = new Map(teamList.map((member) => [member.id, member]));

  if (sectorList.length === 0) throw new Error('sectors: at least one sector is required');

  for (const sector of sectorList) {
    const ref = `sectors[${sector.id || 'missing-id'}]`;
    if (!sector.id || !URL_SAFE_ID.test(sector.id)) {
      throw new Error(`${ref}: id must be non-empty and URL-safe lowercase`);
    }
    if (seenIds.has(sector.id)) throw new Error(`${ref}: duplicate sector id`);
    seenIds.add(sector.id);

    if (!sector.name.trim()) throw new Error(`${ref}: name is required`);
    if (!sector.signLabel.trim() || sector.signLabel.length > 14) {
      throw new Error(`${ref}: signLabel must be 1 to 14 characters`);
    }
    if (!sector.summary.trim()) throw new Error(`${ref}: summary is required`);
    if (!sector.clients.trim()) throw new Error(`${ref}: clients description is required`);
    if (sector.typicalRoles.length === 0 || sector.typicalRoles.some((item) => !item.trim())) {
      throw new Error(`${ref}: typicalRoles must contain non-empty entries`);
    }
    if (!sector.icon) throw new Error(`${ref}: icon is required`);
    if (seenIcons.has(sector.icon)) {
      throw new Error(`${ref}: duplicate icon "${sector.icon}"`);
    }
    seenIcons.add(sector.icon);

    const lead = teamById.get(sector.leadId);
    if (!lead) {
      throw new Error(`${ref}: leadId "${sector.leadId}" does not match any team member`);
    }
    if (!lead.sectorIds.includes(sector.id)) {
      throw new Error(`${ref}: lead "${lead.id}" does not cover sector "${sector.id}"`);
    }
  }
}

export function validateTeam(
  teamList: readonly TeamMember[],
  sectorList: readonly Sector[],
  currentYear = new Date().getUTCFullYear(),
): void {
  const seenIds = new Set<string>();
  const sectorIds = new Set(sectorList.map((sector) => sector.id));

  if (teamList.length === 0) throw new Error('team: at least one consultant is required');

  for (const member of teamList) {
    const ref = `team[${member.id || 'missing-id'}]`;
    if (!member.id || !URL_SAFE_ID.test(member.id)) {
      throw new Error(`${ref}: id must be non-empty and URL-safe lowercase`);
    }
    if (seenIds.has(member.id)) throw new Error(`${ref}: duplicate team member id`);
    seenIds.add(member.id);

    if (!member.name.trim()) throw new Error(`${ref}: name is required`);
    if (!member.role.trim()) throw new Error(`${ref}: role is required`);
    if (!member.bio.trim()) throw new Error(`${ref}: bio is required`);
    if (!member.askMeAbout.trim()) throw new Error(`${ref}: askMeAbout is required`);
    if (!MONOGRAM.test(member.monogram)) {
      throw new Error(`${ref}: monogram must be exactly two capital letters`);
    }
    if (
      !Number.isInteger(member.joinedYear) ||
      member.joinedYear < FOUNDED_YEAR ||
      member.joinedYear > currentYear
    ) {
      throw new Error(
        `${ref}: joinedYear ${member.joinedYear} must be between ${FOUNDED_YEAR} and ${currentYear}`,
      );
    }
    if (member.sectorIds.length === 0) {
      throw new Error(`${ref}: must cover at least one sector`);
    }
    for (const sectorId of member.sectorIds) {
      if (!sectorIds.has(sectorId)) {
        throw new Error(`${ref}: sectorId "${sectorId}" does not match any sector`);
      }
    }
  }
}

export function validateRoles(
  roleList: readonly Role[],
  updatedDate: string,
  sectorList: readonly Sector[],
  teamList: readonly TeamMember[],
): void {
  if (!isValidIsoDate(updatedDate)) {
    throw new Error(`rolesUpdated: "${updatedDate}" must be a valid YYYY-MM-DD date`);
  }

  const seenIds = new Set<string>();
  const sectorIds = new Set(sectorList.map((sector) => sector.id));
  const teamById = new Map(teamList.map((member) => [member.id, member]));

  for (const role of roleList) {
    const ref = `roles[${role.id || 'missing-id'}]`;
    if (!ROLE_ID.test(role.id)) {
      throw new Error(`${ref}: id must match /^bw-\\d{4}$/`);
    }
    if (seenIds.has(role.id)) throw new Error(`${ref}: duplicate role id`);
    seenIds.add(role.id);

    if (!role.title.trim()) throw new Error(`${ref}: title is required`);
    if (!role.location.trim()) throw new Error(`${ref}: location is required`);
    if (!role.summary.trim()) throw new Error(`${ref}: summary is required`);
    if (role.highlights.length !== 3 || role.highlights.some((item) => !item.trim())) {
      throw new Error(`${ref}: highlights must contain exactly three non-empty items`);
    }
    if (!sectorIds.has(role.sectorId)) {
      throw new Error(`${ref}: sectorId "${role.sectorId}" does not match any sector`);
    }

    const consultant = teamById.get(role.consultantId);
    if (!consultant) {
      throw new Error(`${ref}: consultantId "${role.consultantId}" does not match any team member`);
    }
    if (!consultant.sectorIds.includes(role.sectorId)) {
      throw new Error(
        `${ref}: consultant "${consultant.id}" does not cover sector "${role.sectorId}"`,
      );
    }

    const expectedBasis = CONTRACT_PAY_BASIS[role.contract];
    if (role.pay.basis !== expectedBasis) {
      throw new Error(
        `${ref}: ${role.contract} role must use pay basis "${expectedBasis}", got "${role.pay.basis}"`,
      );
    }
    if (role.pay.max < role.pay.min) {
      throw new Error(
        `${ref}: ${role.pay.basis} max ${role.pay.max} is below min ${role.pay.min}`,
      );
    }
    if (role.pay.basis === 'salary') {
      if (!Number.isInteger(role.pay.min) || !Number.isInteger(role.pay.max)) {
        throw new Error(`${ref}: salary values must be whole pounds`);
      }
      if (role.pay.min < 18000 || role.pay.max > 250000) {
        throw new Error(`${ref}: salary must be between 18000 and 250000 GBP`);
      }
    } else if (role.pay.basis === 'day-rate') {
      if (!Number.isInteger(role.pay.min) || !Number.isInteger(role.pay.max)) {
        throw new Error(`${ref}: day-rate values must be whole pounds`);
      }
      if (role.pay.min < 100 || role.pay.max > 2000) {
        throw new Error(`${ref}: day-rate must be between 100 and 2000 GBP`);
      }
    } else if (role.pay.basis === 'hourly') {
      if (!hasAtMostTwoDecimals(role.pay.min) || !hasAtMostTwoDecimals(role.pay.max)) {
        throw new Error(`${ref}: hourly pay must have at most two decimal places`);
      }
      if (role.pay.min < NATIONAL_LIVING_WAGE_GBP) {
        throw new Error(
          `${ref}: hourly min ${role.pay.min} is below National Living Wage (${NATIONAL_LIVING_WAGE_GBP})`,
        );
      }
    }

    if (!isValidIsoDate(role.posted)) {
      throw new Error(`${ref}: posted "${role.posted}" must be a valid YYYY-MM-DD date`);
    }
    if (role.posted > updatedDate) {
      throw new Error(
        `${ref}: posted date ${role.posted} is after rolesUpdated ${updatedDate}`,
      );
    }
  }
}

export function validateServices(
  serviceList: readonly EmployerService[],
  rebates: readonly RebateTier[],
): void {
  const seenIds = new Set<string>();
  if (serviceList.length === 0) throw new Error('services: at least one service is required');
  for (const service of serviceList) {
    const ref = `services[${service.id || 'missing-id'}]`;
    if (!service.id || !URL_SAFE_ID.test(service.id)) {
      throw new Error(`${ref}: id must be URL-safe lowercase`);
    }
    if (seenIds.has(service.id)) throw new Error(`${ref}: duplicate service id`);
    seenIds.add(service.id);
    if (!service.name.trim()) throw new Error(`${ref}: name is required`);
    if (!service.bestFor.trim()) throw new Error(`${ref}: bestFor is required`);
    if (service.howItWorks.length !== 3 || service.howItWorks.some((step) => !step.trim())) {
      throw new Error(`${ref}: howItWorks must have three non-empty steps`);
    }
    if (!service.fee.label.trim() || !service.fee.detail.trim()) {
      throw new Error(`${ref}: fee label and detail are required`);
    }
  }
  if (rebates.length === 0) throw new Error('rebateSchedule: at least one rebate tier is required');
  for (const tier of rebates) {
    if (!tier.window.trim() || !tier.rebate.trim() || !tier.note.trim()) {
      throw new Error(`rebateSchedule[${tier.window || 'missing'}]: window, rebate and note are required`);
    }
  }
}
