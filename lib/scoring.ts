/**
 * Rechnet FPL-Punkte in Tore um.
 *
 * Regel:
 *   < 38 Punkte  → 0 Tore
 *   38 Punkte    → 1 Tor
 *   +9 je Tor    → 47 = 2, 56 = 3, 65 = 4, ...
 */
export function pointsToGoals(points: number): number {
  if (points < 38) return 0;
  return 1 + Math.floor((points - 38) / 9);
}

/** Umgekehrt: Mindestpunkte für N Tore */
export function goalsToMinPoints(goals: number): number {
  if (goals === 0) return 0;
  return 38 + (goals - 1) * 9;
}

/** Punkte bis zum nächsten Tor */
export function pointsToNextGoal(points: number): number {
  if (points < 38) return 38 - points;
  return 9 - ((points - 38) % 9);
}
