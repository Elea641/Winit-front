import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from '../../components/feature/create-team/create-team.component';

@Component({
  selector: 'app-create-team-page',
  standalone: true,
  imports: [CommonModule, CreateTeamComponent],
  templateUrl: './create-team-page.component.html',
  styleUrls: ['./create-team-page.component.scss'],
})
export class CreateTeamPageComponent {}
