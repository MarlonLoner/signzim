import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { FaqSection, customerFaqs, providerFaqs } from "@/components/faq-section";

export const metadata: Metadata = {
  title: "Sign Zim FAQ | Quotes and Provider Listings",
  description:
    "Answers for Zimbabwean customers requesting signage, branding, interior deco and fitting quotes, plus providers listing on Sign Zim."
};

export default function FaqPage() {
  return (
    <div className="page-shell py-12">
      <div className="max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">FAQ</p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">Questions before you request or list.</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">
          Clear answers for customers looking for signage, branding, interiors and fitting in Zimbabwe, plus providers
          preparing to join the marketplace.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <FaqSection eyebrow="For customers" title="Requesting project quotes" items={customerFaqs} />
        <FaqSection eyebrow="For providers" title="Listing your provider profile" items={providerFaqs} />
      </div>

      <div className="mt-10 grid gap-4 rounded-lg border border-amberglow/30 bg-amberglow/10 p-6 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div>
          <h2 className="text-2xl font-black text-white">Still ready to start?</h2>
          <p className="mt-2 text-sm text-zinc-300">Send one request or submit your provider company for review.</p>
        </div>
        <Link href="/request-quote" className="primary-button">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Request a Quote
        </Link>
        <Link href="/list-your-company" className="secondary-button">
          List Your Company
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
