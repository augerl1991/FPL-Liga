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
    { home: "FC Elfmeterwappler",    away: "1 FC DIXX",           hs: 3, as: 4 },
    { home: "Galactik Football",     away: "Reinildojul",         hs: 4, as: 0 },
    { home: "Scarlett Johannson",    away: "FC Salaha-DEF",       hs: 2, as: 2 },
    { home: "Augerl FC",             away: "Iwobi Wan-Kenobi",    hs: 1, as: 3 },
  ]},
  { gw: 2, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football",   hs: 6, as: 3 },
    { home: "FC Elfmeterwappler",    away: "FC Handkantenschlag", hs: 4, as: 1 },
    { home: "Scarlett Johannson",    away: "1 FC DIXX",           hs: 0, as: 4 },
    { home: "Augerl FC",             away: "Reinildojul",         hs: 1, as: 0 },
    { home: "FC Salaha-DEF",         away: "Iwobi Wan-Kenobi",    hs: 3, as: 1 },
  ]},
  { gw: 3, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC",           hs: 1, as: 2 },
    { home: "FC Elfmeterwappler",    away: "Scarlett Johannson",  hs: 0, as: 3 },
    { home: "Galactik Football",     away: "FC Handkantenschlag", hs: 0, as: 3 },
    { home: "Iwobi Wan-Kenobi",      away: "1 FC DIXX",           hs: 5, as: 2 },
    { home: "Reinildojul",           away: "FC Salaha-DEF",       hs: 2, as: 1 },
  ]},
  { gw: 4, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF",       hs: 0, as: 4 },
    { home: "FC Elfmeterwappler",    away: "Iwobi Wan-Kenobi",    hs: 3, as: 2 },
    { home: "Galactik Football",     away: "Augerl FC",           hs: 2, as: 2 },
    { home: "Scarlett Johannson",    away: "FC Handkantenschlag", hs: 4, as: 4 },
    { home: "Reinildojul",           away: "1 FC DIXX",           hs: 5, as: 0 },
  ]},
  { gw: 5, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX",           hs: 3, as: 1 },
    { home: "FC Elfmeterwappler",    away: "Reinildojul",         hs: 1, as: 0 },
    { home: "Galactik Football",     away: "FC Salaha-DEF",       hs: 2, as: 2 },
    { home: "Scarlett Johannson",    away: "Iwobi Wan-Kenobi",    hs: 1, as: 3 },
    { home: "Augerl FC",             away: "FC Handkantenschlag", hs: 2, as: 3 },
  ]},
  { gw: 6, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler",  hs: 3, as: 1 },
    { home: "Galactik Football",     away: "1 FC DIXX",           hs: 1, as: 2 },
    { home: "Scarlett Johannson",    away: "Reinildojul",         hs: 2, as: 0 },
    { home: "Augerl FC",             away: "FC Salaha-DEF",       hs: 2, as: 2 },
    { home: "Iwobi Wan-Kenobi",      away: "FC Handkantenschlag", hs: 0, as: 3 },
  ]},
  { gw: 7, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson",  hs: 4, as: 1 },
    { home: "FC Elfmeterwappler",    away: "Galactik Football",   hs: 7, as: 3 },
    { home: "Augerl FC",             away: "1 FC DIXX",           hs: 1, as: 2 },
    { home: "Iwobi Wan-Kenobi",      away: "Reinildojul",         hs: 0, as: 2 },
    { home: "FC Salaha-DEF",         away: "FC Handkantenschlag", hs: 1, as: 3 },
  ]},
  { gw: 8, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi",    hs: 4, as: 0 },
    { home: "FC Elfmeterwappler",    away: "Augerl FC",           hs: 2, as: 4 },
    { home: "Galactik Football",     away: "Scarlett Johannson",  hs: 0, as: 2 },
    { home: "FC Salaha-DEF",         away: "1 FC DIXX",           hs: 2, as: 3 },
    { home: "Reinildojul",           away: "FC Handkantenschlag", hs: 1, as: 3 },
  ]},
  { gw: 9, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul",         hs: 3, as: 2 },
    { home: "FC Elfmeterwappler",    away: "FC Salaha-DEF",       hs: 1, as: 2 },
    { home: "Galactik Football",     away: "Iwobi Wan-Kenobi",    hs: 1, as: 4 },
    { home: "Scarlett Johannson",    away: "Augerl FC",           hs: 4, as: 3 },
    { home: "FC Handkantenschlag",   away: "1 FC DIXX",           hs: 0, as: 0 },
  ]},
  { gw: 10, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 2, as: 5 },
    { home: "FC Elfmeterwappler",    away: "1 FC DIXX",           hs: 0, as: 3 },
    { home: "Galactik Football",     away: "Reinildojul",         hs: 3, as: 3 },
    { home: "Scarlett Johannson",    away: "FC Salaha-DEF",       hs: 0, as: 5 },
    { home: "Augerl FC",             away: "Iwobi Wan-Kenobi",    hs: 3, as: 2 },
  ]},
  { gw: 11, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football",   hs: 3, as: 1 },
    { home: "FC Elfmeterwappler",    away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Scarlett Johannson",    away: "1 FC DIXX",           hs: 1, as: 3 },
    { home: "Augerl FC",             away: "Reinildojul",         hs: 1, as: 2 },
    { home: "FC Salaha-DEF",         away: "Iwobi Wan-Kenobi",    hs: 1, as: 3 },
  ]},
  { gw: 12, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC",           hs: 2, as: 5 },
    { home: "FC Elfmeterwappler",    away: "Scarlett Johannson",  hs: 1, as: 0 },
    { home: "Galactik Football",     away: "FC Handkantenschlag", hs: 5, as: 3 },
    { home: "Iwobi Wan-Kenobi",      away: "1 FC DIXX",           hs: 3, as: 2 },
    { home: "Reinildojul",           away: "FC Salaha-DEF",       hs: 0, as: 5 },
  ]},
  { gw: 13, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF",       hs: 4, as: 0 },
    { home: "FC Elfmeterwappler",    away: "Iwobi Wan-Kenobi",    hs: 1, as: 1 },
    { home: "Galactik Football",     away: "Augerl FC",           hs: 1, as: 2 },
    { home: "Scarlett Johannson",    away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "Reinildojul",           away: "1 FC DIXX",           hs: 2, as: 1 },
  ]},
  { gw: 14, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX",           hs: 2, as: 3 },
    { home: "FC Elfmeterwappler",    away: "Reinildojul",         hs: 1, as: 6 },
    { home: "Galactik Football",     away: "FC Salaha-DEF",       hs: 2, as: 4 },
    { home: "Scarlett Johannson",    away: "Iwobi Wan-Kenobi",    hs: 1, as: 1 },
    { home: "Augerl FC",             away: "FC Handkantenschlag", hs: 1, as: 4 },
  ]},
  { gw: 15, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler",  hs: 3, as: 2 },
    { home: "Galactik Football",     away: "1 FC DIXX",           hs: 3, as: 2 },
    { home: "Scarlett Johannson",    away: "Reinildojul",         hs: 1, as: 4 },
    { home: "Augerl FC",             away: "FC Salaha-DEF",       hs: 4, as: 3 },
    { home: "Iwobi Wan-Kenobi",      away: "FC Handkantenschlag", hs: 4, as: 2 },
  ]},
  { gw: 16, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson",  hs: 4, as: 0 },
    { home: "FC Elfmeterwappler",    away: "Galactik Football",   hs: 4, as: 0 },
    { home: "Augerl FC",             away: "1 FC DIXX",           hs: 5, as: 2 },
    { home: "Iwobi Wan-Kenobi",      away: "Reinildojul",         hs: 1, as: 3 },
    { home: "FC Salaha-DEF",         away: "FC Handkantenschlag", hs: 0, as: 4 },
  ]},
  { gw: 17, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi",    hs: 2, as: 0 },
    { home: "FC Elfmeterwappler",    away: "Augerl FC",           hs: 3, as: 5 },
    { home: "Galactik Football",     away: "Scarlett Johannson",  hs: 4, as: 3 },
    { home: "FC Salaha-DEF",         away: "1 FC DIXX",           hs: 1, as: 4 },
    { home: "Reinildojul",           away: "FC Handkantenschlag", hs: 1, as: 3 },
  ]},
  { gw: 18, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul",         hs: 1, as: 1 },
    { home: "FC Elfmeterwappler",    away: "FC Salaha-DEF",       hs: 6, as: 0 },
    { home: "Galactik Football",     away: "Iwobi Wan-Kenobi",    hs: 3, as: 0 },
    { home: "Scarlett Johannson",    away: "Augerl FC",           hs: 2, as: 2 },
    { home: "FC Handkantenschlag",   away: "1 FC DIXX",           hs: 0, as: 2 },
  ]},
  { gw: 19, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 1, as: 2 },
    { home: "FC Elfmeterwappler",    away: "1 FC DIXX",           hs: 2, as: 2 },
    { home: "Galactik Football",     away: "Reinildojul",         hs: 1, as: 2 },
    { home: "Scarlett Johannson",    away: "FC Salaha-DEF",       hs: 0, as: 6 },
    { home: "Augerl FC",             away: "Iwobi Wan-Kenobi",    hs: 3, as: 3 },
  ]},
  { gw: 20, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football",   hs: 6, as: 2 },
    { home: "FC Elfmeterwappler",    away: "FC Handkantenschlag", hs: 0, as: 1 },
    { home: "Scarlett Johannson",    away: "1 FC DIXX",           hs: 3, as: 0 },
    { home: "Augerl FC",             away: "Reinildojul",         hs: 2, as: 2 },
    { home: "FC Salaha-DEF",         away: "Iwobi Wan-Kenobi",    hs: 3, as: 0 },
  ]},
  { gw: 21, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC",           hs: 2, as: 2 },
    { home: "FC Elfmeterwappler",    away: "Scarlett Johannson",  hs: 2, as: 1 },
    { home: "Galactik Football",     away: "FC Handkantenschlag", hs: 2, as: 2 },
    { home: "Iwobi Wan-Kenobi",      away: "1 FC DIXX",           hs: 0, as: 3 },
    { home: "Reinildojul",           away: "FC Salaha-DEF",       hs: 0, as: 5 },
  ]},
  { gw: 22, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF",       hs: 3, as: 3 },
    { home: "FC Elfmeterwappler",    away: "Iwobi Wan-Kenobi",    hs: 3, as: 1 },
    { home: "Galactik Football",     away: "Augerl FC",           hs: 1, as: 1 },
    { home: "Scarlett Johannson",    away: "FC Handkantenschlag", hs: 2, as: 1 },
    { home: "Reinildojul",           away: "1 FC DIXX",           hs: 1, as: 1 },
  ]},
  { gw: 23, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX",           hs: 1, as: 5 },
    { home: "FC Elfmeterwappler",    away: "Reinildojul",         hs: 4, as: 3 },
    { home: "Galactik Football",     away: "FC Salaha-DEF",       hs: 0, as: 2 },
    { home: "Scarlett Johannson",    away: "Iwobi Wan-Kenobi",    hs: 1, as: 2 },
    { home: "Augerl FC",             away: "FC Handkantenschlag", hs: 3, as: 1 },
  ]},
  { gw: 24, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler",  hs: 3, as: 1 },
    { home: "Galactik Football",     away: "1 FC DIXX",           hs: 1, as: 2 },
    { home: "Scarlett Johannson",    away: "Reinildojul",         hs: 1, as: 3 },
    { home: "Augerl FC",             away: "FC Salaha-DEF",       hs: 2, as: 1 },
    { home: "Iwobi Wan-Kenobi",      away: "FC Handkantenschlag", hs: 3, as: 4 },
  ]},
  { gw: 25, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson",  hs: 1, as: 3 },
    { home: "FC Elfmeterwappler",    away: "Galactik Football",   hs: 1, as: 3 },
    { home: "Augerl FC",             away: "1 FC DIXX",           hs: 3, as: 1 },
    { home: "Iwobi Wan-Kenobi",      away: "Reinildojul",         hs: 7, as: 0 },
    { home: "FC Salaha-DEF",         away: "FC Handkantenschlag", hs: 3, as: 3 },
  ]},
  { gw: 26, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi",    hs: 1, as: 5 },
    { home: "FC Elfmeterwappler",    away: "Augerl FC",           hs: 4, as: 2 },
    { home: "Galactik Football",     away: "Scarlett Johannson",  hs: 0, as: 0 },
    { home: "FC Salaha-DEF",         away: "1 FC DIXX",           hs: 1, as: 3 },
    { home: "Reinildojul",           away: "FC Handkantenschlag", hs: 2, as: 3 },
  ]},
  { gw: 27, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul",         hs: 2, as: 1 },
    { home: "FC Elfmeterwappler",    away: "FC Salaha-DEF",       hs: 2, as: 1 },
    { home: "Galactik Football",     away: "Iwobi Wan-Kenobi",    hs: 3, as: 5 },
    { home: "Scarlett Johannson",    away: "Augerl FC",           hs: 3, as: 3 },
    { home: "FC Handkantenschlag",   away: "1 FC DIXX",           hs: 1, as: 3 },
  ]},
  { gw: 28, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 3, as: 0 },
    { home: "FC Elfmeterwappler",    away: "1 FC DIXX",           hs: 1, as: 4 },
    { home: "Galactik Football",     away: "Reinildojul",         hs: 1, as: 1 },
    { home: "Scarlett Johannson",    away: "FC Salaha-DEF",       hs: 0, as: 2 },
    { home: "Augerl FC",             away: "Iwobi Wan-Kenobi",    hs: 4, as: 2 },
  ]},
  { gw: 29, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football",   hs: 5, as: 0 },
    { home: "FC Elfmeterwappler",    away: "FC Handkantenschlag", hs: 3, as: 0 },
    { home: "Scarlett Johannson",    away: "1 FC DIXX",           hs: 0, as: 5 },
    { home: "Augerl FC",             away: "Reinildojul",         hs: 2, as: 0 },
    { home: "FC Salaha-DEF",         away: "Iwobi Wan-Kenobi",    hs: 8, as: 4 },
  ]},
  { gw: 30, matches: [
    { home: "St.Peter Rattlesnakes", away: "Augerl FC",           hs: 3, as: 3 },
    { home: "FC Elfmeterwappler",    away: "Scarlett Johannson",  hs: 1, as: 0 },
    { home: "Galactik Football",     away: "FC Handkantenschlag", hs: 4, as: 2 },
    { home: "Iwobi Wan-Kenobi",      away: "1 FC DIXX",           hs: 4, as: 1 },
    { home: "Reinildojul",           away: "FC Salaha-DEF",       hs: 0, as: 3 },
  ]},
  { gw: 31, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Salaha-DEF",       hs: 1,    as: 2 },
    { home: "FC Elfmeterwappler",    away: "Iwobi Wan-Kenobi",    hs: 3,    as: null },
    { home: "Galactik Football",     away: "Augerl FC",           hs: 2,    as: 3 },
    { home: "Scarlett Johannson",    away: "FC Handkantenschlag", hs: null, as: 0 },
    { home: "Reinildojul",           away: "1 FC DIXX",           hs: null, as: 6 },
  ]},
  { gw: 32, matches: [
    { home: "St.Peter Rattlesnakes", away: "1 FC DIXX",           hs: 4, as: 1 },
    { home: "FC Elfmeterwappler",    away: "Reinildojul",         hs: 0, as: 2 },
    { home: "Galactik Football",     away: "FC Salaha-DEF",       hs: 7, as: 2 },
    { home: "Scarlett Johannson",    away: "Iwobi Wan-Kenobi",    hs: 0, as: 3 },
    { home: "Augerl FC",             away: "FC Handkantenschlag", hs: 5, as: 1 },
  ]},
  { gw: 33, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Elfmeterwappler",  hs: 3, as: 0 },
    { home: "Galactik Football",     away: "1 FC DIXX",           hs: 3, as: 8 },
    { home: "Scarlett Johannson",    away: "Reinildojul",         hs: 0, as: 1 },
    { home: "Augerl FC",             away: "FC Salaha-DEF",       hs: 4, as: 0 },
    { home: "Iwobi Wan-Kenobi",      away: "FC Handkantenschlag", hs: 4, as: 2 },
  ]},
  { gw: 34, matches: [
    { home: "St.Peter Rattlesnakes", away: "Scarlett Johannson",  hs: 2, as: 0 },
    { home: "FC Elfmeterwappler",    away: "Galactik Football",   hs: 1, as: 1 },
    { home: "Augerl FC",             away: "1 FC DIXX",           hs: 7, as: 2 },
    { home: "Iwobi Wan-Kenobi",      away: "Reinildojul",         hs: 1, as: 0 },
    { home: "FC Salaha-DEF",         away: "FC Handkantenschlag", hs: 5, as: 2 },
  ]},
  { gw: 35, matches: [
    { home: "St.Peter Rattlesnakes", away: "Iwobi Wan-Kenobi",    hs: 4,    as: 3 },
    { home: "FC Elfmeterwappler",    away: "Augerl FC",           hs: 3,    as: 1 },
    { home: "Galactik Football",     away: "Scarlett Johannson",  hs: 6,    as: 0 },
    { home: "FC Salaha-DEF",         away: "1 FC DIXX",           hs: 1,    as: 3 },
    { home: "Reinildojul",           away: "FC Handkantenschlag", hs: null, as: 0 },
  ]},
  { gw: 36, matches: [
    { home: "St.Peter Rattlesnakes", away: "Reinildojul",         hs: 2, as: 2 },
    { home: "FC Elfmeterwappler",    away: "FC Salaha-DEF",       hs: 1, as: 4 },
    { home: "Galactik Football",     away: "Iwobi Wan-Kenobi",    hs: 3, as: 3 },
    { home: "Scarlett Johannson",    away: "Augerl FC",           hs: 0, as: 0 },
    { home: "FC Handkantenschlag",   away: "1 FC DIXX",           hs: 4, as: 3 },
  ]},
  { gw: 37, matches: [
    { home: "St.Peter Rattlesnakes", away: "FC Handkantenschlag", hs: 2,    as: 2 },
    { home: "FC Elfmeterwappler",    away: "1 FC DIXX",           hs: 3,    as: 2 },
    { home: "Galactik Football",     away: "Reinildojul",         hs: 3,    as: 1 },
    { home: "Scarlett Johannson",    away: "FC Salaha-DEF",       hs: null, as: 2 },
    { home: "Augerl FC",             away: "Iwobi Wan-Kenobi",    hs: 3,    as: 2 },
  ]},
  { gw: 38, matches: [
    { home: "St.Peter Rattlesnakes", away: "Galactik Football",   hs: null, as: null },
    { home: "FC Elfmeterwappler",    away: "FC Handkantenschlag", hs: null, as: null },
    { home: "Scarlett Johannson",    away: "1 FC DIXX",           hs: null, as: null },
    { home: "Augerl FC",             away: "Reinildojul",         hs: null, as: null },
    { home: "FC Salaha-DEF",         away: "Iwobi Wan-Kenobi",    hs: null, as: null },
  ]},
];

