import { Member } from './member.type';

export type Team = {
  id: number;
  leaderName: string;
  members: Member[];
  name: string;
  sport: string;
  teamMembersCount: number;
  totalPlayers: number;
  validated: boolean;
  ownerId: number;
  ownerFirstName: string;
  ownerLastName: string;
};
