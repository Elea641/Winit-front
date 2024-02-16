import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TeamService } from 'src/app/team/shared/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-list-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './team-list-card.component.html',
  styleUrls: ['./team-list-card.component.scss'],
})
export class TeamListCardComponent {
  @Input() team!: Team;

  constructor(private teamService: TeamService, private router: Router) {}

  onSelectTeam(team: Team): void {
    this.teamService.setSelectTeam(team);
    this.router.navigate([`teams-details/${team.name}`]);
  }
}
