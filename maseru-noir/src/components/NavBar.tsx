"use client";

export type NavItem = "result-engine" | "sandbox" | "brand-architect" | "vitality";

interface NavBarProps {
  active: NavItem;
  onSelect: (item: NavItem) => void;
}

/* ── SVG Icons ── */

function IconResultEngine({ active }: { active: boolean }) {
  const s = active ? "#e0e0e0" : "#52525b";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <circle cx="11" cy="11" r="3" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
  );
}

function IconSandbox({ active }: { active: boolean }) {
  const s = active ? "#e0e0e0" : "#52525b";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function IconBrandArchitect({ active }: { active: boolean }) {
  const s = active ? "#e0e0e0" : "#52525b";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function IconVitality({ active }: { active: boolean }) {
  const s = active ? "#e0e0e0" : "#52525b";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

/* ── Nav items config ── */

const items: { id: NavItem; label: string; Icon: React.FC<{ active: boolean }> }[] = [
  { id: "result-engine", label: "Result Engine", Icon: IconResultEngine },
  { id: "sandbox", label: "Sandbox", Icon: IconSandbox },
  { id: "brand-architect", label: "Brand Architect", Icon: IconBrandArchitect },
  { id: "vitality", label: "Vitality", Icon: IconVitality },
];

/* ── Component ── */

export default function NavBar({ active, onSelect }: NavBarProps) {
  return (
    <nav className="w-full flex justify-center border-b border-[#27272a]">
      <div className="flex items-center gap-1 px-4 py-2">
        {items.map(({ id, label, Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`
                flex flex-col items-center gap-1 px-5 py-2 rounded-sm transition-all duration-150
                ${isActive ? "text-[#e0e0e0]" : "text-[#52525b] hover:text-[#a1a1aa]"}
              `}
              title={label}
            >
              <Icon active={isActive} />
              <span className="text-[10px] font-medium tracking-widest uppercase">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
