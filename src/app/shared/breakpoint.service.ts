import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private devices: { [key: string]: boolean } = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  };

  public deviceChanged: { [key: string]: EventEmitter<boolean> } = {
    isMobile: new EventEmitter<boolean>(),
    isTablet: new EventEmitter<boolean>(),
    isDesktop: new EventEmitter<boolean>(),
    isLargeDesktop: new EventEmitter<boolean>(),
  };

  constructor(private breakpointObserver: BreakpointObserver) {
    const breakpoints = [
      { key: 'isMobile', mediaQuery: '(max-width: 599.99px)' },
      {
        key: 'isTablet',
        mediaQuery: '(min-width: 600px) and (max-width: 1024px)',
      },
      {
        key: 'isDesktop',
        mediaQuery: '(min-width: 1024px) and (max-width: 1199.99px)',
      },
      { key: 'isLargeDesktop', mediaQuery: '(min-width: 1200px)' },
    ];

    breakpoints.forEach(config => {
      this.breakpointObserver
        .observe([config.mediaQuery])
        .subscribe((state: BreakpointState) => {
          const newValue = state.matches;

          if (this.devices[config.key] !== newValue) {
            this.devices[config.key] = newValue;
            this.deviceChanged[config.key].emit(newValue);
          }
        });

      this.deviceChanged[config.key].emit(this.devices[config.key]);
    });
  }

  isMobileDevice(): boolean {
    return this.devices['isMobile'];
  }

  isTabletDevice(): boolean {
    return this.devices['isTablet'];
  }

  isDesktopDevice(): boolean {
    return this.devices['isDesktop'];
  }

  isLargeDesktopDevice(): boolean {
    return this.devices['isLargeDesktop'];
  }
}
