import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private devices: { [key: string]: boolean } = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  };

  public deviceChanged: { [key: string]: EventEmitter<boolean> } = {
    isMobile: new EventEmitter<boolean>(),
    isTablet: new EventEmitter<boolean>(),
    isDesktop: new EventEmitter<boolean>(),
  };

  constructor(private breakpointObserver: BreakpointObserver) {
    const breakpoints = [
      { key: 'isMobile', mediaQuery: Breakpoints.XSmall },
      { key: 'isTablet', mediaQuery: Breakpoints.Small },
      { key: 'isDesktop', mediaQuery: Breakpoints.Medium },
    ];

    breakpoints.forEach((config) => {
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
}
