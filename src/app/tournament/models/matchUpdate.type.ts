export type MatchUpdate = {
  id: number;
  tournamentId: number;
  scoreTeam1: number;
  scoreTeam2: number;
  nextTeamInfo: { id: number | undefined; team: string | undefined };
};
