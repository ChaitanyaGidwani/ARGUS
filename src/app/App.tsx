import { useEffect, useState } from "react";
import { Home, Compass, Bell, User, Sun, Moon, Settings, LogOut, Award, BookmarkCheck } from "lucide-react";
import { Onboarding } from "./components/screens/Onboarding";
import { Dashboard } from "./components/screens/Dashboard";
import { Explore } from "./components/screens/Explore";
import { Detail } from "./components/screens/Detail";
import { Reminders } from "./components/screens/Reminders";
import { CategoryHub } from "./components/screens/CategoryHub";
import { Category, opportunities } from "./components/data";

type Tab = "home" | "explore" | "reminders" | "profile";
type View = { kind: "tab"; tab: Tab } | { kind: "detail"; id: string } | { kind: "hub"; category: Category };

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [profileData, setProfileData] = useState<{ year: string; branch: string }>({ year: "", branch: "" });
  const [view, setView] = useState<View>({ kind: "tab", tab: "home" });
  const [history, setHistory] = useState<View[]>([]);
  const [saved, setSaved] = useState<string[]>(["2", "5"]);
  const [filter, setFilter] = useState<Category | "All">("All");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const push = (v: View) => { setHistory(h => [...h, view]); setView(v); };
  const back = () => {
    if (history.length === 0) setView({ kind: "tab", tab: "home" });
    else { setView(history[history.length - 1]); setHistory(h => h.slice(0, -1)); }
  };

  const onSave = (id: string) =>
    setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const tab = view.kind === "tab" ? view.tab : null;
  const opp = view.kind === "detail" ? opportunities.find(o => o.id === view.id)! : null;

  if (!onboarded) {
    return (
      <Frame dark={dark} setDark={setDark}>
        <Onboarding onContinue={(cats, year, branch) => { setSelectedCategories(cats); setProfileData({ year, branch }); setOnboarded(true); }} />
      </Frame>
    );
  }

  return (
    <Frame dark={dark} setDark={setDark}>
      <div className="h-full overflow-y-auto">
        {view.kind === "detail" && opp && (
          <Detail opp={opp} saved={saved.includes(opp.id)} onSave={onSave} onBack={back} />
        )}
        {view.kind === "hub" && (
          <CategoryHub category={view.category} saved={saved} onSave={onSave} onOpen={(id) => push({ kind: "detail", id })} onBack={back} />
        )}
        {tab === "home" && (
          <Dashboard
            saved={saved}
            onSave={onSave}
            onOpen={(id) => push({ kind: "detail", id })}
            onOpenHub={(c) => push({ kind: "hub", category: c })}
            filter={filter}
            setFilter={setFilter}
            goExplore={() => setView({ kind: "tab", tab: "explore" })}
          />
        )}
        {tab === "explore" && (
          <Explore saved={saved} onSave={onSave} onOpen={(id: string) => push({ kind: "detail", id })} />
        )}
        {tab === "reminders" && (
          <Reminders saved={saved} onOpen={(id) => push({ kind: "detail", id })} />
        )}
        {tab === "profile" && (
          <Profile saved={saved} categories={selectedCategories} profileData={profileData} dark={dark} setDark={setDark} />
        )}
      </div>

      <BottomNav
        active={tab}
        onChange={(t) => { setHistory([]); setView({ kind: "tab", tab: t }); }}
      />
    </Frame>
  );
}

