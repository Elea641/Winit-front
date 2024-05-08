import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserStatistics } from 'src/app/profile/models/user-statistics.model';

@Component({
  selector: 'app-list-last-tounaments-played',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './list-last-tounaments-played.component.html',
  styleUrls: ['./list-last-tounaments-played.component.scss'],
})
export class ListLastTounamentsPlayedComponent {
  @Input() userStatistics!: UserStatistics;
}
