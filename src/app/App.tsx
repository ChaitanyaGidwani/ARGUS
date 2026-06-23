import { useEffect, useState } from "react";
import { Home, Compass, Bell, User, Sun, Moon, Settings, LogOut, Award, BookmarkCheck, Radar } from "lucide-react";
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
      <div className={dark ? "dark w-full min-h-screen" : "w-full min-h-screen"}>
        <div className="w-full min-h-screen bg-slate-50 dark:bg-[#070B14]">
          <Onboarding onContinue={(cats, year, branch) => { setSelectedCategories(cats); setProfileData({ year, branch }); setOnboarded(true); }} />
        </div>
      </div>
    );
  }

  return (
    <div className={dark ? "dark w-full h-screen overflow-hidden" : "w-full h-screen overflow-hidden"}>
      <div className="w-full h-full flex flex-col md:flex-row bg-slate-50 dark:bg-[#070B14] text-slate-900 dark:text-white">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-[#0A0F1E]/50 backdrop-blur-xl shrink-0">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-600 shadow-md shrink-0">
              <Radar className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold tracking-tight text-xl">Radar</span>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <NavItem active={tab === "home"} icon={Home} label="Home" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "home" }); }} />
            <NavItem active={tab === "explore"} icon={Compass} label="Explore" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "explore" }); }} />
            <NavItem active={tab === "reminders"} icon={Bell} label="Alerts" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "reminders" }); }} />
            <NavItem active={tab === "profile"} icon={User} label="Profile" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "profile" }); }} />
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {dark ? <Sun className="w-5 h-5 text-slate-400" /> : <Moon className="w-5 h-5 text-slate-500" />}
              <span className="font-medium text-sm text-slate-600 dark:text-slate-300">{dark ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 h-full overflow-y-auto relative pb-20 md:pb-0">
          <div className="w-full max-w-5xl mx-auto">
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
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden absolute bottom-0 w-full z-50 border-t border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0A0F1E]/90 backdrop-blur-xl px-2 py-2 pb-safe">
          <div className="flex items-center justify-around">
            <MobileNavItem active={tab === "home"} icon={Home} label="Home" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "home" }); }} />
            <MobileNavItem active={tab === "explore"} icon={Compass} label="Explore" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "explore" }); }} />
            <MobileNavItem active={tab === "reminders"} icon={Bell} label="Alerts" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "reminders" }); }} />
            <MobileNavItem active={tab === "profile"} icon={User} label="Profile" onClick={() => { setHistory([]); setView({ kind: "tab", tab: "profile" }); }} />
          </div>
        </nav>
      </div>
    </div>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
        active 
          ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function MobileNavItem({ active, icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
        active ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? "fill-blue-600/20 dark:fill-blue-400/20" : ""}`} />
      <span className={`text-[10px] ${active ? "font-bold" : "font-medium"}`}>{label}</span>
    </button>
  );
}

function Profile({ saved, categories, profileData, dark, setDark }: { saved: string[]; categories: Category[]; profileData: { year: string; branch: string }; dark: boolean; setDark: (b: boolean) => void }) {
  return (
    <div className="pb-24 pt-6">
      <div className="px-4 pb-6">
        <div className="rounded-2xl p-6 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-md overflow-hidden shrink-0">
               <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aarav" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Aarav Sharma</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Class of {profileData.year || "2026"} • {profileData.branch || "CS"}</p>
              <div className="flex gap-2 flex-wrap">
                {categories.map(c => (
                  <span key={c} className="text-[11px] font-semibold px-2 py-1 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 grid grid-cols-3 gap-3 mb-6">
        <ProfileStat label="Saved" value={saved.length} icon={BookmarkCheck} color="#3B82F6" />
        <ProfileStat label="Applied" value={3} icon={Award} color="#8B5CF6" />
        <ProfileStat label="Won" value={1} icon={Award} color="#F59E0B" />
      </div>

      <div className="px-4 md:hidden">
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm divide-y divide-slate-100 dark:divide-white/10 overflow-hidden">
          <ProfileRow icon={dark ? Sun : Moon} label={dark ? "Light mode" : "Dark mode"} onClick={() => setDark(!dark)} />
        </div>
      </div>
      
      <div className="px-4 mt-4 md:mt-0">
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 shadow-sm divide-y divide-slate-100 dark:divide-white/10 overflow-hidden">
          <ProfileRow icon={Settings} label="Settings" />
          <ProfileRow icon={LogOut} label="Sign out" danger />
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="rounded-2xl p-4 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center shadow-sm">
      <Icon className="w-5 h-5 mb-2" style={{ color }} />
      <div className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">{value}</div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function ProfileRow({ icon: Icon, label, onClick, danger }: any) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
      <Icon className="w-5 h-5" style={{ color: danger ? "#EF4444" : undefined }} />
      <span className="flex-1 text-sm font-semibold" style={{ color: danger ? "#EF4444" : undefined }}>{label}</span>
    </button>
  );
}
