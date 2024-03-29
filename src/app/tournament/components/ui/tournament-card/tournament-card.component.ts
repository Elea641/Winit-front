import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { GetImageService } from 'src/app/shared/get-image.service';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.model';
import { Tournament } from 'src/app/tournament/models/tournament.model';
import * as fr from '@angular/common/locales/fr';

@Component({
  selector: 'app-tournament-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss'],
})
export class TournamentCardComponent {
  constructor(private getImageService: GetImageService) {
    registerLocaleData(fr.default);
  }

  @Input()
  public tournament!: TournamentCard;
  public image: any;

  ngOnInit() {
    this.getImageService
      .getImage(this.tournament.imageUrl)
      .subscribe((data) => {
        this.image = data;
      });
  }
}
