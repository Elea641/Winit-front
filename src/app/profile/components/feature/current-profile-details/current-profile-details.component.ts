import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCurrentProfileComponent } from '../../ui/card-current-profile/card-current-profile.component';
import { ProfileService } from 'src/app/profile/shared/profile.service';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';
import { Observable } from 'rxjs';
import { ListResultatsComponent } from '../list-resultats/list-resultats.component';
import { ListTeamMembersComponent } from '../list-team-members/list-team-members.component';
import { TeamMembers } from 'src/app/profile/models/teamMembers.model';
import { MenuButtonsComponent } from 'src/app/components/ui/menu-buttons/menu-buttons.component';

@Component({
  selector: 'app-current-profile-details',
  standalone: true,
  imports: [
    CommonModule,
    CardCurrentProfileComponent,
    MenuButtonsComponent,
    ListResultatsComponent,
    ListTeamMembersComponent,
  ],
  templateUrl: './current-profile-details.component.html',
  styleUrls: ['./current-profile-details.component.scss'],
})
export class CurrentProfileDetailsComponent {
  currentProfile$!: Observable<CurrentProfile>;
  teamMembers$!: Observable<TeamMembers>;
  buttonValueClicked: string = 'resultats';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.currentProfile$ = this.profileService.getCurrentProfile();
    this.teamMembers$ = this.profileService.getTeamMembers();
  }

  onButtonClicked(value: string) {
    this.buttonValueClicked = value;
  }
}
