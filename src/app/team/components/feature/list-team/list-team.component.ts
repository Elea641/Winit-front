import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from 'src/app/team/shared/team.service';
import { Team } from 'src/app/team/models/team.model';
import { TeamListCardComponent } from '../../ui/team-list-card/team-list-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-team',
  standalone: true,
  imports: [
    CommonModule,
    TeamListCardComponent,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss'],
})
export class ListTeamComponent {
  teams$: Observable<Team[]> = new Observable<Team[]>();
  constructor(private teamService: TeamService, private router: Router) {}

  ngOnInit(): void {
    this.teams$ = this.teamService.getAllTeamsByUser();
  }

  onClick() {
    this.router.navigate(['/new-team']);
  }
}
