"use client";

import { useState } from "react";
import type { NavItem } from "@/components/NavBar";
import NavBar from "@/components/NavBar";
import ResultEngine from "@/components/ResultEngine";
import Sandbox from "@/components/Sandbox";
import BrandArchitect from "@/components/BrandArchitect";
import Vitality from "@/components/Vitality";
import MondayLockIn from "@/components/MondayLockIn";

export default function Home() {
  const [active, setActive] = useState<NavItem>("result-engine");

  const panels: Record<NavItem, React.ReactNode> = {
    "result-engine": <ResultEngine />,
    sandbox: <Sandbox />,
    "brand-architect": <BrandArchitect />,
    vitality: <Vitality />,
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] overflow-hidden">
      <MondayLockIn />
      <NavBar active={active} onSelect={setActive} />
      <main className="flex-1 flex items-center justify-center relative">
        {panels[active]}
      </main>
    </div>
  );
}
