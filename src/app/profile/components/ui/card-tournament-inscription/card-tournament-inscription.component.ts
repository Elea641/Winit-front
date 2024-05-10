import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TournamentDetails } from 'src/app/tournament/models/tournament-details.model';

@Component({
  selector: 'app-card-tournament-inscription',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './card-tournament-inscription.component.html',
  styleUrls: ['./card-tournament-inscription.component.scss'],
})
export class CardTournamentInscriptionComponent {
  @Input() result!: TournamentDetails;
  @Input() title: string = '';
  buttonValue: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.title === 'Derniers tournois') {
      this.buttonValue = 'Résultats';
    } else if (this.title === 'Prochains tournois') {
      this.buttonValue = 'Voir plus';
    }
  }

  onClick(tournament: number) {
    this.router.navigate([`/tournament/${tournament}`]);
  }
}
