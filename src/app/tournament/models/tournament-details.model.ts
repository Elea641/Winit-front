export class TournamentDetails {
  constructor(
    public id: number,
    public sport: string,
    public place: string,
    public maxNumberOfTeams: number,
    public name: string,
    public date: Date,
    public inscriptionLimitDate: Date,
    public createdAt: Date,
    public currentNumberOfParticipants: number,
    public imageUrl: string,
    public teams: {
      name: string;
      result: number;
      url: string;
      ownerId: number;
      currentUser: number;
    }[],
    public isOwner: boolean,
    public isGenerated: boolean,
    public isCanceled: boolean,
    public matches?: any
  ) {}
}
