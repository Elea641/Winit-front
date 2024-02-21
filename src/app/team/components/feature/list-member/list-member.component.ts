import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { Team } from 'src/app/team/models/team.model';
import { MemberCardComponent } from '../../ui/member-card/member-card.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-member',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, MatButtonModule],
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss'],
})
export class ListMemberComponent implements OnInit {
  members: Member[] | null = null;
  team!: Team;
  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ member }) => {
      this.members = member;
    });

    this.teamService.getSelectedTeam().subscribe((team) => {
      if (team) {
        this.team = team;
      }
    });
  }

  onDelete(member: string) {
    this.teamService.deleteMemberByName(this.team.name, member);
  }
}
