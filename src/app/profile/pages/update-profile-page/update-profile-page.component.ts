import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from '../../components/feature/update-profile/update-profile.component';

@Component({
  selector: 'app-update-profile-page',
  standalone: true,
  imports: [CommonModule, UpdateProfileComponent],
  templateUrl: './update-profile-page.component.html',
  styleUrls: ['./update-profile-page.component.scss'],
})
export class UpdateProfilePageComponent {}
