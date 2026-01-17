import { Link, useLocation } from "react-router-dom";
import { BookOpen, FileText, ClipboardList, LineChart, Github, Mail, ExternalLink, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useLanguage();

  // Minimal footer for non-home pages
  if (!isHomePage) {
    return (
      <footer className="border-t border-border/40 bg-secondary/30">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-display text-lg">∫</span>
              </div>
              <span className="font-display text-lg">MathPlatform</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © 2025 MathPlatform. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Full footer for home page
  return (
    <footer className="relative border-t border-border/40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-secondary/40" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container relative py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
                <span className="text-primary-foreground font-display text-2xl">∫</span>
              </div>
              <span className="font-display text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">MathPlatform</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
              {t.footer.description}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/bozorovboburjon408-art" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://t.me/Boburjon2108" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1">
                <Send className="w-5 h-5" />
              </a>
              <a href="mailto:bozorovboburjon408@gmail.com" className="w-10 h-10 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:-translate-y-1">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Bo'limlar */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.footer.navigation}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2.5 group">
                  <BookOpen className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {t.nav.library}
                </Link>
              </li>
              <li>
                <Link to="/formulas" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2.5 group">
                  <FileText className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {t.nav.formulas}
                </Link>
              </li>
              <li>
                <Link to="/tests" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2.5 group">
                  <ClipboardList className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {t.nav.tests}
                </Link>
              </li>
              <li>
                <Link to="/graphics" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2.5 group">
                  <LineChart className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
                  {t.nav.graphics}
                </Link>
              </li>
            </ul>
          </div>

          {/* Mavzular */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.footer.moreTopics}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/library/M1" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <span className="text-xs text-primary/60">→</span>
                  Hosilalar
                </Link>
              </li>
              <li>
                <Link to="/library/M3" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <span className="text-xs text-primary/60">→</span>
                  Integrallar
                </Link>
              </li>
              <li>
                <Link to="/library/M9" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <span className="text-xs text-primary/60">→</span>
                  Differensial tenglamalar
                </Link>
              </li>
              <li>
                <Link to="/library/M13" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <span className="text-xs text-primary/60">→</span>
                  Qatorlar
                </Link>
              </li>
            </ul>
          </div>

          {/* Qo'shimcha */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t.footer.help}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t.footer.help}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 MathPlatform. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};