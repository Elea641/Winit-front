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
import { TeamDetailCardComponent } from './team/components/ui/team-detail-card/team-detail-card.component';
import { TournamentFormComponent } from './tournament/components/feature/tournament-form/tournament-form.component';
import { TournamentDetailsPageComponent } from './tournament/pages/tournament-details-page/tournament-details-page.component';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { memberResolver } from './team/shared/resolvers/member-resolver';
import { TeamPageComponent } from './team/pages/team-page/team-page.component';
import {
  BackOfficeCreateSportComponent
} from "./back-office/components/feature/back-office-create-sport/back-office-create-sport.component";
import {
  BackOfficeSportDetailComponent
} from "./back-office/components/feature/back-office-sport-detail/back-office-sport-detail.component";
import {
  BackOfficeSportPageComponent
} from "./back-office/pages/back-office-sport-page/back-office-sport-page.component";

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
  { path: 'tournament/:id([0-9]+)', component: TournamentDetailsPageComponent },
  {
    path: 'back-office', component: BackOfficePageComponent, canActivate: [AdminGuard],
  },
  {
    path: 'back-office/sport',
    component: BackOfficeSportPageComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'create', component: BackOfficeCreateSportComponent },
      { path: ':id([0-9]+)', component: BackOfficeSportDetailComponent },
    ]
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
