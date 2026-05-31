const FPL_BASE = "https://fantasy.premierleague.com/api";

export type FplElementType = { id: number; singular_name_short: string };
export type FplTeam = { id: number; name: string; short_name: string };
export type FplElement = {
  id: number;
  first_name: string;
  second_name: string;
  web_name: string;
  element_type: number; // 1=GK 2=DEF 3=MID 4=FWD
  team: number;
  now_cost: number; // in 0.1 Mio
  total_points: number;
  status: string;
};

export type FplBootstrap = {
  elements: FplElement[];
  element_types: FplElementType[];
  teams: FplTeam[];
};

export async function fetchBootstrap(): Promise<FplBootstrap> {
  const res = await fetch(`${FPL_BASE}/bootstrap-static/`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("FPL API nicht erreichbar");
  return res.json();
}

export async function fetchGameweekPoints(gw: number): Promise<Map<number, number>> {
  const res = await fetch(`${FPL_BASE}/event/${gw}/live/`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`GW ${gw} Daten nicht verfügbar`);
  const data = await res.json();
  const map = new Map<number, number>();
  for (const el of data.elements) {
    map.set(el.id, el.stats.total_points);
  }
  return map;
}

export function positionFromType(type: number): string {
  return { 1: "GK", 2: "DEF", 3: "MID", 4: "FWD" }[type] ?? "UNK";
}
