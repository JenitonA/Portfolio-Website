import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Cpu, Brain, Microscope, ExternalLink } from "lucide-react";
import misCapacitorImage from "@/assets/mis-capacitor.png";
import mosEquipmentImage from "@/assets/mos-equipment.png";
import mosCleanroomImage from "@/assets/mos-cleanroom.png";
import mosProcessingImage from "@/assets/mos-processing.png";

const ProjectsSection = () => {
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
      images: null,
      featured: true
    },
    {
      title: "STM Tip Etching Process",
      description: "Electrochemical etching system for precise STM tip fabrication",
      fullDescription: [
        "Developed an electrochemical etching process using NaOH lamella with NaCl electrolyte for tungsten STM tips",
        "Designed and 3D-printed custom tip apparatus to improve process control and reduce tip crashes",
        "Successfully produced 14 sharp STM tips suitable for nanoscale imaging applications"
      ],
      technologies: ["Electrochemical Etching", "STM", "3D Printing", "CAD Design", "Process Control", "Nanoscale Imaging"],
      icon: Cpu,
      images: null,
      featured: false
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
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <Badge 
                      key={i} 
                      variant="secondary" 
                      className="bg-muted/50 text-muted-foreground hover:bg-accent/20 hover:text-accent transition-colors duration-300 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional project */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(p => !p.featured).map((project, index) => (
            <Card 
              key={index}
              className="group hover:shadow-glow-primary transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/60 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <project.icon className="h-5 w-5 text-primary" />
                  </div>
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
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {project.fullDescription[0]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;