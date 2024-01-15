import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs';

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
  userId: number = 1;
  isMobile: boolean = false;
  logoUrl: string = '../../../assets/pictures/logo-white.png';

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private el: ElementRef
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });

    this.addClickOutsideListener();
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

  private addClickOutsideListener() {
    document.addEventListener('click', (event) => {
      const clickedElement = event.target as HTMLElement;

      if (!this.el.nativeElement.contains(clickedElement)) {
        this.logoUrl = '../../../assets/pictures/logo-white.png';
      }
    });
  }
}
