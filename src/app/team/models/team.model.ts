import { Member } from './member.model';

export class Team {
  constructor(
    public leaderName: string,
    public members: Member[],
    public name: string,
    public sport: string,
    public teamMembersCount: number,
    public totalPlayers: number,
    public validated: boolean
  ) {}
}
