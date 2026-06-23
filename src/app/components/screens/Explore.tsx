import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Inbox } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { domains, opportunities, Domain, OppType, Mode } from "../data";
import { OpportunityCard } from "../OpportunityCard";

export function Explore({ saved, onSave, onOpen }: any) {
  const [q, setQ] = useState("");
  const [type, setType] = useState<OppType | "All">("All");
  const [dom, setDom] = useState<Domain | "All">("All");
  const [mode, setMode] = useState<Mode | "All">("All");
  const [sort, setSort] = useState<"deadline" | "prize">("deadline");

  const results = useMemo(() => {
    return opportunities
      .filter(o => !q || o.title.toLowerCase().includes(q.toLowerCase()) || o.organizer.toLowerCase().includes(q.toLowerCase()))
      .filter(o => type === "All" || o.type === type)
      .filter(o => dom === "All" || o.domain === dom)
      .filter(o => mode === "All" || o.mode === mode)
      .sort((a, b) => sort === "deadline"
        ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        : 0);
  }, [q, type, dom, mode, sort]);

  const types: (OppType | "All")[] = ["All", "Hackathon", "Internship", "Bounty", "Certification", "Workshop", "Open Source"];

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 dark:bg-[#0A0F1E]/80 border-b border-slate-200/50 dark:border-white/5 px-4 py-3 flex flex-col gap-3">
        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.06] border border-slate-200/60 dark:border-white/10">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search opportunities..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400 text-slate-900 dark:text-white"
          />
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <Select value={type} onChange={v => setType(v as any)} options={types} />
          <Select value={dom} onChange={v => setDom(v as any)} options={["All", ...domains.map(d => d.name)]} />
          <Select value={mode} onChange={v => setMode(v as any)} options={["All", "Online", "Offline", "Hybrid"]} />
          <Select value={sort} onChange={v => setSort(v as any)} options={["deadline", "prize"]} prefix="Sort: " />
        </div>
      </div>

      <div className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">{results.length} results</div>

      <div className="px-3">
        {results.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{ 0: 2, 700: 3, 1100: 4 }}>
            <Masonry gutter="12px">
              {results.map(o => (
                <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} variant="grid" />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </div>
  );
}

function Select({ value, onChange, options, prefix }: { value: string; onChange: (v: string) => void; options: string[]; prefix?: string }) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none px-3 py-1.5 pr-7 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
      >
        {options.map(o => <option key={o} value={o}>{(prefix || "") + o}</option>)}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none">▼</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 flex items-center justify-center mb-4">
        <Inbox className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">No opportunities found</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">Try adjusting your filters or search for something else.</p>
    </div>
  );
}
