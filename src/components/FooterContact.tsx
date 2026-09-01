import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/jenitona/" },
  { label: "GitHub", href: "https://github.com/JenitonA" },
];

/**
 * Final screen: the particle field forms a cursive "JA" monogram in the
 * upper middle; the contact block sits centered beneath it.
 */
const FooterContact = () => {
  return (
    <footer id="contact" className="min-h-screen relative flex flex-col">
      {/* breathing room for the particle monogram */}
      <div className="flex-1" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 pb-20 flex flex-col items-center text-center gap-8"
      >
        <h2 className="sr-only">Contact</h2>

        <a
          href="mailto:j4august@uwaterloo.ca"
          className="group inline-block font-display font-bold tracking-tight leading-none text-2xl md:text-4xl text-foreground hover:text-primary transition-colors duration-500"
        >
          j4august@uwaterloo.ca
          <span className="block h-[2px] mt-2 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 bg-gradient-to-r from-primary to-accent" />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group interactive inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 bg-primary/10 text-lg font-semibold text-foreground hover:bg-primary/20 hover:border-primary-glow hover:text-primary-glow transition-[color,background-color,border-color,transform] duration-200"
            >
              {link.label}
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        <div className="pt-8 text-sm text-muted-foreground/80">© 2026 Jeniton Augustinpillai</div>
      </motion.div>
    </footer>
  );
};

export default FooterContact;
