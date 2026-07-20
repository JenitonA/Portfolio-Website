interface SectionHeaderProps {
  index: number;
  label: string;
  title: string;
  description?: string;
}

/**
 * Numbered section header: mono kicker ("01 / PROJECTS"), display-font title
 * in solid ink, optional description, metallic divider.
 */
const SectionHeader = ({ index, label, title, description }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16 animate-slide-up">
      <div className="flex items-center justify-center gap-3 mb-4 font-mono text-sm">
        <span className="text-accent">{String(index).padStart(2, "0")}</span>
        <span className="w-8 metal-divider" />
        <span className="text-muted-foreground uppercase tracking-[0.3em] text-xs">{label}</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
