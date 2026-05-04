"use client";

import { useState, useEffect } from "react";

export default function MondayLockIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [priorities, setPriorities] = useState(["", "", ""]);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    // Check if today is Monday (0 is Sunday, 1 is Monday)
    const today = new Date().getDay();
    const isMonday = today === 1;
    
    // Check if already submitted this week (mocking with localStorage)
    const lastSubmission = localStorage.getItem("last_monday_submission");
    const currentWeek = getWeekNumber(new Date());
    
    if (isMonday && lastSubmission !== currentWeek.toString()) {
      setIsOpen(true);
    }
  }, []);

  const getWeekNumber = (d: Date) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return weekNo;
  };

  const handlePriorityChange = (index: number, value: string) => {
    const newPriorities = [...priorities];
    newPriorities[index] = value;
    setPriorities(newPriorities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (priorities.every(p => p.trim().length > 0)) {
      const currentWeek = getWeekNumber(new Date());
      localStorage.setItem("last_monday_submission", currentWeek.toString());
      setIsOpen(false);
      setIsLocked(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center p-6 backdrop-blur-2xl">
      <div className="w-full max-w-2xl space-y-12 animate-in fade-in zoom-in duration-700">
        <div className="text-center space-y-4">
          <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-2">
            System Lock-in Required
          </div>
          <h2 className="text-5xl font-extralight tracking-tight text-white leading-tight">
            Monday <span className="font-semibold italic text-blue-500 underline decoration-1 underline-offset-8">Directive</span>
          </h2>
          <p className="text-[#71717a] text-lg font-light max-w-md mx-auto">
            Operational access is restricted. Define your Top 3 priorities to initialize the workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {priorities.map((priority, index) => (
            <div key={index} className="relative group">
              <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-4xl font-black text-white/5 group-focus-within:text-blue-500/20 transition-colors duration-500 italic">
                0{index + 1}
              </span>
              <input
                autoFocus={index === 0}
                type="text"
                value={priority}
                onChange={(e) => handlePriorityChange(index, e.target.value)}
                placeholder={`Priority ${index + 1}...`}
                className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-6 py-5 text-xl font-light text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 placeholder:text-[#27272a]"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={!priorities.every(p => p.trim().length > 0)}
            className="w-full mt-8 py-5 rounded-xl bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-blue-500 hover:text-white transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <span className="relative z-10">Initialize System</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </form>

        <div className="flex justify-center gap-8 pt-8">
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#3f3f46]">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Biometric Link Active
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#3f3f46]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Focus Integrity Verified
          </div>
        </div>
      </div>
    </div>
  );
}
