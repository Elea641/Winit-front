import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ranking } from 'src/app/ranking/models/ranking.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ranking-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-display.component.html',
  styleUrls: ['./ranking-display.component.scss'],
})
export class RankingDisplayComponent {
  @Input() ranking$!: Observable<Ranking | null>;

  ngOnInit() {
    this.ranking$.subscribe((ranking) => console.log(ranking));
  }
}
