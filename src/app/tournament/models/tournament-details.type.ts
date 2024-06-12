import { Match } from './match.type';

export type TournamentDetails = {
  id: number;
  sport: string;
  place: string;
  maxNumberOfTeams: number;
  name: string;
  date: Date;
  inscriptionLimitDate: Date;
  createdAt: Date;
  currentNumberOfParticipants: number;
  imageUrl: string;
  teams: {
    name: string;
    result: number;
    url: string;
    ownerId: number;
    currentUser: number;
  }[];
  isOwner: boolean;
  isGenerated: boolean;
  isCanceled: boolean;
  matches?: Match[];
};
