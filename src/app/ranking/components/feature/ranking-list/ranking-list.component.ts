import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Ranking } from 'src/app/ranking/models/ranking.type';
import { TopWinnerTeamCountDto } from 'src/app/ranking/models/topWinnerTeamCountDto.class';
import { TopWinnerTeamDto } from 'src/app/ranking/models/topWinnerTeamDto.class';
import { RankingCardComponent } from '../../ui/ranking-card/ranking-card.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-ranking-list',
  standalone: true,
  imports: [CommonModule, RankingCardComponent, MatTabsModule],
  templateUrl: './ranking-list.component.html',
  styleUrls: ['./ranking-list.component.scss'],
})
export class RankingListComponent implements OnInit {
  @Input() ranking$!: Observable<Ranking | null>;
  topWinnerTeamCountDtos: TopWinnerTeamCountDto[] = [];
  topWinnerTeamDtos: TopWinnerTeamDto[] = [];

  ngOnInit() {
    if (this.ranking$) {
      this.ranking$.subscribe(ranking => {
        if (ranking) {
          const keys = Object.keys(ranking);

          if (keys.length > 0) {
            const value = (ranking as any)[keys[0]];

            this.topWinnerTeamCountDtos = value['topWinnerTeamCountDtos'];
            this.topWinnerTeamDtos = value['topWinnerTeamDtos'];
          }
        }
      });
    }
  }
}
