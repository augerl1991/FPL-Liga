// Generiert 38-Spieltage H2H-Spielplan für 10 Teams
// 7 Teams werden 4x gespielt, 2 Teams 5x (7*4 + 2*5 = 38)
export function generateSchedule(teamIds: number[]): { gw: number; home: number; away: number }[] {
  if (teamIds.length !== 10) throw new Error("Genau 10 Teams benötigt");

  const matches: { gw: number; home: number; away: number }[] = [];

  // Basis-Rundentabelle für 10 Teams (Round Robin, 9 Spieltage = 1 Runde)
  const rounds = roundRobin(teamIds);

  // 4 volle Runden = 36 Spieltage (9 * 4), dann 2 Extra-Spieltage
  for (let round = 0; round < 4; round++) {
    for (let day = 0; day < rounds.length; day++) {
      const gw = round * 9 + day + 1;
      for (const [home, away] of rounds[day]) {
        // Hin/Rück abwechseln
        if (round % 2 === 0) {
          matches.push({ gw, home, away });
        } else {
          matches.push({ gw, home: away, away: home });
        }
      }
    }
  }

  // 2 Extra-Spieltage (GW 37 und 38): erste 5 Paarungen der Runde
  const extraRounds = roundRobin(teamIds);
  for (let extra = 0; extra < 2; extra++) {
    const gw = 37 + extra;
    for (const [home, away] of extraRounds[extra]) {
      matches.push({ gw, home, away });
    }
  }

  return matches;
}

// Berger-Algorithmus für Round Robin
function roundRobin(teams: number[]): [number, number][][] {
  const n = teams.length;
  const rounds: [number, number][][] = [];
  const list = [...teams];

  for (let round = 0; round < n - 1; round++) {
    const pairs: [number, number][] = [];
    for (let i = 0; i < n / 2; i++) {
      pairs.push([list[i], list[n - 1 - i]]);
    }
    rounds.push(pairs);
    // Rotation: erstes Element fix, Rest rotieren
    list.splice(1, 0, list.pop()!);
  }
  return rounds;
}
