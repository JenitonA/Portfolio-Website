import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Microscope, Settings, Cpu } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
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
    <section id="skills" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across semiconductor fabrication, characterization, and software development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-glow-${category.color} transition-all duration-500 border-border/50 hover:border-${category.color}/30 bg-card/50 backdrop-blur-sm`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-${category.color}/20 rounded-lg`}>
                    <category.icon className={`h-6 w-6 text-${category.color}`} />
                  </div>
                  <CardTitle className={`text-xl group-hover:text-${category.color} transition-colors duration-300`}>
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
                      className="bg-muted/50 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Relevant Coursework */}
        <Card className="bg-gradient-to-r from-card/80 to-secondary/20 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-lg">
                <Cpu className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-xl">Relevant Coursework</CardTitle>
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
        </Card>
      </div>
    </section>
  );
};

export default SkillsSection;