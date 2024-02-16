import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from 'src/app/team/shared/team.service';
import { Team } from 'src/app/team/models/team.model';
import { TeamListCardComponent } from '../../ui/team-list-card/team-list-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [CommonModule, TeamListCardComponent, MatDividerModule],
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss'],
})
export class ListTeamComponent {
  teams$: Observable<Team[]> = new Observable<Team[]>();
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getAllTeamsByUser();
  }
}