function Frame({ children, dark, setDark }: { children: React.ReactNode; dark: boolean; setDark: (b: boolean) => void }) {
  return (
    <div className={dark ? "dark size-full" : "size-full"}>
      <div className="size-full relative flex items-center justify-center overflow-hidden bg-[#F4F7FE] dark:bg-[#070B17]">
        {/* Ambient outer blobs */}
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-50 dark:opacity-20 bg-[radial-gradient(circle,#7C3AED,transparent_70%)]" />
        <div className="absolute -bottom-32 -right-32 w-[520px] h-[520px] rounded-full blur-3xl opacity-50 dark:opacity-20 bg-[radial-gradient(circle,#00D4FF,transparent_70%)]" />

        <div className="relative w-full max-w-md md:max-w-2xl h-full md:h-[92vh] md:rounded-3xl md:shadow-[0_30px_80px_-20px_rgba(80,60,180,0.35)] dark:md:shadow-[0_30px_80px_-20px_rgba(0,212,255,0.25)] md:my-4 overflow-hidden border-0 md:border md:border-white/60 dark:md:border-white/10">
          {/* Layered light-mode background */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FBFCFF] via-[#F1F5FE] to-[#EEF0FF] dark:from-[#0A0F1E] dark:via-[#0A0F1E] dark:to-[#070B17]" />
          <div className="absolute inset-0 -z-10 opacity-70 dark:opacity-40 bg-[radial-gradient(circle_at_15%_10%,rgba(0,212,255,0.18),transparent_45%),radial-gradient(circle_at_85%_5%,rgba(124,58,237,0.16),transparent_45%),radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.10),transparent_50%)]" />
          {/* Subtle dot grid */}
          <div className="absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.08]" style={{ backgroundImage: "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

          <button
            onClick={() => setDark(!dark)}
            className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-white/80 dark:border-white/10 shadow-lg shadow-violet-500/10 flex items-center justify-center hover:scale-105 transition"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-violet-600" />}
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active, onChange }: { active: Tab | null; onChange: (t: Tab) => void }) {
  const items: { tab: Tab; icon: any; label: string }[] = [
    { tab: "home", icon: Home, label: "Home" },
    { tab: "explore", icon: Compass, label: "Explore" },
    { tab: "reminders", icon: Bell, label: "Alerts" },
    { tab: "profile", icon: User, label: "Profile" },
  ];
  return (
    <div className="absolute bottom-0 inset-x-0 backdrop-blur-2xl bg-white/75 dark:bg-[#0A0F1E]/85 border-t border-white/80 dark:border-white/5 shadow-[0_-12px_30px_-12px_rgba(80,60,180,0.18)] dark:shadow-none px-2 py-2 pb-3 z-30">
      <div className="flex items-center justify-around">
        {items.map(i => {
          const isActive = active === i.tab;
          return (
            <button
              key={i.tab}
              onClick={() => onChange(i.tab)}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all"
            >
              <i.icon className="w-5 h-5" style={{ color: isActive ? "#00D4FF" : undefined, filter: isActive ? "drop-shadow(0 0 6px rgba(0,212,255,0.5))" : undefined }} />
              <span className="text-[10px] font-medium" style={{ color: isActive ? "#00D4FF" : undefined }}>{i.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Profile({ saved, categories, profileData, dark, setDark }: { saved: string[]; categories: Category[]; profileData: { year: string; branch: string }; dark: boolean; setDark: (b: boolean) => void }) {
  return (
    <div className="pb-24">
      <div className="px-4 pt-6 pb-4">
        <div className="rounded-3xl p-5 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 bg-gradient-to-br from-cyan-400/10 to-violet-500/10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-white text-xl font-extrabold">A</div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Aarav Sharma</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Class of {profileData.year || "2026"} • {profileData.branch || "CS"}</p>
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {categories.slice(0, 3).map(c => (
                  <span key={c} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-200">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 grid grid-cols-3 gap-2 mb-4">
        <ProfileStat label="Saved" value={saved.length} icon={BookmarkCheck} color="#00D4FF" />
        <ProfileStat label="Applied" value={3} icon={Award} color="#7C3AED" />
        <ProfileStat label="Won" value={1} icon={Award} color="#F59E0B" />
      </div>

      <div className="px-4">
        <div className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl divide-y divide-slate-200/60 dark:divide-white/10">
          <ProfileRow icon={dark ? Sun : Moon} label={dark ? "Light mode" : "Dark mode"} onClick={() => setDark(!dark)} />
          <ProfileRow icon={Settings} label="Settings" />
          <ProfileRow icon={LogOut} label="Sign out" danger />
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="rounded-2xl p-3 backdrop-blur-xl bg-white/70 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/10 flex flex-col items-center">
      <Icon className="w-4 h-4 mb-1" style={{ color }} />
      <div className="text-lg font-extrabold text-slate-900 dark:text-white">{value}</div>
      <div className="text-[10px] text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function ProfileRow({ icon: Icon, label, onClick, danger }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-slate-50 dark:hover:bg-white/[0.02]">
      <Icon className="w-4 h-4" style={{ color: danger ? "#EF4444" : undefined }} />
      <span className="flex-1 text-sm font-medium" style={{ color: danger ? "#EF4444" : undefined }}>{label}</span>
      <span className="text-slate-400">›</span>
    </button>
  );
}
