import { useState } from "react";
import { Check, Radar } from "lucide-react";
import { categories, Category } from "../data";

export function Onboarding({ onContinue }: { onContinue: (cats: Category[], year: string, branch: string) => void }) {
  const [selected, setSelected] = useState<Category[]>([]);
  const [year, setYear] = useState("2026");
  const [branch, setBranch] = useState("");

  const toggle = (c: Category) =>
    setSelected(s => s.includes(c) ? s.filter(x => x !== c) : [...s, c]);

  const canContinue = selected.length > 0 && branch.trim().length > 0;

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-50 dark:bg-[#070B14] flex flex-col">
      <div className="relative flex-1 flex flex-col items-center justify-start px-6 pt-16 pb-32 overflow-y-auto no-scrollbar">
        
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
          <Radar className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-center mb-2 text-slate-900 dark:text-white tracking-tight">
          Opportunity Radar
        </h1>
        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-8 max-w-[280px]">
          Set up your profile to get a personalised feed of internships, scholarships, and competitions.
        </p>
        
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Graduation Year</label>
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white dark:bg-[#0A0F1E] border border-slate-200 dark:border-white/10 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white shadow-sm"
            >
              {["2024", "2025", "2026", "2027", "2028"].map(y => <option key={y} value={y} className="text-slate-900">{y}</option>)}
            </select>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Major / Branch</label>
            <input
              type="text"
              placeholder="e.g. Computer Science, Design"
              value={branch}
              onChange={e => setBranch(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white dark:bg-[#0A0F1E] border border-slate-200 dark:border-white/10 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white shadow-sm placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">Areas of Interest</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(c => {
                const isSel = selected.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggle(c.name)}
                    className={`relative p-4 rounded-xl flex flex-col items-center justify-center gap-3 transition-all border ${
                      isSel 
                        ? "bg-blue-50 dark:bg-blue-500/10 border-blue-500 shadow-sm" 
                        : "bg-white dark:bg-[#0A0F1E] border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 shadow-sm"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: c.bg }}>
                      <c.icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{c.name}</span>
                    {isSel && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50/90 to-transparent dark:from-[#070B14] dark:via-[#070B14]/90">
        <button
          disabled={!canContinue}
          onClick={() => onContinue(selected, year, branch)}
          className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
        >
          View My Feed
        </button>
      </div>
    </div>
  );
}
