import { Bookmark, MapPin, Wifi, Trophy } from "lucide-react";
import { Opportunity, domainMap } from "./data";
import { timeLeft, urgencyColor } from "./utils";

interface Props {
  opp: Opportunity;
  saved: boolean;
  onSave: (id: string) => void;
  onOpen: (id: string) => void;
  variant?: "featured" | "compact" | "grid";
}

export function OpportunityCard({ opp, saved, onSave, onOpen, variant = "compact" }: Props) {
  const dom = domainMap[opp.domain];
  const tl = timeLeft(opp.deadline);
  const uc = urgencyColor(tl.urgency);

  if (variant === "featured") {
    return (
      <button
        onClick={() => onOpen(opp.id)}
        className="group relative shrink-0 w-[280px] text-left rounded-2xl p-5 backdrop-blur-2xl border border-white/80 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] shadow-[0_8px_30px_-12px_rgba(80,60,180,0.18)] dark:shadow-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-90 dark:opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle at top right, ${dom.color}26, transparent 65%), radial-gradient(circle at bottom left, ${dom.color}14, transparent 60%)` }} />
        <div className="relative flex flex-col gap-3 h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg" style={{ background: dom.bg, color: dom.color }}>
              <dom.icon className="inline w-3 h-3 mr-1" />{opp.domain}
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onSave(opp.id); }}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer inline-flex"
            >
              <Bookmark className="w-4 h-4 transition-all" style={{ color: saved ? "#00D4FF" : undefined, fill: saved ? "#00D4FF" : "transparent", filter: saved ? "drop-shadow(0 0 6px #00D4FF)" : undefined }} />
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{opp.type}</span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">{opp.title}</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">{opp.organizer}</p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ color: uc.text, background: uc.bg }}>⏰ {tl.text}</span>
            <span className="text-sm font-bold" style={{ color: dom.color }}>{opp.prize}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
            {opp.mode === "Online" ? <Wifi className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
            <span>{opp.mode}</span>
          </div>
        </div>
      </button>
    );
  }

  if (variant === "grid") {
    return (
      <button
        onClick={() => onOpen(opp.id)}
        className="group relative w-full text-left rounded-2xl p-4 backdrop-blur-2xl border border-white/80 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] shadow-[0_8px_30px_-12px_rgba(80,60,180,0.18)] dark:shadow-none hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg break-inside-avoid mb-3"
        style={{ borderLeft: `3px solid ${dom.color}` }}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: dom.bg }}>
            <dom.icon className="w-4 h-4" style={{ color: dom.color }} />
          </div>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onSave(opp.id); }}
            className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer inline-flex"
          >
            <Bookmark className="w-4 h-4" style={{ color: saved ? "#00D4FF" : undefined, fill: saved ? "#00D4FF" : "transparent" }} />
          </span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">{opp.title}</h3>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{opp.organizer}</p>
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{opp.description}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ color: uc.text, background: uc.bg }}>{tl.text}</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">{opp.type}</span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs font-semibold" style={{ color: dom.color }}>
          <Trophy className="w-3 h-3" />{opp.prize}
        </div>
      </button>
    );
  }

  // compact
  return (
    <button
      onClick={() => onOpen(opp.id)}
      className="group shrink-0 w-[240px] text-left rounded-2xl p-4 backdrop-blur-2xl border border-white/80 dark:border-white/10 bg-white/85 dark:bg-white/[0.04] shadow-[0_8px_30px_-12px_rgba(80,60,180,0.18)] dark:shadow-none hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ background: dom.bg, color: dom.color }}>{opp.type}</span>
        <Bookmark
          onClick={(e) => { e.stopPropagation(); onSave(opp.id); }}
          className="w-4 h-4 cursor-pointer"
          style={{ color: saved ? "#00D4FF" : undefined, fill: saved ? "#00D4FF" : "transparent" }}
        />
      </div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">{opp.title}</h3>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">{opp.organizer}</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ color: uc.text, background: uc.bg }}>{tl.text}</span>
        <span className="text-xs font-bold" style={{ color: dom.color }}>{opp.prize}</span>
      </div>
    </button>
  );
}
