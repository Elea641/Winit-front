export class Contact {
  constructor(
    public id: number,
    public name: string = '',
    public url: string = '',
    public description: string = '',
    public github_url: string = '',
    public linkedin_url: string = ''
  ) {}
}
