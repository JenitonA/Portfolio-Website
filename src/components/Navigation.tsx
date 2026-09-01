import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll-spy: highlight the section currently in view. Scroll events can
  // fire faster than frames, so the (layout-reading) probe is coalesced to
  // one rAF callback per frame, and the section nodes are resolved once.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => ({
      href: item.href,
      el: document.querySelector<HTMLElement>(item.href),
    }));

    let raf = 0;
    const probeSections = () => {
      raf = 0;
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current = "";
      for (const { href, el } of sections) {
        if (el && el.offsetTop <= probe) {
          current = href;
        }
      }
      setActiveSection(current);
    };
    const handleScroll = () => {
      if (!raf) raf = requestAnimationFrame(probeSections);
    };

    probeSections();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl">
      {/* Floating glass pill */}
      <div className="glass-pill metal-border rounded-full px-3 py-2 flex items-center justify-between gap-2">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="interactive px-3 py-1.5 text-lg font-display font-bold text-foreground"
          aria-label="Back to top"
        >
          JA
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`interactive px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                activeSection === item.href
                  ? "bg-primary/15 text-primary-glow shadow-[0_0_16px_hsl(42_90%_55%/0.25)]"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted/40"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden interactive p-2 rounded-full hover:bg-muted/50 transition-colors duration-300"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Menu className="h-5 w-5 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 glass-card rounded-2xl p-2 origin-top animate-menu-in">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                activeSection === item.href
                  ? "bg-primary/15 text-primary-glow"
                  : "text-foreground/75 hover:text-primary hover:bg-muted/40"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
