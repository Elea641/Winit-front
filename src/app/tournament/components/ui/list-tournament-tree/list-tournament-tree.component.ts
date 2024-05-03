import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTournamentMatchComponent } from '../card-tournament-match/card-tournament-match.component';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';
import { HelperTournamentService } from 'src/app/tournament/shared/helpers/helper-tournament.service';
import { Observable, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/toast.service';
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
  // convertedSelection: string | undefined;
  // tournamentPhase!: any;
  // totalPhase: any;
  // namesTeamList: any;
  // namesTeamListPhase: any;
  // namesTeamListRandom: any;
  limitInscriptionTime!: Subscription;
  limitInscriptionValue: number | undefined;

  constructor(
    private helperTournamentService: HelperTournamentService,
    private timeService: TimeService,
    private tournamentService: TournamentService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnDestroy(): void {
    this.limitInscriptionTime.unsubscribe();
  }

  ngOnInit(): void {
    this.limitInscriptionTime =
      this.timeService.limitTimeInscription$.subscribe((limit: number) => {
        this.limitInscriptionValue = limit;
      });

    this.tournament$.subscribe(
      (tournament) => (this.tournamentDetails = tournament)
    );

    // if (this.tournamentDetails.currentNumberOfParticipants) {
    //   this.totalPhase = this.helperTournamentService.calculPhase(
    //     this.tournamentDetails.currentNumberOfParticipants
    //   );
    // }

    // this.tournamentPhase =
    //   this.helperTournamentService.convertToTournamentPhase(this.totalPhase);

    // this.namesTeamList = this.helperTournamentService.randomizeTeams(
    //   this.tournamentDetails.teams
    // );

    // const { randomTeams, remainingTeams } =
    //   this.helperTournamentService.divideTeamsForPhases(
    //     this.namesTeamList,
    //     this.totalPhase.randomMatchs
    //   );

    // this.namesTeamListPhase = {
    //   remainingTeams,
    // };

    // this.namesTeamListRandom = {
    //   randomTeams,
    // };
  }

  // getObjectKeys(obj: any): any[] {
  //   return Object.keys(obj);
  // }

  // getNumberArray(length: number): number[] {
  //   return new Array(length).fill(0).map((_, index) => index);
  // }

  // getTeamName(
  //   index: number,
  //   phaseKey?: string
  // ): { teamName: string; isEven: boolean } {
  //   const result = { teamName: '', isEven: false };

  //   if (index >= 0) {
  //     if (phaseKey === 'randomMatchs') {
  //       result.teamName = this.namesTeamListRandom.randomTeams[index];
  //     } else {
  //       const difference = index - this.totalPhase.count;

  //       if (difference >= 0 && difference < this.totalPhase.count) {
  //         result.teamName = '';
  //       } else {
  //         result.teamName =
  //           this.namesTeamListPhase.remainingTeams[index] ?? 'Name';
  //       }
  //     }

  //     result.isEven = index % 2 === 0;
  //   }

  //   return result;
  // }

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

    //    this.tournamentDetails.isGenerated = true;
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
      } else {
        this.toastService.showError(
          'Erreur',
          'Veuillez remplir tous les champs obligatoires'
        );
      }
    });
  }
}
