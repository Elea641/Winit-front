import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { LocalStorageService } from '../shared/local-storage.service';
import { Router } from '@angular/router';
import { TokenService } from '../shared/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authS: AuthService,
    private lsService: LocalStorageService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // On récupère le token du localStorage
    const idToken = this.lsService.getToken();

    if (idToken) {
      // Je crée le header ajouté à chaque requête HTTP envoyée vers le serveur
      const cloned = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + idToken),
      });

      return this.mapStream(cloned, next);
    } else {
      return this.mapStream(request, next);
    }
  }

  mapStream(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(incomingRequest => {
        // j'intercepte les requêtes que mon serveur me renvoie en statut 200 (Statut : succès)
        if (incomingRequest instanceof HttpResponse) {
          this.authS.setHttpSuccessSubject$(incomingRequest);
        }
      }),
      // J'intercepte les requêtes que mon serveur me renvoit en statut 400 (Statut : erreur)
      catchError((err: HttpErrorResponse) => {
        this.authS.setHttpErrorSubject$(err);
        if (
          err.error.is_token_expired == 'true' ||
          err.error.bad_credentials === 'true' ||
          err.error.error_message === 'No JWT provided.'
        ) {
          this.lsService.clearToken();
          this.router.navigate(['/auth/login']);
          this.tokenService.resetToken();
        }
        return throwError(() => err);
      })
    );
  }
}
