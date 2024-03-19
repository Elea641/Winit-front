import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMemberComponent } from '../list-member/list-member.component';
import { CreateMemberComponent } from '../create-member/create-member.component';
import { MenuButtonsComponent } from 'src/app/components/ui/menu-buttons/menu-buttons.component';
import { Team } from 'src/app/team/models/team.model';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { TeamService } from 'src/app/team/shared/team.service';
@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    CommonModule,
    ListMemberComponent,
    CreateMemberComponent,
    MenuButtonsComponent,
    MatTabsModule,
  ],
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent {
  @Input() selectedTeam: Team | null = null;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  buttonValueClicked: string = 'list-member';

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getMemberAddedSubject().subscribe(() => {
      this.tabGroup.selectedIndex = 0;
    });
    console.log(this.selectedTeam);
  }

  onButtonClicked(label: string) {
    this.buttonValueClicked = label;
  }
}
