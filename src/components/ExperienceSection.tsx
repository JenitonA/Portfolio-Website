import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
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
      technologies: ["STM", "Electrochemical Etching", "CAD Design", "Nanoscale Imaging", "Process Optimization"]
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
      technologies: ["OpenCV", "Raspberry Pi", "Computer Vision", "Python", "CMMS", "Quality Control"]
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
      technologies: ["Python", "Tkinter", "OpenCV", "VR Systems", "Real-time Processing", "Multi-threading"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building cutting-edge technology across semiconductor research, manufacturing, and software development
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-glow-primary transition-all duration-500 border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                      {exp.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-primary mt-1">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col md:text-right gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
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
                      className="bg-muted/50 text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;