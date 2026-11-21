import type { Metadata } from 'next';
import { NamePlate } from '../../components/art/motifs';
import { PageHead } from '../../components/page-head';
import { EnamelCalloutBand } from '../../components/page-sections';
import { SiteLink } from '../../components/site-link';
import { roles } from '../../content/roles';
import { sectorById } from '../../content/sectors';
import { team } from '../../content/team';
import { absoluteUrl } from '../../lib/paths';
import { countOpenRolesByConsultant } from '../../lib/roles';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the six named consultants running Bridgework Recruitment’s sector desks at Granary Wharf, Leeds.',
  alternates: { canonical: absoluteUrl('/team/') },
};

export default function TeamPage() {
  return (
    <>
      <PageHead
        eyebrow="Granary Wharf · Leeds LS1"
        title="The people at the desks"
        bottom={
          <div>
            <p className="mb-3 font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
              Jump to a consultant
            </p>
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-3.5 -translate-y-1/2 rounded-sm border-y border-ink bg-primary/85 lg:block"
              />
              <nav aria-label="Consultants" className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => {
                  const desk = sectorById(member.sectorIds[0]);
                  return (
                    <a
                      key={member.id}
                      href={`#${member.id}`}
                      className="block no-underline hover:no-underline"
                    >
                      <NamePlate
                        monogram={member.monogram}
                        name={member.name}
                        subtitle={desk ? desk.signLabel : member.role}
                        compact
                      />
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        }
      >
        <p>
          Six specialist consultants, one desk each. When you enquire about a role or send a hiring
          brief, the person below is the one who picks it up and sees it through.
        </p>
      </PageHead>

      {/* Two-column staggered cast-plate profiles */}
      <section aria-label="Consultant profiles" className="bg-paper-grain py-14 sm:py-20">
        <div className="wrap grid gap-8 md:grid-cols-2">
          {team.map((member, index) => {
            const desk = sectorById(member.sectorIds[0]);
            const openCount = countOpenRolesByConsultant(roles, member.id);

            return (
              <article
                key={member.id}
                id={member.id}
                className={`rivet-frame flex flex-col justify-between overflow-hidden ${
                  index % 2 === 1 ? 'md:translate-y-6' : ''
                }`}
              >
                {/* Cast-iron header plate */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink bg-board px-6 py-5 text-on-board">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-flap bg-primary font-display text-xl font-extrabold text-on-primary shadow-[0_0_0_2px_#0A0D0C]"
                    >
                      {member.monogram}
                    </span>
                    <div>
                      <h2 className="text-xl font-extrabold text-on-board">{member.name}</h2>
                      <p className="font-mono text-xs tracking-wider text-flap uppercase">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <span className="rounded border border-[#34403A] bg-[#161E1A] px-2.5 py-1 font-mono text-[0.72rem] font-bold tracking-wider text-on-board-muted uppercase">
                    Since {member.joinedYear}
                  </span>
                </div>

                {/* Profile body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {desk ? (
                      <p className="font-mono text-xs font-bold tracking-[0.12em] text-primary uppercase">
                        Desk: {desk.name}
                      </p>
                    ) : null}
                    <p className="mt-3 text-base leading-relaxed text-ink">{member.bio}</p>

                    <div className="mt-5 rounded-ui border border-dashed border-rule bg-paper px-4 py-3.5">
                      <p className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                        Ask me about
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink">{member.askMeAbout}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
                    {desk ? (
                      <SiteLink
                        href={`/roles/#sector=${desk.id}`}
                        className="text-link font-mono text-xs font-bold tracking-wider uppercase"
                      >
                        {openCount} open {openCount === 1 ? 'role' : 'roles'} on this desk →
                      </SiteLink>
                    ) : null}
                    <SiteLink href="/contact/" className="button min-h-[2.3rem] px-3.5 py-1 text-sm">
                      Message desk
                    </SiteLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <EnamelCalloutBand
        eyebrow="Direct routing"
        heading="Not sure who to ask for?"
        ctaHref="/contact/"
        ctaLabel="Send an enquiry"
      >
        <p>Tell us your sector and we will pass you to the right desk.</p>
      </EnamelCalloutBand>
    </>
  );
}
