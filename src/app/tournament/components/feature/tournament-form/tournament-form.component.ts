import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

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
import { Sport } from 'src/app/sport/models/sport.type';

import { FileUploadComponent } from '../../../../components/feature/file-upload/file-upload.component';
import { TournamentMappers } from 'src/app/tournament/shared/mappers/TournamentMappers';
import { TournamentService } from 'src/app/tournament/shared/tournament.service';
import { SportService } from 'src/app/sport/shared/sport.service';
import { TournamentCreationDto } from 'src/app/tournament/models/tournament-creation-dto.type';
import { ToastService } from 'src/app/shared/toast.service';

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
  tournamentForm!: TournamentForm['form'];
  sports$: Observable<Sport[]> = this.sportService.getAllSports();
  private destroy$!: Subject<void>;

  constructor(
    private fb: FormBuilder,
    private tournamentEntityMappers: TournamentMappers,
    private tournamentService: TournamentService,
    private sportService: SportService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();

    this.tournamentForm = new TournamentForm(this.fb, this.sportService)[
      'form'
    ];
  }

  onSubmit() {
    if (this.tournamentForm.valid) {
      const newTournament: TournamentCreationDto =
        this.tournamentEntityMappers.toCreationDto(this.tournamentForm);
      this.tournamentService.createTournament(newTournament);
    } else {
      this.toastService.showError(
        "Le formulaire n'a pas pu être envoyé",
        'Erreur'
      );
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
