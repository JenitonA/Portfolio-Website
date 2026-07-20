import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SpotlightCard from "@/components/effects/SpotlightCard";
import SectionHeader from "@/components/SectionHeader";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Cpu, Brain, Microscope, ExternalLink, Github, HardDrive } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-parallax";
import misCapacitorImage from "@/assets/mis-capacitor.webp";
import mosEquipmentImage from "@/assets/mos-equipment.webp";
import mosCleanroomImage from "@/assets/mos-cleanroom.webp";
import mosProcessingImage from "@/assets/mos-processing.webp";
import defectAIDiagramImage from "@/assets/DefectAI_Diagram.webp";
import defectAIWafermapsImage from "@/assets/DefectAI_Wafermaps.webp";
import defectAIConfusionMatrixImage from "@/assets/DefectAi_ConfusionMatrix.webp";
import defectAIGraphsImage from "@/assets/DefectAi_Graphs.webp";
import tipEtchingApparatusImage from "@/assets/TipEtching_Apparatus.webp";
import tipEtchingCADImage from "@/assets/TipEtching_CAD.webp";
import tipEtchingCloseUpTipImage from "@/assets/TipEtching_CloseUp.webp";
import tipEtchingJarsImage from "@/assets/TipEtching_Jars.webp";
import tipEtchingTipsImage from "@/assets/TipEtching_Tips.webp";
import cameraMountCADImage from "@/assets/CameraMount_CADScreenshot.webp";
import cameraPic1Image from "@/assets/CameraPic1.webp";
import cameraPic2Image from "@/assets/CameraPic2.webp";
import cameraPic3Image from "@/assets/CameraPic3.webp";
import TerminalSnap from "@/assets/TerminalSnapshot.webp";
import WiringSchematic from "@/assets/WiringSchematics.webp";

const ProjectsSection = () => {
  const [expandedTechs, setExpandedTechs] = useState<{[key: number]: boolean}>({});
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible, setElement } = useScrollAnimation(0.1);
  
  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

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
      title: "Camera Vision System - Peroxide Detection",
      description: "Computer vision system for automated peroxide spray detection at Greenhouse Juice manufacturing facility",
      fullDescription: [
        "Retrofitted a gable-top machine with a camera vision system that uses computer vision built with OpenCV and a Raspberry Pi to detect hydrogen peroxide sprays on cartons",
        "Implemented custom image processing algorithms using OpenCV to identify spray patterns and ensure proper coverage for food safety compliance",
        "Designed and fabricated custom camera mounting system with CAD modeling to optimize viewing angles and minimize environmental interference"
      ],
      technologies: ["OpenCV", "Python", "Raspberry Pi", "OAK-1", "DepthAI", "Fusion360", "3D-Printing"],
      icon: Brain,
      images: [cameraPic1Image, cameraPic2Image, TerminalSnap, cameraPic3Image, cameraMountCADImage, WiringSchematic],
      featured: true,
      driveUrl: "https://drive.google.com/drive/folders/1CeBzAvMq2HXbmBNc0VMJWv7cpC-cmhlV?usp=sharing"
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
      githubUrl: "https://github.com/JenitonA/toyota-innovation-challenge"
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
    <section 
      ref={sectionRef}
      id="projects" 
      className={`py-20 px-6 relative transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Soft radial backdrop so cards float on light, not flat dark */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 15%, hsl(42 90% 55% / 0.05) 0%, transparent 70%)" }}
      />
      <div className="container mx-auto max-w-7xl">
        <SectionHeader index={2} label="Work" title="Featured Projects" />

        {/* Bento-style grid: featured cards alternate wide/narrow spans on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <SpotlightCard
              key={index}
              className={`group hover:shadow-glow-accent transition-all duration-700 hover:scale-[1.015] ${
                index % 4 === 0 || index % 4 === 3 ? 'lg:col-span-4' : 'lg:col-span-2'
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
              }}
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
                
                {(project.githubUrl || project.driveUrl) && (
                  <div className="flex justify-end gap-2">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="interactive hover:bg-accent/20 hover:border-accent/30 transition-colors duration-300"
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
                    )}
                    {project.driveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="interactive hover:bg-accent/20 hover:border-accent/30 transition-colors duration-300"
                      >
                        <a
                          href={project.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <HardDrive className="h-4 w-4" />
                          View Files
                        </a>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </SpotlightCard>
          ))}
        </div>

        {/* Additional Projects Section — mirrors the SectionHeader kicker style */}
        {projects.filter(p => !p.featured).length > 0 && (
          <div className="text-center mb-12 mt-20">
            <div className="flex items-center justify-center gap-3 mb-4 font-mono text-sm">
              <span className="w-8 metal-divider" />
              <span className="text-muted-foreground uppercase tracking-[0.3em] text-xs">More Work</span>
              <span className="w-8 metal-divider" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Additional Projects
            </h3>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <SpotlightCard
              key={index}
              className={`group hover:shadow-glow-primary transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? `${(index + 4) * 0.1}s` : '0s'
              }}
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
                      className="interactive hover:bg-accent/20 hover:border-accent/30 transition-colors duration-300 flex-1"
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
                      className="interactive hover:bg-primary/20 hover:border-primary/30 transition-colors duration-300 flex-1"
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
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;