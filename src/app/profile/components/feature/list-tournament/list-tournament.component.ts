import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileService } from 'src/app/profile/shared/profile.service';
import { TournamentCard } from 'src/app/tournament/models/tournament-card.type';
import { Observable } from 'rxjs';
import { TournamentCardComponent } from 'src/app/tournament/components/ui/tournament-card/tournament-card.component';

@Component({
  selector: 'app-list-tournament',
  standalone: true,
  imports: [CommonModule, MatDividerModule, TournamentCardComponent],
  templateUrl: './list-tournament.component.html',
  styleUrls: ['./list-tournament.component.scss'],
})
export class ListTournamentComponent {
  tournaments$: Observable<TournamentCard[]> =
    inject(ProfileService).getListTournaments();
}
