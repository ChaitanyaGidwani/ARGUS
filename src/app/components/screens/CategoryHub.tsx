import { useState } from "react";
import { ArrowLeft, Users, Globe } from "lucide-react";
import { Category, categoryMap, opportunities, OppType } from "../data";
import { OpportunityCard } from "../OpportunityCard";

interface Props {
  category: Category;
  saved: string[];
  onSave: (id: string) => void;
  onOpen: (id: string) => void;
  onBack: () => void;
}

const oppTypes = ["All", "Hackathons", "Internships", "Scholarships", "Competitions", "Workshops", "Fellowships"] as const;

export function CategoryHub({ category, saved, onSave, onOpen, onBack }: Props) {
  const [cat, setCat] = useState<(typeof oppTypes)[number]>("All");
  const catData = categoryMap[category];

  const filtered = opportunities.filter(o => o.category === category).filter(o => {
    if (cat === "All") return true;
    const map: Record<string, OppType> = { Hackathons: "Hackathon", Internships: "Internship", Scholarships: "Scholarship", Competitions: "Competition", Workshops: "Workshop", Fellowships: "Fellowship" };
    return o.type === map[cat];
  });

  const closingSoon = filtered.filter(o => new Date(o.deadline).getTime() - Date.now() < 24 * 3600 * 1000).length;

  return (
    <div className="pb-24">
      <div className="relative pt-3 pb-8 px-4" style={{ background: `linear-gradient(135deg, ${catData.color}, ${catData.color}55)` }}>
        <button onClick={onBack} className="w-10 h-10 rounded-full backdrop-blur-xl bg-white/30 dark:bg-black/30 flex items-center justify-center mb-4">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
            <catData.icon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">{category}</h1>
            <p className="text-sm text-white/80">Opportunities Hub</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-4 mb-4 grid grid-cols-3 gap-2 relative">
        <Stat label="Active" value={String(filtered.length)} color={catData.color} />
        <Stat label="Closing soon" value={String(closingSoon)} color="#F59E0B" />
        <Stat label="New today" value="3" color="#10B981" />
      </div>

      {/* Categories */}
      <div className="px-4 mb-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {oppTypes.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border"
              style={{
                background: cat === c ? catData.color : "transparent",
                color: cat === c ? "white" : undefined,
                borderColor: cat === c ? "transparent" : "rgba(100,116,139,0.25)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-3">
        {filtered.map(o => (
          <div key={o.id} className="w-full"><OpportunityCard opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} variant="grid" /></div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-slate-500 py-8">No {cat.toLowerCase()} right now</p>
        )}
      </div>

      {/* Quick links */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Top platforms</h3>
        <div className="grid grid-cols-2 gap-2">
          {["LinkedIn", "WayUp", "Handshake", "Fastweb"].map(p => (
            <div key={p} className="rounded-xl p-3 backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 text-sm font-semibold text-slate-800 dark:text-white">
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl p-3 backdrop-blur-xl bg-white/85 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/10">
      <div className="text-lg font-extrabold" style={{ color }}>{value}</div>
      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}
