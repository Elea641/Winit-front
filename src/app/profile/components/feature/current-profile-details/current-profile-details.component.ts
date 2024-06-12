import { Component, Input } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CardCurrentProfileComponent } from '../../ui/card-current-profile/card-current-profile.component';
import { Observable } from 'rxjs';
import { ListResultsComponent } from '../list-results/list-results.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ListTeamComponent } from 'src/app/profile/components/feature/list-team/list-team.component';
import * as fr from '@angular/common/locales/fr';
import { TeamFormComponent } from 'src/app/team/components/feature/team-form/team-form.component';
import { UserService } from 'src/app/auth/shared/user.service';
import { ListTournamentComponent } from '../list-tournament/list-tournament.component';
import { UserStatistics } from 'src/app/profile/models/user-statistics.model';
import { User } from 'src/app/auth/models/user.type';

@Component({
  selector: 'app-current-profile-details',
  standalone: true,
  imports: [
    CommonModule,
    CardCurrentProfileComponent,
    ListResultsComponent,
    MatTabsModule,
    TeamFormComponent,
    ListTeamComponent,
    ListTournamentComponent,
  ],
  templateUrl: './current-profile-details.component.html',
  styleUrls: ['./current-profile-details.component.scss'],
})
export class CurrentProfileDetailsComponent {
  @Input() userStatistics$!: Observable<UserStatistics>;

  currentUser$: Observable<User> = this.userService.getCurrentUser();

  constructor(private userService: UserService) {
    registerLocaleData(fr.default);
  }
}
