import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, MapPin, ArrowUpRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-parallax";
import SpotlightCard from "@/components/effects/SpotlightCard";
import SectionHeader from "@/components/SectionHeader";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible, setElement } = useScrollAnimation(0.1);

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  const focusAreas = [
    "Nanoscale device fabrication",
    "Advanced characterization techniques",
    "Process optimization and yield improvement",
    "Semiconductor research and development"
  ];

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      value: "j4august@uwaterloo.ca",
      href: "mailto:j4august@uwaterloo.ca"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/jenitona",
      href: "https://linkedin.com/in/jenitona/"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/JenitonA",
      href: "https://github.com/JenitonA"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Waterloo, Ontario, Canada",
      href: null
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`py-20 px-6 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Soft radial backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 65% 50% at 50% 60%, hsl(213 92% 62% / 0.07) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-4xl relative">
        <SectionHeader index={4} label="Contact" title="Let's Connect" />

        {/* Big CTA panel */}
        <SpotlightCard
          className={`text-center p-8 md:p-14 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            <span className="metal-text">Let's build the future of semiconductors</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Passionate about contributing to the future of semiconductor manufacturing through
            innovative research and development. Seeking opportunities in:
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {focusAreas.map((area, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="interactive bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-4 py-1.5 text-sm transition-colors duration-300"
              >
                {area}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="btn-metal btn-shine interactive rounded-full px-8 text-foreground hover:text-primary-glow"
              onClick={() => window.open('mailto:j4august@uwaterloo.ca?subject=Career Opportunity')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Discuss Opportunities
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="btn-glass btn-shine interactive rounded-full px-8 text-primary-glow hover:text-foreground"
              onClick={() => window.open('https://linkedin.com/in/jenitona/', '_blank')}
            >
              <Linkedin className="mr-2 h-4 w-4" />
              Connect on LinkedIn
            </Button>
          </div>
        </SpotlightCard>

        {/* Contact info chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactLinks.map((info, index) => {
            const content = (
              <SpotlightCard
                className={`group h-full p-5 flex flex-col items-center text-center gap-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow-primary ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 0.08}s` : '0s' }}
              >
                <div className="p-2.5 bg-primary/15 rounded-xl">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  {info.label}
                  {info.href && (
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
                <div className="text-sm lg:text-xs font-medium group-hover:text-primary transition-colors duration-300 break-words max-w-full">
                  {info.value}
                </div>
              </SpotlightCard>
            );

            return info.href ? (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={index}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
