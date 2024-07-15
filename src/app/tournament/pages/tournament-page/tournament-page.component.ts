import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from '../../components/feature/tournament-list/tournament-list.component';

@Component({
  selector: 'app-tournament-page',
  standalone: true,
  imports: [CommonModule, TournamentListComponent],
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.scss'],
})
export class TournamentPageComponent {}
