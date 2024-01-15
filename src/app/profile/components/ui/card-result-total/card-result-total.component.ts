import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfile } from 'src/app/profile/models/current-profile.model';

@Component({
  selector: 'app-card-result-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-result-total.component.html',
  styleUrls: ['./card-result-total.component.scss'],
})
export class CardResultTotalComponent {
  @Input() currentProfile!: CurrentProfile | null;
}
