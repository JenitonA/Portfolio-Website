import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Linkedin, Github, Phone, MapPin } from "lucide-react";
import { useRef, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/use-parallax";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { isVisible, setElement } = useScrollAnimation(0.1);
  
  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "j4august@uwaterloo.ca",
      href: "mailto:j4august@uwaterloo.ca",
      primary: true
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/jenitona",
      href: "https://linkedin.com/in/jenitona/",
      primary: true
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/JenitonA",
      href: "https://github.com/JenitonA",
      primary: false
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className={`py-20 px-6 bg-gradient-to-b from-background to-secondary/20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to contribute to the semiconductor industry. Open to opportunities in research, 
            development, and engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-glow-primary transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 group ${
                    info.primary 
                      ? 'bg-primary/10 hover:bg-primary/20 border border-primary/20' 
                      : 'bg-muted/30 hover:bg-muted/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    info.primary ? 'bg-primary/20' : 'bg-accent/20'
                  }`}>
                    <info.icon className={`h-5 w-5 ${
                      info.primary ? 'text-primary' : 'text-accent'
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">{info.label}</div>
                    <div className={`font-medium group-hover:${
                      info.primary ? 'text-primary' : 'text-accent'
                    } transition-colors duration-300`}>
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
              
              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium">Waterloo, Ontario, Canada</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Objective */}
          <Card className="bg-gradient-to-br from-card/80 to-accent/5 backdrop-blur-sm border-border/50 hover:shadow-glow-accent transition-all duration-500">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                Career Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold gradient-accent-text">
                  Advancing Semiconductor Technology
                </h3>
                <p className="text-foreground/90 leading-relaxed">
                  Passionate about contributing to the future of semiconductor manufacturing through 
                  innovative research and development. Seeking opportunities to apply my expertise in:
                </p>
                <ul className="space-y-2">
                  {[
                    "Nanoscale device fabrication",
                    "Advanced characterization techniques", 
                    "Process optimization and yield improvement",
                    "Semiconductor research and development"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <Button 
                  className="w-full bg-gradient-accent hover:bg-gradient-accent/90 text-accent-foreground border-0 shadow-glow-accent hover:shadow-glow-strong transition-all duration-300"
                  onClick={() => window.open('mailto:j4august@uwaterloo.ca?subject=Career Opportunity')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Discuss Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground border-0 shadow-glow-primary hover:shadow-glow-strong transition-all duration-300"
            onClick={() => window.open('mailto:j4august@uwaterloo.ca')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            onClick={() => window.open('https://linkedin.com/in/jenitona/', '_blank')}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            Connect on LinkedIn
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;