import { MatchUpdate } from '../../models/matchUpdate.type';

export interface IMatchService {
  updateMatch(matchUpdate: MatchUpdate): void;
}
