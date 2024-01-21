import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private isMobile: boolean = false;
  private isTablet: boolean = false;
  private isDesktop: boolean = false;
  public isMobileChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        const newIsMobile = result.matches;
        if (this.isMobile !== newIsMobile) {
          this.isMobile = newIsMobile;
          this.isMobileChanged.emit(this.isMobile);
        } else if (this.isTablet !== newIsMobile) {
          this.isTablet = newIsMobile;
          this.isMobileChanged.emit(this.isTablet);
        } else if (this.isDesktop !== newIsMobile) {
          this.isDesktop = newIsMobile;
          this.isMobileChanged.emit(this.isDesktop);
        }
      });
  }

  isMobileDevice(): boolean | undefined {
    if (this.isMobile) {
      return this.isMobile;
    } else if (this.isTablet) {
      return this.isTablet;
    } else if (this.isDesktop) {
      return this.isDesktop;
    }
    return false;
  }
}
