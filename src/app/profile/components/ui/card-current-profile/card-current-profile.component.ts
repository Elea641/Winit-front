import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-current-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './card-current-profile.component.html',
  styleUrls: ['./card-current-profile.component.scss'],
})
export class CardCurrentProfileComponent {
  @Input() currentProfile!: CurrentProfile | null;
}
