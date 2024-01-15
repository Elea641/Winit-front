import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private isMobile: boolean = false;
  public isMobileChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        const newIsMobile = result.matches;
        if (this.isMobile !== newIsMobile) {
          this.isMobile = newIsMobile;
          this.isMobileChanged.emit(this.isMobile);
        }
      });
  }

  isMobileDevice(): boolean {
    return this.isMobile;
  }
}
