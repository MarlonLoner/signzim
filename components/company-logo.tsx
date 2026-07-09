import { Building2 } from "lucide-react";
import { cn, initials } from "@/lib/utils";

type CompanyLogoProps = {
  name?: string | null;
  logoUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
  xl: "h-28 w-28 text-3xl"
};

export function CompanyLogo({ name, logoUrl, size = "md", className }: CompanyLogoProps) {
  const fallback = initials(name ?? "") || "SZ";
  const alt = name ? `${name} logo` : "SignZim provider logo placeholder";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-black text-center font-black text-amberglow",
        sizeClasses[size],
        className
      )}
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt={alt} className="h-full w-full object-contain p-1" />
      ) : fallback !== "SZ" ? (
        <span aria-label={alt}>{fallback}</span>
      ) : (
        <Building2 className="h-1/2 w-1/2" aria-label={alt} />
      )}
    </div>
  );
}
