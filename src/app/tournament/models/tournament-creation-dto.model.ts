export class TournamentCreationDto {
    constructor(
    public name: string,
    public date: Date,
    public place: string,
    public sport: string,
    public playersPerTeam: number,
    public maxTeams: number,
    public gameLength: number,
    public privacy: string,
    public playerCategory: string,
    public tournamentFormat: string,
    public minTeams?: number,
    public tournamentBanner?: File,
    public inscriptionLimitDate?: Date,
    ) {}
}