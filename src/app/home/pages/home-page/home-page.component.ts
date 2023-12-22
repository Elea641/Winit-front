import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from 'src/app/components/ui/carousel/carousel.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  
}
