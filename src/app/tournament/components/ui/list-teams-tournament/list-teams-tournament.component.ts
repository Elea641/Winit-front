import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.type';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TimeService } from 'src/app/tournament/shared/time-service.service';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { ModalContent } from 'src/app/components/models/modal-content.class';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-list-teams-tournament',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './list-teams-tournament.component.html',
  styleUrls: ['./list-teams-tournament.component.scss'],
})
export class ListTeamsTournamentComponent implements OnInit, OnDestroy {
  @Input() isGenerated!: boolean;
  @Input() tournament$!: Observable<TournamentDetails>;
  tournamentId!: number;
  teamSubscription!: Subscription;
  currentNumberOfParticipants!: number;
  teams!: {
    name: string;
    result: number;
    url: string;
    currentUser: number;
    ownerId: number;
  }[];
  limitInscriptionTime!: Subscription;
  limitInscriptionValue: number | undefined;

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
    if (this.limitInscriptionTime) {
      this.limitInscriptionTime.unsubscribe();
    }
  }

  ngOnInit() {
    if (this.tournament$) {
      this.tournament$.subscribe(result => {
        this.teams = result.teams;
        this.currentNumberOfParticipants =
          result.currentNumberOfParticipants ?? 0;
      });
    }

    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.tournamentId = params['id'];
      });
    }

    this.limitInscriptionTime =
      this.timeService.limitTimeInscription$.subscribe((limit: number) => {
        this.limitInscriptionValue = limit;
      });

    this.teamSubscription = this.tournamentService.teamInscription$.subscribe(
      team => {
        if (team) {
          this.teams = [...this.teams, team];
          this.currentNumberOfParticipants++;
        }
      }
    );
  }

  openDialog(team: { name: string; result: number; url: string }) {
    const modalData: ModalContent = {
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir supprimer cette équipe du tournoi?`,
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      data: new ModalContent(modalData),
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.tournamentService
          .deleteTeamFromTournament(this.tournamentId, team)
          .subscribe({
            next: success => {
              if (success) {
                this.teams = this.teams.filter(t => t.name !== team.name);
                this.currentNumberOfParticipants--;
              }
            },
            error: error => {
              if (error.error) {
                this.toastService.showError(error, 'Erreur');
              }
            },
          });
      }
    });
  }
}
