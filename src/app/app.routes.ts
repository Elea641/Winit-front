import { AdminGuard } from './auth/core/admin.guard';
import { AuthPageComponent } from './auth/pages/auth-page/auth-page.component';
import { BackOfficePageComponent } from './back-office/pages/back-office-page/back-office-page.component';
import { ContactPageComponent } from './contact/pages/contact-page/contact-page.component';
import { contactResolver } from './contact/shared/resolvers/contact-resolver';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { LoginFormComponent } from './auth/components/feature/login-form/login-form.component';
import { ProfilePageComponent } from './profile/pages/profile-page/profile-page.component';
import { RegisterComponent } from './auth/components/feature/register/register.component';
import { Routes } from '@angular/router';
import { SelectTeamPageComponent } from './tournament/pages/select-team-page/select-team-page.component';
import { TeamPageComponent } from './team/pages/team-page/team-page.component';
import { teamResolver } from './team/shared/resolvers/team-resolver';
import { TournamentDetailsPageComponent } from './tournament/pages/tournament-details-page/tournament-details-page.component';
import { TournamentFormComponent } from './tournament/components/feature/tournament-form/tournament-form.component';
import { TournamentPageComponent } from './tournament/pages/tournament-page/tournament-page.component';
import { tournamentResolver } from './tournament/shared/resolvers/tournament-resolver';
import { tournamentsResolver } from './tournament/shared/resolvers/tournaments-resolver';
import { UpdateProfilePageComponent } from './profile/pages/update-profile-page/update-profile-page.component';
import { BackOfficeSportPageComponent } from './back-office/pages/back-office-sport-page/back-office-sport-page.component';
import { BackOfficeCreateSportComponent } from './back-office/components/feature/back-office-create-sport/back-office-create-sport.component';
import { BackOfficeSportDetailComponent } from './back-office/components/feature/back-office-sport-detail/back-office-sport-detail.component';
import { BackOfficeUserPageComponent } from './back-office/pages/back-office-user-page/back-office-user-page.component';
import { BackOfficeUserDetailComponent } from './back-office/components/feature/back-office-user-detail/back-office-user-detail.component';
import { BackOfficeUserEditComponent } from './back-office/components/feature/back-office-user-edit/back-office-user-edit.component';
import { PasswordForgottenComponent } from './auth/components/feature/password-forgotten/password-forgotten.component';
import { NewPasswordComponent } from './auth/components/feature/new-password/new-password.component';
import { TeamFormComponent } from './team/components/feature/team-form/team-form.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { userStatisticsResolver } from './profile/shared/resolvers/user-statistics-resolver';
import { RankingPageComponent } from './ranking/pages/ranking-page/ranking-page.component';
import { rankingResolver } from './ranking/shared/resolvers/ranking-resolver';
import { BackOfficeUserCreateComponent } from './back-office/components/feature/back-office-user-create/back-office-user-create.component';
import { BackOfficeSportEditComponent } from './back-office/components/feature/back-office-sport-edit/back-office-sport-edit.component';
import { UserOrAdminGuard } from './auth/core/userOrAdmin.guard';
import { AboutUsPageComponent } from './pages/about-us-page/about-us-page.component';
import { LegalMentionsPageComponent } from './pages/legal-mentions-page/legal-mentions-page.component';

export const routes: Routes = [
  {
    path: 'ranking',
    component: RankingPageComponent,
    resolve: {
      ranking: rankingResolver,
    },
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [UserOrAdminGuard],
    resolve: {
      statistics: userStatisticsResolver,
    },
  },
  {
    path: 'profile/update',
    component: UpdateProfilePageComponent,
    canActivate: [UserOrAdminGuard],
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
    canActivate: [UserOrAdminGuard],
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
    canActivate: [UserOrAdminGuard],
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
    path: 'back-office/sport',
    component: BackOfficeSportPageComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'create', component: BackOfficeCreateSportComponent },
      { path: 'edit/:id([0-9]+)', component: BackOfficeSportEditComponent },
      { path: ':id([0-9]+)', component: BackOfficeSportDetailComponent },
    ],
  },
  {
    path: 'back-office/user',
    component: BackOfficeUserPageComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'create', component: BackOfficeUserCreateComponent },
      { path: 'edit/:id([0-9]+)', component: BackOfficeUserEditComponent },
      { path: ':id([0-9]+)', component: BackOfficeUserDetailComponent },
    ],
  },
  {
    path: 'form-team/:mode',
    component: TeamFormComponent,
    canActivate: [UserOrAdminGuard],
  },
  {
    path: 'teams-details/:teamName',
    component: TeamPageComponent,
    canActivate: [UserOrAdminGuard],
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
      { path: 'forgotten-password', component: PasswordForgottenComponent },
      { path: 'new-password/:token', component: NewPasswordComponent },
    ],
  },
  { path: 'legal', component: LegalMentionsPageComponent },
  { path: 'about', component: AboutUsPageComponent },
  { path: '', component: HomePageComponent },
  { path: '**', component: NotFoundPageComponent },
];
