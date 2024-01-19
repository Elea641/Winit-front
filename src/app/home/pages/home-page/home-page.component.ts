import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from 'src/app/components/ui/carousel/carousel.component';
import { SidebarComponent } from 'src/app/components/ui/sidebar/sidebar.component';
import { BreakpointService } from 'src/app/components/shared/breakpoint.service';
import {MatDividerModule} from "@angular/material/divider";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    imports: [CommonModule, CarouselComponent, SidebarComponent, MatDividerModule]
})
export class HomePageComponent {

  isMobile: boolean = false;
  constructor(private breakpointService: BreakpointService) {
    this.isMobile = this.breakpointService.isMobileDevice();
    this.breakpointService.isMobileChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
