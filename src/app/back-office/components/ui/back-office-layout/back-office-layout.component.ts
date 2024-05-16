import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { BackOfficeSportsTableComponent } from '../../feature/back-office-sports-table/back-office-sports-table.component';
import { BackOfficeUsersTableComponent } from '../../feature/back-office-users-table/back-office-users-table.component';

@Component({
  selector: 'app-back-office-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatTabsModule,
    BackOfficeSportsTableComponent,
    BackOfficeUsersTableComponent,
  ],
  templateUrl: './back-office-layout.component.html',
  styleUrls: ['./back-office-layout.component.scss'],
})
export class BackOfficeLayoutComponent {}
