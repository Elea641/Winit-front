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
import { UserAuth } from '../models/user-auth.class';
import { LocalStorageService } from './local-storage.service';
import { TokenService } from './token.service';
import { NewPassword } from '../models/newPassword.class';
import { RegistrationUser } from '../models/registration-user.type';
import { Response } from '../models/response.type';

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
    private tokenService: TokenService,
    private router: Router,
    private toastService: ToastService,
    private localStorageService: LocalStorageService
  ) {}

  postRegister(user: RegistrationUser): void {
    this.http
      .post<Response>(`${environment.urlApi}/auth/register`, user)
      .subscribe({
        next: response => {
          if (response) {
            this.localStorageService.clearToken();
            this.router.navigate(['/auth/login']);
            this.toastService.showSuccess(
              'Vous pouvez vous connecter',
              'Compte créé avec succès'
            );
          }
        },
        error: error => {
          if (error.error.error_message === 'Email already taken.') {
            this.toastService.showError(
              'Un compte avec cette adresse mail existe déjà.',
              'Inscription impossible'
            );
          }
        },
      });
  }

  // Je me connecte : j'envoie mon objet UserAuth et je m'abonne à la réponse de mon serveur. Lorsque je la reçois, je reçois le token que je stock en localStorage.
  signIn(userAuth: UserAuth): void {
    this.tokenService.resetToken();

    this.http
      .post<any>(`${environment.urlApi}/auth/login`, userAuth)
      .subscribe({
        next: tokenFromDB => {
          this.tokenService.updateToken(tokenFromDB);
          this.router.navigate(['/']);
          this.toastService.showSuccess('Bienvenue', 'Connexion réussie');
        },
        error: error => {
          if (error.error.error_message === 'No JWT provided.') {
            this.toastService.showError(
              'Votre compte a été désactivé',
              'Connexion impossible'
            );
          } else {
            this.toastService.showError(
              'La combinaison email / mot de passe est incorrecte.',
              'Connexion impossible'
            );
          }
        },
      });
  }

  passwordForgotten(email: string) {
    this.http
      .post<{
        message: string;
      }>(`${environment.urlApi}/auth/password-forgotten/${email}`, null)
      .subscribe({
        next: response => {
          if (response.message) {
            this.router.navigate(['/auth/login']);
            this.toastService.showSuccess(response.message, '');
          }
        },
      });
  }

  newPassword(token: string, newPassword: NewPassword) {
    this.http
      .post<{
        message: string;
      }>(`${environment.urlApi}/auth/new-password/${token}`, newPassword)
      .subscribe({
        next: response => {
          if (response) {
            this.router.navigate(['/auth/login']);
            this.toastService.showSuccess(response.message, '');
          }
        },
        error: error => {
          if (error) {
            this.toastService.showError(
              error.error,
              "Une erreur s'est produite"
            );
          }
        },
      });
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
