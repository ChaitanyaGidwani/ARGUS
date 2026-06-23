import { Briefcase, Palette, LineChart, FlaskConical, Trophy, Coins, GraduationCap, Code2, Users, Sparkles } from "lucide-react";

export type Category = "Engineering" | "Design" | "Business" | "Sciences";
export type OppType = "Hackathon" | "Internship" | "Scholarship" | "Competition" | "Workshop" | "Fellowship";
export type Mode = "Online" | "Offline" | "Hybrid";

export const categories: { name: Category; icon: any; color: string; bg: string; gradient: string }[] = [
  { name: "Engineering", icon: Briefcase, color: "#3B82F6", bg: "rgba(59,130,246,0.12)", gradient: "from-blue-500 to-indigo-500" },
  { name: "Design", icon: Palette, color: "#EC4899", bg: "rgba(236,72,153,0.12)", gradient: "from-pink-500 to-rose-500" },
  { name: "Business", icon: LineChart, color: "#F59E0B", bg: "rgba(245,158,11,0.12)", gradient: "from-amber-400 to-orange-500" },
  { name: "Sciences", icon: FlaskConical, color: "#10B981", bg: "rgba(16,185,129,0.12)", gradient: "from-emerald-400 to-teal-500" },
];

export const categoryMap = Object.fromEntries(categories.map(c => [c.name, c]));

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  category: Category;
  type: OppType;
  mode: Mode;
  deadline: string; // ISO
  prize: string;
  description: string;
  tags: string[];
  eligibility: string;
  branches: string;
}

const now = new Date();
const d = (hours: number) => new Date(now.getTime() + hours * 3600 * 1000).toISOString();

export const opportunities: Opportunity[] = [
  { id: "1", title: "Google SWE Internship 2026", organizer: "Google", category: "Engineering", type: "Internship", mode: "Hybrid", deadline: d(240), prize: "$8,000/mo", description: "12-week summer internship for students pursuing a degree in Computer Science or related fields.", tags: ["Software Engineering", "Python", "C++"], eligibility: "Undergraduate Students", branches: "CS, IT, ECE" },
  { id: "2", title: "Global Design Challenge", organizer: "IDEO", category: "Design", type: "Competition", mode: "Online", deadline: d(72), prize: "$10,000", description: "Solve pressing global issues through human-centered design. Open to teams of up to 4 students.", tags: ["UX Research", "Figma", "Prototyping"], eligibility: "Students & Professionals", branches: "Design, Architecture" },
  { id: "3", title: "Women in STEM Scholarship", organizer: "National Science Foundation", category: "Sciences", type: "Scholarship", mode: "Online", deadline: d(480), prize: "$15,000", description: "Merit-based scholarship for outstanding female students pursuing degrees in STEM fields.", tags: ["STEM", "Research", "Merit"], eligibility: "Female Undergraduates", branches: "All Sciences" },
  { id: "4", title: "Y Combinator Startup School", organizer: "Y Combinator", category: "Business", type: "Workshop", mode: "Online", deadline: d(120), prize: "Mentorship", description: "Learn how to start a company from the world's top startup accelerator.", tags: ["Entrepreneurship", "Pitching", "Growth"], eligibility: "Aspiring Founders", branches: "All" },
  { id: "5", title: "ETHGlobal Singapore 2026", organizer: "ETHGlobal", category: "Engineering", type: "Hackathon", mode: "Offline", deadline: d(18), prize: "$120,000", description: "Build the future of decentralized applications. 36-hour in-person hackathon.", tags: ["Web3", "Blockchain"], eligibility: "Open to all developers", branches: "CS, IT" },
  { id: "6", title: "McKinsey Business Fellowship", organizer: "McKinsey & Company", category: "Business", type: "Fellowship", mode: "Hybrid", deadline: d(720), prize: "$5,000 + Offer", description: "Exclusive fellowship program offering hands-on consulting experience and networking.", tags: ["Consulting", "Strategy"], eligibility: "Pre-final year students", branches: "Business, Economics" },
  { id: "7", title: "AIGA Portfolio Review", organizer: "AIGA", category: "Design", type: "Workshop", mode: "Online", deadline: d(60), prize: "Feedback", description: "Get your portfolio reviewed by industry-leading design directors.", tags: ["Portfolio", "UI/UX", "Graphic Design"], eligibility: "Design Students", branches: "Design, Fine Arts" },
  { id: "8", title: "CERN Summer Student Program", organizer: "CERN", category: "Sciences", type: "Internship", mode: "Offline", deadline: d(96), prize: "Fully Funded", description: "Join CERN in Geneva to work on advanced physics research and experiments.", tags: ["Physics", "Research"], eligibility: "STEM students", branches: "Physics, Engineering" },
  { id: "9", title: "TechCrunch Disrupt Pitch", organizer: "TechCrunch", category: "Business", type: "Competition", mode: "Offline", deadline: d(150), prize: "$50,000", description: "Pitch your startup on the Disrupt stage to top-tier investors.", tags: ["Startup", "Venture Capital"], eligibility: "Early-stage startups", branches: "Any" },
  { id: "10", title: "Apple UI Design Internship", organizer: "Apple", category: "Design", type: "Internship", mode: "Offline", deadline: d(200), prize: "$7,500/mo", description: "Craft intuitive, beautiful user interfaces for next-generation Apple products.", tags: ["iOS", "Interface Design"], eligibility: "Design Undergrads", branches: "Design, HCI" },
];

export const sectionIcons = { Trophy, Coins, GraduationCap, Code2, Users, Sparkles };
