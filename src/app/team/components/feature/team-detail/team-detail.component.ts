import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonsComponent } from 'src/app/components/ui/menu-buttons/menu-buttons.component';
import { ListTeamComponent } from '../list-team/list-team.component';
import { CreateTeamComponent } from '../create-team/create-team.component';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [
    CommonModule,
    CreateTeamComponent,
    ListTeamComponent,
    MenuButtonsComponent,
  ],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent {
  buttonValueClicked: string = 'list-team';

  onButtonClicked(label: string) {
    this.buttonValueClicked = label;
  }
}
