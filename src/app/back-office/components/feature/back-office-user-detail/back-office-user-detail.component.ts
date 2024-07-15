import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackOfficeUserService } from '../../../shared/back-office-user.service';
import { AdminUser } from '../../../models/admin-user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BackOfficeUserDeleteComponent } from '../back-office-user-delete/back-office-user-delete.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-back-office-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    MatDialogModule,
  ],
  templateUrl: './back-office-user-detail.component.html',
  styleUrls: ['./back-office-user-detail.component.scss'],
})
export class BackOfficeUserDetailComponent implements OnInit {
  user: AdminUser | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: BackOfficeUserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.route.params) {
      this.route.params.subscribe(params => {
        const id = params['id([0-9]+)'];
        this.getUserDetails(id);
      });
    }
  }

  private getUserDetails(id: number) {
    this.userService.getUserById(id).subscribe((user: AdminUser) => {
      this.user = user;
      if (user.requiredRole === 'ROLE_ADMIN') {
        user.requiredRole = 'Administrateur';
      } else {
        user.requiredRole = 'Utilisateur';
      }
    });
  }

  openDeleteDialog(userId: any) {
    this.dialog.open(BackOfficeUserDeleteComponent, {
      data: {
        userId: userId,
      },
    });
  }
}
