import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTournamentMatchComponent } from '../card-tournament-match/card-tournament-match.component';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { HelperTournamentService } from 'src/app/tournament/shared/helpers/helper-tournament.service';
import { Observable, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TimeService } from 'src/app/tournament/shared/time-service.service';
import { ModalContent } from 'src/app/components/models/modal-content.model';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';

@Component({
  selector: 'app-list-tournament-tree',
  standalone: true,
  imports: [
    CommonModule,
    CardTournamentMatchComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './list-tournament-tree.component.html',
  styleUrls: ['./list-tournament-tree.component.scss'],
})
export class ListTournamentTreeComponent {
  @Input() tournament$!: Observable<TournamentDetails>;
  @Output() generatedTournament: EventEmitter<boolean> = new EventEmitter();
  tournamentDetails!: TournamentDetails;
  generatedTree: any;
  limitInscriptionTime!: Subscription;
  limitInscriptionValue: number | undefined;
  matchesByPhase: { [phase: string]: any[] } = {};
  phaseKeys: string[] = [];

  constructor(
    private helperTournamentService: HelperTournamentService,
    private timeService: TimeService,
    private tournamentService: TournamentService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.limitInscriptionTime.unsubscribe();
  }

  ngOnInit(): void {
    this.limitInscriptionTime =
      this.timeService.limitTimeInscription$.subscribe((limit: number) => {
        this.limitInscriptionValue = limit;
      });

    this.tournament$.subscribe((tournament) => {
      this.tournamentDetails = tournament;
      this.tournamentDetails.matches.forEach((match: any) => {
        if (!this.matchesByPhase[match.phase]) {
          this.matchesByPhase[match.phase] = [];
        }
        this.matchesByPhase[match.phase].push(match);
      });
    });
    this.phaseKeys = Object.keys(this.matchesByPhase);
  }

  sortPhaseKeysByMatchCount(phaseKeys: string[]): string[] {
    return phaseKeys.sort((a, b) => {
      const matchCountA = this.matchesByPhase[a].length;
      const matchCountB = this.matchesByPhase[b].length;
      return matchCountB - matchCountA;
    });
  }

  isPhaseIncomplete(matches: any[]): boolean {
    return matches.some(
      (match) => match.team1 === 'En attente' || match.team2 === 'En attente'
    );
  }

  getGenerated(event: boolean): void {
    this.generatedTournament.emit(event);
    if (
      this.tournamentDetails.currentNumberOfParticipants &&
      this.tournamentDetails.teams
    ) {
      this.generatedTree = this.helperTournamentService.generatedTree(
        this.tournamentDetails.currentNumberOfParticipants,
        this.tournamentDetails.teams
      );
    }
    this.tournamentDetails.isGenerated = true;
  }

  openDialog() {
    const modalData: ModalContent = {
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir générer le tournoi ? Vous ne pourrez plus le
      supprimer par la suite.`,
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      data: new ModalContent(modalData),
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response === true) {
        this.tournament$.subscribe((tournament) => {
          if (tournament) {
            this.getGenerated(true);
            this.tournamentService.updateTournament(
              tournament.id,
              this.generatedTree
            );
          }
        });
      }
    });
  }
}
