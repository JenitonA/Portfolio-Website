import { ChevronDown } from "lucide-react";
import { DiaTextReveal } from "@/components/magicui/dia-text-reveal";
import { motion } from "framer-motion";
import Aurora from "@/components/effects/Aurora";
import ProfilePic from "@/assets/ProfilePic.webp";

interface HeroSectionProps {
  /** When false, hero content stays hidden so its entrance can sync
      with the intro overlay fading out */
  introDone?: boolean;
}

const HeroSection = ({ introDone = true }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Aurora backdrop — warm ribbons kept to the top band and masked out
          before they reach the text, so they never veil the hero content */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] opacity-40 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 85%)",
        }}
      >
        <Aurora
          colorStops={["#E8A33D", "#A51C30", "#F2C14E"]}
          blend={0.5}
          amplitude={0.9}
          speed={0.7}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-28">
        {introDone && (
          <motion.div
            className="max-w-4xl mx-auto flex flex-col items-center text-center lg:mx-0 lg:ml-[5vw] lg:max-w-xl lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Headshot with glow ring */}
            <div className="relative mb-10">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-primary opacity-40 blur-md animate-pulse-glow" />
              <img
                src={ProfilePic}
                alt="Jeniton Augustinpillai"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-primary/30 shadow-glow-primary object-cover"
              />
            </div>

            {/* Education badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full metal-border bg-primary/5 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-primary font-medium">
                University of Waterloo • BASc Nanotechnology Engineering
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-[1.02] tracking-tight">
              <DiaTextReveal text="Jeniton" color="#f4efe6" />
              <br />
              <DiaTextReveal text="Augustinpillai" color="#f4efe6" delay={0.3} />
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Nanotechnology engineering student passionate about{" "}
              <em className="font-elegant italic text-[1.1em] text-primary-glow">
                nanofabrication
              </em>{" "}
              — from cleanroom microfabrication to nanoscale devices and the machines that
              build them.
            </p>
          </motion.div>
        )}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
