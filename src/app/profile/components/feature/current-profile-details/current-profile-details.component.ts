import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCurrentProfileComponent } from '../../ui/card-current-profile/card-current-profile.component';
import { ProfileService } from 'src/app/profile/shared/profile.service';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';
import { Observable } from 'rxjs';
import { ListResultatsComponent } from '../list-resultats/list-resultats.component';
import { ListTeamMembersComponent } from '../list-team-members/list-team-members.component';
import { TeamMembers } from 'src/app/profile/models/teamMembers.model';
import { User } from '../../../../auth/models/user.model';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateTeamComponent } from 'src/app/team/components/feature/create-team/create-team.component';
import { ListTeamComponent } from 'src/app/team/components/feature/list-team/list-team.component';

@Component({
  selector: 'app-current-profile-details',
  standalone: true,
  imports: [
    CommonModule,
    CardCurrentProfileComponent,
    ListResultatsComponent,
    ListTeamMembersComponent,
    MatTabsModule,
    CreateTeamComponent,
    ListTeamComponent,
  ],
  templateUrl: './current-profile-details.component.html',
  styleUrls: ['./current-profile-details.component.scss'],
})
export class CurrentProfileDetailsComponent {
  currentProfile$!: Observable<CurrentProfile>;
  currentUser$!: Observable<User>;
  teamMembers$!: Observable<TeamMembers>;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.currentProfile$ = this.profileService.getCurrentProfile();
    this.currentUser$ = this.profileService.getCurrentUser();
    this.teamMembers$ = this.profileService.getTeamMembers();
  }
}
