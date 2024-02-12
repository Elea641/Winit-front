import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentDetailsComponent } from '../../components/feature/tournament-details/tournament-details.component';

@Component({
  selector: 'app-tournament-details-page',
  standalone: true,
  imports: [CommonModule, TournamentDetailsComponent],
  templateUrl: './tournament-details-page.component.html',
  styleUrls: ['./tournament-details-page.component.scss'],
})
export class TournamentDetailsPageComponent implements OnInit {
  @Input() public id!: number;

  ngOnInit(): void {
    console.log(this.id);
  }
}
