export class ContactDetails {
  constructor(
    public id: number,
    public type: string = '',
    public details: string = '',
    public url_picture: string = ''
  ) {}
}
