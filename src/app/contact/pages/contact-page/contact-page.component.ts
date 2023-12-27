import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../components/feature/contact-list/contact-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogOverviewContactComponent } from '../../components/feature/dialog-overview-contact/dialog-overview-contact.component';
import { ContactService } from '../../shared/contact.service';
import { ContactDetails } from '../../models/contact.details.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    ContactListComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent {
  contactDetails$!: Observable<ContactDetails[]>;

  constructor(
    public dialog: MatDialog,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactDetails$ = this.contactService
      .getAllContactDetails()
      .pipe(map((data) => data));

    console.log(this.contactDetails$);
  }

  openDialog(contactDetails: ContactDetails) {
    const dialogRef = this.dialog.open(DialogOverviewContactComponent, {
      data: contactDetails,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
