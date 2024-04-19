import { AdminGuard } from './auth/core/admin.guard';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { BackOfficePageComponent } from './back-office/pages/back-office-page/back-office-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { contactResolver } from './contact/shared/resolvers/contact-resolver';
import { CreateTeamPageComponent } from './team/pages/create-team-page/create-team-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { LoginFormComponent } from './auth/components/feature/login-form/login-form.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { RegisterComponent } from './auth/components/feature/register/register.component';
import { Routes } from '@angular/router';
import { SelectTeamPageComponent } from './tournament/pages/select-team-page/select-team-page.component';
import { SportComponent } from './sport/pages/sport/sport.component';
import { TeamPageComponent } from './team/pages/team-page/team-page.component';
import { teamResolver } from './team/shared/resolvers/team-resolver';
import { TournamentDetailsPageComponent } from './tournament/pages/tournament-details-page/tournament-details-page.component';
import { TournamentFormComponent } from './tournament/components/feature/tournament-form/tournament-form.component';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { tournamentResolver } from './tournament/shared/resolvers/tournament-resolver';
import { tournamentsResolver } from './tournament/shared/resolvers/tournaments-resolver';
import { UpdateProfilePageComponent } from './profile/pages/update-profile-page/update-profile-page.component';
import { UserGuard } from './auth/core/user.guard';
import { TeamFormComponent } from './team/components/feature/team-form/team-form.component';

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
  {
    path: 'contact',
    component: ContactPageComponent,
    resolve: {
      contact: contactResolver,
    },
  },
  {
    path: 'tournament',
    component: TournamentPageComponent,
    resolve: {
      tournaments: tournamentsResolver,
    },
  },
  {
    path: 'tournament/create',
    component: TournamentFormComponent,
    canActivate: [UserGuard],
  },
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
    canActivate: [UserGuard],
    resolve: {
      tournament: tournamentResolver,
    },
  },
  {
    path: 'back-office',
    component: BackOfficePageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'form-team/:mode',
    component: TeamFormComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'teams-details/:teamName',
    component: TeamPageComponent,
    canActivate: [UserGuard],
    resolve: {
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
