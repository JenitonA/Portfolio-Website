import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Mail } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            JA
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Button 
              size="sm"
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground border-0 shadow-glow-primary hover:shadow-glow-strong transition-all duration-300"
              onClick={() => window.open('mailto:j4august@uwaterloo.ca')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 rounded-lg text-foreground/80 hover:text-primary hover:bg-muted/50 transition-all duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Button 
                  size="sm"
                  className="w-full bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground border-0"
                  onClick={() => {
                    window.open('mailto:j4august@uwaterloo.ca');
                    setIsOpen(false);
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;