import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackOfficeLayoutComponent } from '../../components/ui/back-office-layout/back-office-layout.component';

@Component({
  selector: 'app-back-office-page',
  standalone: true,
  imports: [CommonModule, BackOfficeLayoutComponent],
  templateUrl: './back-office-page.component.html',
  styleUrls: ['./back-office-page.component.scss'],
})
export class BackOfficePageComponent {}
