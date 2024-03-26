import { Member } from './member.model';

export class Team {
  constructor(
    public name: string,
    public sport: string,
    public leaderName: string,
    public totalPlayers: number,
    public teamMembersCount: number,
    public members: Member[]
  ) {}
}
