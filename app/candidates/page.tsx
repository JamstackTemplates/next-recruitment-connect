import type { Metadata } from 'next';
import { PlatformTicket } from '../../components/art/motifs';
import { RouteMap, type RouteStop } from '../../components/art/route-map';
import { PageHead } from '../../components/page-head';
import {
  ChecklistTicket,
  EnamelCalloutBand,
  FaqAccordion,
  TicketStubs,
} from '../../components/page-sections';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Candidates',
  description:
    'How Bridgework works for job seekers across Yorkshire: zero candidate fees, CV permission every time, honest feedback and a named consultant.',
  alternates: { canonical: absoluteUrl('/candidates/') },
};

const CANDIDATE_ROUTE: readonly RouteStop[] = [
  {
    label: 'Register',
    detail:
      'Send a short enquiry with your sector, ideal role, travel radius and pay expectations — no CV needed in the first message.',
  },
  {
    label: 'Talk it through',
    detail:
      'The consultant for your desk calls or emails within one working day to understand what matters to you and what to rule out.',
  },
  {
    label: 'Introductions',
    detail:
      'We share real role details, pay bands and company names with you first. Nothing is ever sent to an employer without your say-so.',
  },
  {
    label: 'Interview',
    detail:
      'You get a plain briefing on who you are meeting, what the workplace is like, and honest feedback after every conversation.',
  },
  {
    label: 'Offer & start',
    detail:
      'We handle offer negotiations, notice periods and start-day logistics, then check in once you have settled into the role.',
  },
];

export default function CandidatesPage() {
  return (
    <>
      <PageHead
        eyebrow="Left bank · For job seekers"
        title="Looking for work"
        aside={
          <div className="py-2">
            <PlatformTicket tilted />
          </div>
        }
      >
        <p>
          Whether you are ready for a move this week or quietly testing the Yorkshire market, you
          deal with one specialist consultant who knows the employers and tells you the pay band up
          front.
        </p>
      </PageHead>

      {/* Four perforated ticket stubs */}
      <TicketStubs eyebrow="Our platform guarantee" heading="Our promises to you">
        <TicketStubs.Stub serial="01" title="No fees, ever">
          Employers pay our fee. We never charge candidates a penny for introductions, advice or
          finding work.
        </TicketStubs.Stub>
        <TicketStubs.Stub serial="02" title="Nothing sent without your say-so" stagger>
          Your CV and name stay strictly confidential until we have talked through the specific
          employer and you say go ahead.
        </TicketStubs.Stub>
        <TicketStubs.Stub serial="03" title="Honest feedback after every interview">
          Even when the answer is no, you hear why quickly and plainly — never left wondering in
          silence.
        </TicketStubs.Stub>
        <TicketStubs.Stub serial="04" title="A named consultant, not a call centre" stagger>
          You work with the specialist who runs your sector desk at Granary Wharf, from first chat
          through to start day.
        </TicketStubs.Stub>
      </TicketStubs>

      {/* Vertical candidate route map + Before you message us checklist */}
      <section className="border-y border-rule bg-surface py-14 sm:py-20">
        <div className="wrap grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Step by step</p>
            <h2 className="mt-2.5 mb-8 text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold text-ink">
              How the candidate line runs
            </h2>
            <RouteMap mode="candidates" orientation="vertical" candidateStops={CANDIDATE_ROUTE} />
          </div>

          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <ChecklistTicket
              eyebrow="Before you message us"
              heading="What to put in your note"
              badge="No CV yet"
              items={business.enquiries.candidateChecklist}
              note={business.enquiries.candidateCvNote}
              variant="candidate"
            />
          </div>
        </div>
      </section>

      {/* FAQ in native <details> */}
      <FaqAccordion
        id="candidate-faq-heading"
        eyebrow="Plain answers"
        heading="Questions candidates ask"
      >
        <FaqAccordion.Item question="Do you charge me anything?">
          <p>No. Employers pay our fee. We never charge candidates for finding work or career advice.</p>
        </FaqAccordion.Item>
        <FaqAccordion.Item question="Can I register without applying for a specific role?">
          <p>
            Yes — send an enquiry telling us your sector, the kind of role you want and where you
            can commute to. Many roles are filled from our desk shortlist before they reach the
            board.
          </p>
        </FaqAccordion.Item>
        <FaqAccordion.Item question="How do I send my CV?">
          <p>
            Don’t paste or attach it to the website enquiry form. Your desk consultant will reply by
            email first, and you can send your CV directly once you have spoken.
          </p>
        </FaqAccordion.Item>
        <FaqAccordion.Item question="Do you handle temporary work?">
          <p>
            Yes. Temporary workers are engaged through Bridgework as an employment business and paid
            weekly, with statutory holiday pay accrued from day one.
          </p>
        </FaqAccordion.Item>
        <FaqAccordion.Item question="What happens to my details?">
          <p>
            Your details are kept solely for recruitment, never shared with an employer without your
            explicit permission, and deleted whenever you ask us to remove them.
          </p>
        </FaqAccordion.Item>
      </FaqAccordion>

      <EnamelCalloutBand
        eyebrow="Open now"
        heading="Ready to check the departure board?"
        ctaHref="/roles/"
        ctaLabel="See current roles"
      >
        <p>
          Browse live permanent, contract and temporary roles across Yorkshire, or message a desk
          directly to start a quiet conversation.
        </p>
      </EnamelCalloutBand>
    </>
  );
}
