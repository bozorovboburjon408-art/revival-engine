import { Link } from "react-router-dom";
import { BookOpen, Calculator, ClipboardList, LineChart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground font-display text-xl">∫</span>
              </div>
              <span className="font-display text-xl">MathPlatform</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Matematika fanini o'rganish uchun interaktiv platforma. Nazariya, amaliyot va sun'iy intellekt yordamida.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Bo'limlar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/library" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Kutubxona
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  AI Kalkulyator
                </Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" />
                  Testlar
                </Link>
              </li>
              <li>
                <Link to="/graphics" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <LineChart className="w-4 h-4" />
                  Grafika
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Mavzular</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/library/M1" className="hover:text-foreground transition-colors">Hosilalar</Link></li>
              <li><Link to="/library/M3" className="hover:text-foreground transition-colors">Integrallar</Link></li>
              <li><Link to="/library/M9" className="hover:text-foreground transition-colors">Differensial tenglamalar</Link></li>
              <li><Link to="/library/M13" className="hover:text-foreground transition-colors">Qatorlar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Qo'shimcha</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/admin/login" className="hover:text-foreground transition-colors">Admin panel</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Yordam</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Aloqa</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 MathPlatform. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};
