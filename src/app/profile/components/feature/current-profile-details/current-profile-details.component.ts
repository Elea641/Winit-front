import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCurrentProfileComponent } from '../../ui/card-current-profile/card-current-profile.component';
import { ProfileService } from 'src/app/profile/shared/profile.service';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';
import { Observable } from 'rxjs';
import { MenuInfosProfileComponent } from '../../ui/menu-infos-profile/menu-infos-profile.component';
import { ListResultatsComponent } from '../../ui/list-resultats/list-resultats.component';
import { ListTeamMembersComponent } from '../../ui/list-team-members/list-team-members.component';

@Component({
  selector: 'app-current-profile-details',
  standalone: true,
  imports: [
    CommonModule,
    CardCurrentProfileComponent,
    MenuInfosProfileComponent,
    ListResultatsComponent,
    ListTeamMembersComponent,
  ],
  templateUrl: './current-profile-details.component.html',
  styleUrls: ['./current-profile-details.component.scss'],
})
export class CurrentProfileDetailsComponent {
  currentProfile$!: Observable<CurrentProfile>;
  buttonValueClicked!: string;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.currentProfile$ = this.profileService.getCurrentProfile();
    this.currentProfile$.subscribe((data) =>
      console.log('Profile Data:', data)
    );
  }

  onButtonClicked(value: string) {
    this.buttonValueClicked = value;
  }
}
