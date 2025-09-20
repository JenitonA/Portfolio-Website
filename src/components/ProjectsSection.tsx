import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Cpu, Brain, Microscope, ExternalLink, Github } from "lucide-react";
import { useState } from "react";
import misCapacitorImage from "@/assets/mis-capacitor.png";
import mosEquipmentImage from "@/assets/mos-equipment.png";
import mosCleanroomImage from "@/assets/mos-cleanroom.png";
import mosProcessingImage from "@/assets/mos-processing.png";
import defectAIDiagramImage from "@/assets/DefectAI_Diagram.png";
import defectAIWafermapsImage from "@/assets/DefectAI_Wafermaps.png";
import defectAIConfusionMatrixImage from "@/assets/DefectAi_ConfusionMatrix.png";
import defectAIGraphsImage from "@/assets/DefectAi_Graphs.png";
import tipEtchingApparatusImage from "@/assets/TipEtching_Apparatus.png";
import tipEtchingCADImage from "@/assets/TipEtching_CAD.png";
import tipEtchingCloseUpTipImage from "@/assets/TipEtching_CloseUp.png";
import tipEtchingJarsImage from "@/assets/TipEtching_Jars.png";
import tipEtchingTipsImage from "@/assets/TipEtching_Tips.png";

const ProjectsSection = () => {
  const [expandedTechs, setExpandedTechs] = useState<{[key: number]: boolean}>({});

  const toggleTechExpansion = (projectIndex: number) => {
    setExpandedTechs(prev => ({
      ...prev,
      [projectIndex]: !prev[projectIndex]
    }));
  };

  const projects = [
    {
      title: "MOS Capacitor Microfabrication",
      description: "Complete semiconductor device fabrication in cleanroom environment using advanced microfabrication techniques",
      fullDescription: [
        "Fabricated 9 MOS capacitors in a cleanroom using multiple microfabrication techniques including PVD, PECVD, photolithography, wet etching, and dry etching",
        "Characterized the fabricated capacitors through C-V, I-V, and 4-point probe measurements to evaluate electrical properties",
        "Applied knowledge of thin-film deposition and cleanroom protocols to successfully execute the entire fabrication process"
      ],
      technologies: ["PECVD", "PVD", "Photolithography", "Wet Etching", "Dry Etching", "C-V Analysis", "I-V Characterization"],
      icon: Microscope,
      images: [misCapacitorImage, mosEquipmentImage, mosCleanroomImage, mosProcessingImage],
      featured: true
    },
    {
      title: "Wafer Defect Detection AI",
      description: "AI-powered semiconductor wafer defect classification system using deep learning",
      fullDescription: [
        "Built a Convolutional Neural Network (CNN) to classify wafer defect patterns using the WM-811K dataset with 811,000 wafer maps across 9 defect types",
        "Designed preprocessing and augmentation pipeline with OpenCV and Scikit-image, improving data quality and dataset class balance",
        "Achieved an F1-score of 87%, demonstrating AI-driven defect classification to support yield improvement in semiconductor fabrication"
      ],
      technologies: ["TensorFlow", "Keras", "Scikit-learn", "OpenCV", "CNN", "Computer Vision", "Data Preprocessing"],
      icon: Brain,
      images: [defectAIDiagramImage, defectAIWafermapsImage, defectAIConfusionMatrixImage, defectAIGraphsImage],
      featured: true,
      githubUrl: "https://github.com/JenitonA/Wafer-Defect-AI"
    },
    {
      title: "STM Tip Etching Process",
      description: "Electrochemical etching system for precise tip fabrication for our custom made STM",
      fullDescription: [
        "Developed an electrochemical etching process using NaOH lamella with NaCl electrolyte for tungsten STM tips",
        "Designed and 3D-printed custom tip apparatus to improve process control and reduce tip crashes",
        "Successfully produced 14 sharp STM tips suitable for nanoscale imaging applications"
      ],
      technologies: ["Electrochemical Etching", "STM", "3D Printing", "CAD Design", "Process Control", "Nanoscale Imaging"],
      icon: Cpu,
      images: [tipEtchingApparatusImage, tipEtchingCADImage, tipEtchingCloseUpTipImage, tipEtchingJarsImage, tipEtchingTipsImage],
      featured: true
    },
    {
      title: "SigmaScholar - Hack The North 2025",
      description: "Transform your endless doomscrolling into productive micro-learning",
      fullDescription: [
        "Selected among the top 10% of 256 projects at Hack the North by building an AI-powered Chrome extension",
        "Implemented AI-generated personalized questions using Cohere's Command A model based on lecture notes and YouTube content",
        "Delivered interactive quiz overlays on YouTube Shorts, enhancing short-form content into productive study sessions"
      ],
      technologies: ["React", "TypeScript", "Cohere API","Vite", "Firebase", "Node.js"],
      icon: Brain,
      featured: false,
      externalUrl: "https://devpost.com/software/cool-project-nsghdq?ref_content=my-projects-tab&ref_feature=my_projects"
    },
    {
      title: "TOYOTA Innovation Challenge",
      description: "AGV robot control system with crash prevention and computer vision for manufacturing plant",
      fullDescription: [
        "Implemented keyboard controls for precise movement of an AGV robot for TOYOTA's manufacturing plant in a 2-day challenge",
        "Developed crash prevention system utilizing LiDAR data to detect obstacles and prevent collisions",
        "Utilized OpenCV for real-time stop sign detection system, ensuring compliance with plant traffic laws"
      ],
      technologies: ["Python", "OpenCV", "Ubuntu", "LiDAR", "Computer Vision", "Robotics"],
      icon: Cpu,
      featured: false,
      githubUrl: "https://github.com/JenitonA/toyota-agv-challenge"
    },
    {
      title: "AntiZone - Survival Shooter Game",
      description: "Top-down survival shooter game built in Unity and published on Itch.io",
      fullDescription: [
        "Built and published a fully functional top-down survival shooter in Unity, attracting 40+ views on Itch.io",
        "Implemented dynamic enemy spawner with randomized locations and player tracking for enhanced gameplay",
        "Utilized Unity's particle system and Universal Render Pipeline to improve graphics quality by 200%"
      ],
      technologies: ["C#", "Unity", "Game Development", "UI Design", "Particle Systems", "Universal Render Pipeline"],
      icon: Brain,
      featured: false,
      externalUrl: "https://brownjeni.itch.io/antizone",
      externalUrlText: "Play Game"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hands-on semiconductor research and development projects showcasing technical expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <Card 
              key={index}
              className="group hover:shadow-glow-accent transition-all duration-500 border-border/50 hover:border-accent/30 bg-card/80 backdrop-blur-sm overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {project.images && (
                <div className="relative overflow-hidden">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, imageIndex) => (
                        <CarouselItem key={imageIndex}>
                          <img 
                            src={image} 
                            alt={`${project.title} - Image ${imageIndex + 1}`}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2" />
                  </Carousel>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <div className="p-2 bg-accent/20 backdrop-blur-sm rounded-lg">
                      <project.icon className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  {!project.images && (
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <project.icon className="h-6 w-6 text-accent" />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {project.fullDescription.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                      <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {(expandedTechs[index] ? project.technologies : project.technologies.slice(0, 4)).map((tech, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="bg-muted/50 text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors duration-300 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-accent/10 transition-colors duration-300"
                      onClick={() => toggleTechExpansion(index)}
                    >
                      {expandedTechs[index] 
                        ? 'Show less' 
                        : `+${project.technologies.length - 4} more`
                      }
                    </Badge>
                  )}
                </div>
                
                {project.githubUrl && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:bg-accent/20 hover:border-accent/30 transition-colors duration-300"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View Repository
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Projects Section */}
        {projects.filter(p => !p.featured).length > 0 && (
          <div className="text-center mb-12 mt-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Additional Projects</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Software development and programming projects
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <Card 
              key={index}
              className="group hover:shadow-glow-primary transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/60 backdrop-blur-sm overflow-hidden"
            >
              {project.images && (
                <div className="relative overflow-hidden">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, imageIndex) => (
                        <CarouselItem key={imageIndex}>
                          <img 
                            src={image} 
                            alt={`${project.title} - Image ${imageIndex + 1}`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2" />
                  </Carousel>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4">
                    <div className="p-2 bg-primary/20 backdrop-blur-sm rounded-lg">
                      <project.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {!project.images && (
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <project.icon className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="text-xs bg-muted/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-4">
                  {project.fullDescription[0]}
                </p>
                
                {/* Action buttons */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:bg-accent/20 hover:border-accent/30 transition-colors duration-300 flex-1"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 justify-center"
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.externalUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="hover:bg-primary/20 hover:border-primary/30 transition-colors duration-300 flex-1"
                    >
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 justify-center"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {project.externalUrlText || "View Project"}
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;