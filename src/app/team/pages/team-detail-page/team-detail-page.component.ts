import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamDetailCardComponent } from '../../components/ui/team-detail-card/team-detail-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-team-detail-page',
  standalone: true,
  imports: [CommonModule, TeamDetailCardComponent, RouterOutlet],
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.scss'],
})
export class TeamDetailPageComponent {}
