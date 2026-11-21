import type { Metadata } from 'next';
import { EnamelSign } from '../../components/art/enamel-sign';
import { NamePlate } from '../../components/art/motifs';
import { TrussDivider } from '../../components/art/truss-divider';
import { PageHead } from '../../components/page-head';
import { EnamelCalloutBand } from '../../components/page-sections';
import { SiteLink } from '../../components/site-link';
import { roles } from '../../content/roles';
import { sectors } from '../../content/sectors';
import { teamMemberById } from '../../content/team';
import { absoluteUrl } from '../../lib/paths';
import { countOpenRolesBySector } from '../../lib/roles';

export const metadata: Metadata = {
  title: 'Six sector desks',
  description:
    'Engineering, Finance, Technology & Data, Construction, Logistics and Office Support recruitment desks in Leeds and Yorkshire.',
  alternates: { canonical: absoluteUrl('/sectors/') },
};

export default function SectorsPage() {
  return (
    <>
      <PageHead
        eyebrow="Specialist desks · West & North Yorkshire"
        title="Six sector desks"
        bottom={
          <div>
            <p className="mb-3 font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
              Jump to a platform
            </p>
            <div
              aria-hidden="true"
              className="h-3.5 w-full rounded-sm border border-ink bg-board"
            />
            <nav aria-label="Sector platforms" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {sectors.map((sector) => {
                const openCount = countOpenRolesBySector(roles, sector.id);
                return (
                  <a
                    key={sector.id}
                    href={`#${sector.id}`}
                    className="block no-underline hover:no-underline"
                  >
                    <EnamelSign
                      sector={sector}
                      openCount={openCount}
                      size="sm"
                      chainHeight={14}
                    />
                  </a>
                );
              })}
            </nav>
          </div>
        }
      >
        <p>
          Each desk is run by a consultant who has worked in or recruited exclusively for that
          trade. Pick a platform below to see typical roles, the employers we work with and live
          openings.
        </p>
      </PageHead>

      {/* Alternating left/right sector platforms separated by thin truss dividers */}
      <div>
        {sectors.map((sector, index) => {
          const lead = teamMemberById(sector.leadId);
          const openCount = countOpenRolesBySector(roles, sector.id);
          const isEven = index % 2 === 0;

          return (
            <div key={sector.id}>
              {index > 0 ? <TrussDivider variant="thin" /> : null}
              <section
                id={sector.id}
                aria-labelledby={`sector-${sector.id}-heading`}
                className={isEven ? 'bg-paper-grain py-14 sm:py-20' : 'bg-surface py-14 sm:py-20'}
              >
                <div className="wrap grid items-center gap-10 lg:grid-cols-12">
                  {/* Enlarged enamel sign column (alternates left / right on desktop) */}
                  <div
                    className={`lg:col-span-4 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="mx-auto max-w-xs">
                      <div
                        aria-hidden="true"
                        className="h-3.5 w-full rounded-sm border border-ink bg-board"
                      />
                      <EnamelSign
                        sector={sector}
                        leadName={lead?.name}
                        openCount={openCount}
                        size="lg"
                        chainHeight={24}
                      />
                    </div>
                  </div>

                  {/* Platform details */}
                  <div
                    className={`lg:col-span-8 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <p className="eyebrow">Platform 0{index + 1}</p>
                    <h2
                      id={`sector-${sector.id}-heading`}
                      className="mt-2 text-[clamp(1.85rem,4vw,2.75rem)] font-extrabold text-ink"
                    >
                      {sector.name}
                    </h2>
                    <p className="mt-3 max-w-2xl text-lg text-muted">{sector.summary}</p>

                    <div className="mt-6 grid gap-6 border-y border-rule py-6 sm:grid-cols-2">
                      <div>
                        <h3 className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                          Typical roles
                        </h3>
                        <ul className="mt-3 space-y-2 font-mono text-sm text-ink">
                          {sector.typicalRoles.map((roleName) => (
                            <li key={roleName} className="flex items-center gap-2.5">
                              <span
                                aria-hidden="true"
                                className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-primary bg-flap"
                              />
                              <span>{roleName}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                          Who we recruit for
                        </h3>
                        <p className="mt-3 text-base text-ink">{sector.clients}.</p>

                        {lead ? (
                          <div className="mt-5">
                            <p className="mb-2 font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                              Desk lead
                            </p>
                            <SiteLink
                              href={`/team/#${lead.id}`}
                              className="inline-block no-underline hover:no-underline"
                            >
                              <NamePlate
                                monogram={lead.monogram}
                                name={lead.name}
                                subtitle={lead.role}
                                compact
                              />
                            </SiteLink>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <SiteLink
                        href={`/roles/#sector=${sector.id}`}
                        className="button"
                      >
                        {openCount === 1
                          ? 'See the 1 open role in this sector'
                          : `See the ${openCount} open roles in this sector`}{' '}
                        →
                      </SiteLink>
                      <SiteLink href="/contact/" className="text-link font-semibold">
                        Speak to this desk
                      </SiteLink>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </div>

      <EnamelCalloutBand
        eyebrow="Not listed here?"
        heading="Hiring or looking on the edge of two desks?"
        ctaHref="/contact/"
        ctaLabel="Start a conversation"
      >
        <p>
          Many Yorkshire roles sit between two disciplines — a finance systems analyst or a
          manufacturing operations manager. Tell us what you need and the right consultant will reply.
        </p>
      </EnamelCalloutBand>
    </>
  );
}
