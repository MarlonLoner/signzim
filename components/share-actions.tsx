import { MessageCircle, Share2 } from "lucide-react";
import { CopyButton } from "@/components/copy-button";

type ShareActionsProps = {
  url: string;
  whatsappText: string;
  label?: string;
};

export function ShareActions({ url, whatsappText, label = "Share this page" }: ShareActionsProps) {
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-4">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-honey">
        <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <CopyButton text={url} label="Copy Link" />
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="secondary-button">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Share on WhatsApp
        </a>
      </div>
    </div>
  );
}
