import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { TimeService } from 'src/app/tournament/shared/time.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/team/shared/team.service';

@Component({
  selector: 'app-list-teams-tournament',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './list-teams-tournament.component.html',
  styleUrls: ['./list-teams-tournament.component.scss'],
})
export class ListTeamsTournamentComponent {
  @Input() tournament$!: Observable<TournamentDetails>;
  tournamentId!: number;
  teamSubscription!: Subscription;
  currentNumberOfParticipants!: number;
  teams!: { name: string; result: number; url: string }[];
  limitInscriptionTime!: Subscription;
  limitInscriptionValue: number | undefined;

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService,
    private timeService: TimeService,
    private route: ActivatedRoute,
    private teamService: TeamService
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
    this.tournament$.subscribe((result) => {
      this.teams = result.teams;
      this.currentNumberOfParticipants =
        result.currentNumberOfParticipants ?? 0;
    });

    this.route.params.subscribe((params) => {
      this.tournamentId = params['id'];
    });

    this.limitInscriptionTime =
      this.timeService.limitTimeInscription$.subscribe((limit: number) => {
        this.limitInscriptionValue = limit;
      });

    this.teamSubscription = this.tournamentService.teamInscription$.subscribe(
      (team) => {
        if (team) {
          this.teams = [...this.teams, team];
          this.currentNumberOfParticipants++;
        }
      }
    );
  }

  openDialog(team: { name: string; result: number; url: string }) {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if (response === true) {
        this.tournamentService
          .deleteTeamToTournament(this.tournamentId, team)
          .subscribe(
            (success) => {
              if (success) {
                this.teams = this.teams.filter((t) => t.name !== team.name);
                console.log(this.teams);
                this.currentNumberOfParticipants--;
              }
            },
            (error) => {
              console.error(
                'Une erreur est survenue lors de la suppression :',
                error
              );
            }
          );
      }
    });
  }
}
