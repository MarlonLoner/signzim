type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amberglow">{eyebrow}</p> : null}
      <h2 className="text-3xl font-black text-white md:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-7 text-zinc-400">{copy}</p> : null}
    </div>
  );
}
