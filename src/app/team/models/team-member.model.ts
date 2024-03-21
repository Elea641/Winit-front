import { Member } from './member.model';

export class TeamMember {
  constructor(public members: Member[], public leadTeamName: string) {}
}
