import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookOpen, ClipboardList, LineChart, Play, FileText, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/hooks/useLanguage";

type NavKey = 'library' | 'formulas' | 'tests' | 'graphics';

const navItems: { href: string; key: NavKey; icon: typeof BookOpen }[] = [
  { href: "/library", key: "library", icon: BookOpen },
  { href: "/formulas", key: "formulas", icon: FileText },
  { href: "/tests", key: "tests", icon: ClipboardList },
  { href: "/graphics", key: "graphics", icon: LineChart },
];

interface HeaderProps {
  onReplaySplash?: () => void;
}

export const Header = ({ onReplaySplash }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'uz' ? 'en' : 'uz');
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled 
        ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="container flex h-18 py-4 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse-glow">
              <span className="text-white font-display text-2xl font-bold">∫</span>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-xl font-bold">Math</span>
            <span className="font-display text-xl gradient-text">Platform</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 glass-card rounded-full px-2 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2 font-medium rounded-full transition-all",
                    isActive && "bg-primary text-primary-foreground shadow-md"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {t.nav[item.key]}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="rounded-full gap-2 font-medium"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{language === 'uz' ? 'Switch to English' : "O'zbek tiliga o'tish"}</p>
            </TooltipContent>
          </Tooltip>

          {onReplaySplash && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onReplaySplash}
                  className="hidden md:flex rounded-full"
                >
                  <Play className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.nav.replayAnimation}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 glass-card border-l-0">
              <div className="mt-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-display text-xl font-bold">∫</span>
                  </div>
                  <span className="font-display text-xl font-bold">MathPlatform</span>
                </div>
                
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 rounded-xl h-12",
                            isActive && "shadow-lg"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          {t.nav[item.key]}
                        </Button>
                      </Link>
                    );
                  })}
                  
                  <div className="border-t border-border my-4" />

                  {/* Mobile Language Toggle */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-xl h-12"
                    onClick={toggleLanguage}
                  >
                    <Globe className="w-5 h-5" />
                    {language === 'uz' ? 'English' : "O'zbekcha"}
                  </Button>
                  
                  {onReplaySplash && (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 rounded-xl h-12"
                      onClick={() => {
                        setIsOpen(false);
                        onReplaySplash();
                      }}
                    >
                      <Play className="w-5 h-5" />
                      {t.nav.replayAnimation}
                    </Button>
                  )}
                  
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};