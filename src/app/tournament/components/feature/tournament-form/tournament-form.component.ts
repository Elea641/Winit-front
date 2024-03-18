import { Component, OnDestroy, OnInit } from '@angular/core';
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

import { Observable, Subject } from 'rxjs';

import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { DropzoneMaterialModule } from '@ngx-dropzone/material';

import { TournamentForm } from 'src/app/tournament/models/tournament-form.model';
import { Sport } from 'src/app/sport/models/sport.model';

import { FileUploadComponent } from "../../../../components/feature/file-upload/file-upload.component";
import { TournamentMappers } from 'src/app/tournament/shared/mappers/TournamentMappers';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { SportService } from 'src/app/sport/shared/sport.service';
import { minimumDate } from 'src/app/tournament/shared/validators/minimum-date.directive';

import { TournamentPrivacyEnum } from 'src/app/tournament/models/enum/tournamentPrivacyEnum';
import { PlayerCategoryEnum } from 'src/app/tournament/models/enum/playerCategoryEnum';
import { TournamentFormatEnum } from 'src/app/tournament/models/enum/tournamentFormatEnum';
import { TournamentCreationDto } from 'src/app/tournament/models/tournament-creation-dto.model';

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
export class TournamentFormComponent implements OnInit, OnDestroy {
  tournamentForm!: TournamentForm["form"];

  sports$!: Observable<Sport[]>;
  tournamentPrivacies: string[] = Object.values(TournamentPrivacyEnum);
  playerCategories: string[] = Object.values(PlayerCategoryEnum);
  tournamentFormats: string[] = Object.values(TournamentFormatEnum);

  private destroy$!: Subject<void>;

  isDisplayedInscriptionLimitDate: boolean;

  constructor(
    private fb: FormBuilder,
    private tournamentEntityMappers: TournamentMappers,
    private tournamentService: TournamentService,
    private sportService: SportService
  ) {
    this.isDisplayedInscriptionLimitDate = false;
  }

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();

    this.tournamentForm = new TournamentForm(this.fb, this.sportService)["form"];

    this.sports$ = this.sportService.getAllSports();
  }

  toggleInscriptionLimitDate() {
    this.isDisplayedInscriptionLimitDate = !this.isDisplayedInscriptionLimitDate;
    
    if (this.isDisplayedInscriptionLimitDate)
    {
      this.tournamentForm.controls["inscriptionLimitDate"].addValidators(Validators.required);
      this.tournamentForm.controls["inscriptionLimitDate"].addValidators([minimumDate()]);
    } else {
      this.tournamentForm.controls["inscriptionLimitDate"].removeValidators(Validators.required);
    }
  }

  onSubmit() {
    if (this.tournamentForm.valid) {
      const newTournament: TournamentCreationDto = this.tournamentEntityMappers.ToCreationDto(this.tournamentForm);
      this.tournamentService.createTournament(newTournament);
    } else {
      console.log('Error submitting form');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
