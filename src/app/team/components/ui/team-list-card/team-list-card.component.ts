import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from 'src/app/team/models/team.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-team-list-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './team-list-card.component.html',
  styleUrls: ['./team-list-card.component.scss'],
})
export class TeamListCardComponent {
  @Input() team!: Team;

  ngOnInit(): void {
    console.log(this.team);
  }
}
