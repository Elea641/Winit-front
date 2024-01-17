import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-tournament-match',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-tournament-match.component.html',
  styleUrls: ['./card-tournament-match.component.scss'],
})
export class CardTournamentMatchComponent {
  @Input() team: any;

  ngOnInit(): void {
    console.log(this.team);
  }
}
