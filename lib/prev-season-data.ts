// Auto-generiert aus Fantasy-Premier-League_Tabelle_2025.08.18.xlsx

export type HistoricMatch = {
  home: string;
  away: string;
  hs: number | null;
  as: number | null;
};

export type HistoricGW = { gw: number; matches: HistoricMatch[] };

/** @deprecated Verwende SEASONS stattdessen */
export const PREV_SEASON_NAME = "Saison 2025/26";

export const PREV_SEASON: HistoricGW[] = [
  { gw: 1, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 3, as: 3 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 3, as: 4 },
    { home: "Galactik Football", away: "Reinildojul", hs: 4, as: 0 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 2, as: 2 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 1, as: 3 }
  ]},
  { gw: 2, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 6, as: 3 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 4, as: 1 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 0, as: 4 },
    { home: "Augerl FC", away: "Reinildojul", hs: 1, as: 0 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 3, as: 1 }
  ]},
  { gw: 3, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 1, as: 2 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 0, as: 3 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 0, as: 3 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 5, as: 2 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 2, as: 1 }
  ]},
  { gw: 4, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 0, as: 4 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 2 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 4, as: 4 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 5, as: 0 }
  ]},
  { gw: 5, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 3, as: 1 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 1, as: 0 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 2, as: 2 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 1, as: 3 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 2, as: 3 }
  ]},
  { gw: 6, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 1 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 2, as: 0 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 2, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 0, as: 3 }
  ]},
  { gw: 7, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 4, as: 1 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 7, as: 3 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 0, as: 2 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 1, as: 3 }
  ]},
  { gw: 8, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 4, as: 0 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 2, as: 4 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 0, as: 2 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 2, as: 3 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 1, as: 3 }
  ]},
  { gw: 9, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 3, as: 2 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 1, as: 2 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 1, as: 4 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 4, as: 3 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 0, as: 0 }
  ]},
  { gw: 10, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 2, as: 5 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 0, as: 3 },
    { home: "Galactik Football", away: "Reinildojul", hs: 3, as: 3 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 0, as: 5 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 3, as: 2 }
  ]},
  { gw: 11, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 3, as: 1 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "Augerl FC", away: "Reinildojul", hs: 1, as: 2 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 1, as: 3 }
  ]},
  { gw: 12, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 5 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 1, as: 0 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 5, as: 3 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 0, as: 5 }
  ]},
  { gw: 13, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 4, as: 0 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 2, as: 1 }
  ]},
  { gw: 14, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 2, as: 3 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 1, as: 6 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 2, as: 4 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 1, as: 1 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 1, as: 4 }
  ]},
  { gw: 15, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 2 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 1, as: 4 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 4, as: 3 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 4, as: 2 }
  ]},
  { gw: 16, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 4, as: 0 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 4, as: 0 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 5, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 1, as: 3 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 0, as: 4 }
  ]},
  { gw: 17, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 2, as: 0 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 3, as: 5 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 4, as: 3 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 1, as: 4 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 1, as: 3 }
  ]},
  { gw: 18, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 1, as: 1 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 6, as: 0 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 3, as: 0 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 2, as: 2 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 0, as: 2 }
  ]},
  { gw: 19, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 1, as: 2 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 2, as: 2 },
    { home: "Galactik Football", away: "Reinildojul", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 0, as: 6 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 3, as: 3 }
  ]},
  { gw: 20, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 6, as: 2 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 3, as: 0 },
    { home: "Augerl FC", away: "Reinildojul", hs: 2, as: 2 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 3, as: 0 }
  ]},
  { gw: 21, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 2, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 0, as: 3 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 0, as: 5 }
  ]},
  { gw: 22, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 3, as: 3 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 1 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 2, as: 1 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 1, as: 1 }
  ]},
  { gw: 23, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 1, as: 5 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 4, as: 3 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 0, as: 2 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 1, as: 2 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 3, as: 1 }
  ]},
  { gw: 24, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 1 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 1, as: 3 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 2, as: 1 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 3, as: 4 }
  ]},
  { gw: 25, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 1, as: 3 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 1, as: 3 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 3, as: 1 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 7, as: 0 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 3, as: 3 }
  ]},
  { gw: 26, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 1, as: 5 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 4, as: 2 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 0, as: 0 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 2, as: 3 }
  ]},
  { gw: 27, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 2, as: 1 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 2, as: 1 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 3, as: 5 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 3, as: 3 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 1, as: 3 }
  ]},
  { gw: 28, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 3, as: 0 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 1, as: 4 },
    { home: "Galactik Football", away: "Reinildojul", hs: 1, as: 1 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 0, as: 2 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 4, as: 2 }
  ]},
  { gw: 29, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 5, as: 0 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 3, as: 0 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 0, as: 5 },
    { home: "Augerl FC", away: "Reinildojul", hs: 2, as: 0 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 8, as: 4 }
  ]},
  { gw: 30, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 3, as: 3 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 1, as: 0 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 4, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 4, as: 1 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 0, as: 3 }
  ]},
  { gw: 31, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 1, as: 2 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 3, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 3 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 0, as: 0 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 0, as: 6 }
  ]},
  { gw: 32, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 4, as: 1 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 0, as: 2 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 7, as: 2 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 0, as: 3 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 5, as: 1 }
  ]},
  { gw: 33, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 0 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 3, as: 8 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 0, as: 1 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 4, as: 0 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 4, as: 2 }
  ]},
  { gw: 34, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 2, as: 0 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 1, as: 1 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 7, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 1, as: 0 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 5, as: 2 }
  ]},
  { gw: 35, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 4, as: 3 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 6, as: 0 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 0, as: 0 }
  ]},
  { gw: 36, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 1, as: 4 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 3, as: 3 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 0, as: 0 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 4, as: 3 }
  ]},
  { gw: 37, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Reinildojul", hs: 3, as: 1 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 1, as: 2 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 3, as: 2 }
  ]},
  { gw: 38, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 1, as: 0 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 1, as: 1 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 0, as: 0 },
    { home: "Augerl FC", away: "Reinildojul", hs: 5, as: 0 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 0, as: 2 }
  ]},
];

// ── Gewinnertafel ──────────────────────────────────────────────────────────
// image: Pfad relativ zu /public, z.B. "/images/pokal/2025-26.jpg"
export type SeasonWinner = { season: string; winner: string; image?: string };

export const SEASON_WINNERS: SeasonWinner[] = [
  { season: "2014/15", winner: "–" },
  { season: "2015/16", winner: "–" },
  { season: "2016/17", winner: "Jul", image: "/images/pokal/2016-17.jpg" },
  { season: "2017/18", winner: "Felix", image: "/images/pokal/2017-18.jpg" },
  { season: "2018/19", winner: "SK AK47", image: "/images/pokal/2018-19.jpg" },
  { season: "2019/20", winner: "McAugerl", image: "/images/pokal/2019-20.jpg" },
  { season: "2020/21", winner: "Jonjinho United", image: "/images/pokal/2020-21.jpg" },
  { season: "2021/22", winner: "Galactik Football", image: "/images/pokal/2021-22.jpg" },
  { season: "2022/23", winner: "FC Elfmeterwappler", image: "/images/pokal/2022-23.jpg" },
  { season: "2023/24", winner: "Kein Coufal C.F.", image: "/images/pokal/2023-24.jpg" },
  { season: "2024/25", winner: "1 FC DIXX (Crepi)", image: "/images/pokal/2024-25.jpg" },
  { season: "2025/26", winner: "Augerl FC (Felix)", image: "/images/pokal/2025-26.jpg" },
];

// ── Alle Liga-Saisonen ────────────────────────────────────────────────────
export type Season = { label: string; data: HistoricGW[] };

