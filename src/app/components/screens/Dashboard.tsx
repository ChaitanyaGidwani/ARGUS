import { Search, Bell, Radar, AlertCircle, Briefcase, GraduationCap, Trophy } from "lucide-react";
import { categories, Category, opportunities } from "../data";
import { OpportunityCard } from "../OpportunityCard";

interface Props {
  saved: string[];
  onSave: (id: string) => void;
  onOpen: (id: string) => void;
  onOpenHub: (c: Category) => void;
  filter: Category | "All";
  setFilter: (c: Category | "All") => void;
  goExplore: () => void;
}

export function Dashboard({ saved, onSave, onOpen, onOpenHub, filter, setFilter, goExplore }: Props) {
  const filtered = filter === "All" ? opportunities : opportunities.filter(o => o.category === filter);
  const closingSoon = opportunities.filter(o => new Date(o.deadline).getTime() - Date.now() < 24 * 3600 * 1000).length;

  const feed = filtered.slice(0, 4);
  const internships = filtered.filter(o => o.type === "Internship");
  const scholarships = filtered.filter(o => o.type === "Scholarship");
  const competitions = filtered.filter(o => o.type === "Competition");

  return (
    <div className="flex flex-col gap-6 pb-24 bg-slate-50 dark:bg-[#070B14] min-h-screen">
      {/* Top nav */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/80 dark:bg-[#0A0F1E]/90 border-b border-slate-200 dark:border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 shadow-md">
            <Radar className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold tracking-tight text-slate-900 dark:text-white text-lg">Radar</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={goExplore} className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-slate-100 dark:border-[#0A0F1E]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 ml-1 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aarav&backgroundColor=transparent" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="px-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Your Personalised Feed</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Curated opportunities matching your profile.</p>
      </div>

      {/* Deadline Nudges */}
      {closingSoon > 0 && (
        <div className="mx-4 rounded-xl p-4 flex items-center gap-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Deadline Nudge</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">{closingSoon} saved opportunities closing in 24h</p>
          </div>
          <button className="text-xs font-bold text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors">Review</button>
        </div>
      )}

      {/* Category filters */}
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {(["All", ...categories.map(c => c.name)] as (Category | "All")[]).map(c => {
            const isActive = filter === c;
            const cat = c !== "All" ? categories.find(x => x.name === c)! : null;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                  isActive 
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white" 
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-[#0A0F1E] dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/5"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Feed - Vertical */}
      <div className="px-4 space-y-4">
        {feed.map(o => (
          <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} variant="grid" />
        ))}
      </div>

      {/* Horizontal Sections for specific types */}
      <Section title="Internships for You" icon={Briefcase} onSeeAll={goExplore}>
        <Row>
          {internships.map(o => <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} />)}
        </Row>
      </Section>

      <Section title="Scholarships" icon={GraduationCap} onSeeAll={goExplore}>
        <Row>
          {scholarships.map(o => <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} />)}
        </Row>
      </Section>

      <Section title="Upcoming Competitions" icon={Trophy} onSeeAll={goExplore}>
        <Row>
          {competitions.map(o => <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} />)}
        </Row>
      </Section>
    </div>
  );
}

function Section({ title, icon: Icon, children, onSeeAll }: any) {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-2">
          {Icon && <div className="p-1.5 bg-slate-100 dark:bg-white/10 rounded-md"><Icon className="w-4 h-4 text-slate-700 dark:text-slate-300" /></div>}
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
        </div>
        <button onClick={onSeeAll} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">See all</button>
      </div>
      {children}
    </div>
  );
}

function Row({ children }: any) {
  return <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar pb-4">{children}</div>;
}
