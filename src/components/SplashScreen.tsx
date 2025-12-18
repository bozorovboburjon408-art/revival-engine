import { useEffect, useState, useCallback } from "react";
import { useSplashSounds } from "@/hooks/useSplashSounds";

const mathSymbols = ["∫", "∑", "π", "∞", "√", "Δ", "∂", "∇", "∏", "∈", "θ", "λ", "Ω", "α", "β", "γ", "φ", "ψ", "ζ", "ε"];
const formulas = [
  "f'(x) = lim",
  "∫ f(x)dx",
  "e^{iπ} + 1 = 0",
  "∑_{n=1}^{∞}",
  "∇²ψ = 0",
  "E = mc²",
];

const neonColors = [
  "#00f5ff", // cyan
  "#ff00ff", // magenta  
  "#00ff88", // green
  "#ffaa00", // orange
  "#ff3366", // pink
  "#7b68ee", // purple
  "#00ffcc", // teal
  "#ff6b6b", // coral
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0a0a1a]">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 15% 25%, rgba(0, 245, 255, 0.15) 0%, transparent 35%),
              radial-gradient(circle at 85% 75%, rgba(255, 0, 255, 0.15) 0%, transparent 35%),
              radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 40%),
              radial-gradient(circle at 75% 25%, rgba(255, 170, 0, 0.1) 0%, transparent 30%),
              radial-gradient(circle at 25% 75%, rgba(123, 104, 238, 0.1) 0%, transparent 30%)
            `,
            animation: "nebula-pulse 8s ease-in-out infinite",
          }}
        />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Floating math symbols */}
      <div className="absolute inset-0 pointer-events-none">
        {mathSymbols.map((symbol, i) => (
          <span
            key={i}
            className="absolute font-display animate-float-symbol"
            style={{
              left: `${(i * 5) % 95}%`,
              top: `${(i * 7) % 90}%`,
              fontSize: `${1.2 + (i % 3)}rem`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${5 + (i % 4)}s`,
              color: neonColors[i % neonColors.length],
              opacity: 0.25,
              textShadow: `0 0 20px ${neonColors[i % neonColors.length]}`,
            }}
          >
            {symbol}
          </span>
        ))}
      </div>


      {/* Orbiting elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${8 + i * 2}px`,
              height: `${8 + i * 2}px`,
              borderRadius: i % 2 === 0 ? '50%' : '2px',
              background: neonColors[i],
              boxShadow: `0 0 ${15 + i * 5}px ${neonColors[i]}, 0 0 ${30 + i * 5}px ${neonColors[i]}40`,
              animation: `orbit-${i % 2 === 0 ? 'cw' : 'ccw'} ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
              transformOrigin: "center",
            }}
          />
        ))}
        
        {/* Glowing rings */}
        {[80, 120, 160].map((size, i) => (
          <div
            key={`ring-${i}`}
            className="absolute rounded-full border"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${-size/2}px`,
              top: `${-size/2}px`,
              borderColor: `${neonColors[i]}40`,
              animation: `ring-pulse ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className="relative w-80 h-80 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Grid lines */}
            <g className="opacity-20">
              {[40, 80, 120, 160].map((pos) => (
                <g key={pos}>
                  <line x1={pos} y1="20" x2={pos} y2="180" stroke="#00f5ff" strokeWidth="0.5" />
                  <line x1="20" y1={pos} x2="180" y2={pos} stroke="#00f5ff" strokeWidth="0.5" />
                </g>
              ))}
            </g>

            <defs>
              <linearGradient id="neonGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#ff3366" />
              </linearGradient>
              <linearGradient id="neonGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff88" />
                <stop offset="50%" stopColor="#00ffcc" />
                <stop offset="100%" stopColor="#ffaa00" />
              </linearGradient>
              <linearGradient id="neonGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7b68ee" />
                <stop offset="100%" stopColor="#ff6b6b" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Axes with glow */}
            <line x1="20" y1="100" x2="180" y2="100" stroke="url(#neonGradient1)" strokeWidth="2" filter="url(#glow)" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="url(#neonGradient1)" strokeWidth="2" filter="url(#glow)" />

            {/* Sine wave */}
            <path
              d="M 20 100 Q 45 40, 70 100 T 120 100 T 170 100"
              fill="none"
              stroke="url(#neonGradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 300,
                animation: "draw-line 2s ease-out forwards",
              }}
            />

            {/* Parabola */}
            <path
              d="M 30 170 Q 100 10, 170 170"
              fill="none"
              stroke="url(#neonGradient2)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: 250,
                strokeDashoffset: 250,
                animation: "draw-line 2s ease-out 0.5s forwards",
              }}
            />

            {/* Circle */}
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="none"
              stroke="url(#neonGradient3)"
              strokeWidth="2"
              strokeDasharray="251"
              strokeDashoffset="251"
              filter="url(#glow)"
              style={{
                animation: "draw-line 2s ease-out 1s forwards",
              }}
            />

            {/* Hexagon */}
            <polygon
              points="100,60 135,80 135,120 100,140 65,120 65,80"
              fill="none"
              stroke="#ffaa00"
              strokeWidth="1.5"
              opacity="0.6"
              filter="url(#glow)"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: 200,
                animation: "draw-line 2s ease-out 1.5s forwards",
              }}
            />
          </svg>

          {/* Center symbol */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-display"
            style={{
              background: "linear-gradient(135deg, #00f5ff, #ff00ff, #00ff88, #ffaa00)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "pulse-scale 2s ease-in-out infinite, gradient-shift 4s ease infinite",
              filter: "drop-shadow(0 0 30px rgba(0, 245, 255, 0.5))",
            }}
          >
            {phase === 0 ? "∫" : phase === 1 ? "∑" : "∞"}
          </div>
        </div>

        {/* Formulas */}
        <div className="h-14 mb-6 overflow-hidden">
          {showFormula && (
            <div className="flex justify-center gap-4 flex-wrap">
              {formulas.map((formula, i) => (
                <span
                  key={i}
                  className="text-base md:text-lg font-mono"
                  style={{
                    opacity: 0,
                    color: neonColors[i % neonColors.length],
                    animation: `fade-slide-up 0.6s ease-out ${0.5 + i * 0.15}s forwards`,
                    textShadow: `0 0 15px ${neonColors[i % neonColors.length]}`,
                  }}
                >
                  {formula}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h1
          className="font-display text-6xl md:text-7xl mb-4 tracking-wide"
          style={{
            opacity: 0,
            background: "linear-gradient(135deg, #00f5ff, #ff00ff, #00ff88, #ffaa00, #7b68ee)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fade-slide-up 0.8s ease-out 1.2s forwards, gradient-shift 5s ease infinite",
            textShadow: "0 0 60px rgba(0, 245, 255, 0.3)",
          }}
        >
          MathHub
        </h1>

        <p
          className="text-gray-400 mb-8 text-lg tracking-widest"
          style={{
            opacity: 0,
            animation: "fade-slide-up 0.6s ease-out 1.6s forwards",
          }}
        >
          Matematikani osonlashtiring
        </p>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-800 mx-auto rounded-full overflow-hidden border border-gray-700">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #00f5ff, #ff00ff, #00ff88, #ffaa00)",
              backgroundSize: "200% 100%",
              animation: "gradient-move 2s linear infinite",
              boxShadow: "0 0 20px rgba(0, 245, 255, 0.6), 0 0 40px rgba(255, 0, 255, 0.4)",
            }}
          />
        </div>

        <p
          className="text-lg text-gray-400 mt-4 font-mono"
          style={{
            opacity: 0,
            animation: "fade-slide-up 0.4s ease-out 0.8s forwards",
            textShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
          }}
        >
          {Math.round(progress)}%
        </p>

        {/* Skip button */}
        <button
          onClick={() => {
            playBeep(800, 0.1);
            handleComplete();
          }}
          className="mt-8 px-6 py-2 text-sm text-gray-400 hover:text-white transition-all duration-300 border border-gray-700 rounded-full hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]"
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
            transform: translateY(-25px) rotate(10deg);
          }
        }

        .animate-float-symbol {
          animation: float-symbol 5s ease-in-out infinite;
        }

        @keyframes orbit-cw {
          from {
            transform: rotate(0deg) translateX(100px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(100px) rotate(-360deg);
          }
        }

        @keyframes orbit-ccw {
          from {
            transform: rotate(360deg) translateX(130px) rotate(-360deg);
          }
          to {
            transform: rotate(0deg) translateX(130px) rotate(0deg);
          }
        }

        @keyframes ring-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        @keyframes nebula-pulse {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.05) rotate(2deg);
            opacity: 0.8;
          }
        }

        @keyframes grid-move {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(60px);
          }
        }

        @keyframes particle {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 1;
          }
        }

        .animate-particle {
          animation: particle 4s ease-in-out infinite;
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

        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </div>
  );
};
