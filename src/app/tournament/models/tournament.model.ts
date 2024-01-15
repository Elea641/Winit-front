export class Tournament {
  constructor(
    public id: number,
    public name: string = '',
    public date: string = '',
    public inscription_limit_date: string = '',
    public place: string = '',
    public sport: string = '',
    public currentPlayers: number,
    public maxPlayers: number,
  ) {}
}
