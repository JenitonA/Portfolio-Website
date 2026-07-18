import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Microscope, Settings, Cpu } from "lucide-react";
import { useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-parallax";
import SpotlightCard from "@/components/effects/SpotlightCard";
import SectionHeader from "@/components/SectionHeader";

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible, setElement } = useScrollAnimation(0.1);

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  // Static class strings so Tailwind's scanner keeps them in the build —
  // template-built names like `bg-${color}/20` are invisible to it.
  const colorStyles = {
    primary: {
      iconBg: "bg-primary/20",
      icon: "text-primary",
      titleHover: "group-hover:text-primary",
    },
    accent: {
      iconBg: "bg-accent/20",
      icon: "text-accent",
      titleHover: "group-hover:text-accent",
    },
  } as const;

  const skillCategories: {
    title: string;
    icon: typeof Code;
    skills: string[];
    color: keyof typeof colorStyles;
  }[] = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "Java", "C#", "JavaScript", "TypeScript", "HTML/CSS", "Kotlin", "MATLAB"],
      color: "primary"
    },
    {
      title: "Metrology & Characterization",
      icon: Microscope,
      skills: ["AFM", "TEM", "SEM", "Raman Spectroscopy", "UV-Vis", "FT-IR", "Ellipsometry", "XRD", "DSC"],
      color: "accent"
    },
    {
      title: "Fabrication Processes",
      icon: Cpu,
      skills: ["PECVD", "PVD", "Photolithography", "Wet Etching", "Dry Etching", "Thin-film Deposition", "Cleanroom Protocols"],
      color: "primary"
    },
    {
      title: "Tools & Platforms",
      icon: Settings,
      skills: ["COMSOL", "Jupyter Notebook", "DepthAI", "Figma", "Ubuntu", "OpenCV", "TensorFlow", "Keras"],
      color: "accent"
    }
  ];

  const courses = [
    "Nanoprobing and Lithography",
    "Material Science", 
    "Semiconductor Physics",
    "Microfabrication and Thin-film"
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className={`py-20 px-6 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Soft radial backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 20%, hsl(197 90% 60% / 0.05) 0%, transparent 70%)" }}
      />
      <div className="container mx-auto max-w-6xl">
        <SectionHeader index={3} label="Toolkit" title="Technical Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <SpotlightCard
              key={index}
              className={`group hover:shadow-glow-accent transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
              }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${colorStyles[category.color].iconBg} rounded-lg`}>
                    <category.icon className={`h-6 w-6 ${colorStyles[category.color].icon}`} />
                  </div>
                  <CardTitle className={`text-xl ${colorStyles[category.color].titleHover} transition-colors duration-300`}>
                    {category.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="interactive bg-muted/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </SpotlightCard>
          ))}
        </div>

        {/* Relevant Coursework */}
        <SpotlightCard
          className={`hover:shadow-glow-primary transition-all duration-700 hover:scale-[1.01] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: isVisible ? '0.4s' : '0s'
          }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-lg">
                <Cpu className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  <span className="gradient-text">Relevant Coursework</span>
                </CardTitle>
                <p className="text-muted-foreground">University of Waterloo • BASc Nanotechnology Engineering</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="font-medium">{course}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </SpotlightCard>
      </div>
    </section>
  );
};

export default SkillsSection;