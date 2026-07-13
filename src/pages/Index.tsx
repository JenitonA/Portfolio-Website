import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import GlowBeams from "@/components/effects/GlowBeams";
import QuoteIntro from "@/components/QuoteIntro";
import { useState } from "react";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Pitch-black quote splash — fades out to reveal the site */}
      <QuoteIntro onReveal={() => setIntroDone(true)} />

      {/* Fixed background layer: soft light beams + radial glows */}
      <GlowBeams />

      <Navigation />
      <main className="relative z-10">
        <HeroSection introDone={introDone} />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 pt-12 pb-8">
        <div className="metal-divider mb-10" />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="text-center md:text-left">
              <div className="font-display text-2xl font-bold metal-text">Jeniton Augustinpillai</div>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { name: "Experience", href: "#experience" },
                { name: "Projects", href: "#projects" },
                { name: "Skills", href: "#skills" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
          <div className="text-center text-sm text-muted-foreground/70">
            © 2026 Jeniton Augustinpillai
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
