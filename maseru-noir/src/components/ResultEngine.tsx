"use client";

import { useState } from "react";

export default function ResultEngine() {
  const [vision, setVision] = useState("");
  const [obstacles, setObstacles] = useState("");
  const [measurements, setMeasurements] = useState("");

  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            Result <span className="font-semibold">Engine</span>
          </h1>
          <p className="text-[#a1a1aa] text-lg font-light">
            V2MOM Framework: Strategic Alignment & Outcome Tracking
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vision/Priorities Column */}
          <div className="group relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 transition-all duration-500 hover:border-[#333] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-t-2xl opacity-50" />
            <h3 className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-4">Vision / Priorities</h3>
            <textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder="Define the primary mission..."
              className="w-full bg-transparent text-[#e0e0e0] font-light text-lg resize-none focus:outline-none min-h-[300px] leading-relaxed placeholder:text-[#3f3f46]"
            />
          </div>

          {/* Obstacles Column */}
          <div className="group relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 transition-all duration-500 hover:border-[#333] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-2xl opacity-50" />
            <h3 className="text-xs font-bold tracking-[0.2em] text-red-400 uppercase mb-4">Obstacles</h3>
            <textarea
              value={obstacles}
              onChange={(e) => setObstacles(e.target.value)}
              placeholder="Identify barriers to success..."
              className="w-full bg-transparent text-[#e0e0e0] font-light text-lg resize-none focus:outline-none min-h-[300px] leading-relaxed placeholder:text-[#3f3f46]"
            />
          </div>

          {/* Measurements Column */}
          <div className="group relative bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl p-6 transition-all duration-500 hover:border-[#333] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-2xl opacity-50" />
            <h3 className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase mb-4">Measurements</h3>
            <textarea
              value={measurements}
              onChange={(e) => setMeasurements(e.target.value)}
              placeholder="Quantifiable targets..."
              className="w-full bg-transparent text-[#e0e0e0] font-light text-lg resize-none focus:outline-none min-h-[300px] leading-relaxed placeholder:text-[#3f3f46]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
