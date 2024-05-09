export class CurrentProfile {
  public id: number;
  public firstname: string;
  public lastname: string;
  public city: string;
  public team: string;

  constructor(profileData: any) {
    this.id = profileData.id;
    this.firstname = profileData.firstname;
    this.lastname = profileData.lastname;
    this.city = profileData.city;
    this.team = profileData.team;
  }
}
