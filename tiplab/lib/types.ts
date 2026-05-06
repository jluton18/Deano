export type Sport = 'NRL' | 'AFL';

export interface Team {
  id: string;
  code: string;
  name: string;
  sport: Sport;
  primaryColor: string;
  textColor: string;
  city: string;
}

export interface Fixture {
  id: string;
  sport: Sport;
  round: number;
  season: number;
  home: Team;
  away: Team;
  venue: string;
  kickoff: Date;
  status: 'upcoming' | 'live' | 'completed';
  result?: {
    homeScore: number;
    awayScore: number;
    winner: 'home' | 'away' | 'draw';
  };
  commentary?: Commentary;
}

export interface Commentary {
  id: string;
  fixtureId: string;
  headline: string;
  summary: string;
  formNotes: string;
  keyPlayers: string[];
  tactics: string;
  prediction: string;
  predictedWinner: 'home' | 'away';
  confidence: number;
  thingsToWatch: string[];
}

export interface Tip {
  fixtureId: string;
  userId: string;
  selectedTeamId: string;
  isCorrect?: boolean;
  submittedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarColor: string;
  joinedAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  roundScore: number;
  totalScore: number;
  accuracy: number;
  gamesPlayed: number;
  movement: number;
}
