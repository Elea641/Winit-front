export type Tournament = {
  id: number;
  name: string;
  date: string;
  place: string;
  sport: string;
  playersPerTeam: number;
  maxPlayers: number;
  minTeams: number;
  maxTeams: number;
  gameLength: number;
  privacy: string;
  playerCategory: string;
  tournamentFormat: string;
  tournamentBanner?: string;
  inscriptionLimitDate?: Date;
  currentPlayers?: number;
};
