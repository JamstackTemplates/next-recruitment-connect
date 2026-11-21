import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { NATIONAL_LIVING_WAGE_GBP, roles, rolesUpdated, type Role } from '../content/roles.ts';
import { sectors } from '../content/sectors.ts';
import { rebateSchedule, services } from '../content/services.ts';
import { team } from '../content/team.ts';
import { validateHours } from '../lib/hours.ts';
import {
  validateRoles,
  validateSectors,
  validateServices,
  validateTeam,
} from '../lib/roles.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and valid opening hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'legalLine', 'sampleDisclaimer'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.candidateChecklist.length >= 3, 'business.enquiries.candidateChecklist: required');
  assert.ok(business.enquiries.employerChecklist.length >= 3, 'business.enquiries.employerChecklist: required');
  assert.match(business.legalLine, /never charge candidates a fee/i);
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('all Bridgework collections pass validation cleanly', () => {
  assert.doesNotThrow(() => validateSectors(sectors, team));
  assert.doesNotThrow(() => validateTeam(team, sectors, 2026));
  assert.doesNotThrow(() => validateRoles(roles, rolesUpdated, sectors, team));
  assert.doesNotThrow(() => validateServices(services, rebateSchedule));
});

test('role validation reports item-specific failures for IDs, pay, dates, highlights and references', () => {
  const sample = roles[0];

  assert.throws(
    () =>
      validateRoles(
        [{ ...sample, id: 'bw-2047', contract: 'contract', pay: { basis: 'day-rate', min: 450, max: 425 } }],
        rolesUpdated,
        sectors,
        team,
      ),
    /roles\[bw-2047\]: day-rate max 425 is below min 450/,
  );

  assert.throws(
    () => validateRoles([{ ...sample, id: 'BW-2050' }], rolesUpdated, sectors, team),
    /roles\[BW-2050\]: id must match/,
  );

  assert.throws(
    () => validateRoles([sample, { ...sample }], rolesUpdated, sectors, team),
    /roles\[bw-2050\]: duplicate role id/,
  );

  assert.throws(
    () =>
      validateRoles(
        [{ ...sample, highlights: ['One', 'Two'] as unknown as Role['highlights'] }],
        rolesUpdated,
        sectors,
        team,
      ),
    /roles\[bw-2050\]: highlights must contain exactly three/,
  );

  assert.throws(
    () => validateRoles([{ ...sample, sectorId: 'aerospace' }], rolesUpdated, sectors, team),
    /roles\[bw-2050\]: sectorId "aerospace" does not match/,
  );

  assert.throws(
    () => validateRoles([{ ...sample, consultantId: 'amara-okafor' }], rolesUpdated, sectors, team),
    /roles\[bw-2050\]: consultant "amara-okafor" does not cover sector "logistics"/,
  );

  assert.throws(
    () =>
      validateRoles(
        [{ ...sample, contract: 'permanent', pay: { basis: 'day-rate', min: 300, max: 350 } }],
        rolesUpdated,
        sectors,
        team,
      ),
    /roles\[bw-2050\]: permanent role must use pay basis "salary"/,
  );

  assert.throws(
    () =>
      validateRoles(
        [
          {
            ...sample,
            id: 'bw-2099',
            contract: 'temporary',
            pay: { basis: 'hourly', min: NATIONAL_LIVING_WAGE_GBP - 0.5, max: 14 },
          },
        ],
        rolesUpdated,
        sectors,
        team,
      ),
    /roles\[bw-2099\]: hourly min .* below National Living Wage/,
  );

  assert.throws(
    () => validateRoles([{ ...sample, posted: '2026-11-20' }], rolesUpdated, sectors, team),
    /roles\[bw-2050\]: posted date 2026-11-20 is after rolesUpdated 2026-11-18/,
  );
});

test('sector and team validation catch broken leads, duplicate icons and bad joinedYear', () => {
  assert.throws(
    () => validateSectors(sectors.map((s, i) => (i === 1 ? { ...s, icon: sectors[0].icon } : s)), team),
    /sectors\[finance\]: duplicate icon/,
  );

  assert.throws(
    () => validateSectors(sectors.map((s) => (s.id === 'finance' ? { ...s, leadId: 'amara-okafor' } : s)), team),
    /sectors\[finance\]: lead "amara-okafor" does not cover sector "finance"/,
  );

  assert.throws(
    () => validateTeam(team.map((m) => (m.id === 'sam-whitaker' ? { ...m, joinedYear: 2012 } : m)), sectors, 2026),
    /team\[sam-whitaker\]: joinedYear 2012 must be between 2014 and 2026/,
  );
});

test('structured data emits EmploymentAgency with team employees and no JobPosting', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'EmploymentAgency');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.deepEqual(schema.areaServed, ['West Yorkshire', 'North Yorkshire']);
  assert.deepEqual(schema.knowsAbout, sectors.map((s) => s.name));
  assert.equal(schema.openingHoursSpecification.length, 5);
  assert.deepEqual(
    schema.employee,
    team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
  );
  assert.ok(!JSON.stringify(schema).includes('JobPosting'), 'must not emit JobPosting markup');
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
