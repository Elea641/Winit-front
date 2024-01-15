import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/components/ui/sidebar/sidebar.component';
import { BreakpointService } from 'src/app/components/shared/breakpoint.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
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
