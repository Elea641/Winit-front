import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TokenService } from '../shared/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  role!: 'ROLE_USER' | 'ROLE_ADMIN';

  constructor(
    private router: Router,
    private tokenS: TokenService
  ) {
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
    if (this.role === 'ROLE_USER') {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
