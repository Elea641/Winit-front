import { TopWinnerTeamCountDto } from './topWinnerTeamCountDto.class';
import { TopWinnerTeamDto } from './topWinnerTeamDto.class';

export type TopWinnerTeamDtoType =
  | TopWinnerTeamCountDto
  | TopWinnerTeamDto
  | null;
