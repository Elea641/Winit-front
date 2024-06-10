import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from '../../components/feature/contact-list/contact-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogOverviewContactComponent } from '../../components/feature/dialog-overview-contact/dialog-overview-contact.component';
import { Observable, concatMap, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ContactWinit } from '../../models/contact-winit.type';

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
export class ContactPageComponent implements OnInit {
  contactDetails$!: Observable<ContactWinit[]>;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.data) {
      this.contactDetails$ = this.route.data.pipe(
        concatMap(data => {
          if (data && data['contact']) {
            return of(data['contact']);
          } else {
            return of(null);
          }
        })
      );
    }
  }

  openDialog(contactDetails: ContactWinit) {
    this.dialog.open(DialogOverviewContactComponent, {
      data: contactDetails,
    });
  }
}
