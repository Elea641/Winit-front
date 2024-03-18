import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Member } from 'src/app/team/models/member.model';
import { TeamService } from 'src/app/team/shared/team.service';
import { MemberCardComponent } from '../../ui/member-card/member-card.component';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

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
  memberAddedSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.teamName = params['teamName'];
    });

    this.refreshMembers();

    this.memberAddedSubscription = this.teamService
      .getMemberAddedSubject()
      .subscribe(() => {
        this.refreshMembers();
      });
  }

  ngOnDestroy(): void {
    if (this.memberAddedSubscription) {
      this.memberAddedSubscription.unsubscribe();
    }
  }

  refreshMembers() {
    this.teamService.getAllMembersByTeam(this.teamName).subscribe(
      (members) => {
        this.members = members;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onDelete(member: string) {
    this.teamService.deleteMemberByName(this.teamName, member).subscribe(
      () => {
        this.refreshMembers();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
