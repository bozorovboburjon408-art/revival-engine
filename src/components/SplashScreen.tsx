import { useEffect, useState, useCallback } from "react";
import { useSplashSounds } from "@/hooks/useSplashSounds";

const mathSymbols = ["∫", "∑", "π", "∞", "√", "Δ", "∂", "∇", "∏", "∈", "θ", "λ", "Ω", "α", "β"];
const formulas = [
  "f'(x) = lim",
  "∫ f(x)dx",
  "e^{iπ} + 1 = 0",
  "∑_{n=1}^{∞}",
  "dy/dx",
  "∇×F",
  "det(A)",
];

const colors = [
  "hsl(var(--primary))",
  "hsl(280, 80%, 60%)",
  "hsl(340, 80%, 60%)",
  "hsl(200, 80%, 60%)",
  "hsl(45, 90%, 55%)",
  "hsl(160, 70%, 50%)",
];

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [showFormula, setShowFormula] = useState(false);
  const [phase, setPhase] = useState(0);
  const { playBeep, playWhoosh, playChime, playRise, playComplete, cleanup } = useSplashSounds();

  const handleComplete = useCallback(() => {
    playComplete();
    setTimeout(onComplete, 300);
  }, [onComplete, playComplete]);

  useEffect(() => {
    const initSound = setTimeout(() => playWhoosh(0.4), 100);

    const timer = setTimeout(() => {
      setShowFormula(true);
      playChime();
    }, 500);

    const phase1 = setTimeout(() => {
      setPhase(1);
      playBeep(520, 0.15);
    }, 1500);

    const phase2 = setTimeout(() => {
      setPhase(2);
      playBeep(660, 0.15);
    }, 3000);

    const riseSound = setTimeout(() => playRise(), 2000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        if (Math.floor(prev) % 25 === 0 && Math.floor(prev) !== Math.floor(prev + 0.8)) {
          playBeep(400 + Math.floor(prev) * 4, 0.08, 0.05);
        }
        return prev + 0.8;
      });
    }, 40);

    const completeTimer = setTimeout(() => {
      handleComplete();
    }, 5000);

    return () => {
      clearTimeout(initSound);
      clearTimeout(timer);
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(riseSound);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
      cleanup();
    };
  }, [handleComplete, playBeep, playWhoosh, playChime, playRise, cleanup]);

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, hsl(280, 80%, 60%) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, hsl(200, 80%, 60%) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, hsl(var(--primary)) 0%, transparent 50%)
          `,
          animation: "pulse-bg 4s ease-in-out infinite",
        }}
      />

      <div className="absolute inset-0">
        {mathSymbols.map((symbol, i) => (
          <span
            key={i}
            className="absolute font-display animate-float-symbol"
            style={{
              left: `${5 + (i * 6)}%`,
              top: `${10 + (i % 4) * 22}%`,
              fontSize: `${1.5 + (i % 4)}rem`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${4 + (i % 3)}s`,
              color: colors[i % colors.length],
              opacity: 0.15,
            }}
          >
            {symbol}
          </span>
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: colors[i],
              boxShadow: `0 0 20px ${colors[i]}`,
              animation: `orbit ${6 + i}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <div className="relative w-72 h-72 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g className="stroke-primary/10">
              {[40, 80, 120, 160].map((pos) => (
                <g key={pos}>
                  <line x1={pos} y1="20" x2={pos} y2="180" strokeWidth="1" />
                  <line x1="20" y1={pos} x2="180" y2={pos} strokeWidth="1" />
                </g>
              ))}
            </g>

            <defs>
              <linearGradient id="axisGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(280, 80%, 60%)" />
                <stop offset="100%" stopColor="hsl(200, 80%, 60%)" />
              </linearGradient>
              <linearGradient id="curveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(280, 80%, 60%)" />
                <stop offset="100%" stopColor="hsl(340, 80%, 60%)" />
              </linearGradient>
              <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(200, 80%, 60%)" />
                <stop offset="50%" stopColor="hsl(160, 70%, 50%)" />
                <stop offset="100%" stopColor="hsl(45, 90%, 55%)" />
              </linearGradient>
            </defs>

            <line x1="20" y1="100" x2="180" y2="100" stroke="url(#axisGradient)" strokeWidth="2" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="url(#axisGradient)" strokeWidth="2" />

            <path
              d="M 20 100 Q 45 40, 70 100 T 120 100 T 170 100"
              fill="none"
              stroke="url(#curveGradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 300,
                animation: "draw-line 2s ease-out forwards",
                filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))",
              }}
            />

            <path
              d="M 30 170 Q 100 10, 170 170"
              fill="none"
              stroke="url(#curveGradient2)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                strokeDasharray: 250,
                strokeDashoffset: 250,
                animation: "draw-line 2s ease-out 0.5s forwards",
                filter: "drop-shadow(0 0 8px hsl(200, 80%, 60%, 0.5))",
              }}
            />

            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="hsl(45, 90%, 55%)"
              strokeWidth="2"
              strokeDasharray="251"
              strokeDashoffset="251"
              style={{
                animation: "draw-line 2s ease-out 1s forwards",
                filter: "drop-shadow(0 0 6px hsl(45, 90%, 55%, 0.5))",
              }}
            />
          </svg>

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-display"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(280, 80%, 60%), hsl(340, 80%, 60%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "pulse-scale 2s ease-in-out infinite",
              filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
            }}
          >
            {phase === 0 ? "∫" : phase === 1 ? "∑" : "∞"}
          </div>
        </div>

        <div className="h-14 mb-6 overflow-hidden">
          {showFormula && (
            <div className="flex justify-center gap-3 flex-wrap">
              {formulas.map((formula, i) => (
                <span
                  key={i}
                  className="text-base md:text-lg font-mono"
                  style={{
                    opacity: 0,
                    color: colors[i % colors.length],
                    animation: `fade-slide-up 0.6s ease-out ${0.5 + i * 0.2}s forwards`,
                    textShadow: `0 0 10px ${colors[i % colors.length]}40`,
                  }}
                >
                  {formula}
                </span>
              ))}
            </div>
          )}
        </div>

        <h1
          className="font-display text-5xl md:text-6xl mb-6"
          style={{
            opacity: 0,
            background: "linear-gradient(135deg, hsl(var(--primary)), hsl(280, 80%, 60%), hsl(200, 80%, 60%), hsl(45, 90%, 55%))",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fade-slide-up 0.8s ease-out 1.2s forwards, gradient-shift 4s ease infinite",
          }}
        >
          MathHub
        </h1>

        <p
          className="text-muted-foreground mb-6"
          style={{
            opacity: 0,
            animation: "fade-slide-up 0.6s ease-out 1.6s forwards",
          }}
        >
          Matematikani osonlashtiring
        </p>

        <div className="w-56 h-1.5 bg-muted mx-auto rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(280, 80%, 60%), hsl(200, 80%, 60%))",
              boxShadow: "0 0 10px hsl(var(--primary) / 0.5)",
            }}
          />
        </div>

        <p
          className="text-sm text-muted-foreground mt-3 font-mono"
          style={{
            opacity: 0,
            animation: "fade-slide-up 0.4s ease-out 0.8s forwards",
          }}
        >
          {Math.round(progress)}%
        </p>

        <button
          onClick={() => {
            playBeep(800, 0.1);
            handleComplete();
          }}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          style={{
            opacity: 0,
            animation: "fade-slide-up 0.4s ease-out 2s forwards",
          }}
        >
          O'tkazib yuborish →
        </button>
      </div>

      <style>{`
        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        @keyframes fade-slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-symbol {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(15deg);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }

        @keyframes pulse-bg {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float-symbol {
          animation: float-symbol 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
