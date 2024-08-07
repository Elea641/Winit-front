import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TokenService } from '../shared/token.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  role!: 'ROLE_USER' | 'ROLE_ADMIN';

  constructor(
    private router: Router,
    private tokenS: TokenService
  ) {
    // Lorsque se construit ma classe (1 seule fois), je récupère mon JWT (opération asynchrone donc je dois la lancer le plus tôt possible)
    // Ma méthode canActivate() se déclenchera plus tard
    this.tokenS
      ._getTokenDetailsSubject$()
      .pipe(map((decodedToken: any) => decodedToken.role))
      .subscribe((role: 'ROLE_USER' | 'ROLE_ADMIN') => {
        this.role = role;
      });
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.role === 'ROLE_ADMIN') {
      return true;
    } else {
      // Je suis dans le cas d'un USER_ROLE
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
