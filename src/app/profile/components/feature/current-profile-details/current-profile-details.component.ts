import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CardCurrentProfileComponent } from '../../ui/card-current-profile/card-current-profile.component';
import { ProfileService } from 'src/app/profile/shared/profile.service';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';
import { Observable } from 'rxjs';
import { ListResultatsComponent } from '../list-resultats/list-resultats.component';
import { TeamMembers } from 'src/app/profile/models/teamMembers.model';
import { MatTabsModule } from '@angular/material/tabs';
import { ListTeamComponent } from 'src/app/profile/components/feature/list-team/list-team.component';
import * as fr from '@angular/common/locales/fr';
import { TeamFormComponent } from 'src/app/team/components/feature/team-form/team-form.component';
import { CurrentUser } from 'src/app/auth/models/current-user.model';
import { UserService } from 'src/app/auth/shared/user.service';

@Component({
  selector: 'app-current-profile-details',
  standalone: true,
  imports: [
    CommonModule,
    CardCurrentProfileComponent,
    ListResultatsComponent,
    MatTabsModule,
    TeamFormComponent,
    ListTeamComponent,
  ],
  templateUrl: './current-profile-details.component.html',
  styleUrls: ['./current-profile-details.component.scss'],
})
export class CurrentProfileDetailsComponent {
  currentProfile$!: Observable<CurrentProfile>;
  currentUser$!: Observable<CurrentUser>;
  teamMembers$!: Observable<TeamMembers>;

  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) {
    registerLocaleData(fr.default);
  }

  ngOnInit(): void {
    this.currentProfile$ = this.profileService.getCurrentProfile();
    this.currentUser$ = this.userService.getCurrentUser();
    this.teamMembers$ = this.profileService.getTeamMembers();
  }
}
