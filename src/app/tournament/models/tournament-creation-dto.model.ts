export class TournamentCreationDto {
  constructor(
    public name: string,
    public date: Date,
    public place: string,
    public sport: string,
    public maxTeams: number,
    public tournamentBanner?: File,
    public inscriptionLimitDate?: Date
  ) {}
}
