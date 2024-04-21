import { Component, Input } from '@angular/core';
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
import { Team } from 'src/app/team/models/team.model';
import { ChosenTeam } from 'src/app/tournament/models/chosenTeam.model';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from 'src/app/components/ui/confirm-modal/confirm-modal.component';
import { MatSelectModule } from '@angular/material/select';

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
export class InscriptionFormTournamentComponent {
  @Input() teams!: Team[] | null;
  inscriptionForm!: FormGroup;
  chosenTeam!: ChosenTeam;
  tournamentId!: number;

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private tournamentService: TournamentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tournamentId = params['id'];
    });

    this.inscriptionForm = new FormGroup({
      teamName: new FormControl('', [Validators.required]),
    });
  }

  get teamName() {
    return this.inscriptionForm.get('teamName')!;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe((response) => {
      if (response === true) {
        if (this.inscriptionForm.valid) {
          this.chosenTeam = new ChosenTeam(
            this.inscriptionForm.value.teamName,
            this.tournamentId
          );
          this.tournamentService
            .addTeamToTournament(this.chosenTeam)
            .subscribe((response) => {
              if (response === true) {
                this.router.navigate([`/tournament/${this.tournamentId}`]);
              }
            });
        } else {
          this.toastService.showError(
            'Erreur',
            'Veuillez remplir tous les champs obligatoires'
          );
        }
      } else {
        console.error('Le tournoi est introuvable');
      }
    });
  }

  onClick() {
    this.router.navigate([`/tournament/${this.tournamentId}`]);
  }
}
