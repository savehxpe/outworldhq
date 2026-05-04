"use client";

import { useState, useEffect, useRef } from "react";

type SandboxState = "Create" | "Work" | "Finish";

export default function Sandbox() {
  const [state, setState] = useState<SandboxState>("Create");
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus Mode Effect
  useEffect(() => {
    if (state === "Work") {
      document.body.classList.add("focus-mode");
      setIsRunning(true);
    } else {
      document.body.classList.remove("focus-mode");
      setIsRunning(false);
    }

    return () => document.body.classList.remove("focus-mode");
  }, [state]);

  // Timer Logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setShowVerification(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleFinish = () => {
    setShowVerification(false);
    setState("Finish");
    setTimeLeft(20 * 60);
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center transition-all duration-1000 ${state === "Work" ? "scale-110" : "scale-100"}`}>
      {/* State Machine Toggle */}
      <div className={`flex gap-4 mb-12 transition-all duration-700 ${state === "Work" ? "opacity-0 pointer-events-none -translate-y-10" : "opacity-100"}`}>
        {(["Create", "Work", "Finish"] as SandboxState[]).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`px-8 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
              state === s 
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
                : "text-[#52525b] hover:text-white"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Main Terminal Area */}
      <div className="relative w-full max-w-4xl aspect-video bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#3f3f46] font-bold">
            Sandbox Terminal // {state}
          </div>
          <div className="text-[10px] tracking-widest font-mono text-blue-500/50">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Dynamic Content based on State */}
        <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
          {state === "Create" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h2 className="text-4xl font-extralight tracking-tight text-white">Initialize <span className="font-semibold text-blue-500">Draft</span></h2>
              <p className="text-[#71717a] max-w-sm">Define the scope of your experimental sprint. No boundaries, just raw iteration.</p>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />
              <button 
                onClick={() => setState("Work")}
                className="group flex items-center gap-4 text-xs font-bold tracking-[0.4em] uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                Enter Deep Work
                <span className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-blue-500 transition-all duration-500" />
              </button>
            </div>
          )}

          {state === "Work" && (
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-blue-500/10 rounded-full animate-pulse" />
                <h1 className="text-9xl font-black tracking-tighter text-white/5 relative tabular-nums">
                  {formatTime(timeLeft)}
                </h1>
              </div>
              <div className="space-y-2">
                <div className="text-[10px] tracking-[0.5em] uppercase text-blue-400 font-bold animate-pulse">Focus Protocol Engaged</div>
                <p className="text-[#3f3f46] text-sm font-light italic">External interruptions neutralized.</p>
              </div>
            </div>
          )}

          {state === "Finish" && (
            <div className="space-y-6 animate-in zoom-in duration-700">
              <div className="w-16 h-16 rounded-full border border-emerald-500/50 flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 animate-ping opacity-20" />
                <div className="absolute w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <h2 className="text-4xl font-extralight tracking-tight text-white">Sprint <span className="font-semibold text-emerald-500">Complete</span></h2>
              <p className="text-[#71717a] max-w-sm">Data points captured. Results ready for engine processing.</p>
              <button 
                onClick={() => setState("Create")}
                className="mt-8 px-8 py-3 rounded-xl border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Reset Environment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Verification Prompt */}
      {showVerification && (
        <div className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 space-y-6 text-center animate-in zoom-in duration-500">
            <h3 className="text-2xl font-light text-white italic">"Did you reach the objective?"</h3>
            <p className="text-[#71717a] text-sm">Verify the outcome of this 20-minute focus sprint before proceeding.</p>
            <div className="flex gap-4">
              <button 
                onClick={handleFinish}
                className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold tracking-widest uppercase text-[10px] hover:bg-emerald-500 transition-colors"
              >
                Objective Met
              </button>
              <button 
                onClick={handleFinish}
                className="flex-1 py-4 bg-[#1a1a1a] text-white rounded-xl font-bold tracking-widest uppercase text-[10px] hover:bg-[#333] transition-colors"
              >
                Iteration Needed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Focus Mode */}
      <style jsx global>{`
        .focus-mode header,
        .focus-mode nav,
        .focus-mode footer,
        .focus-mode .notifications-panel {
          opacity: 0 !important;
          transform: translateY(-20px) scale(0.95) !important;
          pointer-events: none !important;
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .focus-mode main {
          background: #000 !important;
        }
      `}</style>
    </div>
  );
}
