import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary/20 border-t border-border/50 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>© 2024 Jeniton Augustinpillai</span>
            <span>•</span>
            <span>Nanotechnology Engineering</span>
            <span>•</span>
            <span>University of Waterloo</span>
          </div>
          <p className="text-sm text-muted-foreground/70 mt-2">
            Passionate about advancing semiconductor technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;