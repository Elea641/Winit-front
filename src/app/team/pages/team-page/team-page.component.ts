import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TeamDetailCardComponent } from '../../components/ui/team-detail-card/team-detail-card.component';
import { MenuMemberComponent } from '../../components/feature/menu-member/menu-member.component';
import { Observable, catchError, concatMap, of } from 'rxjs';
import { Team } from '../../models/team.model';
import { TeamService } from '../../shared/team.service';
import { MemberService } from '../../shared/member.service';
import { TeamMember } from '../../models/team-member.model';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TeamDetailCardComponent,
    MenuMemberComponent,
  ],
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent {
  team$!: Observable<Team | null>;
  teamMembers$!: Observable<TeamMember | null>;
  teamName: string = '';

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private memberService: MemberService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.teamName = params['teamName'];
    });

    this.team$ = this.route.data.pipe(
      concatMap((data) => {
        if (data && data['team']) {
          return of(data['team']);
        } else {
          return this.teamService
            .getTeamByTeamName(this.teamName)
            .pipe(catchError(() => of(null)));
        }
      })
    );

    this.teamMembers$ = this.route.data.pipe(
      concatMap((data) => {
        if (data && data['member']) {
          return of(data['member']);
        } else {
          return this.memberService
            .getAllMembersByTeam(this.teamName)
            .pipe(catchError(() => of(null)));
        }
      })
    );
  }
}
