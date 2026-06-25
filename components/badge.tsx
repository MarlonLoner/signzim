import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "amber" | "green" | "blue" | "muted" | "red";
};

const tones = {
  amber: "border-amberglow/40 bg-amberglow/15 text-honey",
  green: "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
  blue: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  muted: "border-white/10 bg-white/5 text-zinc-300",
  red: "border-red-400/35 bg-red-400/10 text-red-100"
};

export function Badge({ children, tone = "muted" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}
