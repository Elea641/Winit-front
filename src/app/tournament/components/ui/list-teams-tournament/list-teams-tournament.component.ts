import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteModalComponent } from 'src/app/components/ui/delete-modal/delete-modal.component';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { TournamentMappers } from 'src/app/tournament/shared/mappers/TournamentMappers';
import { Team } from 'src/app/team/models/team.model';
import { ChosenTeam } from 'src/app/tournament/models/chosenTeam.model';

@Component({
  selector: 'app-list-teams-tournament',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './list-teams-tournament.component.html',
  styleUrls: ['./list-teams-tournament.component.scss'],
})
export class ListTeamsTournamentComponent {
  @Input() tournament$!: Observable<TournamentDetails>;
  teamSubscription!: Subscription;
  teams!: { name: string; result: number; url: string }[];

  constructor(
    private dialog: MatDialog,
    private tournamentService: TournamentService
  ) {}

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.tournament$.subscribe((result) => {
      this.teams = result.teams;
    });

    this.teamSubscription = this.tournamentService.teamInscription$.subscribe(
      (team) => {
        if (team) {
          this.teams = [team];
        }
      }
    );
  }

  openDialog(team: TournamentDetails) {
    const dialogRef = this.dialog.open(DeleteModalComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if (response === true) {
        console.log('delete');
      }
    });
  }
}
