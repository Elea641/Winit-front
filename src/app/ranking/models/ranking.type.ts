import { TopWinnerTeamCountDto } from './topWinnerTeamCountDto.class';
import { TopWinnerTeamDto } from './topWinnerTeamDto.class';

export type Ranking = {
  topWinnerTeamCountDtos: TopWinnerTeamCountDto[];
  topWinnerTeamDtos: TopWinnerTeamDto[];
};
