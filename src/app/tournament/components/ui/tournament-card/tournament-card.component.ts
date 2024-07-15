import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { GetImageService } from 'src/app/shared/get-image.service';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.type';
import * as fr from '@angular/common/locales/fr';

@Component({
  selector: 'app-tournament-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './tournament-card.component.html',
  styleUrls: ['./tournament-card.component.scss'],
})
export class TournamentCardComponent implements OnInit {
  @Input() tournament!: TournamentCard;
  public image: any;

  constructor(private getImageService: GetImageService) {
    registerLocaleData(fr.default);
  }

  ngOnInit() {
    if (this.tournament && this.tournament.imageUrl) {
      this.getImageService
        .getImage(this.tournament.imageUrl)
        .subscribe(data => {
          this.image = data;
        });
    }
  }
}
