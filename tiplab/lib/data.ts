import type { Team, Fixture, LeaderboardEntry, User } from './types';

export const NRL_TEAMS: Team[] = [
  { id: 'bri', code: 'BRI', name: 'Brisbane Broncos', sport: 'NRL', primaryColor: '#6b21a8', textColor: '#c084fc', city: 'Brisbane' },
  { id: 'cbr', code: 'CBR', name: 'Canberra Raiders', sport: 'NRL', primaryColor: '#166534', textColor: '#4ade80', city: 'Canberra' },
  { id: 'cby', code: 'CBY', name: 'Canterbury Bulldogs', sport: 'NRL', primaryColor: '#1e3a5f', textColor: '#60a5fa', city: 'Canterbury' },
  { id: 'cro', code: 'CRO', name: 'Cronulla Sharks', sport: 'NRL', primaryColor: '#0c4a6e', textColor: '#38bdf8', city: 'Cronulla' },
  { id: 'gld', code: 'GLD', name: 'Gold Coast Titans', sport: 'NRL', primaryColor: '#78350f', textColor: '#fbbf24', city: 'Gold Coast' },
  { id: 'man', code: 'MAN', name: 'Manly Sea Eagles', sport: 'NRL', primaryColor: '#1e1b4b', textColor: '#a5b4fc', city: 'Manly' },
  { id: 'mel', code: 'MEL', name: 'Melbourne Storm', sport: 'NRL', primaryColor: '#4a044e', textColor: '#d946ef', city: 'Melbourne' },
  { id: 'new', code: 'NEW', name: 'Newcastle Knights', sport: 'NRL', primaryColor: '#1c1917', textColor: '#a8a29e', city: 'Newcastle' },
  { id: 'nzw', code: 'NZW', name: 'NZ Warriors', sport: 'NRL', primaryColor: '#1e3a5f', textColor: '#93c5fd', city: 'Auckland' },
  { id: 'nqc', code: 'NQC', name: 'North QLD Cowboys', sport: 'NRL', primaryColor: '#1c2951', textColor: '#fbbf24', city: 'Townsville' },
  { id: 'par', code: 'PAR', name: 'Parramatta Eels', sport: 'NRL', primaryColor: '#1e3a5f', textColor: '#fbbf24', city: 'Parramatta' },
  { id: 'pen', code: 'PEN', name: 'Penrith Panthers', sport: 'NRL', primaryColor: '#1a1a2e', textColor: '#818cf8', city: 'Penrith' },
  { id: 'ssy', code: 'SSY', name: 'South Sydney Rabbitohs', sport: 'NRL', primaryColor: '#14532d', textColor: '#f87171', city: 'Sydney' },
  { id: 'sgi', code: 'SGI', name: 'St George Illawarra', sport: 'NRL', primaryColor: '#7f1d1d', textColor: '#fca5a5', city: 'Wollongong' },
  { id: 'syd', code: 'SYD', name: 'Sydney Roosters', sport: 'NRL', primaryColor: '#7f1d1d', textColor: '#f87171', city: 'Sydney' },
  { id: 'wst', code: 'WST', name: 'Wests Tigers', sport: 'NRL', primaryColor: '#78350f', textColor: '#fb923c', city: 'Sydney' },
];

export const AFL_TEAMS: Team[] = [
  { id: 'ade', code: 'ADE', name: 'Adelaide Crows', sport: 'AFL', primaryColor: '#831843', textColor: '#f9a8d4', city: 'Adelaide' },
  { id: 'brl', code: 'BRL', name: 'Brisbane Lions', sport: 'AFL', primaryColor: '#7c2d12', textColor: '#fdba74', city: 'Brisbane' },
  { id: 'car', code: 'CAR', name: 'Carlton Blues', sport: 'AFL', primaryColor: '#1e3a5f', textColor: '#93c5fd', city: 'Melbourne' },
  { id: 'col', code: 'COL', name: 'Collingwood Magpies', sport: 'AFL', primaryColor: '#1c1917', textColor: '#e7e5e4', city: 'Melbourne' },
  { id: 'ess', code: 'ESS', name: 'Essendon Bombers', sport: 'AFL', primaryColor: '#450a0a', textColor: '#f87171', city: 'Melbourne' },
  { id: 'fre', code: 'FRE', name: 'Fremantle Dockers', sport: 'AFL', primaryColor: '#4c1d95', textColor: '#c4b5fd', city: 'Fremantle' },
  { id: 'gee', code: 'GEE', name: 'Geelong Cats', sport: 'AFL', primaryColor: '#1e3a5f', textColor: '#fbbf24', city: 'Geelong' },
  { id: 'gcs', code: 'GCS', name: 'Gold Coast Suns', sport: 'AFL', primaryColor: '#7c2d12', textColor: '#fbbf24', city: 'Gold Coast' },
  { id: 'gws', code: 'GWS', name: 'GWS Giants', sport: 'AFL', primaryColor: '#7f1d1d', textColor: '#fb923c', city: 'Sydney' },
  { id: 'haw', code: 'HAW', name: 'Hawthorn Hawks', sport: 'AFL', primaryColor: '#713f12', textColor: '#fbbf24', city: 'Melbourne' },
  { id: 'meld', code: 'MEL', name: 'Melbourne Demons', sport: 'AFL', primaryColor: '#7f1d1d', textColor: '#f9a8d4', city: 'Melbourne' },
  { id: 'nme', code: 'NME', name: 'North Melbourne', sport: 'AFL', primaryColor: '#1e3a5f', textColor: '#f1f5f9', city: 'Melbourne' },
  { id: 'por', code: 'POR', name: 'Port Adelaide Power', sport: 'AFL', primaryColor: '#0c4a6e', textColor: '#38bdf8', city: 'Adelaide' },
  { id: 'ric', code: 'RIC', name: 'Richmond Tigers', sport: 'AFL', primaryColor: '#1c1917', textColor: '#fbbf24', city: 'Melbourne' },
  { id: 'stk', code: 'STK', name: 'St Kilda Saints', sport: 'AFL', primaryColor: '#1c1917', textColor: '#f87171', city: 'Melbourne' },
  { id: 'swn', code: 'SWN', name: 'Sydney Swans', sport: 'AFL', primaryColor: '#7f1d1d', textColor: '#f9a8d4', city: 'Sydney' },
  { id: 'wce', code: 'WCE', name: 'West Coast Eagles', sport: 'AFL', primaryColor: '#1e3a5f', textColor: '#fbbf24', city: 'Perth' },
  { id: 'wbd', code: 'WBD', name: 'Western Bulldogs', sport: 'AFL', primaryColor: '#1e3a5f', textColor: '#f87171', city: 'Melbourne' },
];

