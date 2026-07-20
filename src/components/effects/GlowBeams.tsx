/**
 * Soft gold/crimson light beams and radial glows that sit behind the page content.
 * Pure CSS gradients — no JS work after mount.
 */
const GlowBeams = () => {
  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Top-center radial wash behind the hero */}
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 30%, hsl(42 90% 55% / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* Angled light rays */}
      <div
        className="absolute -top-32 left-[12%] w-[2px] h-[70vh] animate-beam-drift"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(45 100% 68% / 0.22) 30%, hsl(42 90% 55% / 0.07) 70%, transparent)",
          filter: "blur(3px)",
          transform: "rotate(12deg)",
        }}
      />
      <div
        className="absolute -top-24 left-[28%] w-[3px] h-[85vh] animate-beam-drift"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(352 68% 56% / 0.14) 35%, transparent)",
          filter: "blur(5px)",
          transform: "rotate(12deg)",
          animationDelay: "4s",
        }}
      />
      <div
        className="absolute -top-40 right-[18%] w-[2px] h-[75vh] animate-beam-drift"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(42 30% 88% / 0.18) 30%, hsl(42 90% 55% / 0.05) 75%, transparent)",
          filter: "blur(4px)",
          transform: "rotate(12deg)",
          animationDelay: "8s",
        }}
      />

      {/* Deep ambient glows for mid-page and footer */}
      <div
        className="absolute top-[45%] -left-1/4 w-[70vw] h-[60vh] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(352 68% 56% / 0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-15%] w-[80vw] h-[60vh] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, hsl(42 90% 55% / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Fine vignette to keep edges dark and premium */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 40%, transparent 55%, hsl(24 30% 3% / 0.55) 100%)",
        }}
      />
    </div>
  );
};

export default GlowBeams;
