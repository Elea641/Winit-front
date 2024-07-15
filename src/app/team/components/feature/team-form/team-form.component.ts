import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { Sport } from 'src/app/sport/models/sport.type';
import { SportService } from 'src/app/sport/shared/sport.service';
import { CreatedTeam } from 'src/app/team/models/created-team.class';
import { TeamService } from 'src/app/team/shared/team.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { TeamMapperService } from 'src/app/team/shared/mapper/team-mapper.service';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    RouterModule,
    MatSelectModule,
  ],
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit, OnDestroy {
  mode: 'create' | 'update' = 'create';
  teamToUpdate?: CreatedTeam;
  currentTeamSubscription!: Subscription;
  teamForm!: FormGroup;
  sports: Sport[] = [];
  teamName!: string | null;

  constructor(
    public teamService: TeamService,
    private sportService: SportService,
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private teamMapperService: TeamMapperService
  ) {}

  ngOnDestroy(): void {
    this.currentTeamSubscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.route.paramMap) {
      const modeParam = this.route.snapshot.paramMap.get('mode');
      this.mode = modeParam === 'update' ? 'update' : 'create';
    }

    if (this.route.queryParams) {
      this.teamName = this.route.snapshot.queryParamMap.get('teamName');
    }

    if (!this.teamToUpdate && this.teamName && this.mode === 'update') {
      this.teamService.getTeamByTeamName(this.teamName).subscribe(team => {
        this.teamToUpdate = this.teamMapperService.mapToCreatedTeam(team);
        this.teamForm = new FormGroup({
          name: new FormControl(team.name, [
            Validators.required,
            Validators.pattern(`^[a-zA-Z0-9 ]*`),
            Validators.maxLength(255),
          ]),
          sport: new FormControl(team.sport, [
            Validators.required,
            Validators.pattern('[a-zA-Z]*'),
          ]),
        });
      });
    }

    this.currentTeamSubscription = this.teamService.team$.subscribe(team => {
      if (team && this.mode === 'update') {
        this.teamToUpdate = this.teamMapperService.mapToCreatedTeam(team);
      }
    });

    this.teamForm = new FormGroup({
      name: new FormControl(this.teamToUpdate ? this.teamToUpdate.name : '', [
        Validators.required,
        Validators.pattern(`^[a-zA-Z0-9 ]*`),
        Validators.maxLength(255),
      ]),
      sport: new FormControl(this.teamToUpdate ? this.teamToUpdate.sport : '', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
    });

    this.sportService.getAllSports().subscribe(sports => {
      this.sports = sports;
    });
  }

  get name() {
    return this.teamForm.get('name');
  }

  get sport() {
    return this.teamForm.get('sport');
  }

  onSubmit() {
    if (this.teamForm.valid) {
      const teamData = {
        name: this.name?.value.trim(),
        sport: this.sport?.value,
        id: this.teamToUpdate?.id,
      };

      if (this.mode === 'create') {
        this.teamService.addTeam(teamData as CreatedTeam);
      } else if (this.mode === 'update' && this.teamToUpdate) {
        if (
          teamData.name !== this.teamToUpdate.name ||
          teamData.sport !== this.teamToUpdate.sport
        ) {
          if (this.teamName) {
            this.teamService.updateTeam(this.teamName, teamData as CreatedTeam);
          }
        } else {
          this.toastService.showError(
            'Veuillez changer au minimum une information avant de mettre à jour votre équipe',
            'Erreur'
          );
        }
      }
    } else {
      this.toastService.showError(
        'Veuillez remplir tous les champs obligatoires',
        'Erreur'
      );
    }
  }

  onClick() {
    if (this.mode === 'update') {
      this.router.navigate([`/teams-details/${this.teamToUpdate?.name}`]);
    } else {
      this.router.navigate(['/profile']);
    }
  }
}
