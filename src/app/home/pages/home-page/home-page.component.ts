import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable, of } from 'rxjs';
import { CarouselComponent } from 'src/app/components/ui/carousel/carousel.component';
import { SidebarComponent } from 'src/app/components/ui/sidebar/sidebar.component';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.model';
import { HomeService } from '../../shared/home.service';
import { SpinnerComponent } from 'src/app/components/ui/spinner/spinner.component';

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
    SpinnerComponent,
  ],
})
export class HomePageComponent implements OnInit {
  tournaments$!: Observable<TournamentCard[]>;
  generatedTournaments$!: Observable<TournamentCard[]>;
  currentTournaments$!: Observable<TournamentCard[]>;
  isLoadingTournaments = true;
  isLoadingGeneratedTournaments = true;
  isLoadingCurrentTournaments = true;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getAllTournaments().subscribe(tournaments => {
      this.tournaments$ = of(tournaments);
      this.isLoadingTournaments = false;
    });

    this.homeService
      .getAllGeneratedTournaments()
      .subscribe(generatedTournaments => {
        this.generatedTournaments$ = of(generatedTournaments);
        this.isLoadingGeneratedTournaments = false;
      });

    this.homeService
      .getAllCurrentTournaments()
      .subscribe(currentTournaments => {
        this.currentTournaments$ = of(currentTournaments);
        this.isLoadingCurrentTournaments = false;
      });
  }
}
