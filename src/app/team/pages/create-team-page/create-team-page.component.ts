import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamFormComponent } from '../../components/feature/team-form/team-form.component';

@Component({
  selector: 'app-create-team-page',
  standalone: true,
  imports: [CommonModule, TeamFormComponent],
  templateUrl: './create-team-page.component.html',
  styleUrls: ['./create-team-page.component.scss'],
})
export class CreateTeamPageComponent {}
