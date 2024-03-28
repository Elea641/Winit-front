import { Member } from '../../models/member.model';

export interface IMemberService {
  addMember(teamName: string, member: Member): void;
  deleteMemberByName(teamName: string, member: Member): void;
}
