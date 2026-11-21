'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ContractType, Role } from '../content/roles';
import type { Sector } from '../content/sectors';
import {
  buildRoleFilterHash,
  filterRoles,
  formatPay,
  formatRoleRef,
  formatUkDate,
  parseRoleFilterHash,
  type RoleFilter,
} from '../lib/roles';
import { SectorIconArt } from './art/sector-icons';
import { DepartureBoard } from './departure-board';
import { SiteLink } from './site-link';

const CONTRACT_OPTIONS: readonly { value: ContractType; label: string }[] = [
  { value: 'permanent', label: 'Permanent' },
  { value: 'contract', label: 'Contract' },
  { value: 'temporary', label: 'Temporary' },
];

/**
 * Interactive filter rail + split-flap board for /roles/.
 * Progressive enhancement: the filter rail mounts only when JS runs; static/no-JS HTML
 * displays the full departure board immediately with zero non-functional controls.
 */
export function RolesBoardClient({
  sortedRoles,
  sectors,
  rolesUpdated,
}: {
  sortedRoles: readonly Role[];
  sectors: readonly Sector[];
  rolesUpdated: string;
}) {
  const sectorIds = useMemo(() => sectors.map((sector) => sector.id), [sectors]);
  const [hydrated, setHydrated] = useState(false);
  const [filter, setFilter] = useState<RoleFilter>({ sector: '', contract: '' });
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const readHash = () => {
      const parsed = parseRoleFilterHash(window.location.hash, sectorIds);
      setFilter(parsed);
    };

    readHash();
    setFlipping(true);
    const initialTimer = setTimeout(() => setFlipping(false), 680);

    window.addEventListener('hashchange', readHash);
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('hashchange', readHash);
    };
  }, [sectorIds]);

  function triggerFlip() {
    setFlipping(false);
    requestAnimationFrame(() => {
      setFlipping(true);
    });
  }

  function updateFilter(next: RoleFilter) {
    setFilter(next);
    triggerFlip();
    const hash = buildRoleFilterHash(next);
    const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
    window.history.replaceState(null, '', nextUrl);
  }

  function toggleSector(id: string) {
    updateFilter({ ...filter, sector: filter.sector === id ? '' : id });
  }

  function toggleContract(contract: ContractType) {
    updateFilter({ ...filter, contract: filter.contract === contract ? '' : contract });
  }

  function clearFilters() {
    updateFilter({ sector: '', contract: '' });
  }

  const visibleRoles = useMemo(
    () => (hydrated ? filterRoles(sortedRoles, filter) : sortedRoles),
    [hydrated, sortedRoles, filter],
  );

  const hasActiveFilter = Boolean(filter.sector || filter.contract);

  return (
    <div className="space-y-6">
      {/* Lever-style filter rail — rendered only when hydrated so no-JS sees clean full board */}
      {hydrated ? (
        <div
          aria-label="Filter current roles"
          className="print-hide sticky top-[5.35rem] z-30 rounded-ui border-2 border-ink bg-surface/95 p-3.5 shadow-[0_6px_18px_rgba(16,21,19,0.14)] backdrop-blur-sm sm:p-4"
        >
          <div className="flex flex-col gap-3">
            {/* Sector lever chips (horizontal scroll strip on mobile, wrap on desktop) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
              <span className="shrink-0 font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                Sector:
              </span>
              {sectors.map((sector) => {
                const active = filter.sector === sector.id;
                return (
                  <button
                    key={sector.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleSector(sector.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-ui border-[1.5px] px-3 py-1.5 font-mono text-xs font-bold tracking-[0.06em] uppercase transition-colors ${
                      active
                        ? 'border-ink bg-primary text-on-primary shadow-[0_2px_0_var(--ink)]'
                        : 'border-rule bg-paper text-ink hover:border-primary'
                    }`}
                  >
                    <SectorIconArt icon={sector.icon} size={20} />
                    <span>{sector.signLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Contract chips + live count + clear */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule/80 pt-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                  Type:
                </span>
                {CONTRACT_OPTIONS.map((option) => {
                  const active = filter.contract === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleContract(option.value)}
                      className={`inline-flex items-center rounded-ui border-[1.5px] px-3 py-1.5 font-mono text-xs font-bold tracking-[0.06em] uppercase transition-colors ${
                        active
                          ? 'border-ink bg-flap text-[#141917] shadow-[0_2px_0_var(--ink)]'
                          : 'border-rule bg-paper text-ink hover:border-primary'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <p
                  role="status"
                  aria-live="polite"
                  className="font-mono text-xs font-bold tracking-[0.08em] text-ink uppercase"
                >
                  Showing {visibleRoles.length} of {sortedRoles.length} roles
                </p>
                {hasActiveFilter ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-ui border border-ink bg-paper px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-ink uppercase hover:bg-flap hover:text-[#141917]"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Departure board or empty state */}
      {visibleRoles.length > 0 ? (
        <DepartureBoard
          roles={visibleRoles}
          heading="CURRENT ROLES"
          sublabel={`UPDATED ${formatUkDate(rolesUpdated).toUpperCase()} · ${visibleRoles.length} LISTED`}
          flipping={flipping}
        />
      ) : (
        <div className="rivet-frame-board px-6 py-12 text-center text-on-board">
          <p className="font-mono text-sm font-extrabold tracking-[0.18em] text-flap uppercase">
            Nothing on this line right now
          </p>
          <p className="mx-auto mt-3 max-w-lg text-on-board-muted">
            No live roles match that combination at the moment. Most roles are filled before they
            reach the board, so message the desk and tell us what you are looking for.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={clearFilters} className="button-flap">
              Show all roles
            </button>
            <SiteLink href="/contact/" className="button">
              Send an enquiry →
            </SiteLink>
          </div>
        </div>
      )}

      {/* Print-only plain HTML table of all roles */}
      <table className="print-roles-table">
        <caption>Bridgework Recruitment — Current roles (updated {rolesUpdated})</caption>
        <thead>
          <tr>
            <th>Ref</th>
            <th>Role</th>
            <th>Location</th>
            <th>Type</th>
            <th>Pay</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedRoles.map((role) => (
            <tr key={role.id}>
              <td>{formatRoleRef(role.id)}</td>
              <td>{role.title}</td>
              <td>{role.location}</td>
              <td>{role.contract}</td>
              <td>{formatPay(role.pay, role.hours)}</td>
              <td>{role.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
