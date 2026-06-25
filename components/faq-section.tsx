type FaqItem = {
  question: string;
  answer: string;
};

export const customerFaqs: FaqItem[] = [
  {
    question: "What is Sign Zim?",
    answer:
      "Sign Zim is a Zimbabwean signage marketplace that helps businesses find signage companies, compare portfolios, and request quotes in one place."
  },
  {
    question: "Can I request a quote from multiple signage providers?",
    answer:
      "Yes. You can send one quote request with your service, city, budget, and timeline so Sign Zim can help connect the request with relevant providers."
  },
  {
    question: "Does Sign Zim make the signs?",
    answer:
      "No. Sign Zim helps customers discover and contact signage providers. The provider handles pricing, production, installation, and job delivery directly."
  },
  {
    question: "How do I choose the right signage company?",
    answer:
      "Review the company profile, services, city, portfolio images, verification status, and response quality before agreeing to pricing or timelines."
  },
  {
    question: "Is it free to request a quote?",
    answer:
      "Yes. Customers can submit a signage quote request for free while Sign Zim builds the marketplace."
  }
];

export const providerFaqs: FaqItem[] = [
  {
    question: "How do I list my signage company?",
    answer:
      "Use the List Your Company form to submit your business details, services, contacts, city, and portfolio links for review."
  },
  {
    question: "What happens after I submit my listing?",
    answer:
      "The Sign Zim owner reviews the submission in admin, checks the details, and approves suitable listings before they appear publicly."
  },
  {
    question: "What is a verified listing?",
    answer:
      "A verified listing means Sign Zim has reviewed the provider details and checked business, contact, portfolio, or service information where possible."
  },
  {
    question: "What is a featured listing?",
    answer:
      "A featured listing receives higher visibility on marketplace pages and is designed for providers who want stronger placement."
  },
  {
    question: "Do I need a website to join?",
    answer:
      "No. A website is optional. A strong description, accurate WhatsApp number, service list, and portfolio links can still create a useful profile."
  }
];

type FaqSectionProps = {
  title: string;
  eyebrow?: string;
  items: FaqItem[];
};

export function FaqSection({ title, eyebrow = "FAQ", items }: FaqSectionProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black text-white">{title}</h2>
      <div className="mt-6 grid gap-4">
        {items.map((item) => (
          <details key={item.question} className="rounded-md border border-white/10 bg-black/25 p-4">
            <summary className="cursor-pointer text-sm font-bold text-white">{item.question}</summary>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
