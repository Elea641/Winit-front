export class CurrentProfile {
  public id: number;
  public firstname: string;
  public lastname: string;
  public city: string;
  public team: string;
  public allPlayed: number;
  public results: {
    win: number;
    second: number;
    third: number;
  };
  public lastTournamentsPlayed: [
    { lastTournament: string; result: number },
    { penultimateTournament: string; result: number },
    { antepenultimateTournament: string; result: number }
  ];

  constructor(profileData: any) {
    this.id = profileData.id;
    this.firstname = profileData.firstname;
    this.lastname = profileData.lastname;
    this.city = profileData.city;
    this.team = profileData.team;
    this.allPlayed = profileData.allPlayed;
    this.results = profileData.results[0];
    this.lastTournamentsPlayed = [
      {
        lastTournament: profileData.lastTournamentsPlayed[0].lastTournament,
        result: profileData.lastTournamentsPlayed[0].result,
      },
      {
        penultimateTournament:
          profileData.lastTournamentsPlayed[1].penultimateTournament,
        result: profileData.lastTournamentsPlayed[1].result,
      },
      {
        antepenultimateTournament:
          profileData.lastTournamentsPlayed[2].antepenultimateTournament,
        result: profileData.lastTournamentsPlayed[2].result,
      },
    ];
  }
}
