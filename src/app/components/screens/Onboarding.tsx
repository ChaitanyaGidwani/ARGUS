import { useEffect, useState } from "react";
import { Eye, Check } from "lucide-react";
import { domains, Domain } from "../data";

export function Onboarding({ onContinue }: { onContinue: (selected: Domain[]) => void }) {
  const [selected, setSelected] = useState<Domain[]>([]);
  const [particles, setParticles] = useState<{ x: number; y: number; d: number }[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 4 + 2,
    }));
    setParticles(arr);
  }, []);

  const toggle = (d: Domain) =>
    setSelected(s => s.includes(d) ? s.filter(x => x !== d) : [...s, d]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-[#0A0F1E] dark:to-[#070B17] flex flex-col">
      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/40 dark:bg-cyan-300/60 animate-pulse"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.d}px`, height: `${p.d}px`, animationDuration: `${p.d}s` }}
          />
        ))}
        {/* Constellation gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(124,58,237,0.15),transparent_50%)]" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pt-12 pb-32">
        {/* Argus all-seeing eye logo */}
        <div className="relative w-28 h-28 mb-6">
          {/* Orbiting "100 eyes" — small dots circling */}
          <div className="absolute inset-0" style={{ animation: "spin 14s linear infinite" }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const r = 52;
              return (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}px - 3px)`,
                    top: `calc(50% + ${Math.sin(angle) * r}px - 3px)`,
                    boxShadow: "0 0 8px rgba(245,191,77,0.8)",
                    opacity: i % 2 === 0 ? 0.9 : 0.4,
                  }}
                />
              );
            })}
          </div>
          {/* Concentric rings */}
          <div className="absolute inset-3 rounded-full border-2 border-cyan-400/40" />
          <div className="absolute inset-6 rounded-full border border-violet-400/30" />
          {/* Iris */}
          <div className="absolute inset-9 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.6)]">
            <div className="w-3 h-3 rounded-full bg-slate-900" />
          </div>
          {/* Sweep */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, rgba(245,191,77,0.35) 50deg, transparent 90deg)",
              animation: "spin 4s linear infinite",
            }}
          />
        </div>

        <h1 className="text-4xl font-extrabold text-center mb-1 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-400 bg-clip-text text-transparent">ARGUS</span>
        </h1>
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 dark:text-amber-400 mb-3 font-semibold">The All-Seeing</p>
        <p className="text-base text-slate-700 dark:text-slate-200 mb-2 text-center font-medium">A hundred eyes. Zero missed chances.</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 text-center max-w-xs">Choose your domains — ARGUS will watch them for you</p>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {domains.map(d => {
            const isSel = selected.includes(d.name);
            return (
              <button
                key={d.name}
                onClick={() => toggle(d.name)}
                className="relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center gap-2 backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: isSel ? `linear-gradient(135deg, ${d.color}22, ${d.color}08)` : "rgba(255,255,255,0.6)",
                  borderColor: isSel ? d.color : "rgba(0,0,0,0.06)",
                  boxShadow: isSel ? `0 0 24px ${d.color}55` : undefined,
                }}
              >
                <div className="dark:hidden absolute inset-0 rounded-2xl" style={{ background: isSel ? `linear-gradient(135deg, ${d.color}15, ${d.color}05)` : "rgba(255,255,255,0.7)" }} />
                <div className="hidden dark:block absolute inset-0 rounded-2xl" style={{ background: isSel ? `linear-gradient(135deg, ${d.color}33, ${d.color}11)` : "rgba(255,255,255,0.04)", borderColor: isSel ? d.color : "rgba(255,255,255,0.08)" }} />
                <div className="relative flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: d.bg }}>
                    <d.icon className="w-6 h-6" style={{ color: d.color }} />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{d.name}</span>
                  {isSel && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: d.color }}>
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0A0F1E] dark:via-[#0A0F1E]/80">
        <button
          disabled={selected.length === 0}
          onClick={() => onContinue(selected)}
          className="w-full py-4 rounded-full font-semibold text-slate-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(90deg, #00D4FF, #7C3AED)",
            color: "white",
            boxShadow: selected.length ? "0 8px 32px rgba(0,212,255,0.4)" : undefined,
          }}
        >
          Continue {selected.length > 0 && `(${selected.length})`}
        </button>
      </div>
    </div>
  );
}
