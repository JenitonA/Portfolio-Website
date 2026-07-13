import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-parallax";
import SpotlightCard from "@/components/effects/SpotlightCard";
import SectionHeader from "@/components/SectionHeader";
import harvardShield from "@/assets/harvard-shield.svg";
import formulaNanoLogo from "@/assets/formula-nano-logo.png";
import greenhouseJuiceLogo from "@/assets/greenhouse-juice-logo.png";
import exoInsightsLogo from "@/assets/exo-insights-logo.png";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  logo?: string;
  logoAlt?: string;
}

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible, setElement } = useScrollAnimation(0.1);

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  const experiences: Experience[] = [
    {
      title: "Research Intern",
      company: "Harvard University",
      location: "Boston, MA",
      period: "January 2026 – Present",
      description: [
        "Conducting research on biologically inspired gas sensors and AI at the Harvard SEAS Aizenberg Lab"
      ],
      technologies: ["Bio-inspired Gas Sensors", "AI", "Materials Research"],
      logo: harvardShield,
      logoAlt: "Harvard University shield"
    },
    {
      title: "STM Tip Fabrication Lead",
      company: "Formula Nano",
      location: "Waterloo, ON",
      period: "May 2024 – Present",
      description: [
        "Developing a Scanning Tunneling Microscope (STM) from scratch with a multidisciplinary design team for the international Nanocar Race",
        "Led and designed the first tungsten tip etching experiments using a NaOH lamella electrochemical process with NaCl electrolyte, successfully producing 14 sharp STM tips for nanoscale imaging",
        "Optimized the etching procedure by designing a 3D-printed tip apparatus in CAD, reducing tip crashes and streamlining the process"
      ],
      technologies: ["STM", "Electrochemical Etching", "CAD Design", "Nanoscale Imaging", "Process Optimization"],
      logo: formulaNanoLogo,
      logoAlt: "Formula Nano (University of Waterloo) logo"
    },
    {
      title: "Manufacturing Engineer",
      company: "Greenhouse Juice Inc.",
      location: "Mississauga, ON",
      period: "September 2024 – April 2025",
      description: [
        "Retrofitted a gable-top machine with a camera vision system using computer vision built with OpenCV and Raspberry Pi to detect hydrogen peroxide sprays on cartons",
        "Developed a pixel-based color detection algorithm to accurately detect peroxide sprays, significantly improving detection accuracy",
        "Deployed a Computerized Maintenance Management System (CMMS), improving equipment uptime and reducing unplanned maintenance by 40%"
      ],
      technologies: ["OpenCV", "Raspberry Pi", "Computer Vision", "Python", "CMMS", "Quality Control"],
      logo: greenhouseJuiceLogo,
      logoAlt: "Greenhouse Juice logo"
    },
    {
      title: "Software Engineer",
      company: "EXO Insights Corp.",
      location: "Waterloo, ON",
      period: "January 2024 – April 2024",
      description: [
        "Self-developed a live video application from scratch for eye-tracking glasses utilizing Python, Tkinter and OpenCV, integral to a VR training system valued at $500k",
        "Leveraged OpenCV to seamlessly integrate live video feed from eye-tracking glasses into the application, enhancing real-time gaze visualization",
        "Optimized code performance by 100% by utilizing asynchronous methods in Python to enable multi-threading"
      ],
      technologies: ["Python", "Tkinter", "OpenCV", "VR Systems", "Real-time Processing", "Multi-threading"],
      logo: exoInsightsLogo,
      logoAlt: "EXO Insights logo"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`py-20 px-6 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <SectionHeader index={1} label="Career" title="Experience" />

        {/* Glowing timeline */}
        <div className="relative">
          <div className="timeline-spine absolute left-4 top-1 bottom-0 w-px" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative pl-14 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 0.15}s` : '0s' }}
              >
                {/* Timeline node */}
                <div className="timeline-node absolute left-4 top-8 -translate-x-1/2 w-4 h-4 rounded-full" />

                <SpotlightCard className="group hover:shadow-glow-primary transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {exp.logo && (
                          <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/95 p-2 flex items-center justify-center border border-border/40 shadow-[0_4px_16px_hsl(219_40%_2%/0.4)]">
                            <img
                              src={exp.logo}
                              alt={exp.logoAlt ?? `${exp.company} logo`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                        <div>
                          <CardTitle className="font-display text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                            {exp.title}
                          </CardTitle>
                          <CardDescription className="text-lg font-semibold text-primary mt-1">
                            {exp.company}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col md:text-right gap-2">
                        <div className="flex items-center md:justify-end gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{exp.location}</span>
                        </div>
                        <div className="flex items-center md:justify-end gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-mono">{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-foreground/90">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="interactive bg-muted/50 text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors duration-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
