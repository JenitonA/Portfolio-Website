interface SectionHeaderProps {
  title: string;
  description?: string;
}

/**
 * Section header: display-font title in solid ink over a short metallic
 * divider, with an optional description.
 */
const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16 animate-slide-up">
      <h2 className="font-display text-[clamp(2.25rem,5vw,3rem)] font-bold tracking-tight leading-[1.1] text-foreground">
        {title}
      </h2>
      <div className="metal-divider w-16 mx-auto mt-5 mb-4" />
      {description && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
};

export default SectionHeader;
