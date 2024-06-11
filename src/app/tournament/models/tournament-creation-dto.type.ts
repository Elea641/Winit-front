export type TournamentCreationDto = {
  name: string;
  date: Date;
  place: string;
  sport: string;
  maxTeams: number;
  tournamentBanner: File;
  inscriptionLimitDate?: Date;
};
