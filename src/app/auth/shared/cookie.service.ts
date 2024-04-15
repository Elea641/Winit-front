import { Injectable } from '@angular/core';
import { TokenResponse } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  tokenResponse!: TokenResponse;

  constructor() {}

  getCookieValue(): any {
    return this.tokenResponse;
  }

  setCookieValue(setCookieObject: { [key: string]: string[] }) {
    if (
      setCookieObject &&
      setCookieObject['Set-Cookie'] &&
      setCookieObject['Set-Cookie'].length > 0
    ) {
      const extractToken = setCookieObject['Set-Cookie'][0]
        .split(' ')[0]
        .replace('token=', '');

      this.tokenResponse = { token: extractToken };
    }
  }
}
