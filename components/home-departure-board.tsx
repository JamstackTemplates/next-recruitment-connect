'use client';

import { useEffect, useState } from 'react';
import type { Role } from '../content/roles';
import { formatUkDate } from '../lib/roles';
import { DepartureBoard } from './departure-board';
import { SiteLink } from './site-link';

/**
 * Home page departure board wrapper: renders the 5 newest open roles statically,
 * and triggers a single subtle split-flap flip on mount when motion is allowed.
 */
export function HomeDepartureBoard({
  roles,
  totalRolesCount,
  openRolesCount,
  rolesUpdated,
  headingId,
}: {
  headingId?: string;
  roles: readonly Role[];
  totalRolesCount: number;
  openRolesCount: number;
  rolesUpdated: string;
}) {
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    setFlipping(true);
    const timer = setTimeout(() => setFlipping(false), 750);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DepartureBoard
      roles={roles}
      heading="DEPARTURES"
      headingId={headingId}
      sublabel={`${openRolesCount} OPEN ROLES · UPDATED ${formatUkDate(rolesUpdated).toUpperCase()}`}
      flipping={flipping}
      footer={
        <>
          <p className="font-mono text-xs tracking-wider text-on-board-muted uppercase">
            Showing the 5 newest open roles across our six Yorkshire desks.
          </p>
          <SiteLink href="/roles/" className="button-flap">
            All {totalRolesCount} roles →
          </SiteLink>
        </>
      }
    />
  );
}
