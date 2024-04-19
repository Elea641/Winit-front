import { Observable } from 'rxjs';
import { TournamentCard } from '../../models/tournament-card.model';
import { TournamentCreationDto } from '../../models/tournament-creation-dto.model';
import { TournamentDetails } from '../../models/tournament-details.model';

export interface ITournamentService {
  getAllTournaments(): Observable<TournamentCard[]>;

  createTournament(newTournament: TournamentCreationDto): void;

  getTournamentById(id: number): Observable<TournamentDetails>;
}
