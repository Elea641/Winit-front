import { Injectable } from '@angular/core';
import { TokenResponse } from '../models/token.model';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // Le BehaviorSubject est initialisé avec une valeur par défaut, ici : this.getTokenFromLocalStorageAndDecode()
  // Cela signifie que la valeur par défaut de _tokenDetailsSubject$ sera celle du Token décodé présent en LocalStorage (s'il y en a un).
  // Sinon ça sera null.

  private readonly _tokenDetailsSubject$: BehaviorSubject<any> =
    new BehaviorSubject<any>(this.getTokenDecode());

  constructor(private cookieService: CookieService) {}

  getTokenDecode(): any {
    // On récupère le token stocké en localStorage
    const token = this.cookieService.getCookieValue();

    // S'il y en a un
    if (token) {
      // Je retourne la valeur décodée du token (le corps du token)
      this._setTokenDetailsSubject$(token);
      return this._decodeToken(token);
    } else {
      // Sinon je retourne null
      return null;
    }
  }

  resetToken(): void {
    this._tokenDetailsSubject$.next({});
  }

  // Je décode mon token (comme le fait jwt.io) afin d'en extraire le CORPS et y récupérer les CLAIMS (rôle de l'utilisateur, son email, expiration...)
  private _decodeToken(tokenFromDB: TokenResponse): any {
    return this._getDecodedTokenResponse(tokenFromDB.token);
  }

  // Je décode le token
  private _getDecodedTokenResponse(token: string): any {
    // J'utilise une librairie pour décoder le corps du token
    return jwtDecode(token);
  }

  // Je "pousse" une nouvelle valeur dans la propriété _tokenDetailsSubject$ (en l'occurence ici : le corps du token décodé)
  private _setTokenDetailsSubject$(tokenInfos: any): void {
    console.log(tokenInfos);

    this._tokenDetailsSubject$.next(tokenInfos);
  }

  // J'expose ma propriété _tokenDetailsSubject$ en tant qu'Observable, afin que chaque composant/service qui y soit .subscribe() soit notifié s'il y a un nouveau token.
  _getTokenDetailsSubject$(): Observable<any> {
    console.log(this._tokenDetailsSubject$);

    return this._tokenDetailsSubject$.asObservable();
  }
}
