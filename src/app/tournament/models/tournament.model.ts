export class Tournament {
  constructor(
    public id: number,
    public name: string = '',
    public description: string = '',
    public sport: string = '',
    public currentPlayers: number,
    public maxPlayers: number
  ) {}
}
