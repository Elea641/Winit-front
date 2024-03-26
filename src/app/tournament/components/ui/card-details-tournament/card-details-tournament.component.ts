import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';
import * as fr from '@angular/common/locales/fr';
import { GetImageService } from 'src/app/shared/get-image.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-card-details-tournament',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    RouterModule,
  ],
  templateUrl: './card-details-tournament.component.html',
  styleUrls: ['./card-details-tournament.component.scss'],
})
export class CardDetailsTournamentComponent {
  @Input() tournament$!: Observable<TournamentDetails>;
  public image: any;
  public tournamentDate!: Date;
  public currentDate: Date = new Date();
  public remainingTime: string = '';
  public tournamentId!: number;

  constructor(
    private getImageService: GetImageService,
    private route: ActivatedRoute
  ) {
    registerLocaleData(fr.default);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tournamentId = Number(params['id']);
    });

    this.updateCurrentDate();

    this.tournament$.subscribe((tournament) => {
      this.getImageService.getImage(tournament.imageUrl).subscribe((data) => {
        this.image = data;
        this.tournamentDate = new Date(tournament.date);
        this.remainingTime = this.getRemainingTime(tournament.date);
      });
    });
  }

  private updateCurrentDate() {
    setTimeout(() => {
      this.currentDate = new Date();
      this.updateCurrentDate();
    }, 60000);
  }

  getRemainingTime(tournamentDate: Date): string {
    const tournamentDateIso = new Date(tournamentDate);

    if (
      !(tournamentDateIso instanceof Date) ||
      isNaN(tournamentDateIso.getTime())
    ) {
      return 'Date invalide';
    }

    const timeDifference =
      tournamentDateIso.getTime() - this.currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (daysDifference > 1) {
      return `Inscription disponible pendant : ${daysDifference} jours`;
    } else if (hoursDifference > 1) {
      return `Inscription disponible pendant : ${hoursDifference} heures`;
    } else if (minutesDifference > 1) {
      return `Inscription disponible pendant : ${minutesDifference} minutes`;
    } else {
      return 'Inscription terminée';
    }
  }
}