const NRL_VENUES = [
  'Accor Stadium, Sydney',
  'Allianz Stadium, Sydney',
  'AAMI Park, Melbourne',
  'CommBank Stadium, Parramatta',
  '4 Pines Park, Brookvale',
  'McDonald Jones Stadium, Newcastle',
  'Suncorp Stadium, Brisbane',
  'Cbus Super Stadium, Gold Coast',
];

const AFL_VENUES = [
  'MCG, Melbourne',
  'Marvel Stadium, Melbourne',
  'Adelaide Oval, Adelaide',
  'Optus Stadium, Perth',
  'Gabba, Brisbane',
  'SCG, Sydney',
  'ENGIE Stadium, Sydney',
  'GMHBA Stadium, Geelong',
];

function makeFixtures(teams: Team[], venues: string[], sport: 'NRL' | 'AFL'): Fixture[] {
  const pairs: [Team, Team][] = [];
  const shuffled = [...teams];
  for (let i = 0; i < Math.min(8, Math.floor(teams.length / 2)); i++) {
    pairs.push([shuffled[i * 2], shuffled[i * 2 + 1]]);
  }
  const base = Date.now() + 2 * 3600 * 1000;
  return pairs.map(([home, away], i) => ({
    id: `${sport.toLowerCase()}-r14-${i}`,
    sport,
    round: 14,
    season: 2025,
    home,
    away,
    venue: venues[i % venues.length],
    kickoff: new Date(base + i * 6 * 3600 * 1000),
    status: 'upcoming' as const,
    commentary: buildCommentary(`${sport.toLowerCase()}-r14-${i}`, home, away, i),
  }));
}

function buildCommentary(fixtureId: string, home: Team, away: Team, idx: number) {
  const predictions = [
    { pred: home.name + ' by 8', winner: 'home' as const, conf: 68 },
    { pred: away.name + ' by 6', winner: 'away' as const, conf: 62 },
    { pred: home.name + ' by 12', winner: 'home' as const, conf: 74 },
    { pred: away.name + ' by 4', winner: 'away' as const, conf: 57 },
    { pred: home.name + ' to edge it', winner: 'home' as const, conf: 55 },
    { pred: away.name + ' by 10', winner: 'away' as const, conf: 70 },
  ];
  const p = predictions[idx % predictions.length];
  return {
    id: 'comm-' + fixtureId,
    fixtureId,
    headline: `${home.name} host ${away.name} in a crucial Round 14 clash`,
    summary: `Both sides come into Round 14 with plenty to play for. ${home.name} will enjoy home advantage at ${home.city} but ${away.name} have shown strong road form this season. Expect a tight, physical contest with genuine finals implications.`,
    formNotes: `${home.name} have won 3 of their last 5 games and look solid at home. ${away.name} are coming off consecutive wins and carry strong confidence into this fixture.`,
    keyPlayers: ['Star playmaker', 'Dominant forward', 'Creative halfback', 'Tireless midfielder'],
    tactics: `${home.name} will look to control the tempo through their middle third and use their home crowd advantage early. ${away.name} will target the right edge and try to stretch the defence with fast ball movement.`,
    prediction: p.pred,
    predictedWinner: p.winner,
    confidence: p.conf,
    thingsToWatch: [
      'First-quarter / first-set scoring patterns',
      'How each team responds to their first defensive lapse',
      'Kicking/passing efficiency under pressure',
      'Bench impact in the final 20 minutes',
    ],
  };
}

