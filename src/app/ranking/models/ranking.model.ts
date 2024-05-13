import { TopWinnerTeamCountDto } from './topWinnerTeamCountDto.model';
import { TopWinnerTeamDto } from './topWinnerTeamDto.model';

export class Ranking {
  constructor(
    public topWinnerTeamCountDtos: TopWinnerTeamCountDto[],
    public topWinnerTeamDtos: TopWinnerTeamDto[]
  ) {}
}
