import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';

import { TournamentForm } from 'src/app/tournament/models/tournament-form.model';
import { Sport } from 'src/app/auth/models/sport.model';

import { FileUploadComponent } from '../../../../components/feature/file-upload/file-upload.component';
import { Tournament } from 'src/app/tournament/models/tournament.model';
import { TournamentEntityMappers } from 'src/app/tournament/shared/mappers/TournamentEntityMappers';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { SportService } from 'src/app/sport/shared/sport.service';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    FileUploadComponent,
  ],
})
export class TournamentFormComponent implements OnInit {
  tournamentForm!: TournamentForm['form'];

  sports!: Sport[];

  tournamentPrivacies: string[] = ['Public', 'Privé'];

  playerCategories: string[] = [
    'Amateur',
    'Intermédiaire',
    'Professionnel',
    'Ouvert',
  ];

  tournamentFormats: string[] = ['Format 1', 'Format 2', 'Format 3'];

  // File validator WIP
  // validators = [FileInputValidators.accept("image/*")];
  // profileImg = new FormControl<FileInputValue>(null, this.validators);

  isDisplayedInscriptionLimitDate: boolean;

  constructor(
    private fb: FormBuilder,
    private tournamentEntityMappers: TournamentEntityMappers,
    private tournamentService: TournamentService,
    private sportService: SportService
  ) {
    this.isDisplayedInscriptionLimitDate = false;
  }

  ngOnInit(): void {
    this.tournamentForm = new TournamentForm(this.fb)['form'];
    this.sportService.getAllSports().subscribe((sports) => {
      this.sports = sports;
    });
  }

  toggleIncriptionLimitDate(event: any) {
    this.isDisplayedInscriptionLimitDate =
      !this.isDisplayedInscriptionLimitDate;

    if (this.isDisplayedInscriptionLimitDate) {
      this.tournamentForm.controls['inscriptionLimitDate'].addValidators(
        Validators.required
      );
      this.tournamentForm.controls[
        'inscriptionLimitDate'
      ].updateValueAndValidity();
    } else {
      this.tournamentForm.controls['inscriptionLimitDate'].removeValidators(
        Validators.required
      );
      this.tournamentForm.controls[
        'inscriptionLimitDate'
      ].updateValueAndValidity();
    }
    console.log(this.tournamentForm.controls['inscriptionLimitDate'].validator);
  }

  onSubmit() {
    if (this.tournamentForm.valid) {
      const newTournament: Tournament =
        this.tournamentEntityMappers.ToCreationEntity(this.tournamentForm);
      this.tournamentService.createTournament(newTournament);
    } else {
      console.log('Error submitting form');
    }
  }
}
