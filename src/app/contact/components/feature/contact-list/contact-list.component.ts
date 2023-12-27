import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Contact } from 'src/app/contact/models/contact.model';
import { ContactService } from 'src/app/contact/shared/contact.service';
import { ContactCardComponent } from '../../ui/contact-card/contact-card.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactCardComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent {
  contacts$!: Observable<Contact[]>;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService
      .getAllContacts()
      .pipe(map((data) => data));
  }
}
