import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminUser } from '../../../models/admin-user.model';
import { BackOfficeUserService } from '../../../shared/back-office-user.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BackOfficeUserDeleteComponent } from '../back-office-user-delete/back-office-user-delete.component';

@Component({
  selector: 'app-back-office-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
    MatTableModule,
    MatSlideToggleModule,
  ],
  templateUrl: './back-office-users-table.component.html',
  styleUrls: ['./back-office-users-table.component.scss'],
})
export class BackOfficeUsersTableComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<AdminUser>;
  displayedColumns = [
    'position',
    'lastName',
    'firstName',
    'email',
    'city',
    'requiredRole',
    'enabled',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  positionColumnData = 0;

  ngAfterViewInit() {
    this.fetchUsers();
  }

  constructor(
    private backOfficeUserService: BackOfficeUserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  fetchUsers() {
    this.backOfficeUserService
      .getAllUsers()
      .subscribe((adminUsers: AdminUser[]) => {
        adminUsers.forEach(user => {
          user.position = ++this.positionColumnData;
          if (user.requiredRole === 'ROLE_ADMIN') {
            user.requiredRole = 'Administrateur';
          } else {
            user.requiredRole = 'Utilisateur';
          }
        });
        this.dataSource = new MatTableDataSource<AdminUser>(adminUsers);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewUserDetails(userId: number) {
    this.router.navigate(['/back-office/user', userId]);
  }

  viewEditUser(userId: number) {
    this.router.navigate(['/back-office/user/edit', userId]);
  }

  openDeleteDialog(userId: number) {
    this.dialog.open(BackOfficeUserDeleteComponent, {
      data: {
        userId: userId,
      },
    });
  }
}
