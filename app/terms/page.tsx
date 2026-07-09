import type { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms and Conditions | SignZim, Interior Deco & Fittings",
  description: "Launch-ready terms for using SignZim, Interior Deco & Fittings as a marketplace for independent providers and buyers in Zimbabwe."
};

export default function TermsPage() {
  const sections = [
    ["Acceptance of terms", "By using SignZim you agree to these terms. If you submit a provider profile or quote request, you confirm that the information supplied is accurate and that you are allowed to share it."],
    ["Marketplace description", "SignZim connects buyers with independent signage, interior deco, kitchens, partitions, aluminium works, exhibition booth, commercial interior and fitting providers in Zimbabwe."],
    ["Provider listing responsibilities", "Providers must keep business details, WhatsApp numbers, addresses, services, proof images, pricing indications and portfolio claims accurate and up to date."],
    ["Uploaded content and image rights", "Providers may upload logos and proof-of-work images only if they own them or have permission to use them. SignZim may display approved uploads on public provider profiles and marketplace pages."],
    ["Review, approval, suspension and removal", "SignZim may review, approve, reject, suspend, archive or remove listings where information appears inaccurate, incomplete, unsafe, misleading or unsuitable for the marketplace."],
    ["Independent provider relationship", "Providers are independent businesses. SignZim is not usually the contractor, supplier, employer, agent or installer for work agreed between buyers and providers."],
    ["Quote requests and direct contracting", "Quote requests help buyers share project details. Buyers and providers must agree scope, measurements, specifications, price, timelines, warranties, payment terms and delivery directly."],
    ["Payments between buyers and providers", "Unless SignZim expressly states otherwise in writing, payments for projects are arranged directly between buyers and independent providers."],
    ["Complimentary Launch Access", `Approved founding providers receive complimentary marketplace access from ${appConfig.launchStartDate} to ${appConfig.launchEndDate}. This does not guarantee leads, jobs or revenue.`],
    ["Future subscription plans", "Subscription plans may be introduced after launch. Providers will be informed before paid plans begin and must affirmatively choose any paid subscription. There is no automatic billing without agreement."],
    ["Verification and featured listings", "Verified and featured badges are marketplace signals based on admin review and placement status. They do not replace buyer due diligence or guarantee provider quality."],
    ["User due diligence", "Customers should independently confirm identity, credentials, experience, references, portfolio authenticity, quotation details, workmanship expectations, timelines, warranties and payment terms before entering an agreement."],
    ["Intellectual property", "SignZim branding, layout, copy and platform materials belong to SignZim or its licensors. User content remains the responsibility of the user who submitted it."],
    ["Platform availability", "SignZim aims to keep the platform available but may experience downtime, maintenance, database issues, hosting interruptions or changes in service availability."],
    ["Prohibited conduct", "Do not abuse forms, scrape aggressively, interfere with security, impersonate others, submit unlawful material, or use SignZim to facilitate fraud or unsafe conduct."],
    ["Complaints and reporting", "Users should report suspicious listings, unsafe conduct, misleading claims or privacy concerns using the contact channel published by SignZim."],
    ["Limitation of liability", "To the extent permitted by Zimbabwean law, SignZim is not responsible for indirect losses or disputes arising from direct buyer-provider agreements. Nothing in these terms excludes rights or liabilities that cannot legally be excluded."],
    ["Indemnity", "Users agree to be responsible for losses caused by their unlawful conduct, misleading submissions, unauthorised uploads or breach of these terms, where permitted by law."],
    ["Privacy", "Use of personal information is explained in the Privacy Policy."],
    ["Changes to terms", "SignZim may update these terms as the marketplace develops. The latest version will be published on this page."],
    ["Termination", "SignZim may restrict access or remove listings where these terms are breached or where continued access creates operational, legal or safety risk."],
    ["Governing law and jurisdiction", "These terms are governed by the laws of Zimbabwe, and disputes are subject to the courts or competent dispute-resolution forums of Zimbabwe."],
    ["Contact", "Contact details will be published through SignZim's official owner or admin channels. Replace this placeholder with the final business contact before full public launch."]
  ];

  return (
    <div className="page-shell py-12">
      <div className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Last updated: 10 July 2026</p>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Terms and Conditions</h1>
        <p className="mt-5 text-sm leading-7 text-zinc-300">These terms are a practical launch draft for {appConfig.appName}. They should be reviewed by a qualified Zimbabwean legal practitioner.</p>
      </div>
      <div className="mt-10 grid gap-4">
        {sections.map(([title, copy]) => (
          <section key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-xl font-black text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{copy}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-zinc-400">Read the <Link href="/privacy" className="text-honey underline">Privacy Policy</Link>.</p>
    </div>
  );
}
