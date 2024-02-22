import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { Sport } from 'src/app/sport/models/sport.model';
import { SportService } from 'src/app/sport/shared/sport.service';
import { CreatedTeam } from 'src/app/team/models/created-team.model';
import { TeamService } from 'src/app/team/shared/team.service';

@Component({
  selector: 'app-create-team',
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
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent {
  teamForm!: FormGroup;
  team: CreatedTeam = new CreatedTeam('', '');
  sports: Sport[] = [];

  constructor(
    public teamService: TeamService,
    private sportService: SportService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.teamForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(
          `[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]*`
        ),
      ]),
      sport: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
    });

    this.sportService.getAllSports().subscribe((sports) => {
      this.sports = sports;
    });
  }

  get name() {
    return this.teamForm.get('name')!;
  }

  get sport() {
    return this.teamForm.get('sport')!;
  }

  onSubmit() {
    if (this.teamForm.valid) {
      this.team = new CreatedTeam(this.name.value, this.sport.value);
      this.teamService.addTeam(this.team);
    } else {
      this.toastService.showError(
        'Erreur',
        'Veuillez remplir tous les champs obligatoires'
      );
    }
  }
}
