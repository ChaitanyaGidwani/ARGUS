import { useState } from "react";
import { AlertTriangle, ChevronRight, Bell, Mail, Smartphone } from "lucide-react";
import { opportunities, categoryMap } from "../data";
import { timeLeft, urgencyColor } from "../utils";

export function Reminders({ saved, onOpen }: { saved: string[]; onOpen: (id: string) => void }) {
  const [tab, setTab] = useState<"Upcoming" | "Pending" | "Saved">("Upcoming");

  const upcoming = [...opportunities].sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).slice(0, 6);
  const pending = opportunities.slice(2, 4);
  const savedList = opportunities.filter(o => saved.includes(o.id));

  return (
    <div className="pb-24">
      <div className="px-4 pt-5 pb-3">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">👁 The Watchtower</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Reminders & deadlines ARGUS is guarding for you</p>
      </div>

      <div className="mx-4 mb-4 p-1 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex">
        {(["Upcoming", "Pending", "Saved"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${tab === t ? "bg-white dark:bg-white/10 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
          >
            {t === "Pending" ? "Pending Forms" : t}
          </button>
        ))}
      </div>

      {tab === "Upcoming" && (
        <div className="px-4 space-y-3">
          {upcoming.map(o => {
            const tl = timeLeft(o.deadline);
            const uc = urgencyColor(tl.urgency);
            const cat = categoryMap[o.category];
            return (
              <div key={o.id} className="flex items-stretch gap-3 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 overflow-hidden">
                <div className="w-1.5 shrink-0" style={{ background: uc.text }} />
                <div className="flex-1 py-3 pr-3 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: cat.bg, color: cat.color }}>{o.type}</span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: uc.bg, color: uc.text }}>{tl.text}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">{o.title}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{o.organizer}</p>
                </div>
                <button onClick={() => onOpen(o.id)} className="px-3 flex items-center gap-1 text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                  View <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {tab === "Pending" && (
        <div className="px-4 space-y-3">
          {pending.map(o => (
            <div key={o.id} className="rounded-2xl p-4 border border-amber-300/60 dark:border-amber-500/30" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Incomplete</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{o.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">You started this application but didn't complete it.</p>
              <button onClick={() => onOpen(o.id)} className="px-4 py-2 rounded-lg bg-amber-500 text-white text-xs font-semibold">Continue Applying</button>
            </div>
          ))}
        </div>
      )}

      {tab === "Saved" && (
        <div className="px-4 space-y-3">
          {savedList.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-500 dark:text-slate-400">No saved opportunities yet</p>
            </div>
          ) : savedList.map(o => {
            const tl = timeLeft(o.deadline);
            const cat = categoryMap[o.category];
            return (
              <button key={o.id} onClick={() => onOpen(o.id)} className="w-full flex items-center gap-3 p-3 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-left">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: cat.bg }}>
                  <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{o.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{tl.text} • {o.prize}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Notification preferences */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Notify me via</h3>
        <div className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl divide-y divide-slate-200/60 dark:divide-white/10">
          <Toggle icon={Bell} label="Push notifications" defaultOn />
          <Toggle icon={Mail} label="Email digests" defaultOn />
          <Toggle icon={Smartphone} label="SMS for 24h deadlines" />
        </div>
      </div>
    </div>
  );
}

function Toggle({ icon: Icon, label, defaultOn }: any) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-center gap-3 p-3">
      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      <span className="flex-1 text-sm text-slate-800 dark:text-slate-100">{label}</span>
      <button onClick={() => setOn(!on)} className="w-10 h-6 rounded-full transition-all p-0.5" style={{ background: on ? "linear-gradient(90deg, #00D4FF, #7C3AED)" : "#CBD5E1" }}>
        <div className="w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: on ? "translateX(16px)" : "translateX(0)" }} />
      </button>
    </div>
  );
}
