import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsColumns from "@/components/SkillsColumns";
import FooterContact from "@/components/FooterContact";
import GlowBeams from "@/components/effects/GlowBeams";
import QuoteIntro from "@/components/QuoteIntro";
import { lazy, Suspense, useState } from "react";
import { motion, useScroll } from "framer-motion";

/* three.js + GSAP live in their own async chunk — it loads while the
   quote intro holds the screen, keeping first paint light */
const ParticleField = lazy(() => import("@/components/three/ParticleField"));

/* Film-grain: tiny tiled SVG turbulence, fixed above everything, non-interactive */
const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Pitch-black quote splash — fades out to reveal the site */}
      <QuoteIntro onReveal={() => setIntroDone(true)} />

      {/* Fixed background: soft glows, then the CPU-morphing particle field */}
      <GlowBeams />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Reading progress: gold → crimson */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] z-[80] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
        }}
      />

      {/* Film grain over everything — barely-there texture */}
      <div
        aria-hidden
        className="fixed inset-0 z-[70] pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
      />

      <Navigation />
      <main className="relative z-10">
        <HeroSection introDone={introDone} />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsColumns />
        <FooterContact />
      </main>
    </div>
  );
};

export default Index;
