import { ShieldCheck, Star } from "lucide-react";

export function TrustBadgeExplainer() {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Trust badges</p>
      <h2 className="mt-3 text-2xl font-black text-white">What verified and featured mean on Sign Zim.</h2>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-emerald-300/25 bg-emerald-400/10 p-5">
          <ShieldCheck className="h-6 w-6 text-emerald-200" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-black text-white">Verified Provider</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
            <li>The listing has been reviewed by Sign Zim.</li>
            <li>The company has provided business and contact details.</li>
            <li>Portfolio or service details for signage, branding, deco, fitting or displays have been checked where possible.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-5">
          <Star className="h-6 w-6 text-amberglow" aria-hidden="true" />
          <h3 className="mt-4 text-lg font-black text-white">Featured Provider</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
            <li>The provider receives higher visibility on marketplace pages.</li>
            <li>Featured status does not mean Sign Zim guarantees every job.</li>
            <li>Customers should still review portfolios and confirm job details directly.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
