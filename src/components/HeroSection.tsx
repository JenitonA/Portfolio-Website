import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import ProfilePic from "@/assets/ProfilePic.webp";
import { DiaTextReveal } from "@/components/magicui/dia-text-reveal";
import Aurora from "@/components/effects/Aurora";
import { motion } from "framer-motion";

const SOCIALS = [
  { icon: Linkedin, href: "https://linkedin.com/in/jenitona/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/JenitonA", label: "GitHub" },
  { icon: Mail, href: "mailto:j4august@uwaterloo.ca", label: "Email" },
];

interface HeroSectionProps {
  /** When false, hero content stays hidden so its entrance can sync
      with the intro overlay fading out */
  introDone?: boolean;
}

const HeroSection = ({ introDone = true }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Aurora backdrop — cool blue/cyan/violet ribbons across the top */}
      <div className="absolute inset-0 opacity-80">
        <Aurora
          colorStops={["#3A6DF0", "#7CD9FF", "#5B2EFF"]}
          blend={0.55}
          amplitude={1.1}
          speed={0.8}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-28">
        {/* Mounted only after the intro starts fading, so the entrance
            animations (including the name reveal) play as the site appears */}
        {introDone && (
        <motion.div
          className="max-w-3xl mx-auto flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* Avatar with glow ring */}
          <div className="relative mb-8">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-primary opacity-40 blur-md animate-pulse-glow" />
            <img
              src={ProfilePic}
              alt="Jeniton Augustinpillai"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-primary/30 shadow-glow-primary"
            />
          </div>

          {/* Education badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full metal-border bg-primary/5 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-primary font-medium">
              University of Waterloo • BASc Nanotechnology Engineering
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05] tracking-tight">
            <DiaTextReveal text="Jeniton" color="#eef3fa" />
            <br />
            <DiaTextReveal text="Augustinpillai" color="#eef3fa" delay={0.3} />
          </h1>

          {/* Tagline */}
          <div className="text-xl md:text-2xl mb-4">
            <span className="gradient-accent-text font-semibold">Nanotechnology Engineering</span>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Passionate about advancing the{" "}
            <span className="text-primary font-semibold">semiconductor industry</span> through
            innovative microfabrication, nanoscale device development, and cutting-edge research.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="btn-metal btn-shine interactive rounded-full px-8 text-foreground hover:text-primary-glow"
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-glass btn-shine interactive rounded-full px-8 text-primary-glow hover:text-foreground"
              onClick={() => window.open("mailto:j4august@uwaterloo.ca")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="interactive p-3 rounded-full glass-card text-muted-foreground hover:text-primary hover:shadow-glow-primary transition-colors duration-300"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
