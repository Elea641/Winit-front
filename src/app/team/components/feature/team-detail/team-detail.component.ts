import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonsComponent } from 'src/app/components/ui/menu-buttons/menu-buttons.component';
import { ListTeamComponent } from '../list-team/list-team.component';
import { CreateTeamComponent } from '../create-team/create-team.component';
import { TeamDetailCardComponent } from '../../ui/team-detail-card/team-detail-card.component';
import { RouterOutlet } from '@angular/router';
import { TeamService } from 'src/app/team/shared/team.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [
    CommonModule,
    CreateTeamComponent,
    ListTeamComponent,
    MenuButtonsComponent,
    TeamDetailCardComponent,
    RouterOutlet,
  ],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
  buttonValueClicked: string = 'list-team';
  isSelectedTeam$!: Observable<boolean>;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getSelectedTeam().subscribe((team) => {
      this.isSelectedTeam$ = this.teamService.isSelectedTeam();
    });
  }

  onButtonClicked(label: string) {
    this.buttonValueClicked = label;
  }
}
