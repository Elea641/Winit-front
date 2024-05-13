import { MatchUpdate } from '../../models/matchUpdate.model';

export interface IMatchService {
  updateMatch(matchUpdate: MatchUpdate): void;
}
