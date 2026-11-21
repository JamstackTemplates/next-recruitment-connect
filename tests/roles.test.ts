import assert from 'node:assert/strict';
import { test } from 'node:test';
import { roles, rolesUpdated, type Role } from '../content/roles.ts';
import { sectors } from '../content/sectors.ts';
import { team } from '../content/team.ts';
import {
  buildRoleFilterHash,
  countOpenRoles,
  countOpenRolesByConsultant,
  countOpenRolesBySector,
  filterRoles,
  formatPay,
  homeOpenRoles,
  parseRoleFilterHash,
  sortRolesForBoard,
  validateRoles,
} from '../lib/roles.ts';

test('pay formatting covers salary bands, day rates, single-figure hourly and part-time pro rata', () => {
  assert.equal(formatPay({ basis: 'salary', min: 48000, max: 55000 }, 'full-time'), '£48,000–£55,000');
  assert.equal(formatPay({ basis: 'day-rate', min: 450, max: 525 }, 'full-time'), '£450–£525 per day');
  assert.equal(formatPay({ basis: 'hourly', min: 14.5, max: 14.5 }, 'full-time'), '£14.50 per hour');
  assert.equal(formatPay({ basis: 'hourly', min: 15.2, max: 16.4 }, 'full-time'), '£15.20–£16.40 per hour');
  assert.equal(
    formatPay({ basis: 'salary', min: 34000, max: 37000 }, 'part-time'),
    '£34,000–£37,000 pro rata',
  );
});

test('ordering and open counts: Home shows 5 newest open roles; filled sorts last; counts exclude interviewing/filled', () => {
  const home = homeOpenRoles(roles, 5);
  assert.equal(home.length, 5);
  assert.deepEqual(
    home.map((r) => r.id),
    ['bw-2050', 'bw-2049', 'bw-2048', 'bw-2047', 'bw-2045'],
  );
  assert.ok(home.every((r) => r.status === 'open'));

  const board = sortRolesForBoard(roles);
  assert.equal(board.length, 11);
  assert.equal(board.at(-1)?.id, 'bw-2040');
  assert.equal(board.at(-1)?.status, 'filled');

  // 11 total: 1 filled (bw-2040) + 1 interviewing (bw-2038) => 9 open
  assert.equal(countOpenRoles(roles), 9);
  assert.equal(countOpenRolesBySector(roles, 'finance'), 1); // bw-2047 open; bw-2038 interviewing excluded
  assert.equal(countOpenRolesBySector(roles, 'business-support'), 1); // bw-2048 open; bw-2040 filled excluded
  assert.equal(countOpenRolesBySector(roles, 'engineering'), 2);
  assert.equal(countOpenRolesByConsultant(roles, 'tom-haigh'), 1);
  assert.equal(countOpenRolesByConsultant(roles, 'sam-whitaker'), 1);
});

test('role filter applies AND logic, parses hashes safely and handles empty results', () => {
  const sectorIds = sectors.map((s) => s.id);
  assert.deepEqual(parseRoleFilterHash('#sector=engineering&contract=permanent', sectorIds), {
    sector: 'engineering',
    contract: 'permanent',
  });
  assert.deepEqual(parseRoleFilterHash('#sector=unknown&contract=freelance', sectorIds), {
    sector: '',
    contract: '',
  });
  assert.equal(
    buildRoleFilterHash({ sector: 'technology', contract: 'contract' }),
    '#sector=technology&contract=contract',
  );
  assert.equal(buildRoleFilterHash({ sector: '', contract: '' }), '');

  const techContract = filterRoles(roles, { sector: 'technology', contract: 'contract' });
  assert.deepEqual(techContract.map((r) => r.id), ['bw-2049']);

  const empty = filterRoles(roles, { sector: 'construction', contract: 'temporary' });
  assert.equal(empty.length, 0);
});

test('common owner edit: adding bw-2051 and marking bw-2038 filled updates board order and open counts', () => {
  const addedRole: Role = {
    id: 'bw-2051',
    title: 'Quality Engineer',
    sectorId: 'engineering',
    location: 'Halifax',
    workMode: 'on-site',
    contract: 'permanent',
    hours: 'full-time',
    pay: { basis: 'salary', min: 40000, max: 44000 },
    posted: '2026-11-19',
    status: 'open',
    consultantId: 'amara-okafor',
    summary: 'Own ISO 9001 audits and customer corrective actions for a precision Halifax components maker.',
    highlights: [
      'Automotive or aerospace quality background preferred',
      'Monday to Friday days with early Friday finish',
      'Direct report to the Operations Director',
    ],
  };

  const editedRoles: Role[] = [
    addedRole,
    ...roles.map((role) => (role.id === 'bw-2038' ? { ...role, status: 'filled' as const } : role)),
  ];

  assert.doesNotThrow(() => validateRoles(editedRoles, '2026-11-19', sectors, team));

  const home = homeOpenRoles(editedRoles, 5);
  assert.equal(home[0].id, 'bw-2051');
  assert.equal(countOpenRolesBySector(editedRoles, 'engineering'), 3);

  const board = sortRolesForBoard(editedRoles);
  assert.equal(board.length, 12);
  const lastTwo = board.slice(-2);
  assert.ok(lastTwo.every((r) => r.status === 'filled'));
  assert.ok(lastTwo.some((r) => r.id === 'bw-2038'));
});
