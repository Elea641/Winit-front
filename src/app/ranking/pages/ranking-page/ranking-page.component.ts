import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, concatMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ranking-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss'],
})
export class RankingPageComponent {
  ranking$!: Observable<any | null>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.ranking$ = this.route.data.pipe(
      concatMap((data) => {
        console.log(data);

        if (data && data['ranking']) {
          return of(data['ranking']);
        } else {
          return of(null);
        }
      })
    );
  }
}
