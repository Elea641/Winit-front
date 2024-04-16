// import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { inject } from '@angular/core';
// import { Team } from 'src/app/team/models/team.model';
// import { TeamService } from 'src/app/team/shared/team.service';
// import { TournamentService } from 'src/app/tournament/shared/tournament.service';

// export const teamsForTournamentResolver: ResolveFn<Team[] | null> = (
//   route: ActivatedRouteSnapshot
// ): Observable<Team[] | null> => {
//   let teams$!: Team[];
//   const teamService = inject(TeamService);
//   const tournamentIdParam = route.paramMap.get('id');
//   const tournamentId =
//     tournamentIdParam !== null ? parseInt(tournamentIdParam, 10) : null;

//   if (tournamentId) {
//     inject(TournamentService)
//       .getTournamentById(tournamentId)
//       .subscribe((tournament) => {
//         teamService
//           .getAllTeamsByUserForTournament(tournament.sport)
//           .subscribe((teams) => {
//             teams$ = teams;
//           });
//       });
//   }

//   console.log(teams$);

//   return of(null);
// };
