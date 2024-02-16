import { Routes } from '@angular/router';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { TournamentDetailsPageComponent } from './tournament/pages/tournament-details-page/tournament-details-page.component';
import { RegisterComponent } from './auth/components/feature/register/register.component';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { LoginFormComponent } from './auth/components/feature/login-form/login-form.component';
import { TournamentFormComponent } from './tournament/components/feature/tournament-form/tournament-form.component';
import { BackOfficePageComponent } from './back-office/pages/back-office-page/back-office-page.component';
import { AdminGuard } from './auth/core/admin.guard';
import { TeamPageComponent } from './team/pages/team-page/team-page.component';
import { CreateTeamComponent } from './team/components/feature/create-team/create-team.component';
import { ListTeamComponent } from './team/components/feature/list-team/list-team.component';
import { ListResultatsComponent } from './profile/components/feature/list-resultats/list-resultats.component';
import { ListTeamMembersComponent } from './profile/components/feature/list-team-members/list-team-members.component';
import { TeamDetailCardComponent } from './team/components/ui/team-detail-card/team-detail-card.component';
import { TeamDetailPageComponent } from './team/pages/team-detail-page/team-detail-page.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePageComponent,
    children: [
      { path: 'resultats', component: ListResultatsComponent },
      { path: 'team', component: ListTeamMembersComponent },
    ],
  },
  { path: 'contact', component: ContactPageComponent },
  { path: 'tournament', component: TournamentPageComponent },
  { path: 'tournament/create', component: TournamentFormComponent },
  { path: 'tournament/:id([0-9]+)', component: TournamentDetailsPageComponent },
  {
    path: 'back-office',
    component: BackOfficePageComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'teams',
    component: TeamPageComponent,
    children: [
      { path: 'create-team', component: CreateTeamComponent },
      { path: 'list-team', component: ListTeamComponent },
    ],
  },
  {
    path: 'teams-details',
    component: TeamDetailPageComponent,
    children: [{ path: ':nameTeam', component: TeamDetailCardComponent }],
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginFormComponent },
    ],
  },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];
