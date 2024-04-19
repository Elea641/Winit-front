import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { Observable, concatMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-team-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-team-page.component.html',
  styleUrls: ['./select-team-page.component.scss'],
})
export class SelectTeamPageComponent {
  teams$!: Observable<Team[] | null>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    console.log('test');

    this.teams$ = this.route.data.pipe(
      concatMap((data) => {
        console.log(data['teams']);

        return of(data['teams']);
      })
    );
    this.teams$.subscribe((e) => console.log(e));
  }
}
