import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map((day) =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('Bridgework Europe/London office-hours boundaries and UK DST transitions', () => {
  const london = (isoUtc: string) => openingLabel(business.hours, 'Europe/London', new Date(isoUtc));

  // Friday 17:29 open, 17:30 closed (GMT in November)
  assert.equal(london('2026-11-20T17:29:00Z'), 'Open now · until 17:30');
  assert.equal(london('2026-11-20T17:30:00Z'), 'Closed · opens Monday at 08:30');

  // Saturday closed -> Monday 08:30
  assert.equal(london('2026-11-21T12:00:00Z'), 'Closed · opens Monday at 08:30');

  // Monday 08:29 closed, 08:30 open (GMT)
  assert.equal(london('2026-11-23T08:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(london('2026-11-23T08:30:00Z'), 'Open now · until 17:30');

  // UK spring DST change: Sunday 29 March 2026 (GMT -> BST, UTC+1)
  // Friday 27 March (GMT): 08:30 local = 08:30Z
  assert.equal(london('2026-03-27T08:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(london('2026-03-27T08:30:00Z'), 'Open now · until 17:30');
  // Monday 30 March (BST): 08:30 local = 07:30Z, 17:30 local = 16:30Z
  assert.equal(london('2026-03-30T07:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(london('2026-03-30T07:30:00Z'), 'Open now · until 17:30');
  assert.equal(london('2026-03-30T16:30:00Z'), 'Closed · opens Tuesday at 08:30');

  // UK autumn DST change: Sunday 25 October 2026 (BST -> GMT, UTC+0)
  // Friday 23 October (BST): 17:29 local = 16:29Z, 17:30 local = 16:30Z
  assert.equal(london('2026-10-23T16:29:00Z'), 'Open now · until 17:30');
  assert.equal(london('2026-10-23T16:30:00Z'), 'Closed · opens Monday at 08:30');
  // Monday 26 October (GMT): 08:30 local = 08:30Z
  assert.equal(london('2026-10-26T08:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(london('2026-10-26T08:30:00Z'), 'Open now · until 17:30');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map((day) => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(hours.map((x) => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(hours.map((x) => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
