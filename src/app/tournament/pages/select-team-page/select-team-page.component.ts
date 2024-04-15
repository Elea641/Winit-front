import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { Observable, concatMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ListTeamComponent } from 'src/app/profile/components/feature/list-team/list-team.component';

@Component({
  selector: 'app-select-team-page',
  standalone: true,
  imports: [CommonModule, ListTeamComponent],
  templateUrl: './select-team-page.component.html',
  styleUrls: ['./select-team-page.component.scss'],
})
export class SelectTeamPageComponent {
  teams$!: Observable<Team[] | null>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.teams$ = this.route.data.pipe(
      concatMap((data) => {
        return of(data['teamsForTournament']);
      })
    );
    this.teams$.subscribe((e) => console.log(e));
  }
}
