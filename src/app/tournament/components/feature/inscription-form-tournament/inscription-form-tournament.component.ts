import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastService } from 'src/app/shared/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from 'src/app/team/models/team.type';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SelectTeam } from 'src/app/tournament/models/selectTeam.class';
import { ModalComponent } from 'src/app/components/ui/modal/modal.component';
import { ModalContent } from 'src/app/components/models/modal-content.class';

@Component({
  selector: 'app-inscription-form-tournament',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './inscription-form-tournament.component.html',
  styleUrls: ['./inscription-form-tournament.component.scss'],
})
export class InscriptionFormTournamentComponent implements OnInit {
  @Input() teams!: Team[] | null;
  inscriptionForm!: FormGroup;
  selectTeam!: SelectTeam;
  tournamentId!: number;

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        this.tournamentId = params['id'];
      });
    }

    this.inscriptionForm = new FormGroup({
      teamName: new FormControl('', [Validators.required]),
    });
  }

  get teamName() {
    return this.inscriptionForm.get('teamName');
  }

  getTeamsWithMoreThanSixMembers() {
    return this.teams?.filter(
      team => team.members.length === team.totalPlayers
    );
  }

  openDialog() {
    const modalData: ModalContent = {
      title: 'Confirmation',
      content: `Êtes-vous sûr de vouloir ajouter cette équipe au tournoi? L'équipe ne pourra
      ni être supprimée, ni modifiée par la suite.`,
    };

    const dialogRef = this.dialog.open(ModalComponent, {
      data: new ModalContent(modalData),
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response === true) {
        if (this.inscriptionForm.valid) {
          this.selectTeam = new SelectTeam(
            this.inscriptionForm.value.teamName,
            this.tournamentId
          );
          this.tournamentService
            .addTeamToTournament(this.selectTeam)
            .subscribe(response => {
              if (response === true) {
                this.router.navigate([`/tournament/${this.tournamentId}`]);
              }
            });
        } else {
          this.toastService.showError(
            'Veuillez remplir tous les champs obligatoires',
            'Erreur'
          );
        }
      } else {
        this.router.navigate([`/tournament/${this.tournamentId}`]);
      }
    });
  }

  cancelAction() {
    this.router.navigate([`/tournament/${this.tournamentId}`]);
  }

  onClick() {
    this.router.navigate(['/form-team/create']);
  }
}
