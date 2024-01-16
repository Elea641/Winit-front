import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMembers } from 'src/app/profile/models/teamMembers.model';

@Component({
  selector: 'app-card-team-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-team-member.component.html',
  styleUrls: ['./card-team-member.component.scss'],
})
export class CardTeamMemberComponent {
  @Input() teamMembers!: TeamMembers | null;

  ngOnInit(): void {
    console.log(this.teamMembers);
  }
}
