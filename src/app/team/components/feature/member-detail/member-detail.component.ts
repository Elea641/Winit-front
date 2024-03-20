import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMemberComponent } from '../list-member/list-member.component';
import { CreateMemberComponent } from '../create-member/create-member.component';
import { MenuButtonsComponent } from 'src/app/components/ui/menu-buttons/menu-buttons.component';
import { Team } from 'src/app/team/models/team.model';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
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

  handleCancelClick() {
    this.tabGroup.selectedIndex = 0;
  }
}
