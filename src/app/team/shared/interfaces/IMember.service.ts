import { Member } from '../../models/member.type';

export interface IMemberService {
  addMember(teamName: string, member: Member): void;
  deleteMemberByTeamName(teamName: string, member: Member): void;
}
