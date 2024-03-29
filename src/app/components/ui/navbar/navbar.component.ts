import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { BreakpointService } from '../../../shared/breakpoint.service';
import { TokenService } from 'src/app/auth/shared/token.service';
import { TeamService } from 'src/app/team/shared/team.service';

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
  currentUser!: any;
  isMobile: boolean | undefined = false;
  logoUrl: string = '../../../assets/pictures/logo-white.png';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private router: Router,
    private breakpointService: BreakpointService,
    private tokenService: TokenService,
    private teamService: TeamService
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
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
    this.currentUser = this.tokenService._getTokenDetailsSubject$();
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isUserEmpty(user: any): boolean {
    return !user || Object.keys(user).length === 0;
  }

  goToDisconnected(url: string) {
    localStorage.clear();
    this.router.navigate([url]).then(() => {
      window.location.reload();
    });
  }

  toggleLogo() {
    this.logoUrl = '../../../assets/pictures/logo-orange.png';
  }

  toggleLogoButton() {
    this.logoUrl = '../../../assets/pictures/logo-white.png';
  }

  unsubscribeFromSelectedTeam(): void {
    this.teamService.unselectTeam();
  }
}
