import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-team-detail-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './team-detail-page.component.html',
  styleUrls: ['./team-detail-page.component.scss'],
})
export class TeamDetailPageComponent {}
