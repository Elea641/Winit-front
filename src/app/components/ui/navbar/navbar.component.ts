import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { BreakpointService } from '../../../shared/breakpoint.service';
import { TokenService } from 'src/app/auth/shared/token.service';
import { TokenDetails } from 'src/app/auth/models/TokenDetails.class';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  token: TokenDetails | null = null;
  isMobile: boolean | undefined = false;
  logoUrl = '';

  constructor(
    private router: Router,
    private breakpointService: BreakpointService,
    private tokenService: TokenService
  ) {
    this.isMobile = this.breakpointService.isMobileDevice();
    this.breakpointService.deviceChanged['isMobile'].subscribe(
      (isMobile: boolean) => {
        if (isMobile !== undefined) {
          this.isMobile = isMobile;
        }
      }
    );
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.logoUrl =
            event?.url === '/' || event?.url === '/home'
              ? '../../../../assets/pictures/logo-orange.png'
              : '../../../../assets/pictures/logo-white.png';
        }
        window.scrollTo(0, 0);
      });

    this.tokenService._getTokenDetailsSubject$().subscribe({
      next: (tokenDetails: TokenDetails) => {
        this.token = tokenDetails;
      },
    });
  }

  isTokenEmpty(token: TokenDetails): boolean {
    return !token || Object.keys(token).length === 0;
  }

  goToDisconnected(url: string) {
    localStorage.clear();
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }
}