export const SEASONS: Season[] = [
  { label: "2014/15", data: [] },
  { label: "2015/16", data: [] },
  { label: "2016/17", data: [
  { gw: 1, matches: [
    { home: "Enzi", away: "Michi", hs: 0, as: 0 },
    { home: "Jul", away: "Imi", hs: 1, as: 2 },
    { home: "Sebi", away: "Mimi", hs: 3, as: 0 },
    { home: "Felix", away: "Jakob", hs: 0, as: 1 },
    { home: "Gerhard", away: "Max", hs: 0, as: 2 }
  ]},
  { gw: 2, matches: [
    { home: "Enzi", away: "Sebi", hs: 0, as: 3 },
    { home: "Jul", away: "Michi", hs: 1, as: 1 },
    { home: "Felix", away: "Imi", hs: 1, as: 2 },
    { home: "Gerhard", away: "Mimi", hs: 2, as: 5 },
    { home: "Jakob", away: "Max", hs: 1, as: 1 }
  ]},
  { gw: 3, matches: [
    { home: "Enzi", away: "Gerhard", hs: 3, as: 0 },
    { home: "Jul", away: "Felix", hs: 3, as: 2 },
    { home: "Sebi", away: "Michi", hs: 3, as: 2 },
    { home: "Max", away: "Imi", hs: 0, as: 1 },
    { home: "Mimi", away: "Jakob", hs: 0, as: 3 }
  ]},
  { gw: 4, matches: [
    { home: "Enzi", away: "Jakob", hs: 0, as: 1 },
    { home: "Jul", away: "Max", hs: 1, as: 0 },
    { home: "Sebi", away: "Gerhard", hs: 4, as: 2 },
    { home: "Felix", away: "Michi", hs: 5, as: 1 },
    { home: "Mimi", away: "Imi", hs: 1, as: 2 }
  ]},
  { gw: 5, matches: [
    { home: "Enzi", away: "Imi", hs: 1, as: 5 },
    { home: "Jul", away: "Mimi", hs: 5, as: 1 },
    { home: "Sebi", away: "Jakob", hs: 2, as: 3 },
    { home: "Felix", away: "Max", hs: 4, as: 2 },
    { home: "Gerhard", away: "Michi", hs: 0, as: 0 }
  ]},
  { gw: 6, matches: [
    { home: "Enzi", away: "Jul", hs: 2, as: 3 },
    { home: "Sebi", away: "Imi", hs: 1, as: 4 },
    { home: "Felix", away: "Mimi", hs: 0, as: 0 },
    { home: "Gerhard", away: "Jakob", hs: 4, as: 4 },
    { home: "Max", away: "Michi", hs: 3, as: 0 }
  ]},
  { gw: 7, matches: [
    { home: "Enzi", away: "Felix", hs: 0, as: 2 },
    { home: "Jul", away: "Sebi", hs: 3, as: 4 },
    { home: "Gerhard", away: "Imi", hs: 2, as: 2 },
    { home: "Max", away: "Mimi", hs: 2, as: 1 },
    { home: "Jakob", away: "Michi", hs: 2, as: 2 }
  ]},
  { gw: 8, matches: [
    { home: "Enzi", away: "Max", hs: 3, as: 1 },
    { home: "Jul", away: "Gerhard", hs: 3, as: 2 },
    { home: "Sebi", away: "Felix", hs: 1, as: 1 },
    { home: "Jakob", away: "Imi", hs: 5, as: 4 },
    { home: "Mimi", away: "Michi", hs: 0, as: 4 }
  ]},
  { gw: 9, matches: [
    { home: "Enzi", away: "Mimi", hs: 3, as: 1 },
    { home: "Jul", away: "Jakob", hs: 1, as: 0 },
    { home: "Sebi", away: "Max", hs: 3, as: 2 },
    { home: "Felix", away: "Gerhard", hs: 1, as: 2 },
    { home: "Michi", away: "Imi", hs: 6, as: 0 }
  ]},
  { gw: 10, matches: [
    { home: "Enzi", away: "Michi", hs: 1, as: 3 },
    { home: "Jul", away: "Imi", hs: 2, as: 3 },
    { home: "Sebi", away: "Mimi", hs: 3, as: 1 },
    { home: "Felix", away: "Jakob", hs: 4, as: 2 },
    { home: "Gerhard", away: "Max", hs: 1, as: 3 }
  ]},
  { gw: 11, matches: [
    { home: "Enzi", away: "Sebi", hs: 2, as: 6 },
    { home: "Jul", away: "Michi", hs: 2, as: 1 },
    { home: "Felix", away: "Imi", hs: 0, as: 2 },
    { home: "Gerhard", away: "Mimi", hs: 0, as: 2 },
    { home: "Jakob", away: "Max", hs: 1, as: 1 }
  ]},
  { gw: 12, matches: [
    { home: "Enzi", away: "Gerhard", hs: 0, as: 1 },
    { home: "Jul", away: "Felix", hs: 4, as: 0 },
    { home: "Sebi", away: "Michi", hs: 4, as: 1 },
    { home: "Max", away: "Imi", hs: 2, as: 1 },
    { home: "Mimi", away: "Jakob", hs: 2, as: 1 }
  ]},
  { gw: 13, matches: [
    { home: "Enzi", away: "Jakob", hs: 3, as: 2 },
    { home: "Jul", away: "Max", hs: 4, as: 0 },
    { home: "Sebi", away: "Gerhard", hs: 0, as: 3 },
    { home: "Felix", away: "Michi", hs: 1, as: 2 },
    { home: "Mimi", away: "Imi", hs: 1, as: 2 }
  ]},
  { gw: 14, matches: [
    { home: "Enzi", away: "Imi", hs: 1, as: 0 },
    { home: "Jul", away: "Mimi", hs: 3, as: 3 },
    { home: "Sebi", away: "Jakob", hs: 3, as: 6 },
    { home: "Felix", away: "Max", hs: 1, as: 0 },
    { home: "Gerhard", away: "Michi", hs: 2, as: 1 }
  ]},
  { gw: 15, matches: [
    { home: "Enzi", away: "Jul", hs: 3, as: 5 },
    { home: "Sebi", away: "Imi", hs: 1, as: 2 },
    { home: "Felix", away: "Mimi", hs: 2, as: 0 },
    { home: "Gerhard", away: "Jakob", hs: 3, as: 0 },
    { home: "Max", away: "Michi", hs: 0, as: 2 }
  ]},
  { gw: 16, matches: [
    { home: "Enzi", away: "Felix", hs: 1, as: 1 },
    { home: "Jul", away: "Sebi", hs: 3, as: 3 },
    { home: "Gerhard", away: "Imi", hs: 4, as: 2 },
    { home: "Max", away: "Mimi", hs: 6, as: 4 },
    { home: "Jakob", away: "Michi", hs: 2, as: 0 }
  ]},
  { gw: 17, matches: [
    { home: "Enzi", away: "Max", hs: 0, as: 2 },
    { home: "Jul", away: "Gerhard", hs: 2, as: 1 },
    { home: "Sebi", away: "Felix", hs: 2, as: 0 },
    { home: "Jakob", away: "Imi", hs: 4, as: 2 },
    { home: "Mimi", away: "Michi", hs: 3, as: 1 }
  ]},
  { gw: 18, matches: [
    { home: "Enzi", away: "Mimi", hs: 2, as: 3 },
    { home: "Jul", away: "Jakob", hs: 4, as: 2 },
    { home: "Sebi", away: "Max", hs: 3, as: 0 },
    { home: "Felix", away: "Gerhard", hs: 2, as: 3 },
    { home: "Michi", away: "Imi", hs: 3, as: 2 }
  ]},
  { gw: 19, matches: [
    { home: "Enzi", away: "Michi", hs: 1, as: 2 },
    { home: "Jul", away: "Imi", hs: 4, as: 0 },
    { home: "Sebi", away: "Mimi", hs: 3, as: 1 },
    { home: "Felix", away: "Jakob", hs: 1, as: 3 },
    { home: "Gerhard", away: "Max", hs: 0, as: 3 }
  ]},
  { gw: 20, matches: [
    { home: "Enzi", away: "Sebi", hs: 0, as: 1 },
    { home: "Jul", away: "Michi", hs: 1, as: 2 },
    { home: "Felix", away: "Imi", hs: 2, as: 0 },
    { home: "Gerhard", away: "Mimi", hs: 4, as: 2 },
    { home: "Jakob", away: "Max", hs: 3, as: 0 }
  ]},
  { gw: 21, matches: [
    { home: "Enzi", away: "Gerhard", hs: 0, as: 1 },
    { home: "Jul", away: "Felix", hs: 5, as: 1 },
    { home: "Sebi", away: "Michi", hs: 4, as: 4 },
    { home: "Max", away: "Imi", hs: 2, as: 2 },
    { home: "Mimi", away: "Jakob", hs: 2, as: 2 }
  ]},
  { gw: 22, matches: [
    { home: "Enzi", away: "Jakob", hs: 2, as: 2 },
    { home: "Jul", away: "Max", hs: 2, as: 0 },
    { home: "Sebi", away: "Gerhard", hs: 1, as: 3 },
    { home: "Felix", away: "Michi", hs: 2, as: 2 },
    { home: "Mimi", away: "Imi", hs: 0, as: 4 }
  ]},
  { gw: 23, matches: [
    { home: "Enzi", away: "Imi", hs: 2, as: 1 },
    { home: "Jul", away: "Mimi", hs: 1, as: 0 },
    { home: "Sebi", away: "Jakob", hs: 1, as: 0 },
    { home: "Felix", away: "Max", hs: 1, as: 2 },
    { home: "Gerhard", away: "Michi", hs: 3, as: 1 }
  ]},
  { gw: 24, matches: [
    { home: "Enzi", away: "Jul", hs: 1, as: 1 },
    { home: "Sebi", away: "Imi", hs: 3, as: 1 },
    { home: "Felix", away: "Mimi", hs: 8, as: 1 },
    { home: "Gerhard", away: "Jakob", hs: 5, as: 0 },
    { home: "Max", away: "Michi", hs: 0, as: 0 }
  ]},
  { gw: 25, matches: [
    { home: "Enzi", away: "Felix", hs: 4, as: 0 },
    { home: "Jul", away: "Sebi", hs: 4, as: 2 },
    { home: "Gerhard", away: "Imi", hs: 3, as: 1 },
    { home: "Max", away: "Mimi", hs: 1, as: 2 },
    { home: "Jakob", away: "Michi", hs: 6, as: 2 }
  ]},
  { gw: 26, matches: [
    { home: "Enzi", away: "Max", hs: 4, as: 3 },
    { home: "Jul", away: "Gerhard", hs: 4, as: 3 },
    { home: "Sebi", away: "Felix", hs: 3, as: 4 },
    { home: "Jakob", away: "Imi", hs: 3, as: 0 },
    { home: "Mimi", away: "Michi", hs: 0, as: 3 }
  ]},
  { gw: 27, matches: [
    { home: "Enzi", away: "Mimi", hs: 5, as: 2 },
    { home: "Jul", away: "Jakob", hs: 4, as: 3 },
    { home: "Sebi", away: "Max", hs: 3, as: 2 },
    { home: "Felix", away: "Gerhard", hs: 2, as: 1 },
    { home: "Michi", away: "Imi", hs: 3, as: 5 }
  ]},
  { gw: 28, matches: [
    { home: "Enzi", away: "Michi", hs: 1, as: 0 },
    { home: "Jul", away: "Imi", hs: 3, as: 0 },
    { home: "Sebi", away: "Mimi", hs: 0, as: 0 },
    { home: "Felix", away: "Jakob", hs: 0, as: 0 },
    { home: "Gerhard", away: "Max", hs: 3, as: 0 }
  ]},
  { gw: 29, matches: [
    { home: "Enzi", away: "Sebi", hs: 1, as: 0 },
    { home: "Jul", away: "Michi", hs: 0, as: 0 },
    { home: "Felix", away: "Imi", hs: 5, as: 1 },
    { home: "Gerhard", away: "Mimi", hs: 0, as: 0 },
    { home: "Jakob", away: "Max", hs: 4, as: 2 }
  ]},
  { gw: 30, matches: [
    { home: "Enzi", away: "Gerhard", hs: 2, as: 2 },
    { home: "Jul", away: "Felix", hs: 2, as: 2 },
    { home: "Sebi", away: "Michi", hs: 0, as: 1 },
    { home: "Max", away: "Imi", hs: 3, as: 2 },
    { home: "Mimi", away: "Jakob", hs: 0, as: 2 }
  ]},
  { gw: 31, matches: [
    { home: "Enzi", away: "Jakob", hs: 3, as: 3 },
    { home: "Jul", away: "Max", hs: 1, as: 4 },
    { home: "Sebi", away: "Gerhard", hs: 2, as: 2 },
    { home: "Felix", away: "Michi", hs: 0, as: 3 },
    { home: "Mimi", away: "Imi", hs: 1, as: 2 }
  ]},
  { gw: 32, matches: [
    { home: "Enzi", away: "Imi", hs: 0, as: 3 },
    { home: "Jul", away: "Mimi", hs: 3, as: 2 },
    { home: "Sebi", away: "Jakob", hs: 1, as: 2 },
    { home: "Felix", away: "Max", hs: 2, as: 3 },
    { home: "Gerhard", away: "Michi", hs: 3, as: 4 }
  ]},
  { gw: 33, matches: [
    { home: "Enzi", away: "Jul", hs: 1, as: 2 },
    { home: "Sebi", away: "Imi", hs: 1, as: 3 },
    { home: "Felix", away: "Mimi", hs: 2, as: 0 },
    { home: "Gerhard", away: "Jakob", hs: 1, as: 2 },
    { home: "Max", away: "Michi", hs: 2, as: 3 }
  ]},
  { gw: 34, matches: [
    { home: "Enzi", away: "Felix", hs: 1, as: 0 },
    { home: "Jul", away: "Sebi", hs: 8, as: 0 },
    { home: "Gerhard", away: "Imi", hs: 0, as: 0 },
    { home: "Max", away: "Mimi", hs: 0, as: 0 },
    { home: "Jakob", away: "Michi", hs: 0, as: 0 }
  ]},
  { gw: 35, matches: [
    { home: "Enzi", away: "Max", hs: 1, as: 1 },
    { home: "Jul", away: "Gerhard", hs: 3, as: 3 },
    { home: "Sebi", away: "Felix", hs: 0, as: 4 },
    { home: "Jakob", away: "Imi", hs: 3, as: 3 },
    { home: "Mimi", away: "Michi", hs: 0, as: 3 }
  ]},
  { gw: 36, matches: [
    { home: "Enzi", away: "Mimi", hs: 4, as: 0 },
    { home: "Jul", away: "Jakob", hs: 3, as: 0 },
    { home: "Sebi", away: "Max", hs: 0, as: 2 },
    { home: "Felix", away: "Gerhard", hs: 2, as: 0 },
    { home: "Michi", away: "Imi", hs: 1, as: 5 }
  ]},
  { gw: 37, matches: [
    { home: "Enzi", away: "Michi", hs: 0, as: 5 },
    { home: "Jul", away: "Imi", hs: 1, as: 0 },
    { home: "Sebi", away: "Mimi", hs: 0, as: 0 },
    { home: "Felix", away: "Jakob", hs: 2, as: 0 },
    { home: "Gerhard", away: "Max", hs: 4, as: 0 }
  ]},
  { gw: 38, matches: [
    { home: "Enzi", away: "Sebi", hs: 0, as: 0 },
    { home: "Jul", away: "Michi", hs: 0, as: 0 },
    { home: "Felix", away: "Imi", hs: 0, as: 0 },
    { home: "Gerhard", away: "Mimi", hs: 0, as: 0 },
    { home: "Jakob", away: "Max", hs: 0, as: 0 }
  ]},
  ]},
  { label: "2017/18", data: [
  { gw: 1, matches: [
    { home: "Imi", away: "Enzi", hs: 4, as: 4 },
    { home: "Max", away: "Sebi", hs: 1, as: 5 },
    { home: "Michi", away: "Felix", hs: 3, as: 3 },
    { home: "Jul", away: "Mimi", hs: 3, as: 3 },
    { home: "Jakob", away: "Gerhard", hs: 3, as: 3 }
  ]},
  { gw: 2, matches: [
    { home: "Imi", away: "Michi", hs: 3, as: 3 },
    { home: "Max", away: "Enzi", hs: 4, as: 0 },
    { home: "Jul", away: "Sebi", hs: 3, as: 5 },
    { home: "Jakob", away: "Felix", hs: 4, as: 2 },
    { home: "Mimi", away: "Gerhard", hs: 3, as: 0 }
  ]},
  { gw: 3, matches: [
    { home: "Imi", away: "Jakob", hs: 1, as: 1 },
    { home: "Max", away: "Jul", hs: 2, as: 6 },
    { home: "Michi", away: "Enzi", hs: 2, as: 1 },
    { home: "Gerhard", away: "Sebi", hs: 1, as: 3 },
    { home: "Felix", away: "Mimi", hs: 4, as: 3 }
  ]},
  { gw: 4, matches: [
    { home: "Imi", away: "Mimi", hs: 3, as: 4 },
    { home: "Max", away: "Gerhard", hs: 1, as: 5 },
    { home: "Michi", away: "Jakob", hs: 3, as: 0 },
    { home: "Jul", away: "Enzi", hs: 0, as: 2 },
    { home: "Felix", away: "Sebi", hs: 7, as: 2 }
  ]},
  { gw: 5, matches: [
    { home: "Imi", away: "Sebi", hs: 9, as: 3 },
    { home: "Max", away: "Felix", hs: 4, as: 3 },
    { home: "Michi", away: "Mimi", hs: 3, as: 4 },
    { home: "Jul", away: "Gerhard", hs: 1, as: 1 },
    { home: "Jakob", away: "Enzi", hs: 2, as: 4 }
  ]},
  { gw: 6, matches: [
    { home: "Imi", away: "Max", hs: 4, as: 3 },
    { home: "Michi", away: "Sebi", hs: 5, as: 3 },
    { home: "Jul", away: "Felix", hs: 3, as: 5 },
    { home: "Jakob", away: "Mimi", hs: 1, as: 4 },
    { home: "Gerhard", away: "Enzi", hs: 7, as: 2 }
  ]},
  { gw: 7, matches: [
    { home: "Imi", away: "Jul", hs: 2, as: 2 },
    { home: "Max", away: "Michi", hs: 4, as: 3 },
    { home: "Jakob", away: "Sebi", hs: 1, as: 2 },
    { home: "Gerhard", away: "Felix", hs: 8, as: 4 },
    { home: "Mimi", away: "Enzi", hs: 2, as: 2 }
  ]},
  { gw: 8, matches: [
    { home: "Imi", away: "Gerhard", hs: 2, as: 1 },
    { home: "Max", away: "Jakob", hs: 1, as: 1 },
    { home: "Michi", away: "Jul", hs: 2, as: 7 },
    { home: "Mimi", away: "Sebi", hs: 1, as: 2 },
    { home: "Felix", away: "Enzi", hs: 7, as: 0 }
  ]},
  { gw: 9, matches: [
    { home: "Imi", away: "Felix", hs: 4, as: 2 },
    { home: "Max", away: "Mimi", hs: 5, as: 4 },
    { home: "Michi", away: "Gerhard", hs: 4, as: 3 },
    { home: "Jul", away: "Jakob", hs: 3, as: 3 },
    { home: "Enzi", away: "Sebi", hs: 2, as: 3 }
  ]},
  { gw: 10, matches: [
    { home: "Imi", away: "Enzi", hs: 0, as: 5 },
    { home: "Max", away: "Sebi", hs: 2, as: 7 },
    { home: "Michi", away: "Felix", hs: 2, as: 1 },
    { home: "Jul", away: "Mimi", hs: 1, as: 1 },
    { home: "Jakob", away: "Gerhard", hs: 2, as: 3 }
  ]},
  { gw: 11, matches: [
    { home: "Imi", away: "Michi", hs: 2, as: 1 },
    { home: "Max", away: "Enzi", hs: 4, as: 2 },
    { home: "Jul", away: "Sebi", hs: 2, as: 0 },
    { home: "Jakob", away: "Felix", hs: 1, as: 6 },
    { home: "Mimi", away: "Gerhard", hs: 1, as: 3 }
  ]},
  { gw: 12, matches: [
    { home: "Imi", away: "Jakob", hs: 0, as: 3 },
    { home: "Max", away: "Jul", hs: 3, as: 3 },
    { home: "Michi", away: "Enzi", hs: 3, as: 0 },
    { home: "Gerhard", away: "Sebi", hs: 6, as: 6 },
    { home: "Felix", away: "Mimi", hs: 5, as: 2 }
  ]},
  { gw: 13, matches: [
    { home: "Imi", away: "Mimi", hs: 3, as: 0 },
    { home: "Max", away: "Gerhard", hs: 1, as: 4 },
    { home: "Michi", away: "Jakob", hs: 7, as: 3 },
    { home: "Jul", away: "Enzi", hs: 2, as: 2 },
    { home: "Felix", away: "Sebi", hs: 2, as: 1 }
  ]},
  { gw: 14, matches: [
    { home: "Imi", away: "Sebi", hs: 2, as: 1 },
    { home: "Max", away: "Felix", hs: 3, as: 5 },
    { home: "Michi", away: "Mimi", hs: 5, as: 3 },
    { home: "Jul", away: "Gerhard", hs: 7, as: 2 },
    { home: "Jakob", away: "Enzi", hs: 1, as: 4 }
  ]},
  { gw: 15, matches: [
    { home: "Imi", away: "Max", hs: 2, as: 2 },
    { home: "Michi", away: "Sebi", hs: 1, as: 6 },
    { home: "Jul", away: "Felix", hs: 2, as: 1 },
    { home: "Jakob", away: "Mimi", hs: 0, as: 1 },
    { home: "Gerhard", away: "Enzi", hs: 5, as: 0 }
  ]},
  { gw: 16, matches: [
    { home: "Imi", away: "Jul", hs: 0, as: 7 },
    { home: "Max", away: "Michi", hs: 5, as: 0 },
    { home: "Jakob", away: "Sebi", hs: 6, as: 0 },
    { home: "Gerhard", away: "Felix", hs: 3, as: 5 },
    { home: "Mimi", away: "Enzi", hs: 0, as: 2 }
  ]},
  { gw: 17, matches: [
    { home: "Imi", away: "Gerhard", hs: 3, as: 3 },
    { home: "Max", away: "Jakob", hs: 1, as: 1 },
    { home: "Michi", away: "Jul", hs: 6, as: 5 },
    { home: "Mimi", away: "Sebi", hs: 2, as: 4 },
    { home: "Felix", away: "Enzi", hs: 2, as: 2 }
  ]},
  { gw: 18, matches: [
    { home: "Imi", away: "Felix", hs: 3, as: 4 },
    { home: "Max", away: "Mimi", hs: 1, as: 2 },
    { home: "Michi", away: "Gerhard", hs: 3, as: 4 },
    { home: "Jul", away: "Jakob", hs: 4, as: 0 },
    { home: "Enzi", away: "Sebi", hs: 3, as: 7 }
  ]},
  { gw: 19, matches: [
    { home: "Imi", away: "Enzi", hs: 5, as: 4 },
    { home: "Max", away: "Sebi", hs: 2, as: 4 },
    { home: "Michi", away: "Felix", hs: 5, as: 0 },
    { home: "Jul", away: "Mimi", hs: 0, as: 1 },
    { home: "Jakob", away: "Gerhard", hs: 0, as: 5 }
  ]},
  { gw: 20, matches: [
    { home: "Imi", away: "Michi", hs: 3, as: 6 },
    { home: "Max", away: "Enzi", hs: 3, as: 2 },
    { home: "Jul", away: "Sebi", hs: 2, as: 4 },
    { home: "Jakob", away: "Felix", hs: 0, as: 4 },
    { home: "Mimi", away: "Gerhard", hs: 1, as: 9 }
  ]},
  { gw: 21, matches: [
    { home: "Imi", away: "Jakob", hs: 1, as: 1 },
    { home: "Max", away: "Jul", hs: 4, as: 1 },
    { home: "Michi", away: "Enzi", hs: 3, as: 3 },
    { home: "Gerhard", away: "Sebi", hs: 2, as: 3 },
    { home: "Felix", away: "Mimi", hs: 4, as: 0 }
  ]},
  { gw: 22, matches: [
    { home: "Imi", away: "Mimi", hs: 3, as: 2 },
    { home: "Max", away: "Gerhard", hs: 2, as: 2 },
    { home: "Michi", away: "Jakob", hs: 6, as: 2 },
    { home: "Jul", away: "Enzi", hs: 4, as: 2 },
    { home: "Felix", away: "Sebi", hs: 1, as: 3 }
  ]},
  { gw: 23, matches: [
    { home: "Imi", away: "Sebi", hs: 6, as: 5 },
    { home: "Max", away: "Felix", hs: 4, as: 5 },
    { home: "Michi", away: "Mimi", hs: 1, as: 4 },
    { home: "Jul", away: "Gerhard", hs: 1, as: 9 },
    { home: "Jakob", away: "Enzi", hs: 0, as: 6 }
  ]},
  { gw: 24, matches: [
    { home: "Imi", away: "Max", hs: 9, as: 0 },
    { home: "Michi", away: "Sebi", hs: 3, as: 8 },
    { home: "Jul", away: "Felix", hs: 4, as: 1 },
    { home: "Jakob", away: "Mimi", hs: 1, as: 0 },
    { home: "Gerhard", away: "Enzi", hs: 4, as: 2 }
  ]},
  { gw: 25, matches: [
    { home: "Imi", away: "Jul", hs: 1, as: 0 },
    { home: "Max", away: "Michi", hs: 5, as: 3 },
    { home: "Jakob", away: "Sebi", hs: 4, as: 2 },
    { home: "Gerhard", away: "Felix", hs: 4, as: 7 },
    { home: "Mimi", away: "Enzi", hs: 0, as: 1 }
  ]},
  { gw: 26, matches: [
    { home: "Imi", away: "Gerhard", hs: 4, as: 3 },
    { home: "Max", away: "Jakob", hs: 4, as: 0 },
    { home: "Michi", away: "Jul", hs: 3, as: 0 },
    { home: "Mimi", away: "Sebi", hs: 1, as: 3 },
    { home: "Felix", away: "Enzi", hs: 0, as: 5 }
  ]},
  { gw: 27, matches: [
    { home: "Imi", away: "Felix", hs: 8, as: 2 },
    { home: "Max", away: "Mimi", hs: 6, as: 0 },
    { home: "Michi", away: "Gerhard", hs: 2, as: 2 },
    { home: "Jul", away: "Jakob", hs: 2, as: 3 },
    { home: "Enzi", away: "Sebi", hs: 4, as: 5 }
  ]},
  { gw: 28, matches: [
    { home: "Imi", away: "Enzi", hs: 2, as: 0 },
    { home: "Max", away: "Sebi", hs: 5, as: 6 },
    { home: "Michi", away: "Felix", hs: 0, as: 3 },
    { home: "Jul", away: "Mimi", hs: 2, as: 0 },
    { home: "Jakob", away: "Gerhard", hs: 5, as: 4 }
  ]},
  { gw: 29, matches: [
    { home: "Imi", away: "Michi", hs: 2, as: 1 },
    { home: "Max", away: "Enzi", hs: 4, as: 3 },
    { home: "Jul", away: "Sebi", hs: 5, as: 5 },
    { home: "Jakob", away: "Felix", hs: 1, as: 5 },
    { home: "Mimi", away: "Gerhard", hs: 4, as: 1 }
  ]},
  { gw: 30, matches: [
    { home: "Imi", away: "Jakob", hs: 0, as: 4 },
    { home: "Max", away: "Jul", hs: 3, as: 3 },
    { home: "Michi", away: "Enzi", hs: 4, as: 1 },
    { home: "Gerhard", away: "Sebi", hs: 3, as: 1 },
    { home: "Felix", away: "Mimi", hs: 6, as: 9 }
  ]},
  { gw: 31, matches: [
    { home: "Imi", away: "Mimi", hs: 7, as: 2 },
    { home: "Max", away: "Gerhard", hs: 7, as: 3 },
    { home: "Michi", away: "Jakob", hs: 3, as: 2 },
    { home: "Jul", away: "Enzi", hs: 1, as: 5 },
    { home: "Felix", away: "Sebi", hs: 4, as: 3 }
  ]},
  { gw: 32, matches: [
    { home: "Imi", away: "Sebi", hs: 3, as: 4 },
    { home: "Max", away: "Felix", hs: 1, as: 4 },
    { home: "Michi", away: "Mimi", hs: 7, as: 5 },
    { home: "Jul", away: "Gerhard", hs: 0, as: 3 },
    { home: "Jakob", away: "Enzi", hs: 1, as: 5 }
  ]},
  { gw: 33, matches: [
    { home: "Imi", away: "Max", hs: 1, as: 0 },
    { home: "Michi", away: "Sebi", hs: 2, as: 0 },
    { home: "Jul", away: "Felix", hs: 1, as: 2 },
    { home: "Jakob", away: "Mimi", hs: 1, as: 5 },
    { home: "Gerhard", away: "Enzi", hs: 1, as: 4 }
  ]},
  { gw: 34, matches: [
    { home: "Imi", away: "Jul", hs: 1, as: 0 },
    { home: "Max", away: "Michi", hs: 2, as: 2 },
    { home: "Jakob", away: "Sebi", hs: 2, as: 3 },
    { home: "Gerhard", away: "Felix", hs: 1, as: 4 },
    { home: "Mimi", away: "Enzi", hs: 3, as: 4 }
  ]},
  { gw: 35, matches: [
    { home: "Imi", away: "Gerhard", hs: 2, as: 3 },
    { home: "Max", away: "Jakob", hs: 0, as: 1 },
    { home: "Michi", away: "Jul", hs: 6, as: 3 },
    { home: "Mimi", away: "Sebi", hs: 3, as: 6 },
    { home: "Felix", away: "Enzi", hs: 4, as: 1 }
  ]},
  { gw: 36, matches: [
    { home: "Imi", away: "Felix", hs: 0, as: 4 },
    { home: "Max", away: "Mimi", hs: 3, as: 5 },
    { home: "Michi", away: "Gerhard", hs: 3, as: 3 },
    { home: "Jul", away: "Jakob", hs: 3, as: 2 },
    { home: "Enzi", away: "Sebi", hs: 3, as: 3 }
  ]},
  { gw: 37, matches: [
    { home: "Imi", away: "Enzi", hs: 0, as: 4 },
    { home: "Max", away: "Sebi", hs: 0, as: 1 },
    { home: "Michi", away: "Felix", hs: 0, as: 3 },
    { home: "Jul", away: "Mimi", hs: 0, as: 4 },
    { home: "Jakob", away: "Gerhard", hs: 0, as: 0 }
  ]},
  { gw: 38, matches: [
    { home: "Imi", away: "Michi", hs: 0, as: 1 },
    { home: "Max", away: "Enzi", hs: 4, as: 6 },
    { home: "Jul", away: "Sebi", hs: 0, as: 0 },
    { home: "Jakob", away: "Felix", hs: 0, as: 3 },
    { home: "Mimi", away: "Gerhard", hs: 0, as: 7 }
  ]},
  ]},
  { label: "2018/19", data: [
  { gw: 1, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 4, as: 2 },
    { home: "SK AK47", away: "Augerl FC", hs: 4, as: 2 },
    { home: "FC Kreuzbandriss", away: "FC G-Hat", hs: 3, as: 5 },
    { home: "Hood Squad St.Peter", away: "FC Reinhard", hs: 2, as: 4 },
    { home: "SS Knockdhard", away: "FC Kuppenkaskauer", hs: 4, as: 5 }
  ]},
  { gw: 2, matches: [
    { home: "FC Handkantenschlag", away: "FC Kreuzbandriss", hs: 1, as: 1 },
    { home: "SK AK47", away: "St.Peter Rattlesnakes", hs: 6, as: 1 },
    { home: "Hood Squad St.Peter", away: "Augerl FC", hs: 6, as: 4 },
    { home: "SS Knockdhard", away: "FC G-Hat", hs: 4, as: 2 },
    { home: "FC Reinhard", away: "FC Kuppenkaskauer", hs: 2, as: 3 }
  ]},
  { gw: 3, matches: [
    { home: "FC Handkantenschlag", away: "SS Knockdhard", hs: 4, as: 2 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 5, as: 3 },
    { home: "FC Kreuzbandriss", away: "St.Peter Rattlesnakes", hs: 0, as: 5 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 2, as: 3 },
    { home: "FC G-Hat", away: "FC Reinhard", hs: 5, as: 0 }
  ]},
  { gw: 4, matches: [
    { home: "FC Handkantenschlag", away: "FC Reinhard", hs: 5, as: 0 },
    { home: "SK AK47", away: "FC Kuppenkaskauer", hs: 3, as: 0 },
    { home: "FC Kreuzbandriss", away: "SS Knockdhard", hs: 3, as: 1 },
    { home: "Hood Squad St.Peter", away: "St.Peter Rattlesnakes", hs: 3, as: 2 },
    { home: "FC G-Hat", away: "Augerl FC", hs: 4, as: 0 }
  ]},
  { gw: 5, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 3, as: 1 },
    { home: "SK AK47", away: "FC G-Hat", hs: 3, as: 3 },
    { home: "FC Kreuzbandriss", away: "FC Reinhard", hs: 1, as: 1 },
    { home: "Hood Squad St.Peter", away: "FC Kuppenkaskauer", hs: 6, as: 0 },
    { home: "SS Knockdhard", away: "St.Peter Rattlesnakes", hs: 5, as: 5 }
  ]},
  { gw: 6, matches: [
    { home: "FC Handkantenschlag", away: "SK AK47", hs: 2, as: 4 },
    { home: "FC Kreuzbandriss", away: "Augerl FC", hs: 3, as: 5 },
    { home: "Hood Squad St.Peter", away: "FC G-Hat", hs: 4, as: 0 },
    { home: "SS Knockdhard", away: "FC Reinhard", hs: 2, as: 2 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 3, as: 2 }
  ]},
  { gw: 7, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 5 },
    { home: "SK AK47", away: "FC Kreuzbandriss", hs: 4, as: 2 },
    { home: "SS Knockdhard", away: "Augerl FC", hs: 3, as: 3 },
    { home: "FC Kuppenkaskauer", away: "FC G-Hat", hs: 2, as: 2 },
    { home: "FC Reinhard", away: "St.Peter Rattlesnakes", hs: 1, as: 5 }
  ]},
  { gw: 8, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 1, as: 1 },
    { home: "SK AK47", away: "SS Knockdhard", hs: 3, as: 3 },
    { home: "FC Kreuzbandriss", away: "Hood Squad St.Peter", hs: 3, as: 4 },
    { home: "FC Reinhard", away: "Augerl FC", hs: 2, as: 2 },
    { home: "FC G-Hat", away: "St.Peter Rattlesnakes", hs: 4, as: 5 }
  ]},
  { gw: 9, matches: [
    { home: "FC Handkantenschlag", away: "FC G-Hat", hs: 1, as: 3 },
    { home: "SK AK47", away: "FC Reinhard", hs: 3, as: 2 },
    { home: "FC Kreuzbandriss", away: "FC Kuppenkaskauer", hs: 0, as: 3 },
    { home: "Hood Squad St.Peter", away: "SS Knockdhard", hs: 1, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 1, as: 6 }
  ]},
  { gw: 10, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 1, as: 1 },
    { home: "SK AK47", away: "Augerl FC", hs: 5, as: 1 },
    { home: "FC Kreuzbandriss", away: "FC G-Hat", hs: 4, as: 8 },
    { home: "Hood Squad St.Peter", away: "FC Reinhard", hs: 0, as: 3 },
    { home: "SS Knockdhard", away: "FC Kuppenkaskauer", hs: 3, as: 1 }
  ]},
  { gw: 11, matches: [
    { home: "FC Handkantenschlag", away: "FC Kreuzbandriss", hs: 0, as: 4 },
    { home: "SK AK47", away: "St.Peter Rattlesnakes", hs: 2, as: 7 },
    { home: "Hood Squad St.Peter", away: "Augerl FC", hs: 3, as: 3 },
    { home: "SS Knockdhard", away: "FC G-Hat", hs: 5, as: 1 },
    { home: "FC Reinhard", away: "FC Kuppenkaskauer", hs: 5, as: 0 }
  ]},
  { gw: 12, matches: [
    { home: "FC Handkantenschlag", away: "SS Knockdhard", hs: 1, as: 0 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 2, as: 1 },
    { home: "FC Kreuzbandriss", away: "St.Peter Rattlesnakes", hs: 2, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 1, as: 2 },
    { home: "FC G-Hat", away: "FC Reinhard", hs: 2, as: 1 }
  ]},
  { gw: 13, matches: [
    { home: "FC Handkantenschlag", away: "FC Reinhard", hs: 1, as: 0 },
    { home: "SK AK47", away: "FC Kuppenkaskauer", hs: 3, as: 1 },
    { home: "FC Kreuzbandriss", away: "SS Knockdhard", hs: 1, as: 3 },
    { home: "Hood Squad St.Peter", away: "St.Peter Rattlesnakes", hs: 4, as: 7 },
    { home: "FC G-Hat", away: "Augerl FC", hs: 4, as: 5 }
  ]},
  { gw: 14, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 2, as: 2 },
    { home: "SK AK47", away: "FC G-Hat", hs: 2, as: 0 },
    { home: "FC Kreuzbandriss", away: "FC Reinhard", hs: 7, as: 1 },
    { home: "Hood Squad St.Peter", away: "FC Kuppenkaskauer", hs: 1, as: 3 },
    { home: "SS Knockdhard", away: "St.Peter Rattlesnakes", hs: 3, as: 3 }
  ]},
  { gw: 15, matches: [
    { home: "FC Handkantenschlag", away: "SK AK47", hs: 0, as: 2 },
    { home: "FC Kreuzbandriss", away: "Augerl FC", hs: 1, as: 3 },
    { home: "Hood Squad St.Peter", away: "FC G-Hat", hs: 3, as: 3 },
    { home: "SS Knockdhard", away: "FC Reinhard", hs: 1, as: 4 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 1, as: 2 }
  ]},
  { gw: 16, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 1 },
    { home: "SK AK47", away: "FC Kreuzbandriss", hs: 7, as: 1 },
    { home: "SS Knockdhard", away: "Augerl FC", hs: 0, as: 1 },
    { home: "FC Kuppenkaskauer", away: "FC G-Hat", hs: 4, as: 3 },
    { home: "FC Reinhard", away: "St.Peter Rattlesnakes", hs: 5, as: 3 }
  ]},
  { gw: 17, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 1, as: 2 },
    { home: "SK AK47", away: "SS Knockdhard", hs: 2, as: 1 },
    { home: "FC Kreuzbandriss", away: "Hood Squad St.Peter", hs: 2, as: 5 },
    { home: "FC Reinhard", away: "Augerl FC", hs: 0, as: 5 },
    { home: "FC G-Hat", away: "St.Peter Rattlesnakes", hs: 3, as: 3 }
  ]},
  { gw: 18, matches: [
    { home: "FC Handkantenschlag", away: "FC G-Hat", hs: 0, as: 4 },
    { home: "SK AK47", away: "FC Reinhard", hs: 4, as: 4 },
    { home: "FC Kreuzbandriss", away: "FC Kuppenkaskauer", hs: 0, as: 5 },
    { home: "Hood Squad St.Peter", away: "SS Knockdhard", hs: 7, as: 5 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 0, as: 0 }
  ]},
  { gw: 19, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "SK AK47", away: "Augerl FC", hs: 6, as: 2 },
    { home: "FC Kreuzbandriss", away: "FC G-Hat", hs: 4, as: 0 },
    { home: "Hood Squad St.Peter", away: "FC Reinhard", hs: 3, as: 3 },
    { home: "SS Knockdhard", away: "FC Kuppenkaskauer", hs: 6, as: 3 }
  ]},
  { gw: 20, matches: [
    { home: "FC Handkantenschlag", away: "FC Kreuzbandriss", hs: 4, as: 0 },
    { home: "SK AK47", away: "St.Peter Rattlesnakes", hs: 3, as: 4 },
    { home: "Hood Squad St.Peter", away: "Augerl FC", hs: 2, as: 0 },
    { home: "SS Knockdhard", away: "FC G-Hat", hs: 3, as: 0 },
    { home: "FC Reinhard", away: "FC Kuppenkaskauer", hs: 1, as: 1 }
  ]},
  { gw: 21, matches: [
    { home: "FC Handkantenschlag", away: "SS Knockdhard", hs: 2, as: 4 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 4, as: 4 },
    { home: "FC Kreuzbandriss", away: "St.Peter Rattlesnakes", hs: 3, as: 3 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 4, as: 1 },
    { home: "FC G-Hat", away: "FC Reinhard", hs: 3, as: 2 }
  ]},
  { gw: 22, matches: [
    { home: "FC Handkantenschlag", away: "FC Reinhard", hs: 0, as: 1 },
    { home: "SK AK47", away: "FC Kuppenkaskauer", hs: 3, as: 2 },
    { home: "FC Kreuzbandriss", away: "SS Knockdhard", hs: 1, as: 2 },
    { home: "Hood Squad St.Peter", away: "St.Peter Rattlesnakes", hs: 2, as: 2 },
    { home: "FC G-Hat", away: "Augerl FC", hs: 0, as: 3 }
  ]},
  { gw: 23, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 2, as: 3 },
    { home: "SK AK47", away: "FC G-Hat", hs: 4, as: 3 },
    { home: "FC Kreuzbandriss", away: "FC Reinhard", hs: 1, as: 1 },
    { home: "Hood Squad St.Peter", away: "FC Kuppenkaskauer", hs: 1, as: 3 },
    { home: "SS Knockdhard", away: "St.Peter Rattlesnakes", hs: 2, as: 6 }
  ]},
  { gw: 24, matches: [
    { home: "FC Handkantenschlag", away: "SK AK47", hs: 1, as: 6 },
    { home: "FC Kreuzbandriss", away: "Augerl FC", hs: 2, as: 0 },
    { home: "Hood Squad St.Peter", away: "FC G-Hat", hs: 1, as: 3 },
    { home: "SS Knockdhard", away: "FC Reinhard", hs: 1, as: 1 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 0, as: 4 }
  ]},
  { gw: 25, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 3 },
    { home: "SK AK47", away: "FC Kreuzbandriss", hs: 5, as: 4 },
    { home: "SS Knockdhard", away: "Augerl FC", hs: 3, as: 0 },
    { home: "FC Kuppenkaskauer", away: "FC G-Hat", hs: 3, as: 0 },
    { home: "FC Reinhard", away: "St.Peter Rattlesnakes", hs: 4, as: 6 }
  ]},
  { gw: 26, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 4, as: 0 },
    { home: "SK AK47", away: "SS Knockdhard", hs: 6, as: 5 },
    { home: "FC Kreuzbandriss", away: "Hood Squad St.Peter", hs: 3, as: 0 },
    { home: "FC Reinhard", away: "Augerl FC", hs: 3, as: 0 },
    { home: "FC G-Hat", away: "St.Peter Rattlesnakes", hs: 0, as: 7 }
  ]},
  { gw: 27, matches: [
    { home: "FC Handkantenschlag", away: "FC G-Hat", hs: 2, as: 6 },
    { home: "SK AK47", away: "FC Reinhard", hs: 1, as: 1 },
    { home: "FC Kreuzbandriss", away: "FC Kuppenkaskauer", hs: 3, as: 2 },
    { home: "Hood Squad St.Peter", away: "SS Knockdhard", hs: 3, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 6, as: 2 }
  ]},
  { gw: 28, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 2, as: 1 },
    { home: "SK AK47", away: "Augerl FC", hs: 4, as: 3 },
    { home: "FC Kreuzbandriss", away: "FC G-Hat", hs: 3, as: 2 },
    { home: "Hood Squad St.Peter", away: "FC Reinhard", hs: 1, as: 1 },
    { home: "SS Knockdhard", away: "FC Kuppenkaskauer", hs: 5, as: 5 }
  ]},
  { gw: 29, matches: [
    { home: "FC Handkantenschlag", away: "FC Kreuzbandriss", hs: 6, as: 1 },
    { home: "SK AK47", away: "St.Peter Rattlesnakes", hs: 1, as: 6 },
    { home: "Hood Squad St.Peter", away: "Augerl FC", hs: 2, as: 1 },
    { home: "SS Knockdhard", away: "FC G-Hat", hs: 0, as: 1 },
    { home: "FC Reinhard", away: "FC Kuppenkaskauer", hs: 0, as: 2 }
  ]},
  { gw: 30, matches: [
    { home: "FC Handkantenschlag", away: "SS Knockdhard", hs: 0, as: 0 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 4, as: 2 },
    { home: "FC Kreuzbandriss", away: "St.Peter Rattlesnakes", hs: 4, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 4, as: 2 },
    { home: "FC G-Hat", away: "FC Reinhard", hs: 6, as: 1 }
  ]},
  { gw: 31, matches: [
    { home: "FC Handkantenschlag", away: "FC Reinhard", hs: 0, as: 6 },
    { home: "SK AK47", away: "FC Kuppenkaskauer", hs: 1, as: 0 },
    { home: "FC Kreuzbandriss", away: "SS Knockdhard", hs: 5, as: 3 },
    { home: "Hood Squad St.Peter", away: "St.Peter Rattlesnakes", hs: 0, as: 5 },
    { home: "FC G-Hat", away: "Augerl FC", hs: 2, as: 3 }
  ]},
  { gw: 32, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 3, as: 3 },
    { home: "SK AK47", away: "FC G-Hat", hs: 5, as: 1 },
    { home: "FC Kreuzbandriss", away: "FC Reinhard", hs: 5, as: 0 },
    { home: "Hood Squad St.Peter", away: "FC Kuppenkaskauer", hs: 0, as: 3 },
    { home: "SS Knockdhard", away: "St.Peter Rattlesnakes", hs: 2, as: 3 }
  ]},
  { gw: 33, matches: [
    { home: "FC Handkantenschlag", away: "SK AK47", hs: 0, as: 4 },
    { home: "FC Kreuzbandriss", away: "Augerl FC", hs: 1, as: 1 },
    { home: "Hood Squad St.Peter", away: "FC G-Hat", hs: 3, as: 4 },
    { home: "SS Knockdhard", away: "FC Reinhard", hs: 2, as: 2 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 2, as: 5 }
  ]},
  { gw: 34, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 1, as: 1 },
    { home: "SK AK47", away: "FC Kreuzbandriss", hs: 6, as: 2 },
    { home: "SS Knockdhard", away: "Augerl FC", hs: 2, as: 5 },
    { home: "FC Kuppenkaskauer", away: "FC G-Hat", hs: 4, as: 5 },
    { home: "FC Reinhard", away: "St.Peter Rattlesnakes", hs: 0, as: 5 }
  ]},
  { gw: 35, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 0, as: 2 },
    { home: "SK AK47", away: "SS Knockdhard", hs: 2, as: 0 },
    { home: "FC Kreuzbandriss", away: "Hood Squad St.Peter", hs: 1, as: 1 },
    { home: "FC Reinhard", away: "Augerl FC", hs: 3, as: 5 },
    { home: "FC G-Hat", away: "St.Peter Rattlesnakes", hs: 2, as: 3 }
  ]},
  { gw: 36, matches: [
    { home: "FC Handkantenschlag", away: "FC G-Hat", hs: 0, as: 6 },
    { home: "SK AK47", away: "FC Reinhard", hs: 5, as: 1 },
    { home: "FC Kreuzbandriss", away: "FC Kuppenkaskauer", hs: 2, as: 2 },
    { home: "Hood Squad St.Peter", away: "SS Knockdhard", hs: 0, as: 3 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 5, as: 4 }
  ]},
  { gw: 37, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 1, as: 1 },
    { home: "SK AK47", away: "Augerl FC", hs: 5, as: 0 },
    { home: "FC Kreuzbandriss", away: "FC G-Hat", hs: 0, as: 5 },
    { home: "Hood Squad St.Peter", away: "FC Reinhard", hs: 2, as: 0 },
    { home: "SS Knockdhard", away: "FC Kuppenkaskauer", hs: 0, as: 4 }
  ]},
  { gw: 38, matches: [
    { home: "FC Handkantenschlag", away: "FC Kreuzbandriss", hs: 1, as: 4 },
    { home: "SK AK47", away: "St.Peter Rattlesnakes", hs: 1, as: 2 },
    { home: "Hood Squad St.Peter", away: "Augerl FC", hs: 0, as: 0 },
    { home: "SS Knockdhard", away: "FC G-Hat", hs: 0, as: 0 },
    { home: "FC Reinhard", away: "FC Kuppenkaskauer", hs: 1, as: 0 }
  ]},
  ]},
  { label: "2019/20", data: [
  { gw: 1, matches: [
    { home: "St.Peter Rattlesnakes", away: "Sigurd & Söhne", hs: 5, as: 5 },
    { home: "Galactik Football", away: "Mösil United", hs: 4, as: 3 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 5, as: 0 },
    { home: "G Unit", away: "McAugerl", hs: 1, as: 4 },
    { home: "FC Handkantenschlag", away: "I Success", hs: 2, as: 2 }
  ]},
  { gw: 2, matches: [
    { home: "St.Peter Rattlesnakes", away: "SK AK47", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Sigurd & Söhne", hs: 2, as: 0 },
    { home: "G Unit", away: "Mösil United", hs: 0, as: 2 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 1 },
    { home: "McAugerl", away: "I Success", hs: 2, as: 1 }
  ]},
  { gw: 3, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 3, as: 0 },
    { home: "Galactik Football", away: "G Unit", hs: 0, as: 1 },
    { home: "SK AK47", away: "Sigurd & Söhne", hs: 2, as: 1 },
    { home: "I Success", away: "Mösil United", hs: 0, as: 0 },
    { home: "Hood Squad St.Peter", away: "McAugerl", hs: 6, as: 2 }
  ]},
  { gw: 4, matches: [
    { home: "St.Peter Rattlesnakes", away: "McAugerl", hs: 3, as: 4 },
    { home: "Galactik Football", away: "I Success", hs: 2, as: 0 },
    { home: "SK AK47", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "G Unit", away: "Sigurd & Söhne", hs: 2, as: 1 },
    { home: "Hood Squad St.Peter", away: "Mösil United", hs: 5, as: 1 }
  ]},
  { gw: 5, matches: [
    { home: "St.Peter Rattlesnakes", away: "Mösil United", hs: 1, as: 4 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 2, as: 3 },
    { home: "SK AK47", away: "McAugerl", hs: 0, as: 1 },
    { home: "G Unit", away: "I Success", hs: 3, as: 0 },
    { home: "FC Handkantenschlag", away: "Sigurd & Söhne", hs: 5, as: 0 }
  ]},
  { gw: 6, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 2, as: 1 },
    { home: "SK AK47", away: "Mösil United", hs: 1, as: 1 },
    { home: "G Unit", away: "Hood Squad St.Peter", hs: 3, as: 5 },
    { home: "FC Handkantenschlag", away: "McAugerl", hs: 2, as: 8 },
    { home: "I Success", away: "Sigurd & Söhne", hs: 0, as: 1 }
  ]},
  { gw: 7, matches: [
    { home: "St.Peter Rattlesnakes", away: "G Unit", hs: 2, as: 2 },
    { home: "Galactik Football", away: "SK AK47", hs: 2, as: 1 },
    { home: "FC Handkantenschlag", away: "Mösil United", hs: 4, as: 1 },
    { home: "I Success", away: "Hood Squad St.Peter", hs: 3, as: 0 },
    { home: "McAugerl", away: "Sigurd & Söhne", hs: 5, as: 3 }
  ]},
  { gw: 8, matches: [
    { home: "St.Peter Rattlesnakes", away: "I Success", hs: 2, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 5, as: 1 },
    { home: "SK AK47", away: "G Unit", hs: 1, as: 0 },
    { home: "McAugerl", away: "Mösil United", hs: 2, as: 0 },
    { home: "Hood Squad St.Peter", away: "Sigurd & Söhne", hs: 2, as: 0 }
  ]},
  { gw: 9, matches: [
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 3, as: 2 },
    { home: "Galactik Football", away: "McAugerl", hs: 0, as: 0 },
    { home: "SK AK47", away: "I Success", hs: 2, as: 3 },
    { home: "G Unit", away: "FC Handkantenschlag", hs: 1, as: 1 },
    { home: "Sigurd & Söhne", away: "Mösil United", hs: 1, as: 2 }
  ]},
  { gw: 10, matches: [
    { home: "St.Peter Rattlesnakes", away: "Sigurd & Söhne", hs: 1, as: 2 },
    { home: "Galactik Football", away: "Mösil United", hs: 2, as: 1 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 3, as: 4 },
    { home: "G Unit", away: "McAugerl", hs: 3, as: 5 },
    { home: "FC Handkantenschlag", away: "I Success", hs: 2, as: 1 }
  ]},
  { gw: 11, matches: [
    { home: "St.Peter Rattlesnakes", away: "SK AK47", hs: 1, as: 0 },
    { home: "Galactik Football", away: "Sigurd & Söhne", hs: 4, as: 0 },
    { home: "G Unit", away: "Mösil United", hs: 2, as: 1 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 3, as: 1 },
    { home: "McAugerl", away: "I Success", hs: 3, as: 1 }
  ]},
  { gw: 12, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 4, as: 3 },
    { home: "Galactik Football", away: "G Unit", hs: 2, as: 2 },
    { home: "SK AK47", away: "Sigurd & Söhne", hs: 0, as: 0 },
    { home: "I Success", away: "Mösil United", hs: 0, as: 1 },
    { home: "Hood Squad St.Peter", away: "McAugerl", hs: 1, as: 4 }
  ]},
  { gw: 13, matches: [
    { home: "St.Peter Rattlesnakes", away: "McAugerl", hs: 2, as: 4 },
    { home: "Galactik Football", away: "I Success", hs: 1, as: 4 },
    { home: "SK AK47", away: "FC Handkantenschlag", hs: 0, as: 2 },
    { home: "G Unit", away: "Sigurd & Söhne", hs: 0, as: 1 },
    { home: "Hood Squad St.Peter", away: "Mösil United", hs: 0, as: 3 }
  ]},
  { gw: 14, matches: [
    { home: "St.Peter Rattlesnakes", away: "Mösil United", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 0, as: 0 },
    { home: "SK AK47", away: "McAugerl", hs: 0, as: 4 },
    { home: "G Unit", away: "I Success", hs: 0, as: 2 },
    { home: "FC Handkantenschlag", away: "Sigurd & Söhne", hs: 4, as: 0 }
  ]},
  { gw: 15, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 2, as: 2 },
    { home: "SK AK47", away: "Mösil United", hs: 1, as: 2 },
    { home: "G Unit", away: "Hood Squad St.Peter", hs: 1, as: 2 },
    { home: "FC Handkantenschlag", away: "McAugerl", hs: 3, as: 0 },
    { home: "I Success", away: "Sigurd & Söhne", hs: 1, as: 1 }
  ]},
  { gw: 16, matches: [
    { home: "St.Peter Rattlesnakes", away: "G Unit", hs: 1, as: 4 },
    { home: "Galactik Football", away: "SK AK47", hs: 0, as: 6 },
    { home: "FC Handkantenschlag", away: "Mösil United", hs: 3, as: 2 },
    { home: "I Success", away: "Hood Squad St.Peter", hs: 2, as: 1 },
    { home: "McAugerl", away: "Sigurd & Söhne", hs: 0, as: 3 }
  ]},
  { gw: 17, matches: [
    { home: "St.Peter Rattlesnakes", away: "I Success", hs: 2, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 1, as: 0 },
    { home: "SK AK47", away: "G Unit", hs: 5, as: 0 },
    { home: "McAugerl", away: "Mösil United", hs: 2, as: 2 },
    { home: "Hood Squad St.Peter", away: "Sigurd & Söhne", hs: 0, as: 0 }
  ]},
  { gw: 18, matches: [
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 2, as: 2 },
    { home: "Galactik Football", away: "McAugerl", hs: 3, as: 3 },
    { home: "SK AK47", away: "I Success", hs: 4, as: 1 },
    { home: "G Unit", away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "Sigurd & Söhne", away: "Mösil United", hs: 2, as: 1 }
  ]},
  { gw: 19, matches: [
    { home: "St.Peter Rattlesnakes", away: "Sigurd & Söhne", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Mösil United", hs: 0, as: 2 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 2, as: 1 },
    { home: "G Unit", away: "McAugerl", hs: 0, as: 3 },
    { home: "FC Handkantenschlag", away: "I Success", hs: 1, as: 2 }
  ]},
  { gw: 20, matches: [
    { home: "St.Peter Rattlesnakes", away: "SK AK47", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Sigurd & Söhne", hs: 3, as: 3 },
    { home: "G Unit", away: "Mösil United", hs: 0, as: 0 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 3, as: 2 },
    { home: "McAugerl", away: "I Success", hs: 5, as: 0 }
  ]},
  { gw: 21, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 1, as: 1 },
    { home: "Galactik Football", away: "G Unit", hs: 1, as: 1 },
    { home: "SK AK47", away: "Sigurd & Söhne", hs: 1, as: 1 },
    { home: "I Success", away: "Mösil United", hs: 0, as: 1 },
    { home: "Hood Squad St.Peter", away: "McAugerl", hs: 4, as: 0 }
  ]},
  { gw: 22, matches: [
    { home: "St.Peter Rattlesnakes", away: "McAugerl", hs: 2, as: 3 },
    { home: "Galactik Football", away: "I Success", hs: 0, as: 0 },
    { home: "SK AK47", away: "FC Handkantenschlag", hs: 2, as: 3 },
    { home: "G Unit", away: "Sigurd & Söhne", hs: 0, as: 1 },
    { home: "Hood Squad St.Peter", away: "Mösil United", hs: 5, as: 2 }
  ]},
  { gw: 23, matches: [
    { home: "St.Peter Rattlesnakes", away: "Mösil United", hs: 4, as: 2 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 0, as: 4 },
    { home: "SK AK47", away: "McAugerl", hs: 2, as: 0 },
    { home: "G Unit", away: "I Success", hs: 0, as: 0 },
    { home: "FC Handkantenschlag", away: "Sigurd & Söhne", hs: 1, as: 0 }
  ]},
  { gw: 24, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 4, as: 2 },
    { home: "SK AK47", away: "Mösil United", hs: 0, as: 1 },
    { home: "G Unit", away: "Hood Squad St.Peter", hs: 2, as: 4 },
    { home: "FC Handkantenschlag", away: "McAugerl", hs: 2, as: 2 },
    { home: "I Success", away: "Sigurd & Söhne", hs: 2, as: 0 }
  ]},
  { gw: 25, matches: [
    { home: "St.Peter Rattlesnakes", away: "G Unit", hs: 0, as: 1 },
    { home: "Galactik Football", away: "SK AK47", hs: 3, as: 2 },
    { home: "FC Handkantenschlag", away: "Mösil United", hs: 1, as: 3 },
    { home: "I Success", away: "Hood Squad St.Peter", hs: 5, as: 1 },
    { home: "McAugerl", away: "Sigurd & Söhne", hs: 0, as: 4 }
  ]},
  { gw: 26, matches: [
    { home: "St.Peter Rattlesnakes", away: "I Success", hs: 4, as: 3 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 2, as: 5 },
    { home: "SK AK47", away: "G Unit", hs: 0, as: 4 },
    { home: "McAugerl", away: "Mösil United", hs: 3, as: 2 },
    { home: "Hood Squad St.Peter", away: "Sigurd & Söhne", hs: 0, as: 1 }
  ]},
  { gw: 27, matches: [
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 2, as: 0 },
    { home: "Galactik Football", away: "McAugerl", hs: 1, as: 3 },
    { home: "SK AK47", away: "I Success", hs: 0, as: 0 },
    { home: "G Unit", away: "FC Handkantenschlag", hs: 4, as: 5 },
    { home: "Sigurd & Söhne", away: "Mösil United", hs: 1, as: 3 }
  ]},
  { gw: 28, matches: [
    { home: "St.Peter Rattlesnakes", away: "Sigurd & Söhne", hs: 1, as: 2 },
    { home: "Galactik Football", away: "Mösil United", hs: 3, as: 0 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 0, as: 0 },
    { home: "G Unit", away: "McAugerl", hs: 3, as: 5 },
    { home: "FC Handkantenschlag", away: "I Success", hs: 4, as: 0 }
  ]},
  { gw: 29, matches: [
    { home: "St.Peter Rattlesnakes", away: "SK AK47", hs: 1, as: 2 },
    { home: "Galactik Football", away: "Sigurd & Söhne", hs: 3, as: 2 },
    { home: "G Unit", away: "Mösil United", hs: 0, as: 7 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 2 },
    { home: "McAugerl", away: "I Success", hs: 3, as: 0 }
  ]},
  { gw: 30, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 3, as: 2 },
    { home: "Galactik Football", away: "G Unit", hs: 0, as: 3 },
    { home: "SK AK47", away: "Sigurd & Söhne", hs: 0, as: 6 },
    { home: "I Success", away: "Mösil United", hs: 3, as: 1 },
    { home: "Hood Squad St.Peter", away: "McAugerl", hs: 3, as: 1 }
  ]},
  { gw: 31, matches: [
    { home: "St.Peter Rattlesnakes", away: "McAugerl", hs: 4, as: 8 },
    { home: "Galactik Football", away: "I Success", hs: 3, as: 2 },
    { home: "SK AK47", away: "FC Handkantenschlag", hs: 0, as: 2 },
    { home: "G Unit", away: "Sigurd & Söhne", hs: 0, as: 2 },
    { home: "Hood Squad St.Peter", away: "Mösil United", hs: 2, as: 2 }
  ]},
  { gw: 32, matches: [
    { home: "St.Peter Rattlesnakes", away: "Mösil United", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 3, as: 0 },
    { home: "SK AK47", away: "McAugerl", hs: 0, as: 3 },
    { home: "G Unit", away: "I Success", hs: 4, as: 3 },
    { home: "FC Handkantenschlag", away: "Sigurd & Söhne", hs: 4, as: 4 }
  ]},
  { gw: 33, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 1, as: 2 },
    { home: "SK AK47", away: "Mösil United", hs: 0, as: 3 },
    { home: "G Unit", away: "Hood Squad St.Peter", hs: 2, as: 0 },
    { home: "FC Handkantenschlag", away: "McAugerl", hs: 0, as: 7 },
    { home: "I Success", away: "Sigurd & Söhne", hs: 2, as: 0 }
  ]},
  { gw: 34, matches: [
    { home: "St.Peter Rattlesnakes", away: "G Unit", hs: 1, as: 3 },
    { home: "Galactik Football", away: "SK AK47", hs: 1, as: 0 },
    { home: "FC Handkantenschlag", away: "Mösil United", hs: 3, as: 3 },
    { home: "I Success", away: "Hood Squad St.Peter", hs: 3, as: 1 },
    { home: "McAugerl", away: "Sigurd & Söhne", hs: 4, as: 2 }
  ]},
  { gw: 35, matches: [
    { home: "St.Peter Rattlesnakes", away: "I Success", hs: 1, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 0, as: 4 },
    { home: "SK AK47", away: "G Unit", hs: 0, as: 1 },
    { home: "McAugerl", away: "Mösil United", hs: 1, as: 3 },
    { home: "Hood Squad St.Peter", away: "Sigurd & Söhne", hs: 0, as: 1 }
  ]},
  { gw: 36, matches: [
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 2, as: 0 },
    { home: "Galactik Football", away: "McAugerl", hs: 0, as: 1 },
    { home: "SK AK47", away: "I Success", hs: 0, as: 1 },
    { home: "G Unit", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Sigurd & Söhne", away: "Mösil United", hs: 4, as: 2 }
  ]},
  { gw: 37, matches: [
    { home: "St.Peter Rattlesnakes", away: "Sigurd & Söhne", hs: 3, as: 4 },
    { home: "Galactik Football", away: "Mösil United", hs: 0, as: 2 },
    { home: "SK AK47", away: "Hood Squad St.Peter", hs: 0, as: 0 },
    { home: "G Unit", away: "McAugerl", hs: 1, as: 3 },
    { home: "FC Handkantenschlag", away: "I Success", hs: 1, as: 4 }
  ]},
  { gw: 38, matches: [
    { home: "St.Peter Rattlesnakes", away: "SK AK47", hs: 3, as: 0 },
    { home: "Galactik Football", away: "Sigurd & Söhne", hs: 1, as: 4 },
    { home: "G Unit", away: "Mösil United", hs: 2, as: 0 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 1 },
    { home: "McAugerl", away: "I Success", hs: 5, as: 0 }
  ]},
  ]},
  { label: "2020/21", data: [
  { gw: 1, matches: [
    { home: "Jonjinho United", away: "Hood Squad St.Peter", hs: 0, as: 3 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 4, as: 0 },
    { home: "Peacock City", away: "FC Handkantenschlag", hs: 3, as: 4 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 2, as: 2 },
    { home: "Soft D's", away: "Augerl FC", hs: 1, as: 2 }
  ]},
  { gw: 2, matches: [
    { home: "Jonjinho United", away: "Peacock City", hs: 9, as: 0 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 1, as: 3 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "Soft D's", away: "FC Handkantenschlag", hs: 5, as: 4 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 3, as: 0 }
  ]},
  { gw: 3, matches: [
    { home: "Jonjinho United", away: "Soft D's", hs: 2, as: 2 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 3, as: 5 },
    { home: "Peacock City", away: "Hood Squad St.Peter", hs: 4, as: 2 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 1, as: 2 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 1, as: 3 }
  ]},
  { gw: 4, matches: [
    { home: "Jonjinho United", away: "St.Peter Rattlesnakes", hs: 4, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 4 },
    { home: "Peacock City", away: "Soft D's", hs: 0, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 0, as: 1 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 5, as: 0 }
  ]},
  { gw: 5, matches: [
    { home: "Jonjinho United", away: "Calcio Classico", hs: 4, as: 0 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 2, as: 3 },
    { home: "Peacock City", away: "St.Peter Rattlesnakes", hs: 2, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 3, as: 4 },
    { home: "Soft D's", away: "Hood Squad St.Peter", hs: 2, as: 0 }
  ]},
  { gw: 6, matches: [
    { home: "Jonjinho United", away: "Galactik Football", hs: 2, as: 1 },
    { home: "Peacock City", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 0, as: 2 },
    { home: "Soft D's", away: "St.Peter Rattlesnakes", hs: 3, as: 5 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 0, as: 5 }
  ]},
  { gw: 7, matches: [
    { home: "Jonjinho United", away: "FC Kuppenkaskauer", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Peacock City", hs: 2, as: 4 },
    { home: "Soft D's", away: "Calcio Classico", hs: 1, as: 2 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 3, as: 5 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 2, as: 2 }
  ]},
  { gw: 8, matches: [
    { home: "Jonjinho United", away: "Augerl FC", hs: 1, as: 6 },
    { home: "Galactik Football", away: "Soft D's", hs: 2, as: 3 },
    { home: "Peacock City", away: "FC Kuppenkaskauer", hs: 2, as: 1 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 4, as: 2 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 1 }
  ]},
  { gw: 9, matches: [
    { home: "Jonjinho United", away: "FC Handkantenschlag", hs: 1, as: 4 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 0, as: 4 },
    { home: "Peacock City", away: "Augerl FC", hs: 0, as: 3 },
    { home: "FC Kuppenkaskauer", away: "Soft D's", hs: 4, as: 2 },
    { home: "Hood Squad St.Peter", away: "Calcio Classico", hs: 2, as: 0 }
  ]},
  { gw: 10, matches: [
    { home: "Jonjinho United", away: "Hood Squad St.Peter", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 5, as: 2 },
    { home: "Peacock City", away: "FC Handkantenschlag", hs: 4, as: 0 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 2, as: 2 },
    { home: "Soft D's", away: "Augerl FC", hs: 3, as: 3 }
  ]},
  { gw: 11, matches: [
    { home: "Jonjinho United", away: "Peacock City", hs: 4, as: 2 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 3, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "Soft D's", away: "FC Handkantenschlag", hs: 3, as: 3 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 2 }
  ]},
  { gw: 12, matches: [
    { home: "Jonjinho United", away: "Soft D's", hs: 3, as: 1 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 3, as: 0 },
    { home: "Peacock City", away: "Hood Squad St.Peter", hs: 2, as: 0 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 2, as: 1 }
  ]},
  { gw: 13, matches: [
    { home: "Jonjinho United", away: "St.Peter Rattlesnakes", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 2 },
    { home: "Peacock City", away: "Soft D's", hs: 1, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 2, as: 4 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 0, as: 0 }
  ]},
  { gw: 14, matches: [
    { home: "Jonjinho United", away: "Calcio Classico", hs: 6, as: 3 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 1, as: 2 },
    { home: "Peacock City", away: "St.Peter Rattlesnakes", hs: 0, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 0, as: 3 },
    { home: "Soft D's", away: "Hood Squad St.Peter", hs: 1, as: 0 }
  ]},
  { gw: 15, matches: [
    { home: "Jonjinho United", away: "Galactik Football", hs: 4, as: 1 },
    { home: "Peacock City", away: "Calcio Classico", hs: 0, as: 1 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 1, as: 0 },
    { home: "Soft D's", away: "St.Peter Rattlesnakes", hs: 2, as: 0 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 5, as: 2 }
  ]},
  { gw: 16, matches: [
    { home: "Jonjinho United", away: "FC Kuppenkaskauer", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Peacock City", hs: 2, as: 2 },
    { home: "Soft D's", away: "Calcio Classico", hs: 1, as: 1 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 4, as: 0 }
  ]},
  { gw: 17, matches: [
    { home: "Jonjinho United", away: "Augerl FC", hs: 4, as: 3 },
    { home: "Galactik Football", away: "Soft D's", hs: 0, as: 2 },
    { home: "Peacock City", away: "FC Kuppenkaskauer", hs: 0, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 3, as: 2 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 0 }
  ]},
  { gw: 18, matches: [
    { home: "Jonjinho United", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 0, as: 4 },
    { home: "Peacock City", away: "Augerl FC", hs: 2, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Soft D's", hs: 0, as: 3 },
    { home: "Hood Squad St.Peter", away: "Calcio Classico", hs: 2, as: 0 }
  ]},
  { gw: 19, matches: [
    { home: "Jonjinho United", away: "Hood Squad St.Peter", hs: 4, as: 0 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 0, as: 1 },
    { home: "Peacock City", away: "FC Handkantenschlag", hs: 1, as: 5 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "Soft D's", away: "Augerl FC", hs: 2, as: 2 }
  ]},
  { gw: 20, matches: [
    { home: "Jonjinho United", away: "Peacock City", hs: 0, as: 3 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 1, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 0, as: 2 },
    { home: "Soft D's", away: "FC Handkantenschlag", hs: 3, as: 3 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 1 }
  ]},
  { gw: 21, matches: [
    { home: "Jonjinho United", away: "Soft D's", hs: 3, as: 0 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 4, as: 0 },
    { home: "Peacock City", away: "Hood Squad St.Peter", hs: 1, as: 4 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 1, as: 1 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 1, as: 0 }
  ]},
  { gw: 22, matches: [
    { home: "Jonjinho United", away: "St.Peter Rattlesnakes", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 7 },
    { home: "Peacock City", away: "Soft D's", hs: 2, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 2, as: 1 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 4, as: 0 }
  ]},
  { gw: 23, matches: [
    { home: "Jonjinho United", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 4, as: 2 },
    { home: "Peacock City", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 0, as: 6 },
    { home: "Soft D's", away: "Hood Squad St.Peter", hs: 4, as: 1 }
  ]},
  { gw: 24, matches: [
    { home: "Jonjinho United", away: "Galactik Football", hs: 1, as: 1 },
    { home: "Peacock City", away: "Calcio Classico", hs: 2, as: 1 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 0, as: 4 },
    { home: "Soft D's", away: "St.Peter Rattlesnakes", hs: 1, as: 1 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 6, as: 2 }
  ]},
  { gw: 25, matches: [
    { home: "Jonjinho United", away: "FC Kuppenkaskauer", hs: 2, as: 0 },
    { home: "Galactik Football", away: "Peacock City", hs: 0, as: 4 },
    { home: "Soft D's", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 3, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 2, as: 2 }
  ]},
  { gw: 26, matches: [
    { home: "Jonjinho United", away: "Augerl FC", hs: 4, as: 1 },
    { home: "Galactik Football", away: "Soft D's", hs: 1, as: 2 },
    { home: "Peacock City", away: "FC Kuppenkaskauer", hs: 3, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 1, as: 2 }
  ]},
  { gw: 27, matches: [
    { home: "Jonjinho United", away: "FC Handkantenschlag", hs: 2, as: 7 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 0, as: 1 },
    { home: "Peacock City", away: "Augerl FC", hs: 3, as: 3 },
    { home: "FC Kuppenkaskauer", away: "Soft D's", hs: 0, as: 0 },
    { home: "Hood Squad St.Peter", away: "Calcio Classico", hs: 3, as: 0 }
  ]},
  { gw: 28, matches: [
    { home: "Jonjinho United", away: "Hood Squad St.Peter", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "Peacock City", away: "FC Handkantenschlag", hs: 4, as: 1 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "Soft D's", away: "Augerl FC", hs: 5, as: 2 }
  ]},
  { gw: 29, matches: [
    { home: "Jonjinho United", away: "Peacock City", hs: 4, as: 3 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 2, as: 3 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Soft D's", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 3 }
  ]},
  { gw: 30, matches: [
    { home: "Jonjinho United", away: "Soft D's", hs: 1, as: 3 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 2, as: 0 },
    { home: "Peacock City", away: "Hood Squad St.Peter", hs: 0, as: 1 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 4, as: 0 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 5, as: 0 }
  ]},
  { gw: 31, matches: [
    { home: "Jonjinho United", away: "St.Peter Rattlesnakes", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 4 },
    { home: "Peacock City", away: "Soft D's", hs: 1, as: 5 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 0, as: 1 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 1, as: 0 }
  ]},
  { gw: 32, matches: [
    { home: "Jonjinho United", away: "Calcio Classico", hs: 3, as: 2 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 0, as: 2 },
    { home: "Peacock City", away: "St.Peter Rattlesnakes", hs: 4, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 0, as: 1 },
    { home: "Soft D's", away: "Hood Squad St.Peter", hs: 3, as: 0 }
  ]},
  { gw: 33, matches: [
    { home: "Jonjinho United", away: "Galactik Football", hs: 0, as: 2 },
    { home: "Peacock City", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 0, as: 2 },
    { home: "Soft D's", away: "St.Peter Rattlesnakes", hs: 2, as: 1 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 3, as: 5 }
  ]},
  { gw: 34, matches: [
    { home: "Jonjinho United", away: "FC Kuppenkaskauer", hs: 4, as: 0 },
    { home: "Galactik Football", away: "Peacock City", hs: 3, as: 5 },
    { home: "Soft D's", away: "Calcio Classico", hs: 2, as: 3 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 6, as: 3 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 0, as: 0 }
  ]},
  { gw: 35, matches: [
    { home: "Jonjinho United", away: "Augerl FC", hs: 3, as: 3 },
    { home: "Galactik Football", away: "Soft D's", hs: 1, as: 4 },
    { home: "Peacock City", away: "FC Kuppenkaskauer", hs: 1, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 1, as: 1 }
  ]},
  { gw: 36, matches: [
    { home: "Jonjinho United", away: "FC Handkantenschlag", hs: 1, as: 3 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 2, as: 0 },
    { home: "Peacock City", away: "Augerl FC", hs: 0, as: 7 },
    { home: "FC Kuppenkaskauer", away: "Soft D's", hs: 0, as: 3 },
    { home: "Hood Squad St.Peter", away: "Calcio Classico", hs: 1, as: 1 }
  ]},
  { gw: 37, matches: [
    { home: "Jonjinho United", away: "Hood Squad St.Peter", hs: 1, as: 3 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Peacock City", away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 0, as: 5 },
    { home: "Soft D's", away: "Augerl FC", hs: 3, as: 2 }
  ]},
  { gw: 38, matches: [
    { home: "Jonjinho United", away: "Peacock City", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 1, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 0, as: 1 },
    { home: "Soft D's", away: "FC Handkantenschlag", hs: 3, as: 5 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 2 }
  ]},
  ]},
  { label: "2021/22", data: [
  { gw: 1, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 0, as: 0 },
    { home: "Galactik Football", away: "G-Heart", hs: 3, as: 2 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 7, as: 1 },
    { home: "FC EZE MANE", away: "FC Elfmeterwappler", hs: 1, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 2, as: 5 }
  ]},
  { gw: 2, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 1, as: 3 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 1, as: 2 },
    { home: "FC EZE MANE", away: "G-Heart", hs: 4, as: 3 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "Calcio Classico", hs: 6, as: 2 }
  ]},
  { gw: 3, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 0, as: 2 },
    { home: "Galactik Football", away: "FC EZE MANE", hs: 5, as: 1 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 3, as: 1 },
    { home: "Calcio Classico", away: "G-Heart", hs: 3, as: 1 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 1, as: 4 }
  ]},
  { gw: 4, matches: [
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 4, as: 1 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 0, as: 1 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 3, as: 6 },
    { home: "FC EZE MANE", away: "Hood Squad St.Peter", hs: 1, as: 5 },
    { home: "St.Peter Rattlesnakes", away: "G-Heart", hs: 2, as: 2 }
  ]},
  { gw: 5, matches: [
    { home: "FC Handkantenschlag", away: "G-Heart", hs: 2, as: 3 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 4, as: 1 },
    { home: "Augerl FC", away: "FC Elfmeterwappler", hs: 4, as: 1 },
    { home: "FC EZE MANE", away: "Calcio Classico", hs: 2, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 2, as: 2 }
  ]},
  { gw: 6, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 0, as: 3 },
    { home: "Augerl FC", away: "G-Heart", hs: 0, as: 2 },
    { home: "FC EZE MANE", away: "St.Peter Rattlesnakes", hs: 1, as: 2 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 4, as: 3 },
    { home: "Calcio Classico", away: "Hood Squad St.Peter", hs: 1, as: 1 }
  ]},
  { gw: 7, matches: [
    { home: "FC Handkantenschlag", away: "FC EZE MANE", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 3, as: 0 },
    { home: "FC Kuppenkaskauer", away: "G-Heart", hs: 0, as: 0 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "Hood Squad St.Peter", hs: 1, as: 2 }
  ]},
  { gw: 8, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 1, as: 4 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 1, as: 4 },
    { home: "Augerl FC", away: "FC EZE MANE", hs: 5, as: 1 },
    { home: "FC Elfmeterwappler", away: "G-Heart", hs: 4, as: 1 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 3, as: 1 }
  ]},
  { gw: 9, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 1, as: 5 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 2, as: 1 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 3, as: 8 },
    { home: "FC EZE MANE", away: "FC Kuppenkaskauer", hs: 1, as: 2 },
    { home: "Hood Squad St.Peter", away: "G-Heart", hs: 0, as: 4 }
  ]},
  { gw: 10, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 3, as: 2 },
    { home: "Galactik Football", away: "G-Heart", hs: 0, as: 0 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 1, as: 5 },
    { home: "FC EZE MANE", away: "FC Elfmeterwappler", hs: 0, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 0, as: 0 }
  ]},
  { gw: 11, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 4, as: 0 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 2, as: 0 },
    { home: "FC EZE MANE", away: "G-Heart", hs: 1, as: 1 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 5, as: 1 },
    { home: "FC Elfmeterwappler", away: "Calcio Classico", hs: 1, as: 1 }
  ]},
  { gw: 12, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 3, as: 4 },
    { home: "Galactik Football", away: "FC EZE MANE", hs: 4, as: 3 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 3, as: 3 },
    { home: "Calcio Classico", away: "G-Heart", hs: 3, as: 1 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 1, as: 1 }
  ]},
  { gw: 13, matches: [
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 4, as: 3 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 4, as: 2 },
    { home: "FC EZE MANE", away: "Hood Squad St.Peter", hs: 1, as: 1 },
    { home: "St.Peter Rattlesnakes", away: "G-Heart", hs: 4, as: 2 }
  ]},
  { gw: 14, matches: [
    { home: "FC Handkantenschlag", away: "G-Heart", hs: 3, as: 1 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 4, as: 1 },
    { home: "Augerl FC", away: "FC Elfmeterwappler", hs: 2, as: 0 },
    { home: "FC EZE MANE", away: "Calcio Classico", hs: 0, as: 4 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 2, as: 3 }
  ]},
  { gw: 15, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 2, as: 3 },
    { home: "Augerl FC", away: "G-Heart", hs: 1, as: 2 },
    { home: "FC EZE MANE", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 7, as: 2 },
    { home: "Calcio Classico", away: "Hood Squad St.Peter", hs: 3, as: 1 }
  ]},
  { gw: 16, matches: [
    { home: "FC Handkantenschlag", away: "FC EZE MANE", hs: 4, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 2 },
    { home: "FC Kuppenkaskauer", away: "G-Heart", hs: 5, as: 0 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 2, as: 4 },
    { home: "FC Elfmeterwappler", away: "Hood Squad St.Peter", hs: 0, as: 0 }
  ]},
  { gw: 17, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 0, as: 4 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 3, as: 2 },
    { home: "Augerl FC", away: "FC EZE MANE", hs: 4, as: 2 },
    { home: "FC Elfmeterwappler", away: "G-Heart", hs: 6, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 4, as: 2 }
  ]},
  { gw: 18, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 2, as: 4 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "FC EZE MANE", away: "FC Kuppenkaskauer", hs: 3, as: 8 },
    { home: "Hood Squad St.Peter", away: "G-Heart", hs: 0, as: 4 }
  ]},
  { gw: 19, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 1, as: 0 },
    { home: "Galactik Football", away: "G-Heart", hs: 4, as: 0 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 5, as: 3 },
    { home: "FC EZE MANE", away: "FC Elfmeterwappler", hs: 3, as: 4 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 5, as: 0 }
  ]},
  { gw: 20, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 1, as: 4 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 1, as: 0 },
    { home: "FC EZE MANE", away: "G-Heart", hs: 2, as: 0 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 3, as: 1 },
    { home: "FC Elfmeterwappler", away: "Calcio Classico", hs: 2, as: 0 }
  ]},
  { gw: 21, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 0, as: 2 },
    { home: "Galactik Football", away: "FC EZE MANE", hs: 4, as: 1 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 0, as: 0 },
    { home: "Calcio Classico", away: "G-Heart", hs: 0, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 0, as: 2 }
  ]},
  { gw: 22, matches: [
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 4, as: 4 },
    { home: "FC EZE MANE", away: "Hood Squad St.Peter", hs: 0, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "G-Heart", hs: 1, as: 2 }
  ]},
  { gw: 23, matches: [
    { home: "FC Handkantenschlag", away: "G-Heart", hs: 3, as: 0 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 0, as: 1 },
    { home: "Augerl FC", away: "FC Elfmeterwappler", hs: 1, as: 4 },
    { home: "FC EZE MANE", away: "Calcio Classico", hs: 1, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 2, as: 3 }
  ]},
  { gw: 24, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 2, as: 0 },
    { home: "Augerl FC", away: "G-Heart", hs: 1, as: 1 },
    { home: "FC EZE MANE", away: "St.Peter Rattlesnakes", hs: 0, as: 4 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 4, as: 3 },
    { home: "Calcio Classico", away: "Hood Squad St.Peter", hs: 0, as: 0 }
  ]},
  { gw: 25, matches: [
    { home: "FC Handkantenschlag", away: "FC EZE MANE", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 0 },
    { home: "FC Kuppenkaskauer", away: "G-Heart", hs: 7, as: 0 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 0, as: 4 },
    { home: "FC Elfmeterwappler", away: "Hood Squad St.Peter", hs: 0, as: 0 }
  ]},
  { gw: 26, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 2, as: 4 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 1, as: 0 },
    { home: "Augerl FC", away: "FC EZE MANE", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "G-Heart", hs: 0, as: 4 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 1, as: 0 }
  ]},
  { gw: 27, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 0, as: 4 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 4, as: 2 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "FC EZE MANE", away: "FC Kuppenkaskauer", hs: 2, as: 7 },
    { home: "Hood Squad St.Peter", away: "G-Heart", hs: 0, as: 0 }
  ]},
  { gw: 28, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 1, as: 0 },
    { home: "Galactik Football", away: "G-Heart", hs: 5, as: 7 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 7, as: 2 },
    { home: "FC EZE MANE", away: "FC Elfmeterwappler", hs: 4, as: 4 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 5, as: 0 }
  ]},
  { gw: 29, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 4, as: 5 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 2, as: 0 },
    { home: "FC EZE MANE", away: "G-Heart", hs: 2, as: 4 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 2, as: 1 },
    { home: "FC Elfmeterwappler", away: "Calcio Classico", hs: 0, as: 4 }
  ]},
  { gw: 30, matches: [
    { home: "FC Handkantenschlag", away: "FC Kuppenkaskauer", hs: 0, as: 3 },
    { home: "Galactik Football", away: "FC EZE MANE", hs: 4, as: 4 },
    { home: "Augerl FC", away: "Hood Squad St.Peter", hs: 4, as: 0 },
    { home: "Calcio Classico", away: "G-Heart", hs: 0, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 2 }
  ]},
  { gw: 31, matches: [
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 3, as: 2 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 0, as: 3 },
    { home: "FC EZE MANE", away: "Hood Squad St.Peter", hs: 4, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "G-Heart", hs: 2, as: 0 }
  ]},
  { gw: 32, matches: [
    { home: "FC Handkantenschlag", away: "G-Heart", hs: 1, as: 1 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 9, as: 4 },
    { home: "Augerl FC", away: "FC Elfmeterwappler", hs: 0, as: 4 },
    { home: "FC EZE MANE", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Hood Squad St.Peter", hs: 0, as: 1 }
  ]},
  { gw: 33, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 4, as: 3 },
    { home: "Augerl FC", away: "G-Heart", hs: 4, as: 0 },
    { home: "FC EZE MANE", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 2, as: 5 },
    { home: "Calcio Classico", away: "Hood Squad St.Peter", hs: 0, as: 0 }
  ]},
  { gw: 34, matches: [
    { home: "FC Handkantenschlag", away: "FC EZE MANE", hs: 3, as: 3 },
    { home: "Galactik Football", away: "Augerl FC", hs: 0, as: 3 },
    { home: "FC Kuppenkaskauer", away: "G-Heart", hs: 3, as: null },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: null, as: 1 },
    { home: "FC Elfmeterwappler", away: "Hood Squad St.Peter", hs: 2, as: 1 }
  ]},
  { gw: 35, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 3, as: 3 },
    { home: "Augerl FC", away: "FC EZE MANE", hs: 3, as: 4 },
    { home: "FC Elfmeterwappler", away: "G-Heart", hs: 2, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "Hood Squad St.Peter", hs: 3, as: 1 }
  ]},
  { gw: 36, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 0, as: 3 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 0, as: 2 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 5, as: null },
    { home: "FC EZE MANE", away: "FC Kuppenkaskauer", hs: null, as: 7 },
    { home: "Hood Squad St.Peter", away: "G-Heart", hs: 3, as: null }
  ]},
  { gw: 37, matches: [
    { home: "FC Handkantenschlag", away: "Hood Squad St.Peter", hs: 2, as: 0 },
    { home: "Galactik Football", away: "G-Heart", hs: 2, as: 2 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "FC EZE MANE", away: "FC Elfmeterwappler", hs: 0, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 4, as: 0 }
  ]},
  { gw: 38, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Hood Squad St.Peter", hs: 5, as: 1 },
    { home: "FC EZE MANE", away: "G-Heart", hs: 3, as: 2 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 2, as: 4 },
    { home: "FC Elfmeterwappler", away: "Calcio Classico", hs: 1, as: 0 }
  ]},
  ]},
  { label: "2022/23", data: [
  { gw: 1, matches: [
    { home: "1 FC DIXX", away: "FC Elfmeterwappler", hs: 0, as: 5 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 3, as: 0 },
    { home: "Galactik Football", away: "FC Rich Sons", hs: 1, as: 0 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 2, as: 4 },
    { home: "Weiter immer weiter jota", away: "Calcio Classico", hs: 3, as: 4 }
  ]},
  { gw: 2, matches: [
    { home: "1 FC DIXX", away: "Galactik Football", hs: 2, as: 5 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 2, as: 3 },
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 1, as: 0 },
    { home: "Weiter immer weiter jota", away: "FC Rich Sons", hs: 2, as: 4 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 4, as: 1 }
  ]},
  { gw: 3, matches: [
    { home: "1 FC DIXX", away: "Weiter immer weiter jota", hs: 5, as: 4 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 1, as: 2 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 3, as: 3 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 0, as: 4 },
    { home: "FC Rich Sons", away: "St.Peter Rattlesnakes", hs: 0, as: 2 }
  ]},
  { gw: 4, matches: [
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 5, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 4, as: 1 },
    { home: "Galactik Football", away: "Weiter immer weiter jota", hs: 3, as: 0 },
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 5, as: 3 },
    { home: "FC Rich Sons", away: "Augerl FC", hs: 2, as: 1 }
  ]},
  { gw: 5, matches: [
    { home: "1 FC DIXX", away: "Augerl FC", hs: 1, as: 2 },
    { home: "FC Kuppenkaskauer", away: "FC Rich Sons", hs: 3, as: 0 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 2, as: 2 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 4, as: 0 },
    { home: "Weiter immer weiter jota", away: "FC Elfmeterwappler", hs: 3, as: 2 }
  ]},
  { gw: 6, matches: [
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 2, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 2 },
    { home: "FC Handkantenschlag", away: "FC Rich Sons", hs: 4, as: 1 },
    { home: "Weiter immer weiter jota", away: "St.Peter Rattlesnakes", hs: 2, as: 0 },
    { home: "Calcio Classico", away: "FC Elfmeterwappler", hs: 2, as: 3 }
  ]},
  { gw: 7, matches: [
    { home: "1 FC DIXX", away: "FC Handkantenschlag", hs: 0, as: 5 },
    { home: "FC Kuppenkaskauer", away: "Galactik Football", hs: 0, as: 1 },
    { home: "Weiter immer weiter jota", away: "Augerl FC", hs: 0, as: 0 },
    { home: "Calcio Classico", away: "FC Rich Sons", hs: 4, as: 3 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 4, as: 4 }
  ]},
  { gw: 8, matches: [
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Weiter immer weiter jota", hs: 0, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 3, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 1, as: 2 },
    { home: "FC Rich Sons", away: "FC Elfmeterwappler", hs: 3, as: 4 }
  ]},
  { gw: 9, matches: [
    { home: "1 FC DIXX", away: "FC Rich Sons", hs: 2, as: 0 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 1, as: 5 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "FC Handkantenschlag", away: "Weiter immer weiter jota", hs: 5, as: 5 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 0, as: 2 }
  ]},
  { gw: 10, matches: [
    { home: "1 FC DIXX", away: "FC Elfmeterwappler", hs: 1, as: 4 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 2, as: 3 },
    { home: "Galactik Football", away: "FC Rich Sons", hs: 2, as: 5 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 1, as: 2 },
    { home: "Weiter immer weiter jota", away: "Calcio Classico", hs: 5, as: 1 }
  ]},
  { gw: 11, matches: [
    { home: "1 FC DIXX", away: "Galactik Football", hs: 2, as: 1 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 1, as: 3 },
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 0, as: 4 },
    { home: "Weiter immer weiter jota", away: "FC Rich Sons", hs: 2, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 1, as: 4 }
  ]},
  { gw: 12, matches: [
    { home: "1 FC DIXX", away: "Weiter immer weiter jota", hs: 2, as: 3 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 1, as: 4 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 2, as: 3 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 0, as: 3 },
    { home: "FC Rich Sons", away: "St.Peter Rattlesnakes", hs: 1, as: 0 }
  ]},
  { gw: 13, matches: [
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 4, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "Galactik Football", away: "Weiter immer weiter jota", hs: 1, as: 0 },
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 4, as: 3 },
    { home: "FC Rich Sons", away: "Augerl FC", hs: 3, as: 0 }
  ]},
  { gw: 14, matches: [
    { home: "1 FC DIXX", away: "Augerl FC", hs: 3, as: 2 },
    { home: "FC Kuppenkaskauer", away: "FC Rich Sons", hs: 0, as: 2 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 4, as: 1 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 5, as: 2 },
    { home: "Weiter immer weiter jota", away: "FC Elfmeterwappler", hs: 0, as: 1 }
  ]},
  { gw: 15, matches: [
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 3, as: 0 },
    { home: "FC Handkantenschlag", away: "FC Rich Sons", hs: 1, as: 2 },
    { home: "Weiter immer weiter jota", away: "St.Peter Rattlesnakes", hs: 2, as: 0 },
    { home: "Calcio Classico", away: "FC Elfmeterwappler", hs: 2, as: 3 }
  ]},
  { gw: 16, matches: [
    { home: "1 FC DIXX", away: "FC Handkantenschlag", hs: 7, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Galactik Football", hs: 3, as: 0 },
    { home: "Weiter immer weiter jota", away: "Augerl FC", hs: 1, as: 0 },
    { home: "Calcio Classico", away: "FC Rich Sons", hs: 0, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 2, as: 4 }
  ]},
  { gw: 17, matches: [
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 1, as: 4 },
    { home: "FC Kuppenkaskauer", away: "Weiter immer weiter jota", hs: 0, as: 2 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 2, as: 5 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 3, as: 2 },
    { home: "FC Rich Sons", away: "FC Elfmeterwappler", hs: 0, as: 3 }
  ]},
  { gw: 18, matches: [
    { home: "1 FC DIXX", away: "FC Rich Sons", hs: 2, as: 2 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "FC Handkantenschlag", away: "Weiter immer weiter jota", hs: 3, as: 1 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 4, as: 3 }
  ]},
  { gw: 19, matches: [
    { home: "1 FC DIXX", away: "FC Elfmeterwappler", hs: 1, as: 6 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 0, as: 2 },
    { home: "Galactik Football", away: "FC Rich Sons", hs: 2, as: 4 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Weiter immer weiter jota", away: "Calcio Classico", hs: 2, as: 1 }
  ]},
  { gw: 20, matches: [
    { home: "1 FC DIXX", away: "Galactik Football", hs: 4, as: 2 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 1, as: 1 },
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 2, as: 2 },
    { home: "Weiter immer weiter jota", away: "FC Rich Sons", hs: 0, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 3, as: 0 }
  ]},
  { gw: 21, matches: [
    { home: "1 FC DIXX", away: "Weiter immer weiter jota", hs: 2, as: 0 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 1, as: 4 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 1, as: 3 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 0, as: 3 },
    { home: "FC Rich Sons", away: "St.Peter Rattlesnakes", hs: 0, as: 5 }
  ]},
  { gw: 22, matches: [
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Weiter immer weiter jota", hs: 4, as: 0 },
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 3, as: 2 },
    { home: "FC Rich Sons", away: "Augerl FC", hs: 4, as: 0 }
  ]},
  { gw: 23, matches: [
    { home: "1 FC DIXX", away: "Augerl FC", hs: 0, as: 0 },
    { home: "FC Kuppenkaskauer", away: "FC Rich Sons", hs: 1, as: 0 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 2, as: 4 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 2, as: 3 },
    { home: "Weiter immer weiter jota", away: "FC Elfmeterwappler", hs: 0, as: 3 }
  ]},
  { gw: 24, matches: [
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 1 },
    { home: "FC Handkantenschlag", away: "FC Rich Sons", hs: 5, as: 4 },
    { home: "Weiter immer weiter jota", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "Calcio Classico", away: "FC Elfmeterwappler", hs: 1, as: 0 }
  ]},
  { gw: 25, matches: [
    { home: "1 FC DIXX", away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "FC Kuppenkaskauer", away: "Galactik Football", hs: 0, as: 1 },
    { home: "Weiter immer weiter jota", away: "Augerl FC", hs: 3, as: 2 },
    { home: "Calcio Classico", away: "FC Rich Sons", hs: 0, as: 3 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 2, as: 0 }
  ]},
  { gw: 26, matches: [
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 1, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Weiter immer weiter jota", hs: 4, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 1, as: 3 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 0 },
    { home: "FC Rich Sons", away: "FC Elfmeterwappler", hs: 1, as: 2 }
  ]},
  { gw: 27, matches: [
    { home: "1 FC DIXX", away: "FC Rich Sons", hs: 2, as: 3 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "FC Handkantenschlag", away: "Weiter immer weiter jota", hs: 3, as: 1 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 5, as: 1 }
  ]},
  { gw: 28, matches: [
    { home: "1 FC DIXX", away: "FC Elfmeterwappler", hs: 0, as: 3 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 0, as: 1 },
    { home: "Galactik Football", away: "FC Rich Sons", hs: 1, as: 3 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 0, as: 1 },
    { home: "Weiter immer weiter jota", away: "Calcio Classico", hs: 1, as: 0 }
  ]},
  { gw: 29, matches: [
    { home: "1 FC DIXX", away: "Galactik Football", hs: 2, as: 1 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 0, as: 1 },
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 0, as: 3 },
    { home: "Weiter immer weiter jota", away: "FC Rich Sons", hs: 0, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 4, as: 0 }
  ]},
  { gw: 30, matches: [
    { home: "1 FC DIXX", away: "Weiter immer weiter jota", hs: 0, as: 0 },
    { home: "FC Kuppenkaskauer", away: "FC Handkantenschlag", hs: 0, as: 4 },
    { home: "Galactik Football", away: "FC Elfmeterwappler", hs: 1, as: 1 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 0, as: 3 },
    { home: "FC Rich Sons", away: "St.Peter Rattlesnakes", hs: 4, as: 2 }
  ]},
  { gw: 31, matches: [
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 0, as: 4 },
    { home: "FC Kuppenkaskauer", away: "Calcio Classico", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Weiter immer weiter jota", hs: 2, as: 3 },
    { home: "FC Handkantenschlag", away: "FC Elfmeterwappler", hs: 2, as: 0 },
    { home: "FC Rich Sons", away: "Augerl FC", hs: 4, as: 4 }
  ]},
  { gw: 32, matches: [
    { home: "1 FC DIXX", away: "Augerl FC", hs: 0, as: 3 },
    { home: "FC Kuppenkaskauer", away: "FC Rich Sons", hs: 0, as: 3 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 5, as: 2 },
    { home: "Weiter immer weiter jota", away: "FC Elfmeterwappler", hs: 3, as: 0 }
  ]},
  { gw: 33, matches: [
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 1, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 3 },
    { home: "FC Handkantenschlag", away: "FC Rich Sons", hs: 5, as: 3 },
    { home: "Weiter immer weiter jota", away: "St.Peter Rattlesnakes", hs: 0, as: 1 },
    { home: "Calcio Classico", away: "FC Elfmeterwappler", hs: 0, as: 3 }
  ]},
  { gw: 34, matches: [
    { home: "1 FC DIXX", away: "FC Handkantenschlag", hs: 4, as: 5 },
    { home: "FC Kuppenkaskauer", away: "Galactik Football", hs: 0, as: 0 },
    { home: "Weiter immer weiter jota", away: "Augerl FC", hs: 0, as: 0 },
    { home: "Calcio Classico", away: "FC Rich Sons", hs: 0, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 1, as: 4 }
  ]},
  { gw: 35, matches: [
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 4, as: 0 },
    { home: "FC Kuppenkaskauer", away: "Weiter immer weiter jota", hs: 0, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 0, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 5, as: 0 },
    { home: "FC Rich Sons", away: "FC Elfmeterwappler", hs: 1, as: 1 }
  ]},
  { gw: 36, matches: [
    { home: "1 FC DIXX", away: "FC Rich Sons", hs: 2, as: 6 },
    { home: "FC Kuppenkaskauer", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "FC Handkantenschlag", away: "Weiter immer weiter jota", hs: 5, as: 1 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 2, as: 1 }
  ]},
  { gw: 37, matches: [
    { home: "1 FC DIXX", away: "FC Elfmeterwappler", hs: 2, as: 2 },
    { home: "FC Kuppenkaskauer", away: "Augerl FC", hs: 0, as: 4 },
    { home: "Galactik Football", away: "FC Rich Sons", hs: 0, as: 2 },
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "Weiter immer weiter jota", away: "Calcio Classico", hs: 2, as: 0 }
  ]},
  { gw: 38, matches: [
    { home: "1 FC DIXX", away: "Galactik Football", hs: 0, as: 3 },
    { home: "FC Kuppenkaskauer", away: "FC Elfmeterwappler", hs: 0, as: 5 },
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 0, as: 2 },
    { home: "Weiter immer weiter jota", away: "FC Rich Sons", hs: 0, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "Calcio Classico", hs: 1, as: 0 }
  ]},
  ]},
  { label: "2023/24", data: [
  { gw: 1, matches: [
    { home: "Modus GHart", away: "St.Peter Rattlesnakes", hs: 0, as: 3 },
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 1, as: 1 },
    { home: "Soft Ds", away: "Calcio Classico", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 0, as: 2 },
    { home: "Kein Coufal C.F.", away: "Eze2nd", hs: 3, as: 1 }
  ]},
  { gw: 2, matches: [
    { home: "Modus GHart", away: "Soft Ds", hs: 2, as: 2 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 4, as: 2 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 0, as: 3 },
    { home: "Kein Coufal C.F.", away: "Calcio Classico", hs: 0, as: 4 },
    { home: "Augerl FC", away: "Eze2nd", hs: 2, as: 1 }
  ]},
  { gw: 3, matches: [
    { home: "Modus GHart", away: "Kein Coufal C.F.", hs: 2, as: 2 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 2, as: 3 },
    { home: "Soft Ds", away: "St.Peter Rattlesnakes", hs: 1, as: 1 },
    { home: "Eze2nd", away: "FC Kuppenkaskauer", hs: 2, as: 1 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 0, as: 8 }
  ]},
  { gw: 4, matches: [
    { home: "Modus GHart", away: "Augerl FC", hs: 4, as: 4 },
    { home: "1 FC DIXX", away: "Eze2nd", hs: 3, as: 1 },
    { home: "Soft Ds", away: "Kein Coufal C.F.", hs: 1, as: 3 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Calcio Classico", away: "FC Kuppenkaskauer", hs: 1, as: 1 }
  ]},
  { gw: 5, matches: [
    { home: "Modus GHart", away: "FC Kuppenkaskauer", hs: 0, as: 3 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Soft Ds", away: "Augerl FC", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Eze2nd", hs: 1, as: 0 },
    { home: "Kein Coufal C.F.", away: "St.Peter Rattlesnakes", hs: 2, as: 3 }
  ]},
  { gw: 6, matches: [
    { home: "Modus GHart", away: "1 FC DIXX", hs: 0, as: 3 },
    { home: "Soft Ds", away: "FC Kuppenkaskauer", hs: 0, as: 6 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 1, as: 2 },
    { home: "Kein Coufal C.F.", away: "Augerl FC", hs: 0, as: 4 },
    { home: "Eze2nd", away: "St.Peter Rattlesnakes", hs: 1, as: 4 }
  ]},
  { gw: 7, matches: [
    { home: "Modus GHart", away: "Galactik Football", hs: 1, as: 0 },
    { home: "1 FC DIXX", away: "Soft Ds", hs: 3, as: 1 },
    { home: "Kein Coufal C.F.", away: "FC Kuppenkaskauer", hs: 1, as: 8 },
    { home: "Eze2nd", away: "Calcio Classico", hs: 2, as: 2 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 3, as: 3 }
  ]},
  { gw: 8, matches: [
    { home: "Modus GHart", away: "Eze2nd", hs: 1, as: 0 },
    { home: "1 FC DIXX", away: "Kein Coufal C.F.", hs: 1, as: 2 },
    { home: "Soft Ds", away: "Galactik Football", hs: 0, as: 2 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 5, as: 3 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 1, as: 3 }
  ]},
  { gw: 9, matches: [
    { home: "Modus GHart", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "1 FC DIXX", away: "Augerl FC", hs: 4, as: 4 },
    { home: "Soft Ds", away: "Eze2nd", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Kein Coufal C.F.", hs: 1, as: 4 },
    { home: "St.Peter Rattlesnakes", away: "FC Kuppenkaskauer", hs: 1, as: 5 }
  ]},
  { gw: 10, matches: [
    { home: "Modus GHart", away: "St.Peter Rattlesnakes", hs: 5, as: 4 },
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 1, as: 2 },
    { home: "Soft Ds", away: "Calcio Classico", hs: 2, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 2 },
    { home: "Kein Coufal C.F.", away: "Eze2nd", hs: 1, as: 0 }
  ]},
  { gw: 11, matches: [
    { home: "Modus GHart", away: "Soft Ds", hs: 0, as: 3 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 1, as: 1 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 6, as: 4 },
    { home: "Kein Coufal C.F.", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "Augerl FC", away: "Eze2nd", hs: 0, as: 4 }
  ]},
  { gw: 12, matches: [
    { home: "Modus GHart", away: "Kein Coufal C.F.", hs: 3, as: 3 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 0, as: 4 },
    { home: "Soft Ds", away: "St.Peter Rattlesnakes", hs: 1, as: 1 },
    { home: "Eze2nd", away: "FC Kuppenkaskauer", hs: 2, as: 0 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 0, as: 2 }
  ]},
  { gw: 13, matches: [
    { home: "Modus GHart", away: "Augerl FC", hs: 1, as: 2 },
    { home: "1 FC DIXX", away: "Eze2nd", hs: 0, as: 0 },
    { home: "Soft Ds", away: "Kein Coufal C.F.", hs: 0, as: 3 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 1, as: 2 },
    { home: "Calcio Classico", away: "FC Kuppenkaskauer", hs: 0, as: 2 }
  ]},
  { gw: 14, matches: [
    { home: "Modus GHart", away: "FC Kuppenkaskauer", hs: 0, as: 3 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "Soft Ds", away: "Augerl FC", hs: 2, as: 3 },
    { home: "Galactik Football", away: "Eze2nd", hs: 1, as: 0 },
    { home: "Kein Coufal C.F.", away: "St.Peter Rattlesnakes", hs: 2, as: 6 }
  ]},
  { gw: 15, matches: [
    { home: "Modus GHart", away: "1 FC DIXX", hs: 2, as: 0 },
    { home: "Soft Ds", away: "FC Kuppenkaskauer", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "Kein Coufal C.F.", away: "Augerl FC", hs: 5, as: 2 },
    { home: "Eze2nd", away: "St.Peter Rattlesnakes", hs: 2, as: 2 }
  ]},
  { gw: 16, matches: [
    { home: "Modus GHart", away: "Galactik Football", hs: 0, as: 2 },
    { home: "1 FC DIXX", away: "Soft Ds", hs: 1, as: 0 },
    { home: "Kein Coufal C.F.", away: "FC Kuppenkaskauer", hs: 3, as: 0 },
    { home: "Eze2nd", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 3, as: 0 }
  ]},
  { gw: 17, matches: [
    { home: "Modus GHart", away: "Eze2nd", hs: 4, as: 0 },
    { home: "1 FC DIXX", away: "Kein Coufal C.F.", hs: 3, as: 4 },
    { home: "Soft Ds", away: "Galactik Football", hs: 1, as: 3 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 5, as: 3 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 0, as: 2 }
  ]},
  { gw: 18, matches: [
    { home: "Modus GHart", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "1 FC DIXX", away: "Augerl FC", hs: 0, as: 1 },
    { home: "Soft Ds", away: "Eze2nd", hs: 0, as: 2 },
    { home: "Galactik Football", away: "Kein Coufal C.F.", hs: 0, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "FC Kuppenkaskauer", hs: 0, as: 0 }
  ]},
  { gw: 19, matches: [
    { home: "Modus GHart", away: "St.Peter Rattlesnakes", hs: 0, as: 1 },
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 4, as: 1 },
    { home: "Soft Ds", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 0, as: 1 },
    { home: "Kein Coufal C.F.", away: "Eze2nd", hs: 5, as: 2 }
  ]},
  { gw: 20, matches: [
    { home: "Modus GHart", away: "Soft Ds", hs: 1, as: 2 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 3, as: 2 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 1, as: 2 },
    { home: "Kein Coufal C.F.", away: "Calcio Classico", hs: 6, as: 0 },
    { home: "Augerl FC", away: "Eze2nd", hs: 2, as: 4 }
  ]},
  { gw: 21, matches: [
    { home: "Modus GHart", away: "Kein Coufal C.F.", hs: 3, as: 3 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 0, as: 2 },
    { home: "Soft Ds", away: "St.Peter Rattlesnakes", hs: 4, as: 3 },
    { home: "Eze2nd", away: "FC Kuppenkaskauer", hs: 6, as: 1 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 1, as: 2 }
  ]},
  { gw: 22, matches: [
    { home: "Modus GHart", away: "Augerl FC", hs: 0, as: 3 },
    { home: "1 FC DIXX", away: "Eze2nd", hs: 1, as: 6 },
    { home: "Soft Ds", away: "Kein Coufal C.F.", hs: 2, as: 2 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 2, as: 1 },
    { home: "Calcio Classico", away: "FC Kuppenkaskauer", hs: 0, as: 0 }
  ]},
  { gw: 23, matches: [
    { home: "Modus GHart", away: "FC Kuppenkaskauer", hs: 1, as: 5 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 0, as: 1 },
    { home: "Soft Ds", away: "Augerl FC", hs: 2, as: 1 },
    { home: "Galactik Football", away: "Eze2nd", hs: 1, as: 1 },
    { home: "Kein Coufal C.F.", away: "St.Peter Rattlesnakes", hs: 5, as: 1 }
  ]},
  { gw: 24, matches: [
    { home: "Modus GHart", away: "1 FC DIXX", hs: 4, as: 0 },
    { home: "Soft Ds", away: "FC Kuppenkaskauer", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 5, as: 1 },
    { home: "Kein Coufal C.F.", away: "Augerl FC", hs: 2, as: 0 },
    { home: "Eze2nd", away: "St.Peter Rattlesnakes", hs: 3, as: 7 }
  ]},
  { gw: 25, matches: [
    { home: "Modus GHart", away: "Galactik Football", hs: 0, as: 2 },
    { home: "1 FC DIXX", away: "Soft Ds", hs: 0, as: 0 },
    { home: "Kein Coufal C.F.", away: "FC Kuppenkaskauer", hs: 1, as: 1 },
    { home: "Eze2nd", away: "Calcio Classico", hs: 1, as: 3 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 2, as: 5 }
  ]},
  { gw: 26, matches: [
    { home: "Modus GHart", away: "Eze2nd", hs: 0, as: 4 },
    { home: "1 FC DIXX", away: "Kein Coufal C.F.", hs: 0, as: 4 },
    { home: "Soft Ds", away: "Galactik Football", hs: 0, as: 0 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 2, as: 0 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 0, as: 3 }
  ]},
  { gw: 27, matches: [
    { home: "Modus GHart", away: "Calcio Classico", hs: 2, as: 1 },
    { home: "1 FC DIXX", away: "Augerl FC", hs: 2, as: 1 },
    { home: "Soft Ds", away: "Eze2nd", hs: 0, as: 3 },
    { home: "Galactik Football", away: "Kein Coufal C.F.", hs: 0, as: 2 },
    { home: "St.Peter Rattlesnakes", away: "FC Kuppenkaskauer", hs: 3, as: 7 }
  ]},
  { gw: 28, matches: [
    { home: "Modus GHart", away: "St.Peter Rattlesnakes", hs: 1, as: 3 },
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 2, as: 0 },
    { home: "Soft Ds", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 2 },
    { home: "Kein Coufal C.F.", away: "Eze2nd", hs: 2, as: 0 }
  ]},
  { gw: 29, matches: [
    { home: "Modus GHart", away: "Soft Ds", hs: 0, as: 4 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 0, as: 4 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 0, as: 0 },
    { home: "Kein Coufal C.F.", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Augerl FC", away: "Eze2nd", hs: 2, as: 4 }
  ]},
  { gw: 30, matches: [
    { home: "Modus GHart", away: "Kein Coufal C.F.", hs: 1, as: 2 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 4, as: 0 },
    { home: "Soft Ds", away: "St.Peter Rattlesnakes", hs: 0, as: 7 },
    { home: "Eze2nd", away: "FC Kuppenkaskauer", hs: 1, as: 0 },
    { home: "Calcio Classico", away: "Augerl FC", hs: 0, as: 2 }
  ]},
  { gw: 31, matches: [
    { home: "Modus GHart", away: "Augerl FC", hs: 2, as: 0 },
    { home: "1 FC DIXX", away: "Eze2nd", hs: 0, as: 4 },
    { home: "Soft Ds", away: "Kein Coufal C.F.", hs: 0, as: 4 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Calcio Classico", away: "FC Kuppenkaskauer", hs: 0, as: 0 }
  ]},
  { gw: 32, matches: [
    { home: "Modus GHart", away: "FC Kuppenkaskauer", hs: 0, as: 0 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "Soft Ds", away: "Augerl FC", hs: 4, as: 2 },
    { home: "Galactik Football", away: "Eze2nd", hs: 3, as: 4 },
    { home: "Kein Coufal C.F.", away: "St.Peter Rattlesnakes", hs: 1, as: 0 }
  ]},
  { gw: 33, matches: [
    { home: "Modus GHart", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Soft Ds", away: "FC Kuppenkaskauer", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "Kein Coufal C.F.", away: "Augerl FC", hs: 8, as: 2 },
    { home: "Eze2nd", away: "St.Peter Rattlesnakes", hs: 4, as: 1 }
  ]},
  { gw: 34, matches: [
    { home: "Modus GHart", away: "Galactik Football", hs: 4, as: 2 },
    { home: "1 FC DIXX", away: "Soft Ds", hs: 3, as: 0 },
    { home: "Kein Coufal C.F.", away: "FC Kuppenkaskauer", hs: 3, as: 0 },
    { home: "Eze2nd", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 5, as: 2 }
  ]},
  { gw: 35, matches: [
    { home: "Modus GHart", away: "Eze2nd", hs: 0, as: 2 },
    { home: "1 FC DIXX", away: "Kein Coufal C.F.", hs: 4, as: 1 },
    { home: "Soft Ds", away: "Galactik Football", hs: 2, as: 1 },
    { home: "Augerl FC", away: "FC Kuppenkaskauer", hs: 1, as: 0 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 0, as: 3 }
  ]},
  { gw: 36, matches: [
    { home: "Modus GHart", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "1 FC DIXX", away: "Augerl FC", hs: 4, as: 3 },
    { home: "Soft Ds", away: "Eze2nd", hs: 1, as: 4 },
    { home: "Galactik Football", away: "Kein Coufal C.F.", hs: 5, as: 0 },
    { home: "St.Peter Rattlesnakes", away: "FC Kuppenkaskauer", hs: 5, as: 0 }
  ]},
  { gw: 37, matches: [
    { home: "Modus GHart", away: "St.Peter Rattlesnakes", hs: 3, as: 1 },
    { home: "1 FC DIXX", away: "FC Kuppenkaskauer", hs: 0, as: 0 },
    { home: "Soft Ds", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 4, as: 2 },
    { home: "Kein Coufal C.F.", away: "Eze2nd", hs: 2, as: 1 }
  ]},
  { gw: 38, matches: [
    { home: "Modus GHart", away: "Soft Ds", hs: 0, as: 0 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "Galactik Football", away: "FC Kuppenkaskauer", hs: 2, as: 0 },
    { home: "Kein Coufal C.F.", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "Augerl FC", away: "Eze2nd", hs: 4, as: 0 }
  ]},
  ]},
  { label: "2024/25", data: [
  { gw: 1, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 1, as: 2 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 3, as: 3 },
    { home: "FC Destiny 58", away: "Tu dir bitte net weh KDB", hs: 0, as: 1 },
    { home: "Eze lover", away: "1 FC DIXX", hs: 2, as: 4 },
    { home: "CA$H BENTLEY UNITED", away: "Calcio Classico", hs: 2, as: 0 }
  ]},
  { gw: 2, matches: [
    { home: "FC Handkantenschlag", away: "FC Destiny 58", hs: 1, as: 1 },
    { home: "Augerl FC", away: "Galactik Football", hs: 3, as: 4 },
    { home: "Eze lover", away: "St.Peter Rattlesnakes", hs: 4, as: 1 },
    { home: "CA$H BENTLEY UNITED", away: "Tu dir bitte net weh KDB", hs: 5, as: 4 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 4, as: 2 }
  ]},
  { gw: 3, matches: [
    { home: "FC Handkantenschlag", away: "CA$H BENTLEY UNITED", hs: 0, as: 3 },
    { home: "Augerl FC", away: "Eze lover", hs: 4, as: 2 },
    { home: "FC Destiny 58", away: "Galactik Football", hs: 0, as: 1 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "Tu dir bitte net weh KDB", away: "1 FC DIXX", hs: 0, as: 4 }
  ]},
  { gw: 4, matches: [
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 1, as: 1 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 1, as: 1 },
    { home: "FC Destiny 58", away: "CA$H BENTLEY UNITED", hs: 4, as: 5 },
    { home: "Eze lover", away: "Galactik Football", hs: 0, as: 0 },
    { home: "Tu dir bitte net weh KDB", away: "St.Peter Rattlesnakes", hs: 1, as: 2 }
  ]},
  { gw: 5, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 2, as: 1 },
    { home: "Augerl FC", away: "Tu dir bitte net weh KDB", hs: 2, as: 0 },
    { home: "FC Destiny 58", away: "1 FC DIXX", hs: 0, as: 3 },
    { home: "Eze lover", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "CA$H BENTLEY UNITED", away: "Galactik Football", hs: 3, as: 4 }
  ]},
  { gw: 6, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 0, as: 3 },
    { home: "FC Destiny 58", away: "St.Peter Rattlesnakes", hs: 0, as: 1 },
    { home: "Eze lover", away: "Tu dir bitte net weh KDB", hs: 5, as: 0 },
    { home: "CA$H BENTLEY UNITED", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Calcio Classico", away: "Galactik Football", hs: 0, as: 1 }
  ]},
  { gw: 7, matches: [
    { home: "FC Handkantenschlag", away: "Eze lover", hs: 2, as: 1 },
    { home: "Augerl FC", away: "FC Destiny 58", hs: 2, as: 3 },
    { home: "CA$H BENTLEY UNITED", away: "St.Peter Rattlesnakes", hs: 3, as: 6 },
    { home: "Calcio Classico", away: "Tu dir bitte net weh KDB", hs: 3, as: 0 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 0, as: 3 }
  ]},
  { gw: 8, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "Augerl FC", away: "CA$H BENTLEY UNITED", hs: 3, as: 3 },
    { home: "FC Destiny 58", away: "Eze lover", hs: 2, as: 1 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "Tu dir bitte net weh KDB", away: "Galactik Football", hs: 1, as: 3 }
  ]},
  { gw: 9, matches: [
    { home: "FC Handkantenschlag", away: "Tu dir bitte net weh KDB", hs: 0, as: 1 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 3, as: 5 },
    { home: "FC Destiny 58", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Eze lover", away: "CA$H BENTLEY UNITED", hs: 2, as: 0 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 4, as: 1 }
  ]},
  { gw: 10, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 2, as: 1 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 3, as: 2 },
    { home: "FC Destiny 58", away: "Tu dir bitte net weh KDB", hs: 1, as: 0 },
    { home: "Eze lover", away: "1 FC DIXX", hs: 0, as: 2 },
    { home: "CA$H BENTLEY UNITED", away: "Calcio Classico", hs: 1, as: 2 }
  ]},
  { gw: 11, matches: [
    { home: "FC Handkantenschlag", away: "FC Destiny 58", hs: 5, as: 3 },
    { home: "Augerl FC", away: "Galactik Football", hs: 5, as: 1 },
    { home: "Eze lover", away: "St.Peter Rattlesnakes", hs: 1, as: 4 },
    { home: "CA$H BENTLEY UNITED", away: "Tu dir bitte net weh KDB", hs: 2, as: 0 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 2, as: 0 }
  ]},
  { gw: 12, matches: [
    { home: "FC Handkantenschlag", away: "CA$H BENTLEY UNITED", hs: 2, as: 2 },
    { home: "Augerl FC", away: "Eze lover", hs: 2, as: 2 },
    { home: "FC Destiny 58", away: "Galactik Football", hs: 4, as: 0 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 1, as: 2 },
    { home: "Tu dir bitte net weh KDB", away: "1 FC DIXX", hs: 3, as: 2 }
  ]},
  { gw: 13, matches: [
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 0, as: 4 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 7, as: 0 },
    { home: "FC Destiny 58", away: "CA$H BENTLEY UNITED", hs: 0, as: 3 },
    { home: "Eze lover", away: "Galactik Football", hs: 3, as: 3 },
    { home: "Tu dir bitte net weh KDB", away: "St.Peter Rattlesnakes", hs: 3, as: 6 }
  ]},
  { gw: 14, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 3, as: 2 },
    { home: "Augerl FC", away: "Tu dir bitte net weh KDB", hs: 6, as: 6 },
    { home: "FC Destiny 58", away: "1 FC DIXX", hs: 2, as: 0 },
    { home: "Eze lover", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "CA$H BENTLEY UNITED", away: "Galactik Football", hs: 0, as: 1 }
  ]},
  { gw: 15, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 2, as: 3 },
    { home: "FC Destiny 58", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "Eze lover", away: "Tu dir bitte net weh KDB", hs: 3, as: 0 },
    { home: "CA$H BENTLEY UNITED", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Calcio Classico", away: "Galactik Football", hs: 0, as: 2 }
  ]},
  { gw: 16, matches: [
    { home: "FC Handkantenschlag", away: "Eze lover", hs: 2, as: 0 },
    { home: "Augerl FC", away: "FC Destiny 58", hs: 1, as: 2 },
    { home: "CA$H BENTLEY UNITED", away: "St.Peter Rattlesnakes", hs: 2, as: 0 },
    { home: "Calcio Classico", away: "Tu dir bitte net weh KDB", hs: 0, as: 4 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 5, as: 5 }
  ]},
  { gw: 17, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 0, as: 4 },
    { home: "Augerl FC", away: "CA$H BENTLEY UNITED", hs: 6, as: 1 },
    { home: "FC Destiny 58", away: "Eze lover", hs: 4, as: 1 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 2, as: 1 },
    { home: "Tu dir bitte net weh KDB", away: "Galactik Football", hs: 1, as: 2 }
  ]},
  { gw: 18, matches: [
    { home: "FC Handkantenschlag", away: "Tu dir bitte net weh KDB", hs: 1, as: 1 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 4, as: 0 },
    { home: "FC Destiny 58", away: "Calcio Classico", hs: 3, as: 0 },
    { home: "Eze lover", away: "CA$H BENTLEY UNITED", hs: 3, as: 0 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 0, as: 2 }
  ]},
  { gw: 19, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 0, as: 6 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 5, as: 2 },
    { home: "FC Destiny 58", away: "Tu dir bitte net weh KDB", hs: 2, as: 0 },
    { home: "Eze lover", away: "1 FC DIXX", hs: 3, as: 3 },
    { home: "CA$H BENTLEY UNITED", away: "Calcio Classico", hs: 4, as: 0 }
  ]},
  { gw: 20, matches: [
    { home: "FC Handkantenschlag", away: "FC Destiny 58", hs: 2, as: 0 },
    { home: "Augerl FC", away: "Galactik Football", hs: 2, as: 1 },
    { home: "Eze lover", away: "St.Peter Rattlesnakes", hs: 3, as: 1 },
    { home: "CA$H BENTLEY UNITED", away: "Tu dir bitte net weh KDB", hs: 6, as: 1 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 4, as: 0 }
  ]},
  { gw: 21, matches: [
    { home: "FC Handkantenschlag", away: "CA$H BENTLEY UNITED", hs: 1, as: 1 },
    { home: "Augerl FC", away: "Eze lover", hs: 3, as: 4 },
    { home: "FC Destiny 58", away: "Galactik Football", hs: 2, as: 3 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 3, as: 0 },
    { home: "Tu dir bitte net weh KDB", away: "1 FC DIXX", hs: 2, as: 4 }
  ]},
  { gw: 22, matches: [
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 2, as: 4 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 2, as: 2 },
    { home: "FC Destiny 58", away: "CA$H BENTLEY UNITED", hs: 1, as: 3 },
    { home: "Eze lover", away: "Galactik Football", hs: 1, as: 7 },
    { home: "Tu dir bitte net weh KDB", away: "St.Peter Rattlesnakes", hs: 2, as: 1 }
  ]},
  { gw: 23, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 0, as: 0 },
    { home: "Augerl FC", away: "Tu dir bitte net weh KDB", hs: 5, as: 2 },
    { home: "FC Destiny 58", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "Eze lover", away: "Calcio Classico", hs: 2, as: 2 },
    { home: "CA$H BENTLEY UNITED", away: "Galactik Football", hs: 2, as: 1 }
  ]},
  { gw: 24, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 2, as: 5 },
    { home: "FC Destiny 58", away: "St.Peter Rattlesnakes", hs: 2, as: 0 },
    { home: "Eze lover", away: "Tu dir bitte net weh KDB", hs: 2, as: 0 },
    { home: "CA$H BENTLEY UNITED", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Calcio Classico", away: "Galactik Football", hs: 0, as: 6 }
  ]},
  { gw: 25, matches: [
    { home: "FC Handkantenschlag", away: "Eze lover", hs: 4, as: 2 },
    { home: "Augerl FC", away: "FC Destiny 58", hs: 2, as: 1 },
    { home: "CA$H BENTLEY UNITED", away: "St.Peter Rattlesnakes", hs: 3, as: 0 },
    { home: "Calcio Classico", away: "Tu dir bitte net weh KDB", hs: 0, as: 0 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 6, as: 2 }
  ]},
  { gw: 26, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 1, as: 1 },
    { home: "Augerl FC", away: "CA$H BENTLEY UNITED", hs: 6, as: 3 },
    { home: "FC Destiny 58", away: "Eze lover", hs: 1, as: 4 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Tu dir bitte net weh KDB", away: "Galactik Football", hs: 1, as: 3 }
  ]},
  { gw: 27, matches: [
    { home: "FC Handkantenschlag", away: "Tu dir bitte net weh KDB", hs: 2, as: 3 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 3, as: 6 },
    { home: "FC Destiny 58", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Eze lover", away: "CA$H BENTLEY UNITED", hs: 1, as: 4 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 3, as: 2 }
  ]},
  { gw: 28, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 3, as: 5 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 4, as: 1 },
    { home: "FC Destiny 58", away: "Tu dir bitte net weh KDB", hs: 2, as: 0 },
    { home: "Eze lover", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "CA$H BENTLEY UNITED", away: "Calcio Classico", hs: 3, as: 0 }
  ]},
  { gw: 29, matches: [
    { home: "FC Handkantenschlag", away: "FC Destiny 58", hs: 7, as: 0 },
    { home: "Augerl FC", away: "Galactik Football", hs: 2, as: 1 },
    { home: "Eze lover", away: "St.Peter Rattlesnakes", hs: 0, as: 2 },
    { home: "CA$H BENTLEY UNITED", away: "Tu dir bitte net weh KDB", hs: 4, as: 0 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 2, as: 0 }
  ]},
  { gw: 30, matches: [
    { home: "FC Handkantenschlag", away: "CA$H BENTLEY UNITED", hs: 5, as: 1 },
    { home: "Augerl FC", away: "Eze lover", hs: 1, as: 4 },
    { home: "FC Destiny 58", away: "Galactik Football", hs: 0, as: 0 },
    { home: "Calcio Classico", away: "St.Peter Rattlesnakes", hs: 0, as: 3 },
    { home: "Tu dir bitte net weh KDB", away: "1 FC DIXX", hs: 0, as: 3 }
  ]},
  { gw: 31, matches: [
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 2, as: 5 },
    { home: "Augerl FC", away: "Calcio Classico", hs: 1, as: 0 },
    { home: "FC Destiny 58", away: "CA$H BENTLEY UNITED", hs: 4, as: 0 },
    { home: "Eze lover", away: "Galactik Football", hs: 2, as: 0 },
    { home: "Tu dir bitte net weh KDB", away: "St.Peter Rattlesnakes", hs: 0, as: 4 }
  ]},
  { gw: 32, matches: [
    { home: "FC Handkantenschlag", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Augerl FC", away: "Tu dir bitte net weh KDB", hs: 2, as: 2 },
    { home: "FC Destiny 58", away: "1 FC DIXX", hs: 2, as: 2 },
    { home: "Eze lover", away: "Calcio Classico", hs: 2, as: 0 },
    { home: "CA$H BENTLEY UNITED", away: "Galactik Football", hs: 2, as: 1 }
  ]},
  { gw: 33, matches: [
    { home: "FC Handkantenschlag", away: "Augerl FC", hs: 0, as: 0 },
    { home: "FC Destiny 58", away: "St.Peter Rattlesnakes", hs: 5, as: 2 },
    { home: "Eze lover", away: "Tu dir bitte net weh KDB", hs: 2, as: 2 },
    { home: "CA$H BENTLEY UNITED", away: "1 FC DIXX", hs: 0, as: 3 },
    { home: "Calcio Classico", away: "Galactik Football", hs: 1, as: 2 }
  ]},
  { gw: 34, matches: [
    { home: "FC Handkantenschlag", away: "Eze lover", hs: 1, as: 3 },
    { home: "Augerl FC", away: "FC Destiny 58", hs: 3, as: 3 },
    { home: "CA$H BENTLEY UNITED", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Calcio Classico", away: "Tu dir bitte net weh KDB", hs: 0, as: 2 },
    { home: "1 FC DIXX", away: "Galactik Football", hs: 1, as: 0 }
  ]},
  { gw: 35, matches: [
    { home: "FC Handkantenschlag", away: "Calcio Classico", hs: 0, as: 0 },
    { home: "Augerl FC", away: "CA$H BENTLEY UNITED", hs: 2, as: 3 },
    { home: "FC Destiny 58", away: "Eze lover", hs: 0, as: 2 },
    { home: "1 FC DIXX", away: "St.Peter Rattlesnakes", hs: 2, as: 3 },
    { home: "Tu dir bitte net weh KDB", away: "Galactik Football", hs: 2, as: 0 }
  ]},
  { gw: 36, matches: [
    { home: "FC Handkantenschlag", away: "Tu dir bitte net weh KDB", hs: 0, as: 0 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 2, as: 3 },
    { home: "FC Destiny 58", away: "Calcio Classico", hs: 1, as: 2 },
    { home: "Eze lover", away: "CA$H BENTLEY UNITED", hs: 5, as: 4 },
    { home: "Galactik Football", away: "St.Peter Rattlesnakes", hs: 1, as: 1 }
  ]},
  { gw: 37, matches: [
    { home: "FC Handkantenschlag", away: "Galactik Football", hs: 3, as: 4 },
    { home: "Augerl FC", away: "St.Peter Rattlesnakes", hs: 1, as: 3 },
    { home: "FC Destiny 58", away: "Tu dir bitte net weh KDB", hs: 0, as: 0 },
    { home: "Eze lover", away: "1 FC DIXX", hs: 2, as: 1 },
    { home: "CA$H BENTLEY UNITED", away: "Calcio Classico", hs: 2, as: 1 }
  ]},
  { gw: 38, matches: [
    { home: "FC Handkantenschlag", away: "FC Destiny 58", hs: 0, as: 0 },
    { home: "Augerl FC", away: "Galactik Football", hs: 3, as: 0 },
    { home: "Eze lover", away: "St.Peter Rattlesnakes", hs: 1, as: 0 },
    { home: "CA$H BENTLEY UNITED", away: "Tu dir bitte net weh KDB", hs: 1, as: 1 },
    { home: "1 FC DIXX", away: "Calcio Classico", hs: 2, as: 3 }
  ]},
  ]},
  { label: "2025/26", data: [
  { gw: 1, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 3, as: 3 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 3, as: 4 },
    { home: "Galactik Football", away: "Reinildojul", hs: 4, as: 0 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 2, as: 2 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 1, as: 3 }
  ]},
  { gw: 2, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 6, as: 3 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 4, as: 1 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 0, as: 4 },
    { home: "Augerl FC", away: "Reinildojul", hs: 1, as: 0 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 3, as: 1 }
  ]},
  { gw: 3, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 1, as: 2 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 0, as: 3 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 0, as: 3 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 5, as: 2 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 2, as: 1 }
  ]},
  { gw: 4, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 0, as: 4 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 2 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 4, as: 4 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 5, as: 0 }
  ]},
  { gw: 5, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 3, as: 1 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 1, as: 0 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 2, as: 2 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 1, as: 3 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 2, as: 3 }
  ]},
  { gw: 6, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 1 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 2, as: 0 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 2, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 0, as: 3 }
  ]},
  { gw: 7, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 4, as: 1 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 7, as: 3 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 0, as: 2 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 1, as: 3 }
  ]},
  { gw: 8, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 4, as: 0 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 2, as: 4 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 0, as: 2 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 2, as: 3 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 1, as: 3 }
  ]},
  { gw: 9, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 3, as: 2 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 1, as: 2 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 1, as: 4 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 4, as: 3 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 0, as: 0 }
  ]},
  { gw: 10, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 2, as: 5 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 0, as: 3 },
    { home: "Galactik Football", away: "Reinildojul", hs: 3, as: 3 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 0, as: 5 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 3, as: 2 }
  ]},
  { gw: 11, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 3, as: 1 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "Augerl FC", away: "Reinildojul", hs: 1, as: 2 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 1, as: 3 }
  ]},
  { gw: 12, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 5 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 1, as: 0 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 5, as: 3 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 0, as: 5 }
  ]},
  { gw: 13, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 4, as: 0 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 1, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 2, as: 1 }
  ]},
  { gw: 14, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 2, as: 3 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 1, as: 6 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 2, as: 4 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 1, as: 1 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 1, as: 4 }
  ]},
  { gw: 15, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 2 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 1, as: 4 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 4, as: 3 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 4, as: 2 }
  ]},
  { gw: 16, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 4, as: 0 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 4, as: 0 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 5, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 1, as: 3 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 0, as: 4 }
  ]},
  { gw: 17, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 2, as: 0 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 3, as: 5 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 4, as: 3 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 1, as: 4 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 1, as: 3 }
  ]},
  { gw: 18, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 1, as: 1 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 6, as: 0 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 3, as: 0 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 2, as: 2 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 0, as: 2 }
  ]},
  { gw: 19, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 1, as: 2 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 2, as: 2 },
    { home: "Galactik Football", away: "Reinildojul", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 0, as: 6 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 3, as: 3 }
  ]},
  { gw: 20, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 6, as: 2 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 3, as: 0 },
    { home: "Augerl FC", away: "Reinildojul", hs: 2, as: 2 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 3, as: 0 }
  ]},
  { gw: 21, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 2, as: 1 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 0, as: 3 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 0, as: 5 }
  ]},
  { gw: 22, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 3, as: 3 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Augerl FC", hs: 1, as: 1 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 2, as: 1 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 1, as: 1 }
  ]},
  { gw: 23, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 1, as: 5 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 4, as: 3 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 0, as: 2 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 1, as: 2 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 3, as: 1 }
  ]},
  { gw: 24, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 1 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 1, as: 2 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 1, as: 3 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 2, as: 1 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 3, as: 4 }
  ]},
  { gw: 25, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 1, as: 3 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 1, as: 3 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 3, as: 1 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 7, as: 0 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 3, as: 3 }
  ]},
  { gw: 26, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 1, as: 5 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 4, as: 2 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 0, as: 0 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 2, as: 3 }
  ]},
  { gw: 27, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 2, as: 1 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 2, as: 1 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 3, as: 5 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 3, as: 3 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 1, as: 3 }
  ]},
  { gw: 28, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 3, as: 0 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 1, as: 4 },
    { home: "Galactik Football", away: "Reinildojul", hs: 1, as: 1 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 0, as: 2 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 4, as: 2 }
  ]},
  { gw: 29, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 5, as: 0 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 3, as: 0 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 0, as: 5 },
    { home: "Augerl FC", away: "Reinildojul", hs: 2, as: 0 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 8, as: 4 }
  ]},
  { gw: 30, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC", hs: 3, as: 3 },
    { home: "FC Elfmeterwappler", away: "Scarlett Johannson", hs: 1, as: 0 },
    { home: "Galactik Football", away: "FC Handkantenschlag", hs: 4, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "1 FC DIXX", hs: 4, as: 1 },
    { home: "Reinildojul", away: "FC Salaha-DEF", hs: 0, as: 3 }
  ]},
  { gw: 31, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF", hs: 1, as: 2 },
    { home: "FC Elfmeterwappler", away: "Iwobi Wan-Kenobi", hs: 3, as: 0 },
    { home: "Galactik Football", away: "Augerl FC", hs: 2, as: 3 },
    { home: "Scarlett Johannson", away: "FC Handkantenschlag", hs: 0, as: 0 },
    { home: "Reinildojul", away: "1 FC DIXX", hs: 0, as: 6 }
  ]},
  { gw: 32, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX", hs: 4, as: 1 },
    { home: "FC Elfmeterwappler", away: "Reinildojul", hs: 0, as: 2 },
    { home: "Galactik Football", away: "FC Salaha-DEF", hs: 7, as: 2 },
    { home: "Scarlett Johannson", away: "Iwobi Wan-Kenobi", hs: 0, as: 3 },
    { home: "Augerl FC", away: "FC Handkantenschlag", hs: 5, as: 1 }
  ]},
  { gw: 33, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler", hs: 3, as: 0 },
    { home: "Galactik Football", away: "1 FC DIXX", hs: 3, as: 8 },
    { home: "Scarlett Johannson", away: "Reinildojul", hs: 0, as: 1 },
    { home: "Augerl FC", away: "FC Salaha-DEF", hs: 4, as: 0 },
    { home: "Iwobi Wan-Kenobi", away: "FC Handkantenschlag", hs: 4, as: 2 }
  ]},
  { gw: 34, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson", hs: 2, as: 0 },
    { home: "FC Elfmeterwappler", away: "Galactik Football", hs: 1, as: 1 },
    { home: "Augerl FC", away: "1 FC DIXX", hs: 7, as: 2 },
    { home: "Iwobi Wan-Kenobi", away: "Reinildojul", hs: 1, as: 0 },
    { home: "FC Salaha-DEF", away: "FC Handkantenschlag", hs: 5, as: 2 }
  ]},
  { gw: 35, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi", hs: 4, as: 3 },
    { home: "FC Elfmeterwappler", away: "Augerl FC", hs: 3, as: 1 },
    { home: "Galactik Football", away: "Scarlett Johannson", hs: 6, as: 0 },
    { home: "FC Salaha-DEF", away: "1 FC DIXX", hs: 1, as: 3 },
    { home: "Reinildojul", away: "FC Handkantenschlag", hs: 0, as: 0 }
  ]},
  { gw: 36, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "FC Salaha-DEF", hs: 1, as: 4 },
    { home: "Galactik Football", away: "Iwobi Wan-Kenobi", hs: 3, as: 3 },
    { home: "Scarlett Johannson", away: "Augerl FC", hs: 0, as: 0 },
    { home: "FC Handkantenschlag", away: "1 FC DIXX", hs: 4, as: 3 }
  ]},
  { gw: 37, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "FC Elfmeterwappler", away: "1 FC DIXX", hs: 3, as: 2 },
    { home: "Galactik Football", away: "Reinildojul", hs: 3, as: 1 },
    { home: "Scarlett Johannson", away: "FC Salaha-DEF", hs: 1, as: 2 },
    { home: "Augerl FC", away: "Iwobi Wan-Kenobi", hs: 3, as: 2 }
  ]},
  { gw: 38, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football", hs: 1, as: 0 },
    { home: "FC Elfmeterwappler", away: "FC Handkantenschlag", hs: 1, as: 1 },
    { home: "Scarlett Johannson", away: "1 FC DIXX", hs: 0, as: 0 },
    { home: "Augerl FC", away: "Reinildojul", hs: 5, as: 0 },
    { home: "FC Salaha-DEF", away: "Iwobi Wan-Kenobi", hs: 0, as: 2 }
  ]},
  ]},
];