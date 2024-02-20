import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { MatDividerModule } from '@angular/material/divider';
import { MemberDetailComponent } from '../../feature/member-detail/member-detail.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-team-detail-card',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MemberDetailComponent,
    RouterOutlet,
  ],
  templateUrl: './team-detail-card.component.html',
  styleUrls: ['./team-detail-card.component.scss'],
})
export class TeamDetailCardComponent {
  selectedTeam: Team | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ team }) => {
      this.selectedTeam = team;
    });
  }
}
