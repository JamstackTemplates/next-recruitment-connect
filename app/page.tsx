import type { Metadata } from 'next';
import { EnamelSign } from '../components/art/enamel-sign';
import { MakersPlate } from '../components/art/motifs';
import { RouteMap } from '../components/art/route-map';
import { TrussDivider } from '../components/art/truss-divider';
import { HomeDepartureBoard } from '../components/home-departure-board';
import { Diptych, FindUsBand, Hero, NumbersBand } from '../components/home-sections';
import { SiteLink } from '../components/site-link';
import { roles, rolesUpdated } from '../content/roles';
import { sectorById, sectors } from '../content/sectors';
import { team, teamMemberById } from '../content/team';
import { absoluteUrl } from '../lib/paths';
import { countOpenRoles, countOpenRolesBySector, homeOpenRoles } from '../lib/roles';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const GANTRY_CHAIN_HEIGHTS = [16, 34, 22, 38, 18, 30] as const;

export default function HomePage() {
  const featuredRoles = homeOpenRoles(roles, 5);
  const openCount = countOpenRoles(roles);

  return (
    <>
      {/* 1. HERO: Two banks of the Aire */}
      <Hero imageAlt="Railway-poster view of Granary Wharf in Leeds: a riveted green iron truss bridge sweeps over the River Aire, with Victorian brick warehouses and railway arches on one bank, a mill chimney, crane and glass office on the other, Leeds Town Hall's clock tower in the haze, and two people meeting on a footbridge.">
        <Hero.Grid>
          <Hero.Heading kicker="Granary Wharf · Leeds · Since 2014">
            Good people,
            <br />
            good work,
            <br />
            <span className="hero-headline__accent">one crossing.</span>
          </Hero.Heading>
          <Hero.Body>
            <Hero.Status />
            <Hero.Introduction>
              Bridgework is a Leeds recruitment consultancy with six sector desks and a named
              consultant behind every role. Whether you are looking for your next job or need
              someone to start next month, we know both sides of the river.
            </Hero.Introduction>
            <Hero.Actions>
              <Hero.Primary href="/roles/">See current roles</Hero.Primary>
              <Hero.Secondary href="/employers/">Hiring? Brief us</Hero.Secondary>
            </Hero.Actions>
          </Hero.Body>
        </Hero.Grid>
      </Hero>

      {/* 2. DEPARTURES: Full-bleed dark split-flap board band */}
      <section aria-labelledby="departures-heading" className="board-band">
        <TrussDivider variant="thin" />
        <div className="wrap py-12 sm:py-16">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <p className="eyebrow eyebrow-board">Live Yorkshire board · Platform 1</p>
            <p className="max-w-xl text-sm text-on-board-muted">
              The five most recently posted open roles. Every role has a real pay band and a named
              consultant.
            </p>
          </div>

          <HomeDepartureBoard
            headingId="departures-heading"
            roles={featuredRoles}
            totalRolesCount={roles.length}
            openRolesCount={openCount}
            rolesUpdated={rolesUpdated}
          />
        </div>
      </section>

      {/* 3. WHICH SIDE ARE YOU ON?: Two-bank diptych split by a vertical truss pillar */}
      <Diptych eyebrow="Two banks, one consultancy" heading="Which side are you on?">
        <Diptych.CandidateBank
          title="Looking for your next role?"
          ctaLabel="How we work with candidates"
        >
          <Diptych.Point>
            <strong>No fees, ever</strong> — employers pay our fee, never the person looking for
            work.
          </Diptych.Point>
          <Diptych.Point>
            <strong>We never send your CV anywhere without asking you first</strong> — you know the
            employer, pay band and team before any introduction.
          </Diptych.Point>
          <Diptych.Point>
            <strong>You will always know who your consultant is</strong> — one desk specialist from
            first call to start date.
          </Diptych.Point>
        </Diptych.CandidateBank>

        <Diptych.Divider />

        <Diptych.EmployerBank title="Need someone who can start well?" ctaLabel="Services & fees">
          <Diptych.Point>
            <strong>Shortlist in a median of 11 days</strong> — three to five people we have
            actually interviewed, not a folder of unscreened CVs.
          </Diptych.Point>
          <Diptych.Point>
            <strong>16% fee on permanent roles, payable on start</strong> — clear rates up front,
            with nothing owed if nobody starts.
          </Diptych.Point>
          <Diptych.Point>
            <strong>A 12-week sliding rebate</strong> — 100% in weeks 1–4, 50% in weeks 5–8 and 25%
            in weeks 9–12.
          </Diptych.Point>
        </Diptych.EmployerBank>
      </Diptych>

      {/* 4. SIX SECTOR DESKS: Full-bleed brick band with hanging vitreous-enamel signs */}
      <section aria-labelledby="sectors-heading" className="bg-brick-band border-y-2 border-ink">
        <div className="wrap py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow eyebrow-brick">Granary Wharf platforms</p>
              <h2
                id="sectors-heading"
                className="mt-2 text-[clamp(2rem,4.5vw,3.1rem)] font-extrabold text-on-brick"
              >
                Six sector desks
              </h2>
            </div>
            <SiteLink href="/sectors/" className="button-flap">
              Explore all six desks →
            </SiteLink>
          </div>

          {/* Overhead steel gantry beam */}
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="h-5 w-full rounded-sm border-2 border-ink bg-board shadow-[0_4px_0_rgba(10,13,12,0.35)]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, transparent 0 22px, rgba(240,194,74,0.45) 22px 26px, transparent 26px 48px)',
              }}
            />

            <div className="grid grid-cols-2 items-start gap-x-4 gap-y-6 lg:grid-cols-6">
              {sectors.map((sector, index) => {
                const lead = teamMemberById(sector.leadId);
                const sectorOpen = countOpenRolesBySector(roles, sector.id);
                return (
                  <SiteLink
                    key={sector.id}
                    href={`/sectors/#${sector.id}`}
                    className="block no-underline hover:no-underline"
                    aria-label={`${sector.name} desk led by ${lead?.name ?? 'Bridgework'}, ${sectorOpen} open ${sectorOpen === 1 ? 'role' : 'roles'}`}
                  >
                    <EnamelSign
                      sector={sector}
                      leadName={lead?.name.split(' ')[0]}
                      openCount={sectorOpen}
                      chainHeight={GANTRY_CHAIN_HEIGHTS[index % GANTRY_CHAIN_HEIGHTS.length]}
                    />
                  </SiteLink>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BY THE NUMBERS: Asymmetric 2+2 oversized Bricolage numerals on faint trusses */}
      <NumbersBand
        eyebrow="Illustrative track record"
        heading="By the numbers"
        note="Fictitious sample figures illustrating how Bridgework reports its placement record since 2014."
      >
        <NumbersBand.Tile figure="412" wide>
          Permanent placements across West and North Yorkshire since Bridgework opened at Granary
          Wharf in 2014.
        </NumbersBand.Tile>
        <NumbersBand.Tile figure="87%">
          Of permanent placements still in post twelve months after their start date.
        </NumbersBand.Tile>
        <NumbersBand.Tile figure="11 days">
          Median time from taking a hiring brief to delivering an interviewed first shortlist.
        </NumbersBand.Tile>
        <NumbersBand.Tile figure="6" wide>
          Dedicated Yorkshire sector desks, each led by a named consultant who knows the local
          employers and pay bands.
        </NumbersBand.Tile>
      </NumbersBand>

      {/* 6. HOW A CROSSING WORKS: Surface panel with forked transit route map */}
      <section aria-labelledby="crossing-heading" className="border-y border-rule bg-surface py-14 sm:py-20">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Two lines, one interchange</p>
              <h2
                id="crossing-heading"
                className="mt-2 text-[clamp(2rem,4.5vw,3.1rem)] font-extrabold text-ink"
              >
                How a crossing works
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              No black-box portals. Both sides follow a clear sequence that meets at a well-prepared
              start date.
            </p>
          </div>

          <div className="rivet-frame bg-paper p-6 sm:p-8">
            <RouteMap mode="both" />
          </div>
        </div>
      </section>

      {/* 7. THE PEOPLE AT THE DESKS: Horizontal girder with six cast-iron oval name plates */}
      <section aria-labelledby="team-strip-heading" className="bg-paper-grain py-14 sm:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Named consultants, never a call centre</p>
              <h2
                id="team-strip-heading"
                className="mt-2 text-[clamp(2rem,4.5vw,3.1rem)] font-extrabold text-ink"
              >
                The people at the desks
              </h2>
            </div>
            <SiteLink href="/team/" className="button button-secondary">
              Meet the full team →
            </SiteLink>
          </div>

          <div className="team-girder mt-10">
            <div aria-hidden="true" className="team-girder__beam" />
            <ul className="team-girder__plates">
              {team.map((member) => {
                const desk = sectorById(member.sectorIds[0]);
                return (
                  <li key={member.id} className="team-girder__hanger">
                    <SiteLink
                      href={`/team/#${member.id}`}
                      className="team-girder__link"
                    >
                      <MakersPlate
                        monogram={member.monogram}
                        name={member.name}
                        desk={desk ? desk.signLabel : member.role}
                        since={member.joinedYear}
                      />
                    </SiteLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. FIND US AT GRANARY WHARF: Dark board band with station panel + GoogleMap */}
      <FindUsBand
        eyebrow="Visit or call the wharf"
        heading="Find us at Granary Wharf"
        ctaLabel="See current roles"
        walkLabel="Walking route · about 2 minutes"
        walkStops={[
          { name: 'Leeds station', detail: 'South entrance' },
          { name: 'Footbridge', detail: 'Over the River Aire' },
          { name: 'Arches Yard', detail: 'Third floor, Bridgework' },
        ]}
      >
        <p>
          Pop across the footbridge from Leeds station for a coffee before or after work, or drop us
          a message to arrange an early or evening call with your desk consultant.
        </p>
      </FindUsBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
