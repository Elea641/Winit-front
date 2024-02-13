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
import { RoasterPageComponent } from './roaster/pages/roaster-page/roaster-page.component';
import { CreateRoasterComponent } from './roaster/components/feature/create-roaster/create-roaster.component';

export const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
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
    path: 'roasters',
    component: RoasterPageComponent,
    children: [{ path: 'create', component: CreateRoasterComponent }],
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
