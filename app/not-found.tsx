import Link from "next/link";
import { Building2, MessageCircle, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[calc(100vh-4rem)] items-center py-12">
      <section className="panel w-full rounded-lg p-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Page not found</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-black leading-tight text-white">
          This Sign Zim page could not be found.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
          The listing, service, or launch page may have moved. Start from the marketplace routes below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/companies" className="primary-button">
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse Companies
          </Link>
          <Link href="/request-quote" className="secondary-button">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Request Quote
          </Link>
          <Link href="/list-your-company" className="secondary-button">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            List Your Company
          </Link>
        </div>
      </section>
    </div>
  );
}
