import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ContactDetails } from 'src/app/contact/models/contact.details.model';

@Component({
  selector: 'app-dialog-overview-contact',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-overview-contact.component.html',
  styleUrls: ['./dialog-overview-contact.component.scss'],
})
export class DialogOverviewContactComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ContactDetails) {}
}
