import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMemberComponent } from '../list-member/list-member.component';
import { CreateMemberComponent } from '../create-member/create-member.component';
import { MenuButtonsComponent } from 'src/app/components/ui/menu-buttons/menu-buttons.component';
import { TeamDetailCardComponent } from '../../ui/team-detail-card/team-detail-card.component';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    CommonModule,
    ListMemberComponent,
    CreateMemberComponent,
    MenuButtonsComponent,
    TeamDetailCardComponent,
  ],
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent {
  buttonValueClicked: string = 'list-member';

  onButtonClicked(label: string) {
    this.buttonValueClicked = label;
  }
}
