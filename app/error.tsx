"use client";

import Link from "next/link";
import { Home, RefreshCcw, TriangleAlert } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="page-shell flex min-h-[calc(100vh-4rem)] items-center py-12">
      <section className="panel w-full rounded-lg p-8 text-center">
        <TriangleAlert className="mx-auto h-9 w-9 text-amberglow" aria-hidden="true" />
        <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Sign Zim error</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-black leading-tight text-white">
          Something went wrong while loading Sign Zim.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400">
          Please retry the page or return home to continue browsing signage companies.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="primary-button">
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            Retry
          </button>
          <Link href="/" className="secondary-button">
            <Home className="h-4 w-4" aria-hidden="true" />
            Return Home
          </Link>
        </div>
      </section>
    </div>
  );
}
