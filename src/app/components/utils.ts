export function timeLeft(iso: string): { text: string; urgency: "critical" | "warning" | "normal"; hours: number } {
  const ms = new Date(iso).getTime() - new Date("2026-06-23T10:00:00").getTime();
  const hours = Math.max(0, Math.floor(ms / 3600000));
  const days = Math.floor(hours / 24);
  const urgency = hours < 24 ? "critical" : hours < 24 * 7 ? "warning" : "normal";
  let text = "";
  if (hours < 24) text = `${hours}h left`;
  else if (days < 14) text = `${days}d left`;
  else text = `${Math.floor(days / 7)}w left`;
  return { text, urgency, hours };
}

export function urgencyColor(u: "critical" | "warning" | "normal") {
  if (u === "critical") return { text: "#EF4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)" };
  if (u === "warning") return { text: "#F59E0B", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" };
  return { text: "#10B981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" };
}
