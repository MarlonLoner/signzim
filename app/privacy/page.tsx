import type { Metadata } from "next";
import Link from "next/link";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy | SignZim, Interior Deco & Fittings",
  description: "Privacy policy for SignZim provider listings, uploaded proof images, quote requests, analytics and WhatsApp communications."
};

export default function PrivacyPage() {
  const sections = [
    ["Who operates SignZim", "SignZim, Interior Deco & Fittings is operated as a Zimbabwe-focused marketplace. Final company/operator contact details should be published before full public launch."],
    ["Provider data collected", "We collect company name, contact person, business WhatsApp number, optional alternative phone, optional email, physical address, city, services, descriptions, website/social links, selected package, uploaded logos and proof-of-work images."],
    ["Buyer data collected", "Quote requests may include customer name, phone or WhatsApp number, optional email, city, service needed, project description, budget range, timeline, reference image URL and request source."],
    ["Business contact details and addresses", "Selected provider details, including business WhatsApp number, city and physical business address, are intentionally shown publicly so buyers can understand where the business operates and make contact."],
    ["Uploaded logos and proof images", "Provider logos and proof images are used to build trust on public profiles and marketplace pages. Providers must own or be authorised to upload the images."],
    ["Analytics", "SignZim may record profile views and WhatsApp click counts to help administer marketplace quality and launch reporting."],
    ["Admin cookies and essential cookies", "Admin access uses essential cookies or similar mechanisms to protect owner-only pages. Private admin notes are not public."],
    ["Purposes for processing", "We use information to review listings, publish provider profiles, route quote requests, contact users, prevent misuse, improve the marketplace and prepare launch reporting."],
    ["Sharing", "We may share quote-request details with relevant independent providers where necessary to process the request. Public provider profile data is visible to site visitors."],
    ["Hosting, database and storage providers", "SignZim uses hosting, database and file-storage providers such as Vercel, hosted Postgres and Vercel Blob or similar services. Cloud infrastructure may involve cross-border processing."],
    ["Retention", "We keep provider and quote request data for as long as needed to operate the marketplace, resolve issues, maintain records, or comply with legal obligations."],
    ["Security", "We use reasonable technical and operational measures, but no internet service can promise absolute security."],
    ["Correction, update and removal", "Providers and buyers may request correction, update or removal of information through SignZim's official contact channels. Some records may be retained where required for operational or legal reasons."],
    ["WhatsApp communications", "Operational WhatsApp messages may be sent to administer listings or quote requests. Promotional provider announcements require separate opt-in consent and can be withdrawn."],
    ["Marketing consent", "Marketing consent is separate from Terms acceptance. It is optional, unchecked by default, stored privately and not displayed publicly."],
    ["Children's privacy", "SignZim is intended for business users and is not directed at children."],
    ["Policy changes", "We may update this policy as SignZim develops. The latest version will be published here."],
    ["Zimbabwe data protection", "SignZim aims to handle personal information consistently with Zimbabwe's applicable data-protection framework and practical marketplace operations."],
    ["Contact", "Replace this placeholder with the final SignZim privacy contact before full public launch."]
  ];

  return (
    <div className="page-shell py-12">
      <div className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Last updated: 10 July 2026</p>
        <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">Privacy Policy</h1>
        <p className="mt-5 text-sm leading-7 text-zinc-300">This policy explains how {appConfig.appName} handles provider listing data, buyer quote requests, uploaded images, analytics and WhatsApp communications.</p>
      </div>
      <div className="mt-10 grid gap-4">
        {sections.map(([title, copy]) => (
          <section key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
            <h2 className="text-xl font-black text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">{copy}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-zinc-400">Read the <Link href="/terms" className="text-honey underline">Terms and Conditions</Link>.</p>
    </div>
  );
}
