import { Routes } from '@angular/router';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { RegisterComponent } from './auth/components/feature/register/register.component';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { LoginFormComponent } from './auth/components/feature/login-form/login-form.component';

export const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'tournament', component: TournamentPageComponent },
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginFormComponent }
    ],
  },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];
