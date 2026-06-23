import { Link2, Brain, Cog, Cloud, Trophy, Coins, GraduationCap, Code2, Users, Sparkles } from "lucide-react";

export type Domain = "Blockchain" | "AI/ML" | "DevOps" | "Cloud";
export type OppType = "Hackathon" | "Internship" | "Bounty" | "Certification" | "Workshop" | "Open Source";
export type Mode = "Online" | "Offline" | "Hybrid";

export const domains: { name: Domain; icon: any; color: string; bg: string; gradient: string }[] = [
  { name: "Blockchain", icon: Link2, color: "#00D4FF", bg: "rgba(0,212,255,0.12)", gradient: "from-cyan-400 to-teal-500" },
  { name: "AI/ML", icon: Brain, color: "#7C3AED", bg: "rgba(124,58,237,0.12)", gradient: "from-violet-500 to-fuchsia-500" },
  { name: "DevOps", icon: Cog, color: "#3B82F6", bg: "rgba(59,130,246,0.12)", gradient: "from-blue-500 to-indigo-500" },
  { name: "Cloud", icon: Cloud, color: "#06B6D4", bg: "rgba(6,182,212,0.12)", gradient: "from-sky-400 to-cyan-500" },
];

export const domainMap = Object.fromEntries(domains.map(d => [d.name, d]));

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  domain: Domain;
  type: OppType;
  mode: Mode;
  deadline: string; // ISO
  prize: string;
  description: string;
  tags: string[];
  eligibility: string;
  branches: string;
}

const now = new Date("2026-06-23T10:00:00");
const d = (hours: number) => new Date(now.getTime() + hours * 3600 * 1000).toISOString();

export const opportunities: Opportunity[] = [
  { id: "1", title: "ETHGlobal Singapore 2026", organizer: "ETHGlobal", domain: "Blockchain", type: "Hackathon", mode: "Offline", deadline: d(18), prize: "$120,000", description: "Build the future of decentralized applications. 36-hour in-person hackathon with mentors from leading protocols.", tags: ["Solidity", "Web3", "DeFi"], eligibility: "Open to all developers", branches: "CS, IT, ECE" },
  { id: "2", title: "Google Gemini AI Challenge", organizer: "Google DeepMind", domain: "AI/ML", type: "Hackathon", mode: "Online", deadline: d(72), prize: "$50,000", description: "Build innovative apps using the Gemini API. Multiple tracks for productivity, creativity, and accessibility.", tags: ["LLM", "Gemini", "Python"], eligibility: "Students & professionals", branches: "Any" },
  { id: "3", title: "AWS Cloud Quest Bounty", organizer: "Amazon Web Services", domain: "Cloud", type: "Bounty", mode: "Online", deadline: d(20), prize: "$2,500", description: "Solve real-world cloud architecture problems and earn bounties for verified solutions.", tags: ["AWS", "Architecture"], eligibility: "AWS certified preferred", branches: "Any" },
  { id: "4", title: "Kubernetes Contributor Summit", organizer: "CNCF", domain: "DevOps", type: "Open Source", mode: "Hybrid", deadline: d(120), prize: "Swag + Travel", description: "Contribute to Kubernetes core and get mentorship from maintainers during the summit.", tags: ["K8s", "Go", "Open Source"], eligibility: "Familiar with Go", branches: "CS, IT" },
  { id: "5", title: "Solana Builder Internship", organizer: "Solana Foundation", domain: "Blockchain", type: "Internship", mode: "Online", deadline: d(240), prize: "$3,000/mo", description: "12-week paid internship building tools and dApps on Solana. Remote, flexible hours.", tags: ["Rust", "Solana"], eligibility: "Junior+ students", branches: "CS, IT" },
  { id: "6", title: "AWS Solutions Architect Cert", organizer: "Amazon", domain: "Cloud", type: "Certification", mode: "Online", deadline: d(720), prize: "Free voucher", description: "Free AWS SAA-C03 certification voucher for top performers in the prep program.", tags: ["AWS", "Certification"], eligibility: "Any student", branches: "Any" },
  { id: "7", title: "Hugging Face Open LLM Bounty", organizer: "Hugging Face", domain: "AI/ML", type: "Bounty", mode: "Online", deadline: d(60), prize: "$5,000", description: "Submit fine-tuned models for specific benchmarks. Top 5 entries split the bounty.", tags: ["Transformers", "PyTorch"], eligibility: "ML practitioners", branches: "Any" },
  { id: "8", title: "GitOps Workshop Series", organizer: "ArgoCD Team", domain: "DevOps", type: "Workshop", mode: "Online", deadline: d(96), prize: "Certificate", description: "Free 4-week hands-on workshop on GitOps with ArgoCD and Flux.", tags: ["GitOps", "K8s"], eligibility: "DevOps beginners+", branches: "Any" },
  { id: "9", title: "Polygon zkEVM Bounty", organizer: "Polygon Labs", domain: "Blockchain", type: "Bounty", mode: "Online", deadline: d(150), prize: "$10,000", description: "Develop zk-circuits for specific use cases on Polygon zkEVM.", tags: ["ZK", "Solidity"], eligibility: "Cryptography knowledge", branches: "CS" },
  { id: "10", title: "NVIDIA AI Summer Camp", organizer: "NVIDIA", domain: "AI/ML", type: "Workshop", mode: "Hybrid", deadline: d(200), prize: "Free GPU credits", description: "2-week intensive on CUDA, deep learning, and generative AI.", tags: ["CUDA", "DL"], eligibility: "Undergrads+", branches: "CS, IT, ECE" },
];

export const sectionIcons = { Trophy, Coins, GraduationCap, Code2, Users, Sparkles };
