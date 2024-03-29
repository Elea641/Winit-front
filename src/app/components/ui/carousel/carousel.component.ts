import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Observable, map } from 'rxjs';
import { Tournament } from 'src/app/tournament/models/tournament.model';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { TournamentCardComponent } from '../../../tournament/components/ui/tournament-card/tournament-card.component';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.model';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, TournamentCardComponent, SlickCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  tournaments$!: Observable<TournamentCard[]>;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournaments$ = this.tournamentService
      .getAllTournaments()
      .pipe(map((data) => data));
  }

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
