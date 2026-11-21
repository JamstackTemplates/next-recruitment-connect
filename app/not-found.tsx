import { BridgeOutArt } from '../components/art/motifs';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="bg-paper-grain py-16 sm:py-24">
      <div className="wrap text-center">
        <p className="eyebrow">404 · Span closed</p>
        <div className="mt-6">
          <BridgeOutArt />
        </div>
        <h1 className="mx-auto mt-8 max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold text-ink">
          This crossing isn’t on our map.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
          The page may have moved, or the role may have been filled and taken down.
        </p>

        {/* Three enamel diversion sign links */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <SiteLink href="/roles/" className="button-enamel">
            ← Diversion: Current roles
          </SiteLink>
          <SiteLink href="/" className="button-enamel">
            ← Diversion: Home
          </SiteLink>
          <SiteLink href="/contact/" className="button-enamel">
            ← Diversion: Contact
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
