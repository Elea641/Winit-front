import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTournamentMatchComponent } from '../card-tournament-match/card-tournament-match.component';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.type';
import { HelperTournamentService } from 'src/app/tournament/shared/helpers/helper-tournament.service';
import { Observable, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TimeService } from 'src/app/tournament/shared/time-service.service';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { Match } from 'src/app/tournament/models/match.type';
import { ModalContent } from 'src/app/components/models/modal-content.class';

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
export class ListTournamentTreeComponent implements OnInit, OnDestroy {
  @Input() tournament$!: Observable<TournamentDetails>;
  @Output() isGenerated: EventEmitter<boolean> = new EventEmitter();
  tournamentDetails!: TournamentDetails;
  generatedTree!: { randomPhaseMatches: object; remainingPhaseMatches: object };
  limitInscriptionTime!: Subscription;
  limitInscriptionValue: number | undefined;
  tournamentSubscription!: Subscription;
  matchesByPhase: { [phase: string]: Match[] } = {};
  matchesByPhaseWithoutPreliminary: { [phase: string]: Match[] } = {};
  phaseKeys: string[] = [];
  phaseWithoutPreliminary: string[] = [];
  isCanceled = false;

  constructor(
    private helperTournamentService: HelperTournamentService,
    private timeService: TimeService,
    private tournamentService: TournamentService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    if (this.limitInscriptionTime) {
      this.limitInscriptionTime.unsubscribe();
    }
    if (this.tournamentSubscription) {
      this.tournamentSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.limitInscriptionTime =
      this.timeService.limitTimeInscription$.subscribe((limit: number) => {
        this.limitInscriptionValue = limit;
      });

    if (this.tournament$) {
      this.tournament$.subscribe(tournament => {
        this.tournamentDetails = tournament;

        if (this.tournamentDetails.matches) {
          this.tournamentDetails.matches.forEach((match: Match) => {
            if (!this.matchesByPhase[match.phase]) {
              this.matchesByPhase[match.phase] = [];
            }
            this.matchesByPhase[match.phase].push(match);
          });
        }
      });
    }

    this.phaseKeys = Object.keys(this.matchesByPhase);

    this.tournamentSubscription = this.tournamentService.tournament$.subscribe(
      tournament => {
        this.matchesByPhase = {};
        this.tournamentDetails = tournament;
        if (this.tournamentDetails.matches) {
          this.tournamentDetails.matches.forEach((match: Match) => {
            if (!this.matchesByPhase[match.phase]) {
              this.matchesByPhase[match.phase] = [];
            }
            this.matchesByPhase[match.phase].push(match);
          });
        }
        this.phaseKeys = Object.keys(this.matchesByPhase);
        this.getTotalPhaseWithoutPreliminary(this.matchesByPhase);
        this.phaseWithoutPreliminary = Object.keys(
          this.matchesByPhaseWithoutPreliminary
        );
      }
    );

    this.getTotalPhaseWithoutPreliminary(this.matchesByPhase);
    this.phaseWithoutPreliminary = Object.keys(
      this.matchesByPhaseWithoutPreliminary
    );
  }

  sortPhaseKeysByMatchCount(phaseKeys: string[]): string[] {
    return phaseKeys.sort((a, b) => {
      const matchCountA = this.matchesByPhase[a].length;
      const matchCountB = this.matchesByPhase[b].length;
      return matchCountB - matchCountA;
    });
  }

  isPhaseIncomplete(matches: Match[]): boolean {
    return matches.some(
      match => match.team1 === 'En attente' || match.team2 === 'En attente'
    );
  }

  marginCalculator(index: number): number {
    const margin = [0.5, 1.5, 3.5, 7.5];
    return margin[index];
  }

  getTotalPhaseWithoutPreliminary(matchesByPhase: {
    [phase: string]: Match[];
  }): void {
    const phasesWithoutPreliminary: { [phase: string]: Match[] } = {};
    const keys = Object.keys(matchesByPhase);

    const nonPreliminaryKeys = keys.filter(key => key !== 'Phase préliminaire');

    nonPreliminaryKeys.forEach(key => {
      phasesWithoutPreliminary[key] = matchesByPhase[key];
    });

    this.matchesByPhaseWithoutPreliminary = phasesWithoutPreliminary;
  }

  getGenerated(event: boolean): void {
    this.isGenerated.emit(event);
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

    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.getGenerated(true);
        this.tournamentService.updateTournament(
          this.tournamentDetails.id,
          this.generatedTree
        );
      }
    });
  }

  openDialogCancelTournament() {
    const modalData: ModalContent = {
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir annuler le tournoi ?`,
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      data: new ModalContent(modalData),
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        this.getGenerated(true);
        this.isCanceled = true;
        this.tournamentService.cancelTournament(
          this.tournamentDetails.id,
          true
        );
      }
    });
  }
}
