import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';

@Component({
  selector: 'app-team-detail-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-detail-card.component.html',
  styleUrls: ['./team-detail-card.component.scss'],
})
export class TeamDetailCardComponent {
  selectedTeam: Team | null = null;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getSelectedTeam().subscribe((team) => {
      this.selectedTeam = team;
    });
  }
}
