import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardTournamentInscriptionComponent } from '../../ui/card-tournament-inscription/card-tournament-inscription.component';
import { StatesType } from 'src/app/profile/models/state-type.model';

@Component({
  selector: 'app-list-tournament-inscription',
  standalone: true,
  imports: [CommonModule, CardTournamentInscriptionComponent],
  templateUrl: './list-tournament-inscription.component.html',
  styleUrls: ['./list-tournament-inscription.component.scss'],
})
export class ListTournamentInscriptionComponent implements OnInit {
  @Input() userStatistics!: StatesType | null;
  title = '';

  ngOnInit() {
    if (this.userStatistics) {
      if (this.userStatistics[0] === 'lastTournaments') {
        this.title = 'Derniers tournois';
      } else if (this.userStatistics[0] === 'nextTournaments') {
        this.title = 'Prochains tournois';
      }
    }
  }
}
