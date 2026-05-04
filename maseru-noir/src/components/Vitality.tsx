"use client";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  label: string;
  type: "Non-Negotiable" | "Optional";
  completed: boolean;
}

interface LocationBoundTask {
  name: string;
  lat: number;
  lng: number;
  radius: number; // meters
  tasks: string[];
}

const LOCATIONS: LocationBoundTask[] = [
  {
    name: "Studio",
    lat: -29.31, // Example Maseru coordinate
    lng: 27.48,
    radius: 100,
    tasks: ["Micro-writing", "Vocal Warmup", "Mix Audit"]
  },
  {
    name: "Gym",
    lat: -29.32,
    lng: 27.49,
    radius: 100,
    tasks: ["Mental Stamina", "Body Maintenance", "Focus Breathing"]
  }
];

export default function Vitality() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        checkProximity(latitude, longitude);
      },
      (err) => setError(err.message),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
  };

  const checkProximity = (lat: number, lng: number) => {
    let found = false;
    for (const loc of LOCATIONS) {
      const dist = calculateDistance(lat, lng, loc.lat, loc.lng);
      if (dist <= loc.radius) {
        if (activeLocation !== loc.name) {
          setActiveLocation(loc.name);
          setTasks(loc.tasks.map(t => ({
            id: Math.random().toString(36).substr(2, 9),
            label: t,
            type: "Non-Negotiable",
            completed: false
          })));
        }
        found = true;
        break;
      }
    }
    if (!found) {
      setActiveLocation(null);
      setTasks([]);
    }
  };

  // Mock toggle for demonstration if actual GPS doesn't match mock coordinates
  const simulateLocation = (name: string) => {
    const loc = LOCATIONS.find(l => l.name === name);
    if (loc) {
      setActiveLocation(loc.name);
      setTasks(loc.tasks.map(t => ({
        id: Math.random().toString(36).substr(2, 9),
        label: t,
        type: "Non-Negotiable",
        completed: false
      })));
    }
  };

  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-4xl font-extralight tracking-tight text-white">
              Vitality <span className="font-semibold text-emerald-500">Tracker</span>
            </h1>
            <p className="text-[#a1a1aa] text-lg font-light">
              Geofenced Optimization: Proximity-Based Non-Negotiables
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#3f3f46] mb-1">Telemetry Status</div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500/70">
              <div className={`w-1.5 h-1.5 rounded-full ${coords ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              {coords ? `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : 'Awaiting Signal'}
            </div>
          </div>
        </header>

        {activeLocation ? (
          <div className="space-y-8 animate-in fade-in zoom-in duration-1000">
            <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-emerald-400 mb-2">Zone Detected</h2>
              <div className="text-5xl font-black text-white tracking-tighter mb-6">{activeLocation}</div>
              
              <div className="space-y-4">
                {tasks.map(task => (
                  <div 
                    key={task.id}
                    onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                    className={`
                      group flex items-center justify-between p-5 rounded-2xl border cursor-pointer transition-all duration-300
                      ${task.completed ? "bg-emerald-500/20 border-emerald-500/40" : "bg-white/5 border-white/5 hover:border-emerald-500/30"}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 transition-all ${task.completed ? "bg-emerald-500 border-emerald-500" : "border-white/10 group-hover:border-emerald-500/50"}`}>
                        {task.completed && (
                          <svg className="text-black w-full h-full p-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-lg font-light ${task.completed ? "text-emerald-200 line-through opacity-50" : "text-white"}`}>
                        {task.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-500/50">Non-Negotiable</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-3xl space-y-6">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto opacity-30">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
            <div className="space-y-2">
              <p className="text-white text-lg font-light tracking-tight">Searching for Active Optimization Zones...</p>
              <p className="text-[#3f3f46] text-sm italic">Locate 'Studio' or 'Gym' to initialize geofenced protocols.</p>
            </div>
            
            {/* Simulation Controls for testing */}
            <div className="flex justify-center gap-4 pt-12">
              <button 
                onClick={() => simulateLocation("Studio")}
                className="px-6 py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold tracking-widest uppercase text-[#52525b] hover:text-white hover:border-white/20 transition-all"
              >
                Simulate Studio
              </button>
              <button 
                onClick={() => simulateLocation("Gym")}
                className="px-6 py-2 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold tracking-widest uppercase text-[#52525b] hover:text-white hover:border-white/20 transition-all"
              >
                Simulate Gym
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono">
            CRITICAL_FAILURE: {error}
          </div>
        ) }
      </div>
    </div>
  );
}
