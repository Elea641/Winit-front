import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembers } from 'src/app/profile/models/teamMembers.model';
import { CardTeamMemberComponent } from '../../ui/card-team-member/card-team-member.component';

@Component({
  selector: 'app-list-team-members',
  standalone: true,
  imports: [CommonModule, CardTeamMemberComponent],
  templateUrl: './list-team-members.component.html',
  styleUrls: ['./list-team-members.component.scss'],
})
export class ListTeamMembersComponent {
  @Input() teamMembers!: TeamMembers | null;
}
