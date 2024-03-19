import { Member } from './member.model';

export class TeamDetails {
  constructor(public members: Member[], public leadTeamName: string) {}
}
