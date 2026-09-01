import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

interface LedgerRow {
  label: string;
  crimson?: boolean;
  items: string[];
}

const ROWS: LedgerRow[] = [
  {
    label: "Fabrication",
    items: ["PECVD", "PVD", "Photolithography", "Wet / Dry Etching", "Thin-film Deposition", "Cleanroom Protocols"],
  },
  {
    label: "Metrology",
    crimson: true,
    items: ["AFM", "SEM / TEM", "Raman Spectroscopy", "Ellipsometry", "XRD", "UV-Vis / FT-IR"],
  },
  {
    label: "Code",
    items: ["Python", "TypeScript", "C#", "MATLAB", "TensorFlow / Keras", "OpenCV"],
  },
  {
    label: "Tools",
    crimson: true,
    items: ["COMSOL", "Fusion 360", "DepthAI", "Jupyter", "Ubuntu", "Figma"],
  },
  {
    label: "Coursework",
    items: [
      "Nanoprobing & Lithography",
      "Semiconductor Physics",
      "Material Science",
      "Microfabrication & Thin-film",
    ],
  },
];

/**
 * Skills as an instrument ledger: hairline-ruled spec-sheet rows — category
 * label in the margin, capabilities flowing across. Hovering a row lights
 * its rule like a brass instrument edge catching lamplight.
 */
const SkillsColumns = () => {
  return (
    <section id="skills" className="py-28 relative">
      {/* Solid backing so the particle field never shows through the ledger
          text; fades at the section edges to avoid a hard horizontal band.
          Plain background color, not backdrop blur — blur re-rasters on
          every scrolled frame. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent,hsl(var(--background)/0.8)_12%,hsl(var(--background)/0.8)_88%,transparent)]"
      />
      <div className="container mx-auto px-6 max-w-5xl relative">
        <SectionHeader title="Toolkit" />

        <div>
          {ROWS.map((row, rowIndex) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.5, delay: rowIndex * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className="group relative"
            >
              {/* Hairline rule: quiet by default, lights up gold on row hover */}
              <div className="relative h-px">
                <div className="absolute inset-0 bg-border/70" />
                <div className="metal-divider absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-8 py-7 md:py-8">
                <h3
                  className={`font-mono text-xs uppercase tracking-[0.3em] pt-1 ${
                    row.crimson ? "text-accent" : "text-primary"
                  }`}
                >
                  {row.label}
                </h3>
                <ul className="flex flex-wrap items-baseline gap-y-2.5">
                  {row.items.map((item, i) => (
                    <li key={item} className="flex items-baseline">
                      <span className="text-base md:text-lg text-foreground/85 transition-colors duration-200 hover:text-primary-glow">
                        {item}
                      </span>
                      {i < row.items.length - 1 && (
                        <span aria-hidden className="mx-4 text-[hsl(var(--metal-mid))] opacity-60">
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* closing rule so the ledger reads as a bounded sheet */}
          <div className="h-px bg-border/70" />
        </div>
      </div>
    </section>
  );
};

export default SkillsColumns;
