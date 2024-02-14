import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDetailComponent } from '../../components/feature/team-detail/team-detail.component';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [CommonModule, TeamDetailComponent],
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent {}
