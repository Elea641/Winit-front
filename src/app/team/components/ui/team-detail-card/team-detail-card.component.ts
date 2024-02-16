import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { MatDividerModule } from '@angular/material/divider';
import { MenuButtonsComponent } from 'src/app/components/ui/menu-buttons/menu-buttons.component';
import { ListMemberComponent } from '../../feature/list-member/list-member.component';
import { CreateMemberComponent } from '../../feature/create-member/create-member.component';
import { MemberDetailComponent } from '../../feature/member-detail/member-detail.component';

@Component({
  selector: 'app-team-detail-card',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MenuButtonsComponent,
    ListMemberComponent,
    CreateMemberComponent,
    MemberDetailComponent,
  ],
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
