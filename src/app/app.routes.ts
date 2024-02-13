import { Routes } from '@angular/router';
import { LoginFormComponent } from './auth/components/feature/login-form/login-form.component';
import { RegisterComponent } from './auth/components/feature/register/register.component';
import { AdminGuard } from './auth/core/admin.guard';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { BackOfficePageComponent } from './back-office/pages/back-office-page/back-office-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { SendMailComponent } from './reset-password/components/send-mail/send-mail.component';
import { ResetPasswordComponent } from './reset-password/pages/reset-password/reset-password.component';
import { TournamentFormComponent } from './tournament/components/feature/tournament-form/tournament-form.component';
import { TournamentDetailsPageComponent } from './tournament/pages/tournament-details-page/tournament-details-page.component';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';

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
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginFormComponent },
    ],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    children: [{ path: 'send-mail', component: SendMailComponent }],
  },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];
