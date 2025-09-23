import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import ProfilePic from "@/assets/ProfilePic.png";
import { useParallax, useMouseParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const parallaxOffset = useParallax(0.3);
  const mouseParallax = useMouseParallax(0.05);
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero">
      {/* Animated background grid with parallax */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-10" 
        style={{
          transform: `translateY(${parallaxOffset * 0.5}px) translateX(${mouseParallax.x * 0.3}px)`
        }}
      />
      
      {/* Floating particles with enhanced parallax */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${parallaxOffset * 0.8}px) translateX(${mouseParallax.x * 0.5}px) translateY(${mouseParallax.y * 0.3}px)`
        }}
      >
        {/* Large primary particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-bounce glow-primary" />
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-primary rounded-full animate-bounce glow-primary" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Accent particles */}
        <div className="absolute top-60 left-32 w-1 h-1 bg-accent rounded-full animate-bounce glow-accent" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-60 right-40 w-1.5 h-1.5 bg-accent-glow rounded-full animate-pulse" style={{ animationDelay: '5s' }} />
        <div className="absolute top-80 right-60 w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '2.5s' }} />
        
        {/* Small scattered particles */}
        <div className="absolute top-32 left-1/3 w-0.5 h-0.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-32 right-1/3 w-0.5 h-0.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: '3.8s' }} />
        <div className="absolute top-2/3 left-16 w-1 h-1 bg-primary-glow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-16 w-1 h-1 bg-accent-glow rounded-full animate-bounce" style={{ animationDelay: '4.2s' }} />
        
        {/* More medium particles */}
        <div className="absolute top-1/4 left-3/4 w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '6s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-accent rounded-full animate-pulse glow-accent" style={{ animationDelay: '1.8s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary-glow rounded-full animate-bounce" style={{ animationDelay: '3.2s' }} />
        
        {/* Tiny ambient particles */}
        <div className="absolute top-16 left-1/2 w-0.5 h-0.5 bg-accent rounded-full animate-pulse" style={{ animationDelay: '2.2s' }} />
        <div className="absolute bottom-16 left-3/4 w-0.5 h-0.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '4.8s' }} />
        <div className="absolute top-1/2 left-8 w-0.5 h-0.5 bg-accent-glow rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
        <div className="absolute top-1/2 right-8 w-0.5 h-0.5 bg-primary-glow rounded-full animate-bounce" style={{ animationDelay: '5.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto animate-slide-up">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Profile Picture with subtle parallax */}
            <div 
              className="flex-shrink-0"
              style={{
                transform: `translateY(${parallaxOffset * -0.2}px) translateX(${mouseParallax.x * 0.1}px)`
              }}
            >
              <img 
                src={ProfilePic} 
                alt="Jeniton Augustinpillai" 
                className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 border-primary/20 shadow-glow-primary hover:shadow-glow-strong transition-all duration-300"
              />
            </div>
            
            {/* Content with parallax */}
            <div 
              className="text-center lg:text-left"
              style={{
                transform: `translateY(${parallaxOffset * -0.1}px)`
              }}
            >
              {/* Main heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Jeniton</span>
                <br />
                <span className="text-foreground">Augustinpillai</span>
              </h1>
              
              {/* Subtitle */}
              <div className="text-xl md:text-2xl text-muted-foreground mb-4">
                <span className="gradient-accent-text font-semibold">Nanotechnology Engineering</span>
              </div>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
                Passionate about advancing the <span className="text-primary font-semibold">semiconductor industry</span> through 
                innovative microfabrication, nanoscale device development, and cutting-edge research.
              </p>
              
              {/* Education badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
                <span className="text-sm text-primary font-medium">University of Waterloo • BASc Nanotechnology Engineering</span>
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
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
              <div className="flex justify-center lg:justify-start gap-6">
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
        </div>
      </div>
      
      {/* Scroll indicator with parallax */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        style={{
          transform: `translateX(-50%) translateY(${parallaxOffset * -0.5}px)`
        }}
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;