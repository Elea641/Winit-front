import { Observable } from 'rxjs';
import { TournamentCard } from '../../models/tournament-card.type';
import { TournamentCreationDto } from '../../models/tournament-creation-dto.type';
import { TournamentDetails } from '../../models/tournament-details.type';
import { SelectTeam } from '../../models/selectTeam.class';

export interface ITournamentService {
  getAllTournaments(): Observable<TournamentCard[]>;

  getTournamentById(id: number): Observable<TournamentDetails>;

  createTournament(newTournament: TournamentCreationDto): void;

  addTeamToTournament(selectTeam: SelectTeam): Observable<boolean>;

  deleteTeamFromTournament(
    tournamentId: number,
    team: { name: string; result: number; url: string }
  ): Observable<boolean>;

  updateTournament(
    tournamentId: number,
    generatedTree: { randomPhaseMatches: object; remainingPhaseMatches: object }
  ): void;

  cancelTournament(tournamentId: number, cancel: boolean): void;

  deleteTournament(tournamentDetails: TournamentDetails): void;
}
