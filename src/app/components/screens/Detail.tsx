import { useState } from "react";
import { ArrowLeft, Bookmark, Bell, ExternalLink, Calendar, MapPin, Trophy, GraduationCap, Layers, Cpu, ChevronDown, Check } from "lucide-react";
import { Opportunity, categoryMap } from "../data";
import { timeLeft, urgencyColor } from "../utils";

interface Props {
  opp: Opportunity;
  saved: boolean;
  onSave: (id: string) => void;
  onBack: () => void;
}

export function Detail({ opp, saved, onSave, onBack }: Props) {
  const cat = categoryMap[opp.category];
  const tl = timeLeft(opp.deadline);
  const uc = urgencyColor(tl.urgency);
  const [expand, setExpand] = useState(false);
  const [status, setStatus] = useState(0);

  const steps = ["Not Applied", "Applied", "Result Awaited", "Result"];

  return (
    <div className="pb-24">
      {/* Hero */}
      <div className="relative h-56 overflow-hidden" style={{ background: `linear-gradient(135deg, ${cat.color}, ${cat.color}66)` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0A0F1E]" />
        <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 80% 20%, white, transparent 50%)" }} />

        <div className="relative px-4 pt-4 flex items-center justify-between">
          <button onClick={onBack} className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/30 dark:bg-black/30 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button onClick={() => onSave(opp.id)} className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/30 dark:bg-black/30 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-white" style={{ fill: saved ? "white" : "transparent" }} />
          </button>
        </div>

        <div className="absolute bottom-6 left-4 right-4">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-xl text-white px-2.5 py-1 rounded-md mb-2">
            <cat.icon className="w-3 h-3" /> {opp.type}
          </span>
          <h1 className="text-2xl font-extrabold text-white leading-tight">{opp.title}</h1>
        </div>
      </div>

      <div className="px-4 -mt-2 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center text-sm font-bold text-slate-700 dark:text-white">
            {opp.organizer[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{opp.organizer}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Organizer</p>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <InfoChip icon={Calendar} label="Deadline" value={tl.text} color={uc.text} />
          <InfoChip icon={MapPin} label="Mode" value={opp.mode} />
          <InfoChip icon={Trophy} label="Prize" value={opp.prize} color={cat.color} />
          <InfoChip icon={GraduationCap} label="Eligibility" value={opp.eligibility} />
          <InfoChip icon={Layers} label="Category" value={opp.category} color={cat.color} />
          <InfoChip icon={Cpu} label="Branches" value={opp.branches} />
        </div>

        {/* Description */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">About</h3>
        <p className={`text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${expand ? "" : "line-clamp-3"}`}>
          {opp.description} {opp.description} {opp.description}
        </p>
        <button onClick={() => setExpand(!expand)} className="text-xs font-medium text-cyan-600 dark:text-cyan-400 mt-1 flex items-center gap-1">
          {expand ? "Show less" : "Read more"} <ChevronDown className={`w-3 h-3 transition-transform ${expand ? "rotate-180" : ""}`} />
        </button>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
          {opp.tags.map(t => (
            <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200">#{t}</span>
          ))}
        </div>

        {/* Status tracker */}
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Application status</h3>
        <div className="relative mb-6">
          <div className="absolute top-3 left-3 right-3 h-0.5 bg-slate-200 dark:bg-white/10" />
          <div className="absolute top-3 left-3 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all" style={{ width: `${(status / (steps.length - 1)) * 90}%` }} />
          <div className="relative flex justify-between">
            {steps.map((s, i) => (
              <button key={s} onClick={() => setStatus(i)} className="flex flex-col items-center gap-1.5 w-16">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{
                  background: i <= status ? "linear-gradient(135deg, #00D4FF, #7C3AED)" : "var(--step-bg, #E2E8F0)",
                }}>
                  {i <= status ? <Check className="w-3 h-3 text-white" strokeWidth={3} /> : <span className="text-[10px] text-slate-500">{i + 1}</span>}
                </div>
                <span className="text-[10px] text-center text-slate-600 dark:text-slate-400 leading-tight">{s}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky action bar */}
      <div className="fixed bottom-16 inset-x-0 px-4 py-3 backdrop-blur-xl bg-white/85 dark:bg-[#0A0F1E]/85 border-t border-slate-200/50 dark:border-white/5 z-10">
        <div className="flex gap-2 max-w-md mx-auto">
          <button onClick={() => setStatus(Math.min(status + 1, steps.length - 1))} className="flex-1 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2" style={{ background: "linear-gradient(90deg, #00D4FF, #7C3AED)", boxShadow: "0 4px 16px rgba(0,212,255,0.4)" }}>
            <ExternalLink className="w-4 h-4" /> Register
          </button>
          <button onClick={() => onSave(opp.id)} className="px-4 py-3 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-white">
            <Bookmark className="w-4 h-4" style={{ fill: saved ? "#00D4FF" : "transparent", color: saved ? "#00D4FF" : undefined }} />
          </button>
          <button className="px-4 py-3 rounded-xl text-slate-700 dark:text-white">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value, color }: any) {
  return (
    <div className="rounded-xl p-3 backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3 h-3 text-slate-500 dark:text-slate-400" />
        <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">{label}</span>
      </div>
      <p className="text-sm font-semibold" style={{ color: color || undefined }}>
        {!color && <span className="text-slate-900 dark:text-white">{value}</span>}
        {color && value}
      </p>
    </div>
  );
}
