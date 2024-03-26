import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ListMemberComponent } from '../list-member/list-member.component';
import { CreateMemberComponent } from '../create-member/create-member.component';
import { Observable, Subscription } from 'rxjs';
import { TeamService } from 'src/app/team/shared/team.service';
import { MemberService } from 'src/app/team/shared/member.service';

@Component({
  selector: 'app-menu-member',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    ListMemberComponent,
    CreateMemberComponent,
  ],
  templateUrl: './menu-member.component.html',
  styleUrls: ['./menu-member.component.scss'],
})
export class MenuMemberComponent {
  @Input() team$!: Observable<Team | null>;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  public membersCount!: number;
  public teamMembersCountSubscription!: Subscription;

  constructor(
    private teamService: TeamService,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.teamMembersCountSubscription =
      this.memberService.teamMembersCount$.subscribe(() => {
        this.team$.subscribe((team) => {
          if (team) {
            this.teamService
              .getTeamByTeamName(team.name)
              .subscribe((newteam) => {
                if (newteam) {
                  this.membersCount = newteam.teamMembersCount;
                }
              });
          }
        });
      });
  }

  handleCancelClick() {
    this.tabGroup.selectedIndex = 0;
  }
}
