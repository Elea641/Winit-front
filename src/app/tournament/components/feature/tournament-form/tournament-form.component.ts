import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentForm } from 'src/app/tournament/models/tournament-form.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.scss']
})
export class TournamentFormComponent {
  tournamentForm: TournamentForm;

  constructor(private fb: FormBuilder) {
    this.tournamentForm = new TournamentForm(fb);
  }

  onSubmit() {
    if (this.tournamentForm.form.valid) {
      console.log(this.tournamentForm.form.value);
    } else {
      console.log("Error submitting form");
    }
  }
}
