import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { CarouselComponent } from 'src/app/components/ui/carousel/carousel.component';
import { SidebarComponent } from 'src/app/components/ui/sidebar/sidebar.component';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.model';
import { HomeService } from '../../shared/home.service';

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
  tournaments$!: Observable<TournamentCard[]>;
  generatedTournaments$!: Observable<TournamentCard[]>;
  currentTournaments$!: Observable<TournamentCard[]>;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.tournaments$ = this.homeService.getAllTournaments();
    this.generatedTournaments$ = this.homeService.getAllGeneratedTournaments();
    this.currentTournaments$ = this.homeService.getAllCUrrentTournaments();
  }
}
