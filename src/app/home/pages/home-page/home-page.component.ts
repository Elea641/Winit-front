import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { CarouselComponent } from 'src/app/components/ui/carousel/carousel.component';
=======
import { SidebarComponent } from 'src/app/components/ui/sidebar/sidebar.component';
import { BreakpointService } from 'src/app/components/shared/breakpoint.service';
>>>>>>> 4d894b04a192d1d3bab2b7238748a2f717a4044e

@Component({
  selector: 'app-home-page',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, CarouselComponent],
=======
  imports: [CommonModule, SidebarComponent],
>>>>>>> 4d894b04a192d1d3bab2b7238748a2f717a4044e
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
<<<<<<< HEAD
  
=======
  isMobile: boolean = false;

  constructor(private breakpointService: BreakpointService) {
    this.isMobile = this.breakpointService.isMobileDevice();
    this.breakpointService.isMobileChanged.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
>>>>>>> 4d894b04a192d1d3bab2b7238748a2f717a4044e
}
