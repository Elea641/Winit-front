import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Observable } from 'rxjs';
import { TournamentCardComponent } from '../../../tournament/components/ui/tournament-card/tournament-card.component';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.type';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TournamentCardComponent, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() tournaments$!: Observable<TournamentCard[]>;

  slideConfig = {
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
