import type { Metadata } from 'next';
import { ContactBridgeArt } from '../../components/art/motifs';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { ChecklistTicket } from '../../components/page-sections';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <PageHead
        eyebrow="Enquiries · Candidates & Employers"
        title={business.enquiries.title}
        aside={<ContactBridgeArt />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="bg-paper-grain py-12 sm:py-16">
        <div className="wrap space-y-12">
          {/* Two side-by-side guidance ticket panels above the form (never extra form inputs) */}
          <section aria-label="What to include in your message" className="grid gap-6 md:grid-cols-2">
            <ChecklistTicket
              eyebrow="Left bank · Message guide"
              heading="Looking for work"
              badge="Candidates"
              items={business.enquiries.candidateChecklist}
              note={business.enquiries.candidateCvNote}
              variant="candidate"
            />
            <ChecklistTicket
              eyebrow="Right bank · Message guide"
              heading="Hiring"
              badge="Employers"
              items={business.enquiries.employerChecklist}
              note="One form covers both sides. Just mention your sector or role reference so the right desk picks it up straight away."
              variant="employer"
            />
          </section>

          {/* Left: hosted form or visible email fallback in riveted frame. Right: station information panel + map */}
          <div className="grid items-start gap-8 lg:grid-cols-12">
            <section aria-label="Enquiry form" className="space-y-4 lg:col-span-7">
              <div className="rivet-frame p-6 sm:p-8">
                <p className="eyebrow">Send an enquiry</p>
                <h2 className="mt-2 text-2xl font-extrabold text-ink">
                  Message the right Yorkshire desk
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {business.enquiries.confirmationNote}
                </p>

                <div className="mt-6">
                  {hosted ? (
                    <JamstacksSupportForm
                      siteId={site.jamstacksSite}
                      embedUrl={site.jamstacksEmbedUrl}
                      email={business.email}
                    />
                  ) : (
                    <div className="rounded-ui border-2 border-dashed border-ink/50 bg-paper p-6">
                      <h3 className="font-display text-lg font-extrabold text-ink">
                        Write to us directly by email
                      </h3>
                      <p className="mt-2 text-muted">
                        The online enquiry form is not connected on this preview. Send your role
                        reference, sector enquiry or hiring brief straight to{' '}
                        <a
                          className="text-link font-mono font-bold wrap-anywhere"
                          href={`mailto:${business.email}`}
                        >
                          {business.email}
                        </a>{' '}
                        or call{' '}
                        <a className="text-link font-mono font-bold" href={telHref}>
                          {business.phone}
                        </a>
                        .
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a className="button" href={`mailto:${business.email}`}>
                          Email {business.email}
                        </a>
                        <CopyEmail email={business.email} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Required regulatory legal line under the form */}
              <p className="rounded-ui border border-rule bg-surface px-5 py-4 font-mono text-xs leading-relaxed text-muted">
                {business.legalLine}
              </p>
            </section>

            {/* Right: Station information panel */}
            <aside aria-label="Contact details and office location" className="lg:col-span-5">
              <div className="rivet-frame-board overflow-hidden p-6 text-on-board">
                <p className="eyebrow eyebrow-board">Station information</p>
                <h2 className="mt-2 text-2xl font-extrabold text-on-board">Granary Wharf desk</h2>

                <div className="mt-5 space-y-5 border-t border-[#27312C] pt-5 text-sm">
                  <div>
                    <p className="font-mono text-xs font-bold tracking-[0.14em] text-flap uppercase">
                      Email (always monitored)
                    </p>
                    <p className="mt-1">
                      <a
                        className="font-mono text-base font-bold text-flap underline wrap-anywhere"
                        href={`mailto:${business.email}`}
                      >
                        {business.email}
                      </a>
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                      <CopyEmail email={business.email} />
                    </div>
                  </div>

                  <div className="border-t border-[#27312C] pt-4">
                    <p className="font-mono text-xs font-bold tracking-[0.14em] text-flap uppercase">
                      Telephone
                    </p>
                    <p className="mt-1">
                      <a className="font-mono text-base font-bold text-on-board underline hover:text-flap" href={telHref}>
                        {business.phone}
                      </a>
                    </p>
                  </div>

                  <div className="border-t border-[#27312C] pt-4">
                    <p className="font-mono text-xs font-bold tracking-[0.14em] text-flap uppercase">
                      Address & directions
                    </p>
                    <p className="mt-1 text-on-board">{business.address.lines.join(', ')}</p>
                    <p className="mt-1.5 text-on-board-muted">{business.directions}</p>
                  </div>

                  <div className="border-t border-[#27312C] pt-4">
                    <p className="font-mono text-xs font-bold tracking-[0.14em] text-flap uppercase">
                      Office hours
                    </p>
                    <p className="mt-1 font-mono text-xs text-on-board">
                      Mon–Fri 08:30–17:30 · Sat & Sun closed
                    </p>
                    <p className="mt-1 text-xs text-on-board-muted">{business.hoursNote}</p>
                    <TimeZoneNote className="text-on-board-muted" />
                    <div className="mt-3">
                      <OpenBadge hours={business.hours} variant="board" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[0.25rem] border border-[#2D3833]">
                  <GoogleMap
                    address={business.mapQuery}
                    title="Map showing Granary Wharf, Leeds"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
