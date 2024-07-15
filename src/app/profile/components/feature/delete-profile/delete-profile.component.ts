import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteProfileDialogComponent } from '../../ui/delete-profile-dialog/delete-profile-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-profile',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss'],
})
export class DeleteProfileComponent {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog() {
    this.dialog.open(DeleteProfileDialogComponent);
  }
}
