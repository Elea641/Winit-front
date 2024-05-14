import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from 'src/app/team/shared/team.service';
import { Team } from 'src/app/team/models/team.model';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TeamCardComponent } from '../../ui/team-card/team-card.component';

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, TeamCardComponent],
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss'],
})
export class ListTeamComponent implements OnInit {
  teams$: Observable<Team[]> = new Observable<Team[]>();
  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getAllTeamsByUser();
  }

  onClick() {
    this.router.navigate(['/form-team/create']);
  }
}
