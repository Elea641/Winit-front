import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ListMemberComponent } from '../list-member/list-member.component';
import { CreateMemberComponent } from '../create-member/create-member.component';
import { Observable } from 'rxjs';
import { TeamMember } from 'src/app/team/models/team-member.model';

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
  @Input() teamMembers$!: Observable<TeamMember | null>;
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  handleCancelClick() {
    this.tabGroup.selectedIndex = 0;
  }
}
