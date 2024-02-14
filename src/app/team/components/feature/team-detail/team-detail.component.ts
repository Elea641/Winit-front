import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent {
  buttonValueClicked: string = 'list-roaster';

  onButtonClicked(value: string) {
    this.buttonValueClicked = value;
  }
}
