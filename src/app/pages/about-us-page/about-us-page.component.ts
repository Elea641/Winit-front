import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule],
  templateUrl: './about-us-page.component.html',
  styleUrls: ['./about-us-page.component.scss'],
})
export class AboutUsPageComponent {}
