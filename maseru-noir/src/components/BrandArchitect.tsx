"use client";

import { useState } from "react";

interface ContentIdea {
  id: string;
  text: string;
  status: "pending" | "aligned" | "flagged" | "checking";
  feedback?: string;
}

export default function BrandArchitect() {
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [inputValue, setInputValue] = useState("");

  const checkHermes = async (id: string, content: string) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, status: "checking" } : i));
    
    try {
      const res = await fetch("/api/hermes", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      
      setIdeas(prev => prev.map(i => i.id === id ? { 
        ...i, 
        status: data.status, 
        feedback: data.feedback 
      } : i));
    } catch (error) {
      setIdeas(prev => prev.map(i => i.id === id ? { ...i, status: "aligned" } : i));
    }
  };

  const addIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newId = Math.random().toString(36).substr(2, 9);
    const newIdea: ContentIdea = {
      id: newId,
      text: inputValue,
      status: "pending"
    };

    setIdeas([newIdea, ...ideas]);
    setInputValue("");
    checkHermes(newId, inputValue);
  };

  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            Brand <span className="font-semibold text-indigo-500">Architect</span>
          </h1>
          <p className="text-[#a1a1aa] text-lg font-light">
            Hermes Intelligence: Identity Validation & Content Stratification
          </p>
        </header>

        <form onSubmit={addIdea} className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Input content idea for validation..."
            className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl px-8 py-6 text-xl font-light text-white focus:outline-none focus:border-indigo-500/50 transition-all duration-500 placeholder:text-[#27272a]"
          />
          <button 
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 px-6 py-2 bg-white text-black text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-indigo-500 hover:text-white transition-all"
          >
            Stack
          </button>
        </form>

        <div className="space-y-4">
          {ideas.map((idea, index) => (
            <div 
              key={idea.id}
              className={`
                relative p-6 rounded-2xl border transition-all duration-700
                ${idea.status === "flagged" ? "bg-red-500/5 border-red-500/20" : "bg-[#0a0a0a] border-white/5"}
                animate-in slide-in-from-top-4 fade-in
              `}
              style={{ zIndex: ideas.length - index }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase ${
                      idea.status === "flagged" ? "text-red-400" : 
                      idea.status === "checking" ? "text-indigo-400 animate-pulse" : 
                      "text-emerald-400"
                    }`}>
                      {idea.status === "checking" ? "Hermes Validating..." : `Status: ${idea.status}`}
                    </span>
                    {idea.status === "aligned" && (
                      <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    )}
                  </div>
                  <p className="text-xl font-light text-[#e0e0e0] leading-relaxed">{idea.text}</p>
                  {idea.feedback && (
                    <div className={`text-sm font-light mt-4 p-3 rounded-lg ${
                      idea.status === "flagged" ? "bg-red-500/10 text-red-200" : "bg-emerald-500/10 text-emerald-200"
                    }`}>
                      <span className="font-bold mr-2 uppercase text-[10px]">Feedback:</span>
                      {idea.feedback}
                    </div>
                  )}
                </div>
                
                <div className="text-4xl font-black text-white/5 italic select-none">
                  #{ideas.length - index}
                </div>
              </div>
            </div>
          ))}

          {ideas.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-[#3f3f46] font-light italic">Stack is empty. Awaiting architectural input.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
