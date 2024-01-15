import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentProfileDetailsComponent } from '../../components/feature/current-profile-details/current-profile-details.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, CurrentProfileDetailsComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {}
