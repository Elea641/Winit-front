import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { Team } from 'src/app/team/models/team.model';

@Component({
  selector: 'app-list-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss'],
})
export class ListMemberComponent {
  members: Member[] | null = null;
  teamName!: Team;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getSelectedTeam().subscribe((team) => {
      if (team) {
        this.teamName = team;
        console.log(this.teamName);
      }
    });

    this.teamService
      .getAllMembersByTeam(this.teamName.name)
      .subscribe((member) => {
        this.members = member;
        console.log(this.members);
      });
  }
}
