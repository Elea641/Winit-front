import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamDetailCardComponent } from '../../components/ui/team-detail-card/team-detail-card.component';
import { MenuMemberComponent } from '../../components/feature/menu-member/menu-member.component';
import { Observable, concatMap, of } from 'rxjs';
import { Team } from '../../models/team.model';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [CommonModule, TeamDetailCardComponent, MenuMemberComponent],
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent {
  team$!: Observable<Team | null>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.team$ = this.route.data.pipe(
      concatMap((data) => {
        if (data && data['team']) {
          console.log(data['team']);

          return of(data['team']);
        } else {
          console.log(data['team']);

          return of(null);
        }
      })
    );
  }
}
