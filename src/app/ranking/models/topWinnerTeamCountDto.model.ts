import { TopWinnerTeamDto } from './topWinnerTeamDto.model';

export class TopWinnerTeamCountDto extends TopWinnerTeamDto {
  count: number;

  constructor(
    id: number,
    name: string,
    sportId: string,
    ownerId: number,
    count: number
  ) {
    super(id, name, sportId, ownerId);
    this.count = count;
  }
}
