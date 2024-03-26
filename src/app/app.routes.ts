import { Routes } from '@angular/router';
import { LoginFormComponent } from './auth/components/feature/login-form/login-form.component';
import { RegisterComponent } from './auth/components/feature/register/register.component';
import { AdminGuard } from './auth/core/admin.guard';
import { UserGuard } from './auth/core/user.guard';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { BackOfficePageComponent } from './back-office/pages/back-office-page/back-office-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { UpdateProfilePageComponent } from './profile/pages/update-profile-page/update-profile-page.component';
import { SportComponent } from './sport/pages/sport/sport.component';
import { TournamentFormComponent } from './tournament/components/feature/tournament-form/tournament-form.component';
import { TournamentDetailsPageComponent } from './tournament/pages/tournament-details-page/tournament-details-page.component';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { memberResolver } from './team/shared/resolvers/member-resolver';
import { TeamPageComponent } from './team/pages/team-page/team-page.component';
import { CreateTeamPageComponent } from './team/pages/create-team-page/create-team-page.component';
import { teamResolver } from './team/shared/resolvers/team-resolver';
import { tournamentResolver } from './tournament/shared/resolvers/tournament-resolver';
import { SelectTeamPageComponent } from './tournament/pages/select-team-page/select-team-page.component';
import { teamsResolver } from './tournament/shared/resolvers/teams.resolver';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'profile/update',
    component: UpdateProfilePageComponent,
    canActivate: [UserGuard],
  },
  { path: 'contact', component: ContactPageComponent },
  {
    path: 'tournament',
    component: TournamentPageComponent,
  },
  { path: 'tournament/create', component: TournamentFormComponent },
  {
    path: 'tournament/:id',
    component: TournamentDetailsPageComponent,
    resolve: {
      tournament: tournamentResolver,
    },
  },
  {
    path: 'tournament/:id/teams',
    component: SelectTeamPageComponent,
    resolve: {
      teams: teamsResolver,
    },
  },
  {
    path: 'back-office',
    component: BackOfficePageComponent,
    canActivate: [AdminGuard],
  },
  { path: 'new-team', component: CreateTeamPageComponent },
  {
    path: 'teams-details/:teamName',
    component: TeamPageComponent,
    canActivate: [UserGuard],
    resolve: {
      member: memberResolver,
      team: teamResolver,
    },
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginFormComponent },
    ],
  },
  { path: 'sport', component: SportComponent },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];
