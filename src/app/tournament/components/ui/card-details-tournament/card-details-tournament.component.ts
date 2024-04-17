import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Subscription } from 'rxjs';
import * as fr from '@angular/common/locales/fr';
import { GetImageService } from 'src/app/shared/get-image.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getRemainingTime } from 'src/app/tournament/shared/utils/convertTime.util';
import { TimeService } from 'src/app/tournament/shared/time.service';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
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
  public currenDate: Date = new Date();
  public remainingTime: string = '';
  public tournamentId!: number;
  public currentNumberOfParticipants!: number;
  public teamInscriptionSubscription!: Subscription;

  constructor(
    private getImageService: GetImageService,
    private route: ActivatedRoute,
    private timeService: TimeService,
    private tournamentService: TournamentService
  ) {
    registerLocaleData(fr.default);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.tournamentId = Number(params['id']);
    });

    this.updateCurrentDate();

    this.tournament$.subscribe((tournament) => {
      this.currentNumberOfParticipants =
        tournament.currentNumberOfParticipants ?? 0;
      this.getImageService.getImage(tournament.imageUrl).subscribe((data) => {
        this.image = data;
        this.tournamentDate = new Date(tournament.date);
        this.remainingTime = getRemainingTime(
          this.tournamentDate,
          this.timeService,
          this.currenDate
        );
      });
    });

    this.teamInscriptionSubscription =
      this.tournamentService.inscription$.subscribe((result) => {
        if (result === true) {
          this.currentNumberOfParticipants++;
        } else if (result === false) {
          this.currentNumberOfParticipants--;
        }
      });
  }

  private updateCurrentDate() {
    setTimeout(() => {
      this.currenDate = new Date();
      this.updateCurrentDate();
    }, 60000);
  }
}