// ── Gewinnertafel ──────────────────────────────────────────────────────────
// image: Pfad relativ zu /public, z.B. "/images/pokal/2025-26.jpg"
export type SeasonWinner = { season: string; winner: string; image?: string };

export const SEASON_WINNERS: SeasonWinner[] = [
  { season: "2014/15", winner: "–" },
  { season: "2015/16", winner: "–" },
  { season: "2016/17", winner: "–" },
  { season: "2017/18", winner: "–" },
  { season: "2018/19", winner: "–" },
  { season: "2019/20", winner: "–" },
  { season: "2020/21", winner: "–" },
  { season: "2021/22", winner: "–" },
  { season: "2022/23", winner: "–" },
  { season: "2023/24", winner: "–" },
  { season: "2024/25", winner: "–" },
  // Bild: Datei nach /public/images/pokal/2025-26.jpg kopieren
  { season: "2025/26", winner: "–", image: "/images/pokal/2025-26.jpg" },
];

// ── Alle Liga-Saisonen von 2014/15 bis 2025/26 ────────────────────────────
export type Season = { label: string; data: HistoricGW[] };

export const SEASONS: Season[] = [
  { label: "2014/15", data: [] },
  { label: "2015/16", data: [] },
  { label: "2016/17", data: [] },
  { label: "2017/18", data: [] },
  { label: "2018/19", data: [] },
  { label: "2019/20", data: [] },
  { label: "2020/21", data: [] },
  { label: "2021/22", data: [] },
  { label: "2022/23", data: [] },
  { label: "2023/24", data: [] },
  { label: "2024/25", data: [] },
  { label: "2025/26", data: PREV_SEASON },
];
