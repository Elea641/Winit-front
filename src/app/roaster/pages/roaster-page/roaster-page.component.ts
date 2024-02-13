import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roaster-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './roaster-page.component.html',
  styleUrls: ['./roaster-page.component.scss'],
})
export class RoasterPageComponent {}
