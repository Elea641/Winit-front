import { Routes } from '@angular/router';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';
import {RegisterPageComponent} from "./auth/pages/register-page/register-page.component";

export const routes: Routes = [
  { path: 'profile', component: ProfilePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'tournament', component: TournamentPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];
