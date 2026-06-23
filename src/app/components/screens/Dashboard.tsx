import { Search, Bell, Eye, AlertCircle, Coins, GraduationCap, Flame } from "lucide-react";
import { domains, Domain, opportunities } from "../data";
import { OpportunityCard } from "../OpportunityCard";

interface Props {
  saved: string[];
  onSave: (id: string) => void;
  onOpen: (id: string) => void;
  onOpenHub: (d: Domain) => void;
  filter: Domain | "All";
  setFilter: (d: Domain | "All") => void;
  goExplore: () => void;
}

export function Dashboard({ saved, onSave, onOpen, onOpenHub, filter, setFilter, goExplore }: Props) {
  const filtered = filter === "All" ? opportunities : opportunities.filter(o => o.domain === filter);
  const closingSoon = opportunities.filter(o => new Date(o.deadline).getTime() - Date.now() < 24 * 3600 * 1000).length;

  const featured = filtered.slice(0, 5);
  const hackathons = filtered.filter(o => o.type === "Hackathon");
  const bounties = filtered.filter(o => o.type === "Bounty");
  const certs = opportunities.filter(o => o.type === "Certification" || o.type === "Workshop");

  return (
    <div className="flex flex-col gap-5 pb-24">
      {/* Top nav */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/60 dark:bg-[#0A0F1E]/80 border-b border-white/60 dark:border-white/5 shadow-sm shadow-violet-500/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-400 via-violet-500 to-amber-400 shadow-[0_0_14px_rgba(0,212,255,0.45)]">
            <Eye className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-extrabold tracking-tight bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-400 bg-clip-text text-transparent">ARGUS</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={goExplore} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10">
            <Search className="w-5 h-5 text-slate-700 dark:text-slate-200" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 relative">
            <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-white dark:ring-[#0A0F1E]" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 flex items-center justify-center text-white text-sm font-bold ml-1">A</div>
        </div>
      </div>

      <div className="px-4">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-slate-900 dark:text-white">Good morning, </span>
          <span className="bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Aarav</span>
          <span className="text-slate-900 dark:text-white"> 👋</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">A hundred eyes are watching — here's what they saw today.</p>
      </div>

      {/* Domain pills */}
      <div className="px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {(["All", ...domains.map(d => d.name)] as (Domain | "All")[]).map(d => {
            const isActive = filter === d;
            const dom = d !== "All" ? domains.find(x => x.name === d)! : null;
            return (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border"
                style={{
                  background: isActive ? (dom?.color || "#0F172A") : "transparent",
                  color: isActive ? "white" : undefined,
                  borderColor: isActive ? "transparent" : "rgba(100,116,139,0.25)",
                }}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Deadline strip */}
      {closingSoon > 0 && (
        <div className="mx-4 rounded-2xl p-4 flex items-center gap-3 border border-amber-300/70 dark:border-amber-500/30 shadow-lg shadow-amber-500/10 dark:shadow-none" style={{ background: "linear-gradient(90deg, rgba(239,68,68,0.18), rgba(245,158,11,0.22))" }}>
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{closingSoon} opportunities closing in 24h</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Don't miss out — apply now</p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">23:14:08</span>
        </div>
      )}

      {/* Featured */}
      <Section title="✨ Featured" onSeeAll={goExplore}>
        <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">
          {featured.map(o => (
            <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} variant="featured" />
          ))}
        </div>
      </Section>

      <Section title="🔥 Trending Hackathons" icon={Flame} onSeeAll={goExplore}>
        <Row>
          {hackathons.map(o => <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} />)}
        </Row>
      </Section>

      <Section title="💰 Top Bounties" icon={Coins} onSeeAll={goExplore}>
        <Row>
          {bounties.map(o => <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} />)}
        </Row>
      </Section>

      <Section title="📚 Certifications & Workshops" icon={GraduationCap} onSeeAll={goExplore}>
        <Row>
          {certs.map(o => <OpportunityCard key={o.id} opp={o} saved={saved.includes(o.id)} onSave={onSave} onOpen={onOpen} />)}
        </Row>
      </Section>

      {/* Domain quick links */}
      <div className="px-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-3">Browse by domain</h2>
        <div className="grid grid-cols-2 gap-2">
          {domains.map(d => (
            <button key={d.name} onClick={() => onOpenHub(d.name)} className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl flex items-center gap-2 hover:-translate-y-0.5 transition-all">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: d.bg }}>
                <d.icon className="w-4 h-4" style={{ color: d.color }} />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{d.name}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Explore hub →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children, onSeeAll }: any) {
  return (
    <div>
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-slate-700 dark:text-slate-200" />}
          <h2 className="text-base font-bold text-slate-900 dark:text-white">{title}</h2>
        </div>
        <button onClick={onSeeAll} className="text-xs font-medium text-cyan-600 dark:text-cyan-400">See all</button>
      </div>
      {children}
    </div>
  );
}

function Row({ children }: any) {
  return <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-2">{children}</div>;
}
