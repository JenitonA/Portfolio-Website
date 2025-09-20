import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-float glow-primary" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-float glow-accent" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-primary-glow rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-20 w-1 h-1 bg-accent-glow rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-slide-up">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Jeniton</span>
            <br />
            <span className="text-foreground">Augustinpillai</span>
          </h1>
          
          {/* Subtitle */}
          <div className="text-xl md:text-2xl text-muted-foreground mb-4">
            <span className="gradient-accent-text font-semibold">Nanotechnology Engineer</span>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Passionate about advancing the <span className="text-primary font-semibold">semiconductor industry</span> through 
            innovative microfabrication, nanoscale device development, and cutting-edge research.
          </p>
          
          {/* Education badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
            <span className="text-sm text-primary font-medium">University of Waterloo • BASc Nanotechnology Engineering</span>
          </div>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground border-0 shadow-glow-primary hover:shadow-glow-strong transition-all duration-300"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              onClick={() => window.open('mailto:j4august@uwaterloo.ca')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center gap-6">
            <a 
              href="https://linkedin.com/in/jenitona/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://github.com/JenitonA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="mailto:j4august@uwaterloo.ca"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;