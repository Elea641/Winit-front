import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from 'src/app/team/shared/team.service';
import { Team } from 'src/app/team/models/team.model';
import { TeamListCardComponent } from '../../ui/team-list-card/team-list-card.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [CommonModule, TeamListCardComponent, MatDividerModule],
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss'],
})
export class ListTeamComponent {
  teams: Team[] = [];
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getAllTeamsByUser().subscribe((teams) => {
      this.teams = teams;
    });
  }
}
