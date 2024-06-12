import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamDetailCardComponent } from '../../components/ui/team-detail-card/team-detail-card.component';
import { MenuMemberComponent } from '../../components/feature/menu-member/menu-member.component';
import { Observable, concatMap, of } from 'rxjs';
import { Team } from '../../models/team.type';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [CommonModule, TeamDetailCardComponent, MenuMemberComponent],
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss'],
})
export class TeamPageComponent implements OnInit {
  team$!: Observable<Team | null>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.route.data) {
      this.team$ = this.route.data.pipe(
        concatMap(data => {
          if (data && data['team']) {
            return of(data['team']);
          } else {
            return of(null);
          }
        })
      );
    }
  }
}
