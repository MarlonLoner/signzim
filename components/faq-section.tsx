type FaqItem = {
  question: string;
  answer: string;
};

export const customerFaqs: FaqItem[] = [
  {
    question: "What is Sign Zim?",
    answer:
      "SignZim, Interior Deco & Fittings is Zimbabwe's marketplace for signage, interior deco and fittings. It helps businesses find trusted providers, view real work and request quotes."
  },
  {
    question: "Can I request a quote from multiple providers?",
    answer:
      "Yes. You can send one quote request with your service, city, budget, and timeline so Sign Zim can help connect the request with relevant providers."
  },
  {
    question: "Does Sign Zim do the production or fitting work?",
    answer:
      "No. Sign Zim helps customers discover and contact providers. The provider handles pricing, production, installation, fitting, and job delivery directly."
  },
  {
    question: "How do I choose the right provider?",
    answer:
      "Review the company profile, services, city, portfolio images, verification status, and response quality before agreeing to pricing, measurements, production, fitting, or timelines."
  },
  {
    question: "Does SignZim guarantee providers?",
    answer:
      "No. SignZim reviews provider information before approval, but customers should independently confirm credentials, quotations, workmanship, timelines, warranties and payment terms before agreeing to work."
  },
  {
    question: "What due diligence should customers conduct?",
    answer:
      "Check the provider profile, proof images, references, business address, WhatsApp response, written quotation, scope, measurements, timelines, warranties and payment terms before paying or approving work."
  },
  {
    question: "How can I report a problematic provider or listing?",
    answer:
      "Contact SignZim through the published admin or WhatsApp channel with the provider name, link, concern and any supporting details."
  },  {
    question: "Is it free to request a quote?",
    answer:
      "Yes. Customers can submit a signage, branding, deco, display or fitting quote request for free while Sign Zim builds the marketplace."
  }
];

export const providerFaqs: FaqItem[] = [
  {
    question: "Is SignZim free for providers?",
    answer:
      "Approved founding providers receive complimentary launch access from 10 July 2026 to 10 October 2026. SignZim uses premium marketplace access at no cost during launch rather than promising permanent free listings."
  },
  {
    question: "What happens after the first three months?",
    answer:
      "Future subscription options will be communicated before paid plans begin. Providers must affirmatively select a subscription later; there is no automatic charge after the launch period."
  },
  {
    question: "What is a Founding Provider?",
    answer:
      "A Founding Provider is part of the first 1,000-provider launch target and receives complimentary marketplace access during the launch period after approval."
  },
  {
    question: "Why do I need to upload completed-work images?",
    answer:
      "Proof images help customers see real work and help SignZim check that claimed services reasonably match submitted evidence."
  },
  {
    question: "Is a business logo required?",
    answer:
      "No. A logo is optional. If you do not upload one, SignZim shows a clean initials or provider placeholder."
  },
  {
    question: "Why is my business address required?",
    answer:
      "Customers use the address to understand where your business operates. Exact job arrangements still remain between you and the customer."
  },
  {
    question: "Why does SignZim request my WhatsApp number?",
    answer:
      "Business WhatsApp is the primary contact channel customers use to reach providers. SignZim stores it in normalized Zimbabwe format where possible."
  },
  {
    question: "Will SignZim send me WhatsApp announcements?",
    answer:
      "Promotional provider announcements require optional opt-in consent. Important operational messages may still be sent to administer listings or quote requests."
  },
  {
    question: "How do I update or remove my information?",
    answer:
      "Use the claim/update link or contact SignZim through the official admin channel to request corrections, updates or removal."
  },
  {
    question: "How do I list my company?",
    answer:
      "Use the List Your Company form to submit your signage, deco, fitting, print, branding or display business details, services, contacts, city, and portfolio links for review."
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

