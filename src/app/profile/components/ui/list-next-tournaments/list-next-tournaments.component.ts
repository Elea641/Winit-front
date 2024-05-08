import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserStatistics } from 'src/app/profile/models/user-statistics.model';

@Component({
  selector: 'app-list-next-tournaments',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './list-next-tournaments.component.html',
  styleUrls: ['./list-next-tournaments.component.scss'],
})
export class ListNextTournamentsComponent {
  @Input() userStatistics!: UserStatistics | null;
}
