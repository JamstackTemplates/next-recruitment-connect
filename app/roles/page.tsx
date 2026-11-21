import type { Metadata } from 'next';
import { PageHead } from '../../components/page-head';
import { EnamelCalloutBand } from '../../components/page-sections';
import { RolesBoardClient } from '../../components/roles-board-client';
import { roles, rolesUpdated } from '../../content/roles';
import { sectors } from '../../content/sectors';
import { absoluteUrl } from '../../lib/paths';
import { countOpenRoles, formatUkDate, sortRolesForBoard } from '../../lib/roles';

export const metadata: Metadata = {
  title: 'Current roles',
  description:
    'Live permanent, contract and temporary roles across our six Yorkshire sector desks, with pay bands and named consultants.',
  alternates: { canonical: absoluteUrl('/roles/') },
};

export default function RolesPage() {
  const sorted = sortRolesForBoard(roles);
  const openCount = countOpenRoles(roles);

  return (
    <>
      <PageHead
        variant="brick"
        eyebrow={`Current roles · Board updated ${formatUkDate(rolesUpdated)}`}
        title="Current roles"
        aside={
          <div className="rounded-ui border-2 border-[#FBF9F3]/40 bg-board px-5 py-4 text-on-board shadow-[0_6px_0_rgba(10,13,12,0.38)]">
            <p className="font-mono text-xs font-bold tracking-[0.14em] text-flap uppercase">
              Board status
            </p>
            <p className="mt-1 font-display text-2xl font-extrabold text-on-board">
              {openCount} open · {roles.length} listed
            </p>
            <p className="mt-1 font-mono text-xs text-on-board-muted">
              Last checked {formatUkDate(rolesUpdated)}
            </p>
          </div>
        }
      >
        <p>
          Every live permanent, contract and temporary role across West and North Yorkshire, with
          the real pay band and the consultant running the desk. Select any row to read the full
          ticket.
        </p>
      </PageHead>

      <section aria-label="Departure board of current roles" className="bg-paper-grain py-10 sm:py-14">
        <div className="wrap">
          <RolesBoardClient
            sortedRoles={sorted}
            sectors={sectors}
            rolesUpdated={rolesUpdated}
          />

          {/* Status legend */}
          <div className="mt-8 rounded-ui border border-rule bg-surface p-5">
            <h2 className="font-mono text-xs font-bold tracking-[0.15em] text-muted uppercase">
              Board status legend
            </h2>
            <dl className="mt-3 grid gap-4 text-sm sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <dt>
                  <span className="flap-tile flap-tile-open text-[0.68rem]">OPEN</span>
                </dt>
                <dd className="text-muted">Actively shortlisting now. Send an enquiry quoting the reference.</dd>
              </div>
              <div className="flex items-start gap-3">
                <dt>
                  <span className="flap-tile flap-tile-interviewing text-[0.68rem]">INTERVIEWING</span>
                </dt>
                <dd className="text-muted">First-stage interviews underway, still open to strong expressions of interest.</dd>
              </div>
              <div className="flex items-start gap-3">
                <dt>
                  <span className="flap-tile flap-tile-filled text-[0.68rem]">FILLED</span>
                </dt>
                <dd className="text-muted">Recently placed via Bridgework; kept briefly so you can see typical pay bands.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <EnamelCalloutBand
        eyebrow="Unadvertised roles"
        heading="Don’t see your role?"
        ctaHref="/contact/"
        ctaLabel="Send an enquiry"
        showTicket
      >
        <p>
          Most of our roles are filled before they are advertised. Register with the desk for your
          sector and we will call you first.
        </p>
      </EnamelCalloutBand>
    </>
  );
}
