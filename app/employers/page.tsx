import type { Metadata } from 'next';
import { BlueprintKeystone } from '../../components/art/motifs';
import { RouteMap, type RouteStop } from '../../components/art/route-map';
import { PageHead } from '../../components/page-head';
import { ChecklistTicket, QuoteBand } from '../../components/page-sections';
import { business } from '../../content/business';
import { rebateSchedule, services, vatNote } from '../../content/services';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Employers',
  description:
    'Recruitment services, clear fee schedule and 12-week rebate for Yorkshire employers hiring permanent, retained, contract or temporary staff.',
  alternates: { canonical: absoluteUrl('/employers/') },
};

const EMPLOYER_ROUTE: readonly RouteStop[] = [
  { label: 'Brief', detail: 'Site visit or call with your desk lead to agree spec and real pay.' },
  { label: 'Shortlist', detail: '3–5 interviewed candidates delivered in a median of 11 days.' },
  { label: 'Interviews', detail: 'Coordinated scheduling and candid two-way feedback.' },
  { label: 'Offer', detail: 'Salary, notice and start-date management with zero surprises.' },
  { label: '12-week check-in', detail: 'Post-start follow-up backed by our sliding rebate.' },
];

export default function EmployersPage() {
  return (
    <>
      <PageHead
        variant="blueprint"
        eyebrow="Right bank · For Yorkshire employers"
        title="Hiring in Yorkshire"
        aside={<BlueprintKeystone />}
      >
        <p>
          Built for owner-managers, HR leads and hiring managers at firms with 20 to 500 staff. You
          get a named sector consultant, honest market feedback on salary, clear fees and a tight
          shortlist quickly.
        </p>
      </PageHead>

      {/* Three ways to hire: architectural specification sheet */}
      <section aria-labelledby="services-heading" className="bg-paper-grain py-14 sm:py-20">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Specification sheet</p>
              <h2
                id="services-heading"
                className="mt-2 text-[clamp(1.9rem,4.2vw,3rem)] font-extrabold text-ink"
              >
                Three ways to hire
              </h2>
            </div>
            <p className="font-mono text-xs font-bold tracking-[0.12em] text-muted uppercase">
              Clear terms · No hidden add-ons
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="rivet-frame flex flex-col justify-between overflow-hidden p-6 sm:p-7"
              >
                <div>
                  {/* Dimension line & callout number */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-flap font-mono text-sm font-extrabold text-[#141917]">
                      {service.code}
                    </span>
                    <span aria-hidden="true" className="h-[1.5px] flex-1 bg-rule" />
                    <span className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                      SPEC {service.code}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-extrabold text-ink">{service.name}</h3>

                  <div className="mt-5 border-t border-rule pt-4">
                    <p className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                      Best for
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-ink">{service.bestFor}</p>
                  </div>

                  <div className="mt-5 border-t border-rule pt-4">
                    <p className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                      How it works
                    </p>
                    <ol className="mt-2.5 space-y-2 text-sm text-muted">
                      {service.howItWorks.map((step, i) => (
                        <li key={step} className="flex items-start gap-2.5">
                          <span className="font-mono text-xs font-bold text-primary">0{i + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-6 rounded-ui border border-ink/20 bg-paper p-4">
                  <p className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                    Fee
                  </p>
                  <p className="mt-1 font-display text-lg font-extrabold text-primary">
                    {service.fee.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{service.fee.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule of fees + Rebate schedule */}
      <section aria-labelledby="fees-heading" className="border-y border-rule bg-surface py-14 sm:py-20">
        <div className="wrap space-y-10">
          <div>
            <p className="eyebrow">Schedule of rates</p>
            <h2
              id="fees-heading"
              className="mt-2 text-[clamp(1.9rem,4.2vw,3rem)] font-extrabold text-ink"
            >
              Schedule of fees
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Standard published terms for Yorkshire employers. {vatNote}
            </p>
          </div>

          {/* Main rates table */}
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="rates-table-caption"
            className="rates-table-wrap"
          >
            <table className="rates-table">
              <caption id="rates-table-caption" className="sr-only">
                Bridgework Recruitment employer fee schedule
              </caption>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Billing & terms</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <th scope="row">{service.name}</th>
                    <td data-label="Rate" className="font-mono font-bold text-primary">
                      {service.fee.label}
                    </td>
                    <td data-label="Billing & terms" className="text-sm text-muted">
                      {service.fee.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 12-week rebate schedule table */}
          <div>
            <h3 className="text-xl font-extrabold text-ink">12-week permanent placement rebate</h3>
            <p className="mt-1 text-sm text-muted">
              Applies to permanent introductions if the candidate leaves or their employment ends
              within the first twelve weeks.
            </p>
            <div
              tabIndex={0}
              role="region"
              aria-labelledby="rebate-table-caption"
              className="rates-table-wrap mt-4"
            >
              <table className="rates-table">
                <caption id="rebate-table-caption" className="sr-only">
                  12-week sliding rebate schedule for permanent placements
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Leave window</th>
                    <th scope="col">Rebate</th>
                    <th scope="col">How it applies</th>
                  </tr>
                </thead>
                <tbody>
                  {rebateSchedule.map((tier) => (
                    <tr key={tier.window}>
                      <th scope="row" className="font-mono">
                        {tier.window}
                      </th>
                      <td data-label="Rebate" className="font-mono font-bold text-primary">
                        {tier.rebate}
                      </td>
                      <td data-label="How it applies" className="text-sm text-muted">
                        {tier.note}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-mono text-xs font-bold tracking-wider text-muted uppercase">
              {vatNote}
            </p>
          </div>
        </div>
      </section>

      {/* Employer route map (horizontal) */}
      <section aria-labelledby="employer-route-heading" className="bg-paper-grain py-14 sm:py-20">
        <div className="wrap">
          <p className="eyebrow">Employer line</p>
          <h2
            id="employer-route-heading"
            className="mt-2 mb-8 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-ink"
          >
            From brief to 12-week check-in
          </h2>
          <div className="rivet-frame p-6 sm:p-8">
            <RouteMap mode="employers" orientation="horizontal" employerStops={EMPLOYER_ROUTE} />
          </div>
        </div>
      </section>

      {/* What makes a good brief + Client quote on brick */}
      <QuoteBand
        quote="Two shortlists, both strong, inside a fortnight."
        attribution="Operations Director, food manufacturer, Wakefield"
        ctaHref="/contact/"
        ctaLabel="Send a hiring brief"
        checklist={
          <ChecklistTicket
            eyebrow="Hiring checklist"
            heading="What makes a good brief"
            badge="5 essentials"
            items={business.enquiries.employerChecklist}
            note="Sending a brief starts a conversation — no terms are agreed until we have spoken and you ask us to proceed."
            variant="employer"
          />
        }
      />
    </>
  );
}
