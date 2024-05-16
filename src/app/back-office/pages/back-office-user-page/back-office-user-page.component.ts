import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-back-office-user-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './back-office-user-page.component.html',
  styleUrls: ['./back-office-user-page.component.scss'],
})
export class BackOfficeUserPageComponent {}
