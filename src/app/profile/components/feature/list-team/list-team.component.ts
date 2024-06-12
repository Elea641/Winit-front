import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from 'src/app/team/shared/team.service';
import { Team } from 'src/app/team/models/team.type';
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
export class ListTeamComponent {
  teams$: Observable<Team[]> = this.teamService.getAllTeamsByUser();
  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  onClick() {
    this.router.navigate(['/form-team/create']);
  }
}
