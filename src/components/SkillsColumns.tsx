import { motion } from "framer-motion";

const COLUMNS: { label: string; crimson?: boolean; items: string[] }[] = [
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
];

/**
 * Skills as a plain typographic grid — mono kickers, no boxes.
 */
const SkillsColumns = () => {
  return (
    <section id="skills" className="py-28 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex items-center gap-3 mb-14 font-mono text-sm">
          <span className="text-accent">03</span>
          <span className="w-8 metal-divider" />
          <span className="text-muted-foreground uppercase tracking-[0.3em] text-xs">Toolkit</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 border-t border-border/70 pt-12">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <h3
                className={`font-mono text-xs uppercase tracking-[0.3em] mb-5 ${
                  col.crimson ? "text-accent" : "text-primary"
                }`}
              >
                {col.label}
              </h3>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-14 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/60">
          Coursework — Nanoprobing & Lithography · Semiconductor Physics · Material Science ·
          Microfabrication & Thin-film
        </p>
      </div>
    </section>
  );
};

export default SkillsColumns;
