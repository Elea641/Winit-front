import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CarouselComponent } from 'src/app/components/ui/carousel/carousel.component';
import { SidebarComponent } from 'src/app/components/ui/sidebar/sidebar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    CommonModule,
    CarouselComponent,
    SidebarComponent,
    MatDividerModule,
  ],
})
export class HomePageComponent {
  isDrawerOpened: boolean = false;
  isOpen: string = '';

  ngOnInit(): void {
    if (this.isDrawerOpened === true) {
      this.isOpen = 'open';
    }
  }

  handleDrawerChange(isDrawerOpened: boolean) {
    this.isDrawerOpened = isDrawerOpened;
    this.isOpen = isDrawerOpened ? 'open' : 'close';
  }
}
