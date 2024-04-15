import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastService } from 'src/app/shared/toast.service';
import { environment } from 'src/environments/environment';
import { UserAuth } from '../models/user-auth.model';
import { User } from '../models/user.model';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> =
    new BehaviorSubject(new HttpErrorResponse({}));
  private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> =
    new BehaviorSubject(new HttpResponse({}));

  constructor(
    public http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private toastService: ToastService
  ) {}

  postRegister(user: User): void {
    console.log(user);

    this.http.post<User>(`${environment.urlApi}/auth/register`, user).subscribe(
      (response) => {
        if (response) {
          // this.localStorageService.clearToken();
          this.router.navigate(['/auth/login']);
          this.toastService.showSuccess(
            'Vous pouvez vous connecter',
            'Compte créé avec succès'
          );
        }
      },
      (error) => {
        if (error.error.error_message === 'Email already taken.') {
          this.toastService.showError(
            'Un compte avec cette adresse mail existe déjà.',
            'Inscription impossible'
          );
        }
      }
    );
  }

  // Je me connecte : j'envoie mon objet UserAuth et je m'abonne à la réponse de mon serveur. Lorsque je la reçois, je reçois le token que je stock en localStorage.
  signIn(userAuth: UserAuth): void {
    // this.tokenService.resetToken();

    this.http.post<any>(`${environment.urlApi}/auth/login`, userAuth).subscribe(
      (cookie) => {
        if (cookie) {
          this.cookieService.setCookieValue(cookie.headers);
          this.router.navigate(['/']);
          this.toastService.showSuccess(
            'bravo félicitations',
            'Connexion réussie'
          );
        }
      },
      (error) => {
        if (error.error.bad_credentials === 'true') {
          this.toastService.showError(
            'La combinaison email / mot de passe est incorrecte.',
            'Connexion impossible'
          );
        }
      }
    );
  }

  checkAuthentication(): Observable<any> {
    return this.http.get(`${environment.urlApi}/auth/check-auth`);
  }

  getHttpErrorSubject$(): Observable<HttpErrorResponse> {
    return this._httpErrorSubject$.asObservable();
  }

  setHttpErrorSubject$(error: HttpErrorResponse): void {
    // On retire l'erreur stockée dans le SuccessSubject
    this._httpSuccessSubject$.next(new HttpResponse({}));
    // On ajoute l'erreur au ErrorSubject
    this._httpErrorSubject$.next(error);
  }

  getHttpSuccessSubject$(): Observable<HttpResponse<any>> {
    return this._httpSuccessSubject$.asObservable();
  }

  setHttpSuccessSubject$(success: HttpResponse<any>): void {
    // On retire l'erreur stockée dans le ErrorSubject
    this._httpErrorSubject$.next(new HttpErrorResponse({}));
    // On ajoute l'erreur au SuccessSubject
    this._httpSuccessSubject$.next(success);
  }
}
