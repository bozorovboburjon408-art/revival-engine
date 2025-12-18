import { useState, createContext, useContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import Index from "./pages/Index";
import Library from "./pages/Library";
import TopicDetail from "./pages/TopicDetail";
import Formulas from "./pages/Formulas";
import Tests from "./pages/Tests";
import Graphics from "./pages/Graphics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Context for splash screen control
interface SplashContextType {
  replaySplash: () => void;
}

const SplashContext = createContext<SplashContextType | null>(null);

export const useSplash = () => {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error("useSplash must be used within SplashProvider");
  }
  return context;
};

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    return !hasSeenSplash;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem("hasSeenSplash", "true");
    setShowSplash(false);
  };

  const replaySplash = () => {
    setShowSplash(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SplashContext.Provider value={{ replaySplash }}>
          <Toaster />
          <Sonner />
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          <div
            style={{
              opacity: showSplash ? 0 : 1,
              transition: "opacity 0.3s ease-out",
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/library" element={<Library />} />
                <Route path="/library/:topicId" element={<TopicDetail />} />
                <Route path="/formulas" element={<Formulas />} />
                <Route path="/tests" element={<Tests />} />
                <Route path="/graphics" element={<Graphics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </SplashContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
