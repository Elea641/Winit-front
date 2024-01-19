import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-tournament-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tournament-match.component.html',
  styleUrls: ['./card-tournament-match.component.scss'],
})
export class CardTournamentMatchComponent implements OnInit {
  @Input() namesTeamList: any;
  @Input() indexRemainingTeams: any;
  @Input() indexRandomTeams: any;
  @Input() randomMatchs: any;
  @Input() countMatchs: any;
  isEven: string = '';

  ngOnInit(): void {
    if (this.namesTeamList.isEven === true) {
      this.isEven = 'even';
    } else {
      this.isEven = 'odd';
    }
  }
}
