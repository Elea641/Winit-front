import { Routes } from '@angular/router';
import { LoginFormComponent } from './auth/components/feature/login-form/login-form.component';
import { RegisterComponent } from './auth/components/feature/register/register.component';
import { AdminGuard } from './auth/core/admin.guard';
import { UserGuard } from './auth/core/user.guard';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { BackOfficePageComponent } from './back-office/pages/back-office-page/back-office-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { ListResultatsComponent } from './profile/components/feature/list-resultats/list-resultats.component';
import { ListTeamMembersComponent } from './profile/components/feature/list-team-members/list-team-members.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { UpdateProfilePageComponent } from './profile/pages/update-profile-page/update-profile-page.component';
import { SportComponent } from './sport/pages/sport/sport.component';
import { CreateMemberComponent } from './team/components/feature/create-member/create-member.component';
import { ListMemberComponent } from './team/components/feature/list-member/list-member.component';
import { TeamDetailCardComponent } from './team/components/ui/team-detail-card/team-detail-card.component';
import { teamResolver } from './team/shared/resolvers/team-resolver';
import { TournamentFormComponent } from './tournament/components/feature/tournament-form/tournament-form.component';
import { TournamentDetailsPageComponent } from './tournament/pages/tournament-details-page/tournament-details-page.component';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { memberResolver } from './team/shared/resolvers/member-resolver';
import { userResolver } from './auth/shared/resolvers/user-resolver';
import { TeamPageComponent } from './team/pages/team-page/team-page.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserGuard],
    children: [
      { path: 'resultats', component: ListResultatsComponent },
      { path: 'team', component: ListTeamMembersComponent },
    ],
  },
  {
    path: 'profile/update',
    component: UpdateProfilePageComponent,
    canActivate: [UserGuard],
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
    path: 'teams-details',
    component: TeamPageComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: ':teamName',
        component: TeamDetailCardComponent,
        resolve: {
          team: teamResolver,
          user: userResolver,
          member: memberResolver,
        },
      },
    ],
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
