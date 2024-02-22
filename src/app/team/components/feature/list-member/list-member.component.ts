import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.model';
import { TeamService } from 'src/app/team/shared/team.service';
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
  members: Member[] = [];
  teamName: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ member }) => {
      this.members = member;
    });

    this.route.parent?.params.subscribe((params) => {
      this.teamName = params['teamName'];
    });
  }

  onDelete(member: string) {
    this.teamService.deleteMemberByName(this.teamName, member).subscribe(
      (members) => {
        this.members = members;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
