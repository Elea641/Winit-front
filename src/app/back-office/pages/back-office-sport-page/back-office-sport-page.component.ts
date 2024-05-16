import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-back-office-sport-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './back-office-sport-page.component.html',
  styleUrls: ['./back-office-sport-page.component.scss'],
})
export class BackOfficeSportPageComponent {}
