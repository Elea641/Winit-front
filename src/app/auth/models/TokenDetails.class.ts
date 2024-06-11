export class TokenDetails {
  constructor(
    public exp: number,
    public iat: number,
    public role: string,
    public sub: string
  ) {}
}
