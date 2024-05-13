import { TopWinnerTeamDto } from './topWinnerTeamDto.model';

export class TopWinnerTeamCountDto extends TopWinnerTeamDto {
  count: number;

  constructor(
    id: number,
    name: string,
    sportId: string,
    ownerId: number,
    tournamentName: string,
    count: number
  ) {
    super(id, name, sportId, ownerId, tournamentName);
    this.count = count;
  }
}