export const NRL_FIXTURES: Fixture[] = makeFixtures(NRL_TEAMS, NRL_VENUES, 'NRL');
export const AFL_FIXTURES: Fixture[] = makeFixtures(AFL_TEAMS, AFL_VENUES, 'AFL');
export const ALL_FIXTURES: Fixture[] = [...NRL_FIXTURES, ...AFL_FIXTURES].sort(
  (a, b) => a.kickoff.getTime() - b.kickoff.getTime()
);

const AVATAR_COLORS = [
  '#7c3aed', '#0891b2', '#16a34a', '#dc2626',
  '#d97706', '#be185d', '#0d9488', '#1d4ed8',
];

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'CoachMate99', email: 'coach@example.com', avatarColor: AVATAR_COLORS[0], joinedAt: new Date('2025-01-10') },
  { id: 'u2', username: 'TipsterKing', email: 'king@example.com', avatarColor: AVATAR_COLORS[1], joinedAt: new Date('2025-01-12') },
  { id: 'u3', username: 'GreenMachine', email: 'green@example.com', avatarColor: AVATAR_COLORS[2], joinedAt: new Date('2025-01-15') },
  { id: 'u4', username: 'NRLExpert', email: 'nrl@example.com', avatarColor: AVATAR_COLORS[3], joinedAt: new Date('2025-01-20') },
  { id: 'u5', username: 'FootyFanatic', email: 'footy@example.com', avatarColor: AVATAR_COLORS[4], joinedAt: new Date('2025-02-01') },
  { id: 'u6', username: 'AFL_Guru', email: 'afl@example.com', avatarColor: AVATAR_COLORS[5], joinedAt: new Date('2025-02-05') },
  { id: 'u7', username: 'StatAttack', email: 'stat@example.com', avatarColor: AVATAR_COLORS[6], joinedAt: new Date('2025-02-10') },
  { id: 'u8', username: 'TipLab_Pro', email: 'pro@example.com', avatarColor: AVATAR_COLORS[7], joinedAt: new Date('2025-02-14') },
  { id: 'u9', username: 'RoundRobin', email: 'robin@example.com', avatarColor: AVATAR_COLORS[0], joinedAt: new Date('2025-02-20') },
  { id: 'u10', username: 'NewTipper', email: 'new@example.com', avatarColor: AVATAR_COLORS[1], joinedAt: new Date('2025-03-01') },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, user: MOCK_USERS[0], roundScore: 7, totalScore: 82, accuracy: 74, gamesPlayed: 111, movement: 2 },
  { rank: 2, user: MOCK_USERS[1], roundScore: 6, totalScore: 79, accuracy: 71, gamesPlayed: 111, movement: 0 },
  { rank: 3, user: MOCK_USERS[2], roundScore: 6, totalScore: 78, accuracy: 70, gamesPlayed: 111, movement: 1 },
  { rank: 4, user: MOCK_USERS[3], roundScore: 5, totalScore: 75, accuracy: 68, gamesPlayed: 110, movement: -1 },
  { rank: 5, user: MOCK_USERS[4], roundScore: 5, totalScore: 73, accuracy: 66, gamesPlayed: 110, movement: 3 },
  { rank: 6, user: MOCK_USERS[5], roundScore: 5, totalScore: 70, accuracy: 64, gamesPlayed: 109, movement: -2 },
  { rank: 7, user: MOCK_USERS[6], roundScore: 4, totalScore: 68, accuracy: 62, gamesPlayed: 109, movement: 0 },
  { rank: 8, user: MOCK_USERS[7], roundScore: 4, totalScore: 65, accuracy: 59, gamesPlayed: 110, movement: 1 },
  { rank: 9, user: MOCK_USERS[8], roundScore: 3, totalScore: 62, accuracy: 57, gamesPlayed: 108, movement: -3 },
  { rank: 10, user: MOCK_USERS[9], roundScore: 3, totalScore: 58, accuracy: 53, gamesPlayed: 109, movement: 0 },
];

export const HERO_STATS = [
  { value: '2,841', label: 'Active Tippers' },
  { value: '34', label: 'Rounds Live' },
  { value: '68%', label: 'Avg Accuracy' },
];

export const TRENDING = [
  { id: 1, title: 'Panthers without Cleary — how much does it matter?', meta: '142 comments · 2h ago', sport: 'NRL' as const },
  { id: 2, title: 'Collingwood looking unstoppable in 2025 — or is it too early?', meta: '98 comments · 4h ago', sport: 'AFL' as const },
  { id: 3, title: 'Broncos vs Storm — who wins the big Saturday night clash?', meta: '87 comments · 5h ago', sport: 'NRL' as const },
  { id: 4, title: 'Which AFL team has the best trade period winner?', meta: '65 comments · 8h ago', sport: 'AFL' as const },
  { id: 5, title: 'NRL State of Origin implications from Round 14', meta: '54 comments · 10h ago', sport: 'NRL' as const },
];
