import { Routes } from '@angular/router';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import {RegisterPageComponent} from "./auth/pages/register-page/register-page.component";

export const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: 'tournament', component: TournamentPageComponent },
  { path: '', component: HomePageComponent },
  { path: '**', redirectTo: '' },
];
