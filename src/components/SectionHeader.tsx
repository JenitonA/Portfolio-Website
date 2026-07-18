interface SectionHeaderProps {
  index: number;
  label: string;
  title: string;
  description?: string;
}

/**
 * Editorial section header: a giant hollow ghost numeral sits behind a
 * massive uppercase display title. Multi-word titles set their last word
 * in italic serif for contrast ("FEATURED projects"). Solid ink only.
 */
const SectionHeader = ({ index, label, title, description }: SectionHeaderProps) => {
  const words = title.split(" ");
  const lead = words.slice(0, -1).join(" ");
  const last = words[words.length - 1];

  return (
    <div className="relative text-center mb-20 animate-slide-up">
      {/* Ghost numeral — pure type as ornament */}
      <span
        aria-hidden
        className="ghost-number pointer-events-none select-none absolute left-1/2 -translate-x-1/2 -top-8 md:-top-14 font-display font-extrabold leading-none text-[7rem] md:text-[12rem]"
      >
        {String(index).padStart(2, "0")}
      </span>

      <div className="relative pt-12 md:pt-20">
        <div className="flex items-center justify-center gap-3 mb-4 font-mono text-sm">
          <span className="w-8 metal-divider" />
          <span className="text-accent uppercase tracking-[0.4em] text-xs">{label}</span>
          <span className="w-8 metal-divider" />
        </div>
        <h2 className="font-display font-extrabold uppercase text-5xl md:text-7xl tracking-tight leading-[0.95] text-foreground">
          {words.length > 1 ? (
            <>
              {lead}{" "}
              <em className="font-elegant italic font-medium normal-case text-primary-glow">
                {last.toLowerCase()}
              </em>
            </>
          ) : (
            title
          )}
        </h2>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-5">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
