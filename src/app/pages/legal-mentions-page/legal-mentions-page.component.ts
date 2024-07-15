import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-legal-mentions-page',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './legal-mentions-page.component.html',
  styleUrls: ['./legal-mentions-page.component.scss'],
})
export class LegalMentionsPageComponent {}
