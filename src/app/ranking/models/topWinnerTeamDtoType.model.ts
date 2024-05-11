import { TopWinnerTeamCountDto } from './topWinnerTeamCountDto.model';
import { TopWinnerTeamDto } from './topWinnerTeamDto.model';

export type TopWinnerTeamDtoType =
  | TopWinnerTeamCountDto
  | TopWinnerTeamDto
  | null;
